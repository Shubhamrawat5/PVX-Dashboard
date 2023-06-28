import { Pool } from 'pg';

const dbConfig = {
  connectionString: process.env.DATABASE_URL, // Set your PostgreSQL connection string here
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(dbConfig);

export default pool;
