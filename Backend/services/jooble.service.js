// server/services/joobleService.js
const { calculateMatchScore } = require("../utils/skillMatcher");

module.exports.getJoobleJobs = async (resumeSkills = []) => {
  const jobs = [
    {
      title: "Backend Engineer",
      company: "JoobleTech",
      location: "Remote",
      requiredSkills: ["node.js", "mongodb", "express"],
      url: "https://jooble.org/job-1",
    },
    {
      title: "UI/UX Designer",
      company: "Jooble Creative",
      location: "Pune",
      requiredSkills: ["figma", "html", "css"],
      url: "https://jooble.org/job-2",
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
      source: "Jooble",
    };
  });

  return formatted;
};
