const db = require("../db");

const tasks = [
  { id: 1, title: "Check dry good par levels", done: 1 },
  { id: 2, title: "Inspect fresh food stock", done: 1 },
  { id: 3, title: "Order fresh produce", done: 0 },
];

let nextId = Math.max(...tasks.map((t) => t.id)) + 1;

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
  const newTask = { id: nextId++, title: title, done: false };
  tasks.push(newTask);
  return newTask;
}

function update(id, changes) {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    if (changes.title !== undefined) {
      tasks[taskIndex].title = changes.title;
    }

    if (changes.done !== undefined) {
      tasks[taskIndex].done = changes.done;
    }

    return tasks[taskIndex];
  } else {
    return undefined;
  }
}

function remove(id) {
  const taskIndex = tasks.findIndex((t) => t.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  } else {
    return false;
  }
}

module.exports = { getAll, getById, create, update, remove };
