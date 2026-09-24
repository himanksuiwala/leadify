import express from 'express';
import cors from 'cors';
import path from 'path';
import { query } from './db';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

import { webhookRouter } from './routes/webhook';
import { leadsRouter } from './routes/leads';

// API Routes
app.use('/webhook', webhookRouter);
app.use('/leads', leadsRouter);

app.get('/api/health', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({ status: 'ok', db_time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

import { ZodError } from 'zod';

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: 'Validation failed', details: err.issues });
  }
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Anything that doesn't match the API routes, send back the frontend index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
