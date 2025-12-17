const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./iot.db');

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

module.exports = db;
