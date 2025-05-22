// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import markiRouter from './api/data/marki.js';
import segmentARouter from './api/data/segmentA.js';

// Dla ES Module importów
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

/ Ładowanie routerów z folderu api/
app.use('/api/data/marki', markiRouter);
app.use('/api/data/segmentA',segmentARouter);
// Serwuj statyczne pliki z folderu dist
app.use(express.static(path.join(__dirname, 'dist')));

// Dla SPA - fallback na index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

