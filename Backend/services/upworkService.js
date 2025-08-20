// server/services/upworkService.js
const { calculateMatchScore } = require("../utils/skillMatcher");

async function getJobs(resumeSkills = []) {
  const jobs = [
    {
      title: "Freelance Web Developer",
      company: "Upwork Client A",
      location: "Remote",
      requiredSkills: ["javascript", "html", "css"],
      url: "https://upwork.com/job-1",
    },
    {
      title: "DevOps Consultant",
      company: "Upwork Client B",
      location: "Remote",
      requiredSkills: ["jenkins", "docker", "aws"],
      url: "https://upwork.com/job-2",
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
      source: "Upwork",
    };
  });

  return formatted;
}

module.exports = { getJobs };
