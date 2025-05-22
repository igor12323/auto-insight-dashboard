import express from 'express';
const router = express.Router();
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT marka FROM marki');
    res.json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera.');
  }
});

export default router;
