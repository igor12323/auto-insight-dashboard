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
  res.status(400).json({ error: 'Brak parametru marka w URL.' });
});

router.get('/:marka', async (req, res) => {
  const model = req.params.model;
  try {
    const result = await pool.query(
		'SELECT DISTINCT wersja_silnikowa FROM dane_samochody WHERE model = $1 ORDER BY wersja_silnikowa',
		[model]);
    res.json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera.');
  }
});

export default router;
