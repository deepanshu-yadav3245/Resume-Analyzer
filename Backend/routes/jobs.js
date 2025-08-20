// routes/jobs.js
const express = require("express");
const router = express.Router();
const { fetchJoobleJobs } = require("../services/jooble.service");

// POST: /jobs/jooble
router.post("/jooble", async (req, res) => {
  const { skills } = req.body; // ["React", "Node", "DevOps"]
  
  if (!skills || skills.length === 0) {
    return res.status(400).json({ error: "Skills are required" });
  }

  const jobs = await fetchJoobleJobs(skills);
  res.json(jobs);
});

module.exports = router;
