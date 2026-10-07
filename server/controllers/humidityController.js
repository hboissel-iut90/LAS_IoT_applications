const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(':memory:');

const getHumidity = (req, res) => {
  const query = "SELECT * FROM humidity";
  const result = db.prepare(query).all();
  res.json(result);
};

const addHumidity = (req, res) => {
  const query = "INSERT INTO humidity (value, timestamp) VALUES (?, ?)";
  db.prepare(query).run(req.body.value, req.body.timestamp);
  res.json({ message: "Humidity data added successfully" });
};

module.exports = {
  getHumidity,
  addHumidity,
};