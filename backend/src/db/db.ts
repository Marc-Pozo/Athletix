// db/index.js
import { Pool } from 'pg';
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Wrapper around the pg client
const db = {
  // Run any SQL query and return all rows
  query: async <T = any>(text: string, params: any[] = []): Promise<{ rows: T[] }> => {
        const res = await pool.query(text, params);
        return res;
    },

  // Run a query and return the first row or null
  queryOne: async <T = any>(text: string, params: any[] =[]): Promise<T | null> => {
        const res = await pool.query(text, params);
        return res.rows[0] ?? null;
    },

  // Use for non-returning statements like INSERT/UPDATE/DELETE
  execute: (text: string, ...params: any[]): Promise<void> => {
        return pool.query(text, params).then(() => {});
    },
};

export default db;

