const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(':memory:');

const getAccelerometer = (req, res) => {
  const query = "SELECT * FROM accelerometer";
  const result = db.prepare(query).all();
  res.json(result);
};

const addAccelerometer = (req, res) => {
  const query = "INSERT INTO accelerometer (x, y, z, timestamp) VALUES (?, ?, ?, ?)";
  db.prepare(query).run(req.body.x, req.body.y, req.body.z, req.body.timestamp);
  res.json({ message: "Accelerometer data added successfully" });
};

module.exports = {
  getAccelerometer,
  addAccelerometer,
};