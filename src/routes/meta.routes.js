const express = require("express");
const router = express.Router();
const { getAllTasks } = require("../services/task.service");

router.get("/", (req, res) => {
    res.status(200).json({ name: "Task API", version: "1.0", endpoints: ["/tasks", "/health", "/stats", "/docs"] })
})

router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
})

router.get("/stats", (req, res) => {
    const tasks = getAllTasks();
    const total = tasks.length;
    const done = tasks.filter((t) => t.done === true).length;

    const stats = { total, done, open: total - done };

    res.status(200).json(stats);
})

module.exports = router;