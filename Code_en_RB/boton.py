from grovepi import *
import time

# Puerto donde está conectado el botón (por ejemplo, D3)
button = 3

# Configurar el pin como entrada
pinMode(button, "INPUT")

print("Presiona el botón para probar...")

while True:
    try:
        # Leer el estado del botón (1 = presionado, 0 = suelto)
        state = digitalRead(button)
        if state:
            print("¡Botón presionado!")
        else:
            print("Botón suelto.")
        time.sleep(0.2)

    except IOError:
        print("Error de lectura del botón")
