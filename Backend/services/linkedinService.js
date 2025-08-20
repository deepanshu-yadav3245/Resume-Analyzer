// server/services/linkedinService.js
const { calculateMatchScore } = require("../utils/skillMatcher");

async function getJobs(resumeSkills = []) {
  const jobs = [
    {
      title: "React Developer",
      company: "LinkedIn Inc.",
      location: "Remote",
      requiredSkills: ["react", "redux", "javascript"],
      url: "https://linkedin.com/job-1",
    },
    {
      title: "Cloud DevOps Engineer",
      company: "LinkedCloud",
      location: "Hyderabad",
      requiredSkills: ["aws", "docker", "linux"],
      url: "https://linkedin.com/job-2",
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
      source: "LinkedIn",
    };
  });

  return formatted;
}

module.exports = { getJobs };
