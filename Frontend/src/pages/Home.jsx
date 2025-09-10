import React, { useState } from "react";
import {
  FaFileUpload,
  FaMoon,
  FaSun,
  FaFileAlt,
  FaRobot,
  FaSearch,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.svg";

const Home = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => setDarkMode(!darkMode);

  const lightGradient =
    "linear-gradient(135deg, #f3f4f6, #e0f7fa, #f0f4ff, #ffffff)";
  const darkGradient =
    "linear-gradient(135deg, #0f172a, #1e293b, #111827, #0a0a0a)";

  return (
    <section
      className="min-h-screen pt-24 relative transition duration-500 text-gray-900 dark:text-white"
      style={{
        backgroundImage: darkMode ? darkGradient : lightGradient,
        color: darkMode ? "white" : "#111827",
      }}
    >
      {/* Toggle Button */}
      <div className="flex justify-end pr-6">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
        >
          {darkMode ? <FaMoon /> : <FaSun />}
          {darkMode ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      {/*  Background blobs for dark mode */}
      {darkMode && (
        <>
          <div className="absolute top-0 left-0 w-73 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse z-0"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse z-0"></div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 px-6 mt-12">
        {/* Left Content */}
        <div className="space-y-6 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-cyan-500 drop-shadow-lg"
          >
            <Typewriter
              words={[
                "Smart Resume Analyzer",
                "AI-Powered Job Matcher",
                "Built for Developers",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg dark:text-gray-300 text-black"
          >
            Upload your resume & let AI extract skills, match jobs, and build
            a summary that gets noticed.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="/upload"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl shadow hover:bg-cyan-700 transition text-lg"
            >
              <FaFileUpload /> Upload Resume
            </a>
            <a
              href="/upload?demo=true"
              className="px-6 py-3 border-2 border-cyan-400 text-cyan-500 rounded-xl hover:bg-cyan-500 hover:text-white transition text-lg"
            >
              🎯 Try Sample Resume
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={heroImg}
            alt="AI Illustration"
            className="w-full max-w-md drop-shadow-2xl"
          />
        </div>
      </div>

      {/*  Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 pb-20"
      >
        {[
          {
            icon: <FaFileAlt className="text-3xl mb-2 text-cyan-500" />,
            title: "Resume Summary",
            desc: "Get a clean overview of your resume in seconds.",
          },
          {
            icon: <FaRobot className="text-3xl mb-2 text-cyan-500" />,
            title: "AI Skill Detection",
            desc: "AI analyzes and extracts your top tech skills.",
          },
          {
            icon: <FaSearch className="text-3xl mb-2 text-cyan-500" />,
            title: "Job Matching",
            desc: "Find jobs that match your exact skills automatically.",
          },
        ].map((card, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition hover:scale-105 ${
              darkMode
                ? "bg-white/10 backdrop-blur-md text-white"
                : "bg-white border border-gray-200 text-gray-900"
            }`}
          >
            {card.icon}
            <h4 className="text-lg font-bold mb-1">{card.title}</h4>
            <p className="text-sm">{card.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Home;
