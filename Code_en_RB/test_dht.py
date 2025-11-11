#!/usr/bin/env python3
import time, math
from grovepi import dht

PIN = 4   # cambia al puerto digital donde tengas el sensor (ej. 2,3,4)
# sensor_type: 0 ó 1 — algunos firmwares usan 0=DHT11,1=DHT22; si uno no funciona prueba el otro.
SENSOR_TYPES = [0, 1]

def safe_read(pin, sensor_type):
    try:
        res = dht(pin, sensor_type)
        # dht() suele devolver [temp, hum] o lanzar excepción
        if res is None:
            return None, None
        t, h = res
        # si cualquiera es None o NaN devolvemos None
        if t is None or h is None: return None, None
        if isinstance(t, float) and math.isnan(t): return None, None
        if isinstance(h, float) and math.isnan(h): return None, None
        return t, h
    except Exception as e:
        return None, None

def try_types(pin):
    for st in SENSOR_TYPES:
        print(f"\nProbando tipo sensor = {st} (0=DHT11?,1=DHT22?) en puerto D{pin} ...")
        for attempt in range(1, 8):
            t, h = safe_read(pin, st)
            if t is not None and h is not None:
                print(f"OK en intento {attempt}: temperatura={t:.2f}°C  humedad={h:.2f}% (tipo {st})")
                return True
            else:
                print(f" intento {attempt}: lectura inválida (NaN/None). Esperando 2s y reintentando...")
                time.sleep(2)
        print(f"Tipo {st} falló tras 7 intentos.")
    return False

if __name__ == "__main__":
    print("=== Diagnóstico DHT con GrovePi ===")
    print("Asegúrate de ejecutar con sudo si usas I2C/Grove (sudo python3 check_dht.py)")
    ok = try_types(PIN)
    if not ok:
        print("\nResumen: No se logró lectura válida.")
        print("- Revisa cableado: puerto digital, cable Grove correctamente orientado.")
        print("- Asegura alimentación: GrovePi y Pi encendidos.")
        print("- Prueba otro puerto digital (cambia PIN en el script).")
        print("- Si tienes otro sensor (DHT11 vs DHT22) prueba intercambiarlo.")
        print("- Si tienes otro GrovePi o sensor, prueba para descartar hardware defectuoso.")
        print("- Actualiza firmware/librerías del GrovePi si sospechas instalación inconsistente.")
    else:
        print("\n¡Perfecto! El sensor responde. Usa el tipo que funcionó en tu código.")