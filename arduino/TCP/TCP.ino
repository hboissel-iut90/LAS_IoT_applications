#include <WiFi.h>
#include <DHT.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

const char* serverAddress = "192.168.1.100"; 
const uint16_t serverPort = 3000;            

#define DHTPIN 19      
#define DHTTYPE DHT11 

DHT dht(DHTPIN, DHTTYPE);

void sendSensorData(float temperature, float humidity) {
  WiFiClient client;
  
  Serial.print("Connecting to server... ");
  if (!client.connect(serverAddress, serverPort)) {
    Serial.println("Connection failed.");
    return;
  }
  Serial.println("Connected!");

  String payload = "{\"temperature\": " + String(temperature, 1) + 
                   ", \"humidity\": " + String(humidity, 1) + "}";

  client.println(payload);
  Serial.println("Data sent: " + payload);

  client.stop();
  Serial.println("Connection closed.\n");
}

void setup() {
  Serial.begin(115200);
  pinMode(DHTPIN, INPUT)
  dht.begin();

  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected successfully!");
  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  delay(5000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor! Check wiring.");
    return;
  }

  Serial.printf("Readings -> Temp: %.1f°C, Humidity: %.1f%%\n", temperature, humidity);

  //sendSensorData(temperature, humidity);
}