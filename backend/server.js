// server.js (Node + Express)
import express from 'express';
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/api/ia', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }]
    });
    const answer = response.data.choices[0].message?.content;
    res.json({ answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log('Servidor Node corriendo en 3000'));


const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const db = require('./db');


// IP DE TU RASPBERRY
const PYTHON_API = 'http://172.21.84.91:5000';

// 1️⃣ Obtener estado desde Python
app.get('/api/estado', async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_API}/estado`);
    const data = response.data;

    // ---- HUMEDAD ----
    if (data.humedad) {
      db.run(
        `INSERT INTO humedad_log (humedad, temperatura)
         VALUES (?, ?)`,
        [data.humedad.hum, data.humedad.temp]
      );
    }

    // ---- CONDUCTIVIDAD ----
    if (data.conductividad) {
      db.run(
        `INSERT INTO conductividad_log (conductividad)
         VALUES (?)`,
        [data.conductividad]
      );
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'No se pudo conectar a Python' });
  }
});

// 2️⃣ Enviar comando al deshumidificador
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

setInterval(evaluarHumedadAutomatica, 5000);

app.listen(3000, () => {
  console.log('🚀 Node API corriendo en http://localhost:3000');
});

app.get('/api/humedad/historico', (req, res) => {
  db.all(
    `SELECT * FROM humedad_log ORDER BY fecha DESC LIMIT 100`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

app.get('/api/humedad/sensores', (req, res) => {
  db.all(
    `SELECT DISTINCT sensor_id FROM humedad_log`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

app.get('/api/humedad/ultimas', (req, res) => {
  db.all(
    `
    SELECT *
    FROM humedad_log h
    WHERE id IN (
      SELECT MAX(id)
      FROM humedad_log
      GROUP BY sensor_id
    )
    ORDER BY sensor_id
    `,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

app.get('/api/humedad/max-hoy', (req, res) => {
  db.all(
    `
    SELECT *
    FROM humedad_log
    WHERE DATE(fecha) = DATE('now')
    ORDER BY humedad DESC
    LIMIT 1
    `,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

function evaluarHumedadAutomatica() {
  db.all(
    `
    SELECT humedad
    FROM humedad_log
    WHERE DATE(fecha) = DATE('now', 'localtime')
    ORDER BY humedad DESC
    LIMIT 1
    `,
    [],
    (err, rows) => {
      if (err || rows.length === 0) return;

      const hum = rows[0].humedad;
      console.log('Humedad máxima hoy:', hum);

      if (hum > 70) {
        axios.post(`${PYTHON_API}/onDesH`);
      } else {
        axios.post(`${PYTHON_API}/offDesH`);
      }
    }
  );
}

app.get('/api/humedad/promedio/diario/semana', (req, res) => {
  db.all(
    `
    SELECT 
      DATE(fecha) AS dia,
      AVG(humedad) AS promedio
    FROM humedad_log
    WHERE fecha >= datetime('now', '-7 days')
    GROUP BY DATE(fecha)
    ORDER BY dia ASC
    `,
    [],
    (err, rows) => {
      if (err) res.status(500).json(err);
      else res.json(rows);
    }
  );
});

app.get('/api/humedad/promedio/diario/mensual', (req, res) => {
  db.all(
    `
    SELECT
    DATE(fecha) AS dia,
    AVG(humedad) AS promedio_diario
    FROM humedad_log
    WHERE fecha >= datetime('now', '-30 days')
    GROUP BY DATE(fecha)
    ORDER BY dia ASC;
    `,
    [],
    (err, rows) => {
      if (err) res.status(500).json(err);
      else res.json(rows);
    }
  );
});

app.get('/api/conductividad/ultimo/', (req, res) => {
  db.get(
    `SELECT *
     FROM conductividad_log
     ORDER BY fecha DESC
     LIMIT 1`,
    [req.params.sensor_id],
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

// Devuelve todas las medidas de las últimas 24h
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

