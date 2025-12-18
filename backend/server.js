// server.js
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import db from './db.js'; // recuerda agregar .js

const app = express();
app.use(cors());
app.use(express.json());

// IP de tu Raspberry
const PYTHON_API = 'http://172.21.84.91:5000';


// Obtener estado desde Python y guardar en DB
app.get('/api/estado', async (req, res) => {
  let data;

  try {
    // Intentamos obtener datos reales de Python
    const response = await axios.get(`${PYTHON_API}/estado`, { timeout: 5000 });
    data = response.data;
    console.log('Datos reales de Python:', data);
  } catch (err) {
    // Si falla, usamos datos simulados
    console.warn('No se pudo conectar a Python, usando datos simulados');
    data = {
      conductividad: 110,
      humedad: { hum: 56.0, id: "1", temp: 25.2 },
      deshumidificador: null
    };
  }

  // Guardar humedad
  if (data.humedad) {
    db.run(
      `INSERT INTO humedad_log (sensor_id, humedad, temperatura)
       VALUES (?, ?, ?)`,
      [parseInt(data.humedad.id), data.humedad.hum, data.humedad.temp],
      function(err) {
        if (err) console.error('Error insertando humedad:', err.message);
        else console.log('Humedad insertada con id', this.lastID);
      }
    );
  }

  // Guardar conductividad
  if (data.conductividad !== undefined) {
    db.run(
      `INSERT INTO conductividad_log (conductividad)
       VALUES (?)`,
      [data.conductividad],
      function(err) {
        if (err) console.error('Error insertando conductividad:', err.message);
        else console.log('Conductividad insertada con id', this.lastID);
      }
    );
  }

  res.json(data);
});




// Comando deshumidificador
app.post('/api/deshumidificador', async (req, res) => {
  const { accion } = req.body; // "on" | "off"

  try {
    if (accion === 'on') {
      await axios.post(`${PYTHON_API}/onDesH`);
    } else {
      await axios.post(`${PYTHON_API}/offDesH`);
    }
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: 'Error enviando comando' });
  }
});

// --- HUMEDAD ---
app.get('/api/humedad/historico', (req, res) => {
  db.all(
    `SELECT * FROM humedad_log ORDER BY fecha DESC LIMIT 100`,
    [],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

app.get('/api/humedad/sensores', (req, res) => {
  db.all(
    `SELECT DISTINCT sensor_id FROM humedad_log`,
    [],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

app.get('/api/humedad/ultimas', (req, res) => {
  db.all(
    `SELECT *
     FROM humedad_log
     WHERE id IN (
       SELECT MAX(id)
       FROM humedad_log
       GROUP BY sensor_id
     )
     ORDER BY sensor_id`,
    [],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

app.get('/api/humedad/max-hoy', (req, res) => {
  db.get(
    `SELECT MAX(humedad) AS humedad
     FROM humedad_log
     WHERE DATE(fecha) = DATE('now')`,
    [],
    (err, row) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(row);
    }
  );
});

// Promedios diarios
app.get('/api/humedad/promedio/diario/semana', (req, res) => {
  db.all(
    `SELECT DATE(fecha) AS dia, AVG(humedad) AS promedio
     FROM humedad_log
     WHERE fecha >= datetime('now', '-7 days')
     GROUP BY DATE(fecha)
     ORDER BY dia ASC`,
    [],
    (err, rows) => {
      if (err) res.status(500).json(err);
      else res.json(rows);
    }
  );
});

app.get('/api/humedad/promedio/diario/mensual', (req, res) => {
  db.all(
    `SELECT DATE(fecha) AS dia, AVG(humedad) AS promedio
     FROM humedad_log
     WHERE fecha >= datetime('now', '-30 days')
     GROUP BY DATE(fecha)
     ORDER BY dia ASC`,
    [],
    (err, rows) => {
      if (err) res.status(500).json(err);
      else res.json(rows);
    }
  );
});

// --- CONDUCTIVIDAD ---
app.get('/api/conductividad/ultimo', (req, res) => {
  db.get(
    `SELECT *
     FROM conductividad_log
     ORDER BY fecha DESC
     LIMIT 1`,
    [],
    (err, row) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(row);
    }
  );
});

app.get('/api/conductividad/maxHoy', (req, res) => {
  db.get(
    `SELECT MAX(conductividad) AS conductividad
     FROM conductividad_log
     WHERE DATE(fecha) = DATE('now')`,
    [],
    (err, row) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(row);
    }
  );
});

// Últimas 24h de humedad
app.get('/api/humedad/ultimas24h', (req, res) => {
  db.all(
    `SELECT * 
     FROM humedad_log 
     WHERE fecha >= datetime('now', '-24 hours')
     ORDER BY fecha ASC`,
    [],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

// Máxima humedad últimas 48h
app.get('/api/humedad/max48h', (req, res) => {
  db.get(
    `SELECT MAX(humedad) AS humedad 
     FROM humedad_log 
     WHERE fecha >= datetime('now', '-48 hours')`,
    [],
    (err, row) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(row);
    }
  );
});

// --- AUTO CONTROL ---
async function evaluarHumedadAutomatica() {
  db.get(
    `SELECT MAX(humedad) AS humedad
     FROM humedad_log
     WHERE DATE(fecha) = DATE('now', 'localtime')`,
    [],
    async (err, row) => {
      if (err || !row) return;
      const hum = row.humedad;
      console.log('Humedad máxima hoy:', hum);

      try {
        if (hum > 70) {
          await axios.post(`${PYTHON_API}/onDesH`, null, { timeout: 5000 });
        } else {
          await axios.post(`${PYTHON_API}/offDesH`, null, { timeout: 5000 });
        }
      } catch (err) {
        console.error('No se pudo enviar comando al deshumidificador:', err.message);
        // No se hace nada más, así el servidor sigue corriendo
      }
    }
  );
}


// Ejecutar cada 5 segundos
//setInterval(evaluarHumedadAutomatica, 5000);

// --- LISTO ---
app.listen(3000, () => console.log('🚀 Node API corriendo en http://localhost:3000'));