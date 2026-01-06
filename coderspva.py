import grovepi
import time
from flask import Flask, jsonify
import threading

app = Flask(__name__)

# ------------------
# Pines GrovePi
# ------------------

# Conductividad
cond_port = 0  # A0
conductividad = 0

# Relé deshumidificador
relay_pin = 4  # D4
grovepi.pinMode(relay_pin, "OUTPUT")
grovepi.digitalWrite(relay_pin, 0)  # apagado inicial


def read_conductividad():
    global conductividad
    while True:
        try:
            conductividad = grovepi.analogRead(cond_port)
        except:
            pass
        time.sleep(3)

@app.route("/sensorC", methods=["GET"])
def get_conductividad():
    return jsonify({"conductividad": conductividad})

@app.route("/onDesH", methods=["POST"])
def on_desH():
    grovepi.digitalWrite(relay_pin, 1)
    return jsonify({"DesH": "ON"})

@app.route("/offDesH", methods=["POST"])
def off_desH():
    grovepi.digitalWrite(relay_pin, 0)
    return jsonify({"DesH": "OFF"})

if __name__ == "__main__":
    t1 = threading.Thread(target=read_conductividad, daemon=True)
    t1.start()
    app.run(host="0.0.0.0", port=5000)
