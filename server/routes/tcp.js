const temperatureController = require("../controllers/temperatureController");
const humidityController = require("../controllers/humidityController");
const net = require("net");

let initTCPServer = () => {
  const server = net.createServer((socket) => {
    console.log("Client connected");

    // Buffer for incoming data
    let buffer = "";

    // Handle data
    socket.on("data", (data) => {
      // Add the new data to our buffer
      buffer += data.toString();

      // Process complete messages
      let boundary = buffer.indexOf("\n");

      while (boundary !== -1) {
        // Extract the complete message
        const message = buffer.substring(0, boundary);
        buffer = buffer.substring(boundary + 1);

        // Process the message
        try {
          let parsedMessage = JSON.parse(message);
          console.log("Received message:", parsedMessage);

          // Handle different message types
          switch (parsedMessage.type) {
            case "temperature":
              socket.write(
                JSON.stringify({
                  result: "Temperature data received",
                }) + "\n",
              );

              const temperatureResult = temperatureController.addTemperature(
                parsedMessage.value,
              );

              socket.write(
                JSON.stringify({
                  result: temperatureResult.message,
                  timestamp: Date.now(),
                }) + "\n",
              );

              break;

            case "humidity":
              socket.write(
                JSON.stringify({
                  result: "Humidity data received",
                  timestamp: Date.now(),
                }) + "\n",
              );

              const humidityResult = humidityController.addHumidity(
                parsedMessag.value,
              );

              socket.write(
                JSON.stringify({
                  result: humidityResult.message,
                  timestamp: Date.now(),
                }) + "\n",
              );
              break;

            default:
              socket.write(
                JSON.stringify({
                  type: "error",
                  message: "Unknown message type",
                  timestamp: Date.now(),
                }) + "\n",
              );
          }
        } catch (err) {
          console.error("Error processing message:", err);
          socket.write(
            JSON.stringify({
              type: "error",
              message: "Invalid JSON format",
              timestamp: Date.now(),
            }) + "\n",
          );
        }

        // Look for the next message
        boundary = buffer.indexOf("\n");
      }
    });

    // Handle disconnection
    socket.on("end", () => {
      console.log("Client disconnected");
    });

    // Handle errors
    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });
  });

  return server;
};

module.exports = {
  initTCPServer,
};
