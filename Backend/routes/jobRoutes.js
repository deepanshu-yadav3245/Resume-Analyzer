const express = require("express");
const router = express.Router();

// Import all service files
const remoteokService = require("../services/remoteokService");
const indeedService = require("../services/indeedService");
const naukriService = require("../services/naukriService");
const linkedinService = require("../services/linkedinService");
const upworkService = require("../services/upworkService");

router.post("/match-jobs", async (req, res) => {
  let { resumeText } = req.body;

  // ✅ Force resumeText to string (Fix for match is not a function error)
  if (Array.isArray(resumeText)) {
    resumeText = .join(" ");
  } else if (typeof resumeText !== "string") {
    resumeText = String(resumeText || "");
  }

  try {
    // ✅ Predefined technical skills for matching
    const techSkills = [
      "JavaScript", "Python", "Java", "C++", "C", "React", "Node.js", "Express", "MongoDB",
      "MySQL", "HTML", "CSS", "Tailwind", "Bootstrap", "Next.js", "TypeScript", "Git",
      "GitHub", "Docker", "Kubernetes", "Jenkins", "AWS", "Firebase", "Postman", "Redux",
      "REST", "GraphQL", "Vite", "Nginx", "Linux", "SQL", "NoSQL", "SASS", "SCSS"
    ];

    const resumeLower = resumeText.toLowerCase();

    // 🎯 Extract only matched skills from resume
    const extractedSkills = techSkills.filter(skill =>
       resumeText.toLowerCase().includes(skill.toLowerCase())
    );

    console.log("✅ Extracted Skills:", extractedSkills);

    // 🔄 Fetch job suggestions from all platforms
    const [
      remoteokJobs,
      indeedJobs,
      naukriJobs,
      linkedinJobs,
      upworkJobs
    ] = await Promise.all([
      remoteokService.getJobs(extractedSkills),
      indeedService.getJobs(extractedSkills),
      naukriService.getJobs(extractedSkills),
      linkedinService.getJobs(extractedSkills),
      upworkService.getJobs(extractedSkills),
    ]);

    // 📦 Send filtered jobs per platform (max 10)
    res.json({
      RemoteOK: remoteokJobs.slice(0, 10),
      Indeed: indeedJobs.slice(0, 10),
      Naukri: naukriJobs.slice(0, 10),
      LinkedIn: linkedinJobs.slice(0, 10),
      Upwork: upworkJobs.slice(0, 10),
    });
  } catch (error) {
    console.error("❌ Job Match Error:", error.message);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
