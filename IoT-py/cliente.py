import requests
import time
import threading
from flask import Flask, jsonify

app = Flask(__name__)

BASE_URL = "http://172.21.84.91:5000"

estado = {
    "conductividad": None,
    "humedad": None,
    "deshumidificador": None
}

@app.route('/estado', methods=['GET'])
def get_estado():
    return jsonify(estado)

def leer_sensor():
    try:
        r = requests.get(f"{BASE_URL}/sensorC", timeout=3)
        data = r.json()
        estado["conductividad"] = data.get("conductividad")
    except Exception as e:
        print("Error leyendo sensor:", e)
        estado["conductividad"] = None

def humedad():
    try:
        r = requests.get(f"{BASE_URL}/esp", timeout=3)
        estado["humedad"] = r.json()
    except Exception as e:
        print("Error leyendo humedad:", e)
        estado["humedad"] = None


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
        print(estado)
        time.sleep(5)

if __name__ == "__main__":
    threading.Thread(target=loop, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)