require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Połączenie z PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Endpoint do pobrania marek
app.get('/marki', async (req, res) => {
  try {
    const result = await pool.query('SELECT marka FROM marki');
    res.json(result.rows);
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd serwera');
  }
});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});