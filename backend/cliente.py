import requests
import time
import threading
from flask import Flask, jsonify
import sqlite3
import os


app = Flask(__name__)

BASE_URL = "http://172.27.64.91:5000"

estado = {
    "conductividad": None,
    "humedad": None,
    "deshumidificador": None
}

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DB_PATH = os.path.abspath(
    os.path.join(BASE_DIR, '..', 'backend', 'datos.db')
)

# Función para guardar datos en la DB
def guardar_humedad_conductividad(humedad, temp, sensor_id, conductividad):
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        if humedad is not None and temp is not None and sensor_id is not None:
            c.execute('INSERT INTO humedad_log (sensor_id, humedad, temperatura) VALUES (?, ?, ?)',
                      (sensor_id, humedad, temp))
        if conductividad is not None:
            c.execute('INSERT INTO conductividad_log (conductividad) VALUES (?)',
                      (conductividad,))
        conn.commit()
    except Exception as e:
        print("Error guardando en DB:", e)
    finally:
        conn.close()

# Endpoint para consultar el estado actual
@app.route('/estado', methods=['GET'])
def get_estado():
    return jsonify(estado)

# Lectura de sensores
def leer_sensor():
    try:
        r = requests.get(f"{BASE_URL}/sensorC", timeout=3)
        data = r.json()
        estado["conductividad"] = data.get("conductividad")
    except Exception as e:
        print("Error leyendo sensor:", e)
        estado["conductividad"] = None

def leer_humedad():
    try:
        r = requests.get(f"{BASE_URL}/esp", timeout=3)
        data = r.json()
        estado["humedad"] = data
    except Exception as e:
        print("Error leyendo humedad:", e)
        estado["humedad"] = None

# Control del deshumidificador
def desh_on():
    try:
        requests.post(f"{BASE_URL}/onDesH", timeout=3)
        estado["deshumidificador"] = "on"
    except Exception as e:
        print("Error encendiendo deshumidificador:", e)

def desh_off():
    try:
        requests.post(f"{BASE_URL}/offDesH", timeout=3)
        estado["deshumidificador"] = "off"
    except Exception as e:
        print("Error apagando deshumidificador:", e)

def loop():
    while True:
        leer_sensor()
        leer_humedad()

        print(estado["humedad"])

        if estado["humedad"] != 0:
            guardar_humedad_conductividad(
                estado["humedad"].get("hum"),
                estado["humedad"].get("temp"),
                estado["humedad"].get("id"),
                estado["conductividad"]
            )

        print("Estado actual:", estado)
        print(DB_PATH)
        time.sleep(5)

if __name__ == "__main__":
    threading.Thread(target=loop, daemon=True).start()

    app.run(host="0.0.0.0", port=5000)
