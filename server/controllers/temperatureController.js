const { db } = require("../initDB");

const getTemperature = (req, res) => {
  const query = "SELECT * FROM temperature";
  const result = db.prepare(query).all();
  res.json(result);
};

const addTemperature = (req, res) => {
  if(!req.body || !req.body.value || req.body.value === "") {
    return res.status(400).json({ message: "Temperature value is required" });
  }
  console.log("Received temperature value:", req.body.value);
  const query = "INSERT INTO temperature (value) VALUES (?)";
  db.prepare(query).run(req.body.value);
  res.json({ message: "Temperature data added successfully" });
};

module.exports = {
  getTemperature,
  addTemperature,
};