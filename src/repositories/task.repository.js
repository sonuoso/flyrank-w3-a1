let tasks = [
  { id: 1, title: "Check dry good par levels", done: true },
  { id: 2, title: "Inspect fresh food stock", done: true },
  { id: 3, title: "Order fresh produce", done: false },
];

let nextId = Math.max(...tasks.map((t) => t.id)) + 1;

function getAll() {
  return tasks;
}

function getById(id) {
  const task = tasks.find((t) => t.id === id);
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
