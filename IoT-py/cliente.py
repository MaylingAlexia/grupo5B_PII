import requests
import time

BASE_URL = "http://172.21.84.91:5000"

def leer_sensor():
    r = requests.get(f"{BASE_URL}/sensorC", timeout=3)
    data = r.json()
    print("Conductividad:", data["conductividad"])

def desh_on():
    r = requests.post(f"{BASE_URL}/onDesH", timeout=3)
    print(r.json())

def desh_off():
    r = requests.post(f"{BASE_URL}/offDesH", timeout=3)
    print(r.json())

def humedad():
    r = requests.get(f"{BASE_URL}/esp", timeout=3)
    print(r.json())

def tanque():
    r = requests.get(f"{BASE_URL}/tanque", timeout=3)
    print(r.json())

if __name__ == "__main__":
    while True:
        leer_sensor()
        humedad()
        tanque()

        # ejemplo de control simple
        if input("¿Prender deshumidificador? (s/n): ").lower() == "s":
            desh_on()
        else:
            desh_off()

        time.sleep(5)