const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgresql://user:pass@host/db"
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT marka FROM marki');
    res.json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera');
  }
});

module.exports = router;