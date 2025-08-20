import React, { useEffect, useState } from "react";
import axios from "axios";
import JobSuggestions from "../components/JobSuggestions";
import { FaUserTie, FaBriefcase, FaGraduationCap, FaCode, FaLink, FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const Result = ({ resumeText }) => {
  const [suggestedJobs, setSuggestedJobs] = useState({});
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  const extractSkills = () => {
    const techSkills = [
      "JavaScript", "Python", "Java", "C++", "C", "React", "Node.js", "Express", "MongoDB",
      "MySQL", "HTML", "CSS", "Tailwind", "Bootstrap", "Next.js", "TypeScript", "Git",
      "GitHub", "Docker", "Kubernetes", "Jenkins", "AWS", "Firebase", "Postman", "Redux",
      "REST", "GraphQL", "Vite", "Nginx", "Linux", "SQL", "NoSQL", "SASS", "SCSS"
    ];
    const lowerResume = resumeText?.toLowerCase() || "";
    return techSkills.filter(skill => lowerResume.includes(skill.toLowerCase()));
  };

  const extractedSkills = extractSkills();

  const extractCleanSummary = (text) => {
    const lines = text.split(/\r?\n/).filter(Boolean);
    const intro = lines.find(line =>
      /(developer|engineer|student|enthusiast|professional)/i.test(line)
    );
    const expLines = lines.filter(line =>
      /(experience|worked|internship)/i.test(line)
    ).slice(0, 3);
    const eduLines = lines.filter(line =>
      /(bachelor|master|university|college|degree)/i.test(line)
    ).slice(0, 3);

    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const links = text.match(urlRegex) || [];

    return {
      introduction: intro || null,
      experience: expLines,
      education: eduLines,
      projectLinks: links.slice(0, 3),
    };
  };

  const summary = extractCleanSummary(resumeText || "");

  useEffect(() => {
    const getJobs = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/match-jobs", {
          resumeText,
        });
        setSuggestedJobs(res.data || {});
      } catch (err) {
        console.error("❌ Job fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (resumeText && resumeText.trim().length > 20) getJobs();
  }, [resumeText]);

  return (
    <section className={`${darkMode ? "bg-[#0f172a]" : "bg-white"} min-h-screen pt-24 px-4 md:px-6 transition duration-500`}>
      <div className="max-w-6xl mx-auto space-y-12">

        {/*  Theme Toggle */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/*  Animated Resume Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`
            relative bg-white/10 backdrop-blur-md border-2 border-cyan-400/20
            rounded-2xl p-8 shadow-xl transition-all duration-500
            hover:border-cyan-400 hover:shadow-cyan-500/30
            ${darkMode ? "text-white" : "text-gray-800"}
          `}
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">📄 Resume Summary</h2>

          {/*  Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 👤 Intro */}
            {summary.introduction && (
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2 text-yellow-300">
                  <FaUserTie /> Introduction
                </h4>
                <p className="mt-1 text-base">{summary.introduction}</p>
              </div>
            )}

            {/*  Experience */}
            {summary.experience.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2 text-green-300">
                  <FaBriefcase /> Experience
                </h4>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {summary.experience.map((line, i) => (
                    <li key={i} className="text-base">{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Education */}
            {summary.education.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2 text-pink-300">
                  <FaGraduationCap /> Education
                </h4>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {summary.education.map((line, i) => (
                    <li key={i} className="text-base">{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {/*  Skills */}
            {extractedSkills.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold flex items-center gap-2 text-purple-300">
                  <FaCode /> Top Skills
                </h4>
                <div className="flex flex-wrap gap-3 mt-2">
                  {extractedSkills.slice(0, 8).map((skill, i) => (
                    <span
                      key={i}
                      className="bg-purple-700/80 text-white px-4 py-1.5 rounded-full text-sm hover:bg-purple-800 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 🔗 Projects Below Full Width */}
          {summary.projectLinks.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold flex items-center gap-2 text-blue-300">
                <FaLink /> Project Links
              </h4>
              <ul className="list-disc list-inside mt-2 space-y-1 text-blue-400">
                {summary.projectLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/*  Job Suggestions */}
        <div>
          <h3 className={`text-2xl font-bold mb-6 text-center ${darkMode ? "text-yellow-300" : "text-blue-800"}`}>🔍 Matched Jobs</h3>

          {loading ? (
            <p className="text-center text-gray-400">⏳ Loading...</p>
          ) : Object.keys(suggestedJobs).length === 0 ? (
            <p className="text-center text-red-400">❌ No jobs found.</p>
          ) : (
            Object.entries(suggestedJobs).map(([portal, jobs]) => (
              <div key={portal} className="mb-10">
                <h4 className={`text-xl font-semibold text-center underline mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`}>{portal}</h4>

                <div className="grid sm:grid-cols-2 gap-6">
                  {jobs.slice(0, 6).map((job, i) => (
                    <div
                      key={i}
                      className={`bg-white ${darkMode ? "text-gray-900" : "text-gray-800"} p-5 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300`}
                    >
                      <div>
                        <h5 className="text-lg font-bold text-blue-600">{job.title}</h5>
                        <p className="text-sm">{job.company || "Unknown Company"}</p>
                        <p className="text-xs text-blue-500">{job.location || "Remote"}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {(job.requiredSkills || []).slice(0, 5).map((skill, i) => (
                          <span
                            key={i}
                            className="bg-gray-200 text-xs text-gray-800 px-2 py-1 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <a
                          href={job.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-sm"
                        >
                          Apply
                        </a>
                        <span className="text-xs italic text-gray-500">{job.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Jooble Jobs */}
        <div className="mb-20">
          <h4 className={`text-xl font-bold text-center mb-4 ${darkMode ? "text-pink-400" : "text-pink-600"}`}>Jooble Jobs</h4>
          <JobSuggestions skills={extractedSkills} />
        </div>
      </div>
    </section>
  );
};

export default Result;
