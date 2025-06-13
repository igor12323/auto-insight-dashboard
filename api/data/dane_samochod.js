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
  res.status(400).json({ error: 'Brak parametru model w URL.' });
});

router.get('/:marka/:model/:silnik', async (req, res) => {
  const marka = req.params.marka;
  const model = req.params.model;
  const silnik = req.params.silnik;
  try {
    const result = await pool.query(
		'SELECT DISTINCT cena FROM dane_samochody WHERE marka = $1 AND model = $2 AND wersja_silnikowa = $3',
		[marka, model, silnik]);
    res.json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera.');
  }
});

export default router;
