#include <Arduino_LSM6DS3.h>
#include <WiFiNINA.h>

const char* ssid = "xavier";
const char* password = "12345678";


const char* serverAddress = "192.168.1.100"; 
int port = 3000;
const char* route = "/api/data";

WiFiClient client;

float x, y, z;
int degreesX = 0;
int degreesY = 0;
int degreesZ = 0;

void sendData() {
  // Connect to the Node.js server
  if (client.connect(serverAddress, port)) {
    Serial.println("Connected to server, sending data...");

    // Format data as a JSON payload
    String payload = "{\"x\":" + String(x) + 
                     ",\"y\":" + String(y) + 
                     ",\"z\":" + String(z) + "}";

    // Construct the HTTP POST request
    client.println("POST " + String(route) + " HTTP/1.1");
    client.println("Host: " + String(serverAddress));
    client.println("Content-Type: application/json");
    client.print("Content-Length: ");
    client.println(payload.length());
    client.println(); // Empty line between headers and body
    client.println(payload);

    // Briefly wait for server response
    delay(10);
    while (client.available()) {
      char c = client.read();
      Serial.print(c);
    }
    
    client.stop(); // Close connection
  } else {
    Serial.println("Connection to server failed.");
  }
}

void setup() {
  Serial.begin(9600);
  while (!Serial); // Optional: wait for serial monitor to open

  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }

  // Connect to WiFi
  Serial.print("Connecting to WiFi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");

  Serial.print("Accelerometer sample rate = ");
  Serial.print(IMU.accelerationSampleRate());
  Serial.println("Hz");
}

void loop() {
  // Only process data if new sensor readings are available
  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);

    float calcX = x;
    float calcY = y;
    float calcZ = z;

    if (calcX > 0.1) {
      calcX = 100 * calcX;
      degreesX = map(calcX, 0, 97, 0, 90);
      Serial.print("Tilting up ");
      Serial.print(degreesX);
      Serial.println(" degrees");
    } else if (calcX < -0.1) {
      calcX = 100 * calcX;
      degreesX = map(calcX, 0, -100, 0, 90);
      Serial.print("Tilting down ");
      Serial.print(degreesX);
      Serial.println(" degrees");
    }

    if (calcY > 0.1) {
      calcY = 100 * calcY;
      degreesY = map(calcY, 0, 97, 0, 90);
      Serial.print("Tilting left ");
      Serial.print(degreesY);
      Serial.println(" degrees");
    } else if (calcY < -0.1) {
      calcY = 100 * calcY;
      degreesY = map(calcY, 0, -100, 0, 90);
      Serial.print("Tilting right ");
      Serial.print(degreesY);
      Serial.println(" degrees");
    }

    if (calcZ > 0.1) {
      calcZ = 100 * calcZ;
      degreesZ = map(calcZ, 0, 97, 0, 90);
      Serial.print("Turning left ");
      Serial.print(degreesZ);
      Serial.println(" degrees");
    } else if (calcZ < -0.1) {
      calcZ = 100 * calcZ;
      degreesZ = map(calcZ, 0, -100, 0, 90);
      Serial.print("Turning right ");
      Serial.print(degreesZ);
      Serial.println(" degrees");
    }

    // Trigger data send if there is significant movement
    if (abs(x) + abs(y) + abs(z) > 0.1) {
      sendData();
    }
  }

  delay(1000); // 1-second delay between readings
}