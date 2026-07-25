const express = require("express");
const router = express.Router();
const service = require("../services/task.service");

router.get("/tasks", (req, res) => {
  const done = req.query.done;
  const search = req.query.search;

  const allTasks = service.getAllTasks(done);

  const tasks = allTasks.filter(
    (t) =>
      (!done || t.done.toString() === done) &&
      (!search || t.title.includes(search)),
  );

  res.status(200).json(tasks);
});

router.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = service.getTaskById(id);

  res.status(200).json(task);
});

router.post("/tasks", (req, res) => {
  const task = service.createTask(req.body.title);

  res.status(201).json(task);
});

router.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = service.updateTask(id, req.body);

  res.status(200).json(task);
});

router.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  service.deleteTask(id);

  res.status(204).send();
});

module.exports = router;
