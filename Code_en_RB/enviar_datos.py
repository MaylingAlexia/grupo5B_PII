import requests
import random
import time

# url = "http://192.168.71.103:5000/datos" Sin Bonjour (usar ip de computador con flask)
url = "http://maycosa.local:5200/datos"


while True:
    numero_aleatorio = random.randint(0, 100)  # Genera un número aleatorio
    datos = {"numero": numero_aleatorio}

    try:
        response = requests.post(url, json=datos)
        print("Enviado:", datos, "| Respuesta del servidor:", response.text)
    except Exception as e:
        print("Error al enviar datos:", e)

    time.sleep(5)  # Espera 5 segundos antes de enviar otro número
