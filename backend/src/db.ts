// db.ts — пул подключений к PostgreSQL
import pg from 'pg';
import { config } from './config.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.databaseUrl,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err);
});

export const query = async <T = any>(
  text: string,
  params?: any[]
): Promise<T[]> => {
  const res = await pool.query(text, params);
  return res.rows as T[];
};

export const queryOne = async <T = any>(
  text: string,
  params?: any[]
): Promise<T | null> => {
  const rows = await query<T>(text, params);
  return rows[0] ?? null;
};