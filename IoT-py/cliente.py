import requests
import time
import threading
from flask import Flask, jsonify

app = Flask(__name__)

BASE_URL = "http://172.21.84.91:5000"

estado = {
    "conductividad": None,
    "humedad": None,
    "tanque": None,
    "deshumidificador": None
}

@app.route('/estado', methods=['GET'])
def get_estado():
    return jsonify(estado)

def leer_sensor():
    r = requests.get(f"{BASE_URL}/sensorC", timeout=3)
    data = r.json()
    estado["conductividad"] = data["conductividad"]

def humedad():
    r = requests.get(f"{BASE_URL}/esp", timeout=3)
    estado["humedad"] = r.json()

def tanque():
    r = requests.get(f"{BASE_URL}/tanque", timeout=3)
    estado["tanque"] = r.json()

def desh_on():
    r = requests.post(f"{BASE_URL}/onDesH", timeout=3)
    estado["deshumidificador"] = "on"

def desh_off():
    r = requests.post(f"{BASE_URL}/offDesH", timeout=3)
    estado["deshumidificador"] = "off"

def loop():
    while True:
        leer_sensor()
        humedad()
        tanque()
        time.sleep(5)

if __name__ == "__main__":
    threading.Thread(target=loop, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)