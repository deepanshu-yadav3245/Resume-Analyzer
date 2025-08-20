// server/services/naukriService.js
const { calculateMatchScore } = require("../utils/skillMatcher");

async function getJobs(resumeSkills = []) {
  const jobs = [
    {
      title: "MERN Stack Developer",
      company: "Naukri Tech",
      location: "Delhi NCR",
      requiredSkills: ["react", "node.js", "mongodb"],
      url: "https://www.naukri.com/job-1",
    },
    {
      title: "DevOps Engineer",
      company: "Naukri Cloud Solutions",
      location: "Bangalore",
      requiredSkills: ["aws", "docker", "jenkins"],
      url: "https://www.naukri.com/job-2",
    },
    {
      title: "Data Analyst",
      company: "Naukri Insights",
      location: "Hyderabad",
      requiredSkills: ["sql", "python", "excel"],
      url: "https://www.naukri.com/job-3",
    },
    {
      title: "Frontend Developer",
      company: "Naukri Design Co",
      location: "Remote",
      requiredSkills: ["html", "css", "javascript"],
      url: "https://www.naukri.com/job-4",
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
      source: "Naukri",
    };
  });

  return formatted;
}

// ✅ FIXED Export
module.exports = { getJobs };
