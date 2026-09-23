# Monolithic Fullstack App

This project contains a React+TypeScript frontend, an Express.js backend, and a PostgreSQL database, all configured to run inside a **single Docker container**.

## Architecture
- **Frontend**: React + TypeScript built with Vite. The built static files are served by the backend.
- **Backend**: Express.js (Node.js) server connecting to a local PostgreSQL instance.
- **Database**: PostgreSQL database.
- **Process Manager**: `supervisord` is used inside the Docker container to manage both PostgreSQL and Node processes.

## How to Build and Run the Docker Container

1. **Build the image**
```bash
docker build -t fullstack-monolith .
```

2. **Run the container**
```bash
docker run -p 3000:3000 --name my-monolith fullstack-monolith
```

3. **Test the app**
- **Frontend**: Go to `http://localhost:3000`
- **Backend Healthcheck**: Go to `http://localhost:3000/api/health`

## Development (Local)
If you want to run the apps locally without Docker during development:

1. **Start PostgreSQL** locally on port 5432 with default credentials (user: `myuser`, pass: `mypassword`, db: `mydb`).
2. **Run Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. **Run Frontend**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
