// server/services/indeedService.js
const { calculateMatchScore } = require("../utils/skillMatcher");

async function getJobs(resumeSkills = []) {
  const jobs = [
    {
      title: "Software Developer",
      company: "IndeedSoft",
      location: "Noida",
      requiredSkills: ["node.js", "express", "mongodb"],
      url: "https://indeed.com/job-1",
    },
    {
      title: "Fullstack Developer",
      company: "Indeed Web",
      location: "Remote",
      requiredSkills: ["html", "css", "react", "node.js"],
      url: "https://indeed.com/job-2",
    },
  ];

  const formatted = jobs.map((job) => {
    const matchScore = calculateMatchScore(
      resumeSkills.map((s) => s.toLowerCase()),
      job.requiredSkills.map((s) => s.toLowerCase())
    );

    return {
      ...job,
      matchScore,
      source: "Indeed",
    };
  });

  return formatted;
}

// ✅ Correct Export
module.exports = { getJobs };
