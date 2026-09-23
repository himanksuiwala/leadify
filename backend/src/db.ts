import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'myuser',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASSWORD || 'mypassword',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
