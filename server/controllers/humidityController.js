const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("./database.sqlite");

const getHumidity = (req, res) => {
  const query = "SELECT * FROM humidity";
  const result = db.prepare(query).all();
  res.json(result);
};

const addHumidity = (data) => {
  if (!data || data === "") {
    return { message: "Humidity value is required" };
  }
  console.log("Received humidity value:", data);
  const query = "INSERT INTO humidity (value) VALUES (?)";
  db.prepare(query).run(data);
  return { message: "Humidity data added successfully" };
};

module.exports = {
  getHumidity,
  addHumidity,
};
