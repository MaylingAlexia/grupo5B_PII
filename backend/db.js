// db.js
import sqlite3 from 'sqlite3';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'datos.db');

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS humedad_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensor_id INTEGER,
      humedad REAL,
      temperatura REAL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS conductividad_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conductividad REAL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

export default db; // ✅ Solo esto, nada de module.exports