const { db } = require("../initDB");

const getHumidity = (req, res) => {
  const query = "SELECT * FROM humidity";
  const result = db.prepare(query).all();
  res.json(result);
};

const addHumidity = (req, res) => {
  const query = "INSERT INTO humidity (value) VALUES (?)";
  db.prepare(query).run(req.body.value);
  res.json({ message: "Humidity data added successfully" });
};

module.exports = {
  getHumidity,
  addHumidity,
};