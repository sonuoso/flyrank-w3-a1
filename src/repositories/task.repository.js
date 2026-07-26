const db = require("../db");

function getAll() {
  const tasks = db.prepare(`SELECT * FROM tasks`).all();
  const returnTasks = tasks.map((t) => ({
    id: t.id,
    title: t.title,
    done: Boolean(t.done),
  }));
  return returnTasks;
}

function getById(id) {
  const task = db.prepare(`SELECT * FROM tasks WHERE id = ?`).get(id);
  if (task !== undefined) {
    task.done = Boolean(task.done);
  }

  return task;
}

function create(title) {
  const newTask = { title: title, done: 0 };

  const { lastInsertRowid } = db
    .prepare(`INSERT INTO tasks (title, done) VALUES (:title, :done)`)
    .run(newTask);

  const returnTask = { id: lastInsertRowid, title: title, done: false };

  return returnTask;
}

function update(id, changes) {
  const updateTitle = db.prepare(`UPDATE tasks SET title = :value WHERE id = :id`);
  const updateDone = db.prepare(`UPDATE tasks SET done = :value WHERE id = :id`);

    if (changes.title !== undefined) {
      updateTitle.run({value: changes.title, id: id });
    }

    if (changes.done !== undefined) {
      updateDone.run({value: changes.done === true ? 1 : 0, id: id });
    }

    return getById(id);
}

function remove(id) {
  const { changes } = db.prepare(`DELETE FROM tasks where id = ?`).run(id);
  if (changes === 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = { getAll, getById, create, update, remove };
