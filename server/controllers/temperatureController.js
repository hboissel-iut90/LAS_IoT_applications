const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("./database.sqlite");

const getTemperature = (req, res) => {
  const query = "SELECT * FROM temperature";
  const result = db.prepare(query).all();
  res.json(result);
};

const addTemperature = (data) => {
  if (!data.value || data.value === "") {
    return { message: "Temperature value is required" };
  }
  console.log("Received temperature value:", data.temperature);
  const query = "INSERT INTO temperature (value) VALUES (?)";
  db.prepare(query).run(data.temperature);
  return { message: "Temperature data added successfully" };
};

module.exports = {
  getTemperature,
  addTemperature,
};
