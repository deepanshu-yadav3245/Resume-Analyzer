// server/services/remoteokService.js
const axios = require("axios");
const { calculateMatchScore } = require("../utils/skillMatcher");

async function getJobs(resumeSkills = []) {
  try {
    const response = await axios.get("https://remoteok.com/api", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    let jobs = response.data.slice(1); // skip metadata

    const filteredJobs = jobs
      .filter((job) => job.position && job.description)
      .map((job) => {
        const jobSkills = job.tags || [];

        const matchScore = calculateMatchScore(
          resumeSkills.map((s) => s.toLowerCase()),
          jobSkills.map((s) => s.toLowerCase())
        );

        return {
          title: job.position,
          company: job.company,
          location: job.location || "Remote",
          requiredSkills: jobSkills,
          url: job.url,
          matchScore,
          source: "RemoteOK",
        };
      });

    return filteredJobs;
  } catch (error) {
    console.error("RemoteOK Error:", error.message);
    return [];
  }
}

// ✅ Correct Export
module.exports = { getJobs };
