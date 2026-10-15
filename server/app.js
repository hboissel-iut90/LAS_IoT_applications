/**
 * This little project is a node server using Arduino to send data to the database and Vuejs to display datas.
 *
 * Author : Harry Boisselot and Xavier Gousset.
 * Students at University Marie and Lous Pasteur
 *
 * If you need to create a database -> uncomment the initDBController() call below.
 */
const express = require("express");
const route = require("./routes/routes");
const { initDBController } = require("./initDB");
const { initTCPServer } = require("./routes/tcp");

const app = express();
const port = 8080;

/**
 * If you need to create the database, uncomment the following line.
 * WARNING ! This will delete the current tables and create new ones.
 */
initDBController();

app.use(express.json());

app.use(route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

///////////////////////// TCP /////////////////////////

// Create a TCP server
const server = initTCPServer();

// Start the server
const PORT = 8081;
server.listen(PORT, () => {
  console.log(`TCP server running on port ${PORT}`);
});
