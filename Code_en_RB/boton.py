from grovepi import *
import time

button = 3
pinMode(button, "INPUT")

print("Esperando botón estable...")

while True:
    try:
        # Lee varias veces para filtrar ruido
        readings = [digitalRead(button) for _ in range(5)]
        state = sum(readings) > 2  # mayoría de lecturas

        if state:
            print("Botón presionado!")
        else:
            print("Botón suelto.")
        time.sleep(0.2)

    except IOError:
        print("Error de lectura")
