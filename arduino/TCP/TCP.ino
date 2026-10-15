#include <WiFi.h>
#include <DHT.h>

const char* ssid = "xavier";
const char* password = "12345678";

const char* serverAddress = "192.168.1.100"; 
const uint16_t serverPort = 8081;            

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

  // 1. Format and send the temperature payload
  // Expected by server: {"type": "temperature", "value": 25.0}
  // client.println() automatically appends the '\n' the server is looking for
  String tempPayload = "{\"type\": \"temperature\", \"value\": " + String(temperature, 1) + "}";
  client.println(tempPayload);
  Serial.println("Data sent: " + tempPayload);

  // 2. Format and send the humidity payload
  // Expected by server: {"type": "humidity", "value": 50.0}
  String humPayload = "{\"type\": \"humidity\", \"value\": " + String(humidity, 1) + "}";
  client.println(humPayload);
  Serial.println("Data sent: " + humPayload);

  // 3. Read the response from the Node.js server
  Serial.println("Server response:");
  unsigned long timeout = millis();
  while (client.connected() && millis() - timeout < 2000) {
    while (client.available()) {
      char c = client.read();
      Serial.print(c);
      timeout = millis(); // Reset timeout as long as we are receiving data
    }
  }

  client.stop();
  Serial.println("\nConnection closed.\n");
}

void setup() {
  Serial.begin(115200);
  
  // Initialize DHT sensor
  dht.begin();

  // Connect to WiFi
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("\nWiFi connected successfully!");
  Serial.print("ESP32 IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  // Wait 5 seconds between measurements
  delay(5000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor! Check wiring.");
    return;
  }

  Serial.printf("Readings -> Temp: %.1f°C, Humidity: %.1f%%\n", temperature, humidity);

  // Send the data over TCP
  sendSensorData(temperature, humidity);
}