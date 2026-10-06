const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync(':memory:');

const initDBController = () => {
    db.prepare(`CREATE TABLE IF NOT EXISTS temperature (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS humidity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`).run();

    db.prepare(`CREATE TABLE IF NOT EXISTS accelerometer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    x REAL NOT NULL,
    y REAL NOT NULL,
    z REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`).run();
}

module.exports = {
    initDBController
};