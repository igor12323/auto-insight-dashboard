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
    const result = await pool.query('SELECT segment FROM segmenty WHERE typ_segmentu = 'A'');
    res.json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera. Adres: '+ process.env.DATABASE_URL);
  }
});

export default router;
