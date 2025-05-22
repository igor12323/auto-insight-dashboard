import express from 'express';
const router = express.Router();
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

router.get('/', (req, res) => {
  res.json([]));
});

router.get('/:marka', async (req, res) => {
  const marka = req.params.marka;
  try {
    const result = await pool.query(
		'SELECT DISTINCT model FROM dane_samochody WHERE marka = $1',
		[marka]);
    res.json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera.');
  }
});

export default router;
