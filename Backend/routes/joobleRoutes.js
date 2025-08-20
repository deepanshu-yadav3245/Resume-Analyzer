const express = require("express");
const router = express.Router();
const axios = require("axios");

const JOOBLE_API_KEY = "a42c89a6-3101-458c-92cd-c4b3c596239a";

router.post("/jobs/jooble", async (req, res) => {
  const { skills } = req.body;

  try {
    const response = await axios.post(`https://jooble.org/api/${JOOBLE_API_KEY}`, {
      keywords: skills.length > 0 ? skills.join(" ") : "developer",
      location: "India"
    });

    const jobs = (response.data.jobs || []).slice(0, 10).map((job) => ({
      title: job.title,
      company: job.company,
      location: job.location,
      snippet: job.snippet,
      link: job.link,
    }));

    res.json(jobs);
  } catch (err) {
    console.error("❌ Jooble API error:", err.message);
    res.status(500).json({ error: "Failed to fetch jobs from Jooble" });
  }
});

module.exports = router;
