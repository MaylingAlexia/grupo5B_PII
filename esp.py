#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include "DHT.h"

#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "NOMBRE DEL WIFI";
const char* pass = "--------------";

const char* host = "10.238.13.91";
const int httpPort = 5000;

WiFiClient client;

unsigned long lastRead = 0;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  dht.begin();
}

void loop() {

  if (millis() - lastRead >= 2500) {
    lastRead = millis();

    float h = dht.readHumidity();
    float t = dht.readTemperature();

    if (isnan(h) || isnan(t)) {
      Serial.println("DHT FAIL");
      return;   // <-- NO enviamos nada
    }

    Serial.print("Temp: "); Serial.println(t);
    Serial.print("Hum: "); Serial.println(h);

    // Envío de datos reales
    if (client.connect(host, httpPort)) {
      String json = "{\"temp\": " + String(t) + ", \"hum\": " + String(h) + "}";

      client.println("POST /data HTTP/1.1");
      client.print("Host: "); client.println(host);
      client.println("Content-Type: application/json");
      client.print("Content-Length: "); client.println(json.length());
      client.println();
      client.print(json);
    } else {
      Serial.println("ERROR conectando");
    }
  }
}