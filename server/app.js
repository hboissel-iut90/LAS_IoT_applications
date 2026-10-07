const express = require("express");
const route = require("./routes/routes");
const { initDBController } = require("./initDB");

const app = express();
const port = 8080;

initDBController();

app.use(express.json());

app.use(route);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});