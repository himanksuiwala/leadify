#!/bin/bash
set -e

DB_NAME=${DB_NAME:-mydb}
DB_USER=${DB_USER:-myuser}
DB_PASSWORD=${DB_PASSWORD:-mypassword}

# If the database directory doesn't exist, this implies first run, but Debian package initdb's by default
# Let's check if the user exists. We can start the service temporarily.
echo "Starting PostgreSQL temporarily to create database and user..."
service postgresql start

# Wait for it to be ready
until su - postgres -c "psql -c '\q'"; do
  echo "Waiting for PostgreSQL..."
  sleep 1
done

su - postgres -c "psql -c \"DO \\$\\$ BEGIN IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${DB_USER}') THEN CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}'; END IF; END \\$\\$;\""
su - postgres -c "psql -tc \"SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'\" | grep -q 1 || psql -c \"CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};\""

# Check if tables exist, if not, run seed script
TABLE_EXISTS=$(su - postgres -c "psql -d ${DB_NAME} -tc \"SELECT to_regclass('public.\\\"Customer\\\"');\"" | tr -d ' \n')
if [ -z "$TABLE_EXISTS" ]; then
    echo "Database is empty. Running seed script..."
    cd /app/backend && npm run seed
else
    echo "Database already seeded. Skipping seed script."
fi

echo "PostgreSQL setup complete. Stopping temporary server..."
service postgresql stop

echo "Starting supervisord..."
exec /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
