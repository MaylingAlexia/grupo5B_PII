from flask import Flask, request

app = Flask(__name__)

@app.route('/datos', methods=['POST'])
def recibir_datos():
    datos = request.json
    print("Datos recibidos:", datos)
    return "OK", 200

if __name__ == '__main__':
    # host='0.0.0.0' permite recibir conexiones desde otros dispositivos en la red
    app.run(host='0.0.0.0', port=5000)
