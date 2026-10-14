const { DatabaseSync } = require("node:sqlite");
const db = new DatabaseSync("./database.sqlite");

const initDBController = () => {
  db.prepare(`DROP TABLE IF EXISTS temperature;`).run();
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS temperature (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
  ).run();

  db.prepare(`DROP TABLE IF EXISTS humidity;`).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS humidity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
  ).run();

  db.prepare(`DROP TABLE IF EXISTS accelerometer;`).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS accelerometer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    x REAL NOT NULL,
    y REAL NOT NULL,
    z REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );`,
  ).run();

  console.log("Database initialized successfully.");
};

module.exports = {
  initDBController,
};
