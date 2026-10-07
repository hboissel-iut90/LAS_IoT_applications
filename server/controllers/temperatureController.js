const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(':memory:');

const getTemperature = (req, res) => {
  const query = "SELECT * FROM temperature";
  const result = db.prepare(query).all();
  res.json(result);
};

const addTemperature = (req, res) => {
  const query = "INSERT INTO temperature (value, timestamp) VALUES (?, ?)";
  db.prepare(query).run(req.body.value, req.body.timestamp);
  res.json({ message: "Temperature data added successfully" });
};

module.exports = {
  getTemperature,
  addTemperature,
};