// utils/skillMatcher.js

function calculateMatchScore(resumeSkills = [], jobSkills = []) {
  if (!Array.isArray(resumeSkills) || !Array.isArray(jobSkills) || jobSkills.length === 0) {
    return 0;
  }

  const matched = jobSkills.filter(skill =>
    resumeSkills.includes(skill.toLowerCase())
  );

  const score = (matched.length / jobSkills.length) * 100;
  return Math.floor(score);
}

module.exports = { calculateMatchScore };
