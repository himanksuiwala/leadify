FROM node:20-bookworm

# Install PostgreSQL and Supervisor
RUN apt-get update && apt-get install -y \
    postgresql postgresql-contrib \
    supervisor \
    && rm -rf /var/lib/apt/lists/* \
    && sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/15/main/postgresql.conf \
    && echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/15/main/pg_hba.conf

# Set up project directory
WORKDIR /app

# Copy package.json and install backend dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install

# Copy frontend package.json and install frontend dependencies
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

# Copy all source files
COPY . .

# Build frontend
RUN cd frontend && npm run build

# Build backend
RUN cd backend && npm run build

# Copy Supervisor configuration
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Setup Entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 3000
EXPOSE 5432

ENTRYPOINT ["/entrypoint.sh"]
