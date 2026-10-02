const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../sentinelx.db");

const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS threat_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    result TEXT NOT NULL,
    riskLevel TEXT NOT NULL,
    keywords TEXT,
    recommendation TEXT,
    engine TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

module.exports = db;