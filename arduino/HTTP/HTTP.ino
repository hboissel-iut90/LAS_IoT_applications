#include <Arduino_LSM6DS3.h>


float x, y, z;
int degreesX = 0;
int degreesY = 0;
int degreesZ = 0;

void sendData(){
  //TODO : SEND DATA TO THE NODEJS SERVER WITH HTTP
}

void setup(){
  Serial.begin(9600);
  //IMU is the accelerometer
  if (!IMU.begin()) {
    Serial.println("Failed to initialize IMU!");
    while (1);
  }
  delay(5000);

  Serial.print("Accelerometer sample rate = ");
  Serial.print(IMU.accelerationSampleRate());
  Serial.println("Hz");

}


void loop() {

  if (IMU.accelerationAvailable()) {
    IMU.readAcceleration(x, y, z);

  }

  if (abs(x)+abs(y)+abs(z)>0.1){
    sendData();
  }

  if (x > 0.1) {
    x = 100 * x;
    degreesX = map(x, 0, 97, 0, 90);
    Serial.print("Tilting up ");
    Serial.print(degreesX);
    Serial.println("  degrees");
  }
  if (x < -0.1) {
    x = 100 * x;
    degreesX = map(x, 0, -100, 0, 90);
    Serial.print("Tilting down ");
    Serial.print(degreesX);
    Serial.println("  degrees");
  }
  if (y > 0.1) {
    y = 100 * y;
    degreesY = map(y, 0, 97, 0, 90);
    Serial.print("Tilting left ");
    Serial.print(degreesY);
    Serial.println("  degrees");
  }
  if (y < -0.1) {
    y = 100 * y;
    degreesY = map(y, 0, -100, 0, 90);
    Serial.print("Tilting right ");
    Serial.print(degreesY);
    Serial.println("  degrees");
  }
  if (z > 0.1) {
    z = 100 * z;
    degreesZ = map(z, 0, 97, 0, 90);
    Serial.print("Turning left ");
    Serial.print(degreesZ);
    Serial.println("  degrees");
  }
  if (z < -0.1) {
    z = 100 * z;
    degreesZ = map(z, 0, -100, 0, 90);
    Serial.print("Turning right ");
    Serial.print(degreesZ);
    Serial.println("  degrees");
  }
  delay(1000);
}