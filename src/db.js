const Database = require("better-sqlite3");
const db = new Database("tasks.db");

const seed = [
  { id: 1, title: "Check dry good par levels", done: 1 },
  { id: 2, title: "Inspect fresh food stock", done: 1 },
  { id: 3, title: "Order fresh produce", done: 0 },
];

db.exec(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0)`);

const { count } = db.prepare(`SELECT COUNT(*) as count FROM tasks`).get();
const insert = db.prepare(`INSERT INTO tasks VALUES (:id, :title, :done)`);

if (count === 0) {
    for (const task of seed) {
        insert.run({ id: task.id, title: task.title, done: task.done });
    }
}

module.exports = db;