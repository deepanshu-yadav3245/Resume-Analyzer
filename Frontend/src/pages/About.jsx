import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaRobot,
  FaCode,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiPostman,
  SiMongodb,
} from "react-icons/si";
import profileImg from "../assets/Deepanshu.jpg";

const techList = [
  { icon: <FaReact />, name: "ReactJS", color: "bg-blue-600" },
  { icon: <SiTailwindcss />, name: "TailwindCSS", color: "bg-sky-500" },
  { icon: <FaNodeJs />, name: "Node.js", color: "bg-green-600" },
  { icon: <SiExpress />, name: "ExpressJS", color: "bg-gray-800" },
  { icon: <SiPostman />, name: "Postman", color: "bg-pink-500" },
  { icon: <FaRobot />, name: "AI Parsing", color: "bg-purple-600" },
  { icon: <SiMongodb />, name: "MongoDB", color: "bg-green-700" },
];

const skillLevels = [
  { label: "ReactJS", width: "90%" },
  { label: "TailwindCSS", width: "85%" },
  { label: "Node.js", width: "80%" },
  { label: "MongoDB", width: "75%" },
];

const About = () => {
  return (
    <section className="min-h-screen pt-28 px-6 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* 🚀 Project Intro */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-cyan-400 mb-4">
            🚀 About Smart Resume Analyzer
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Your smart AI assistant for analyzing resumes, extracting skills,
            and suggesting jobs from top platforms — all in one clean interface.
          </p>
          <p className="mt-4 italic text-lg text-gray-600 dark:text-gray-400">
            “Technology + Resume = Opportunity” 🔍
          </p>
        </motion.div>

        {/* 👤 Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6 bg-white/10 dark:bg-black/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-cyan-400/20 group relative overflow-hidden"
        >
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-500/30 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition" />
          <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition" />
          <div className="relative">
            <img
              src={profileImg}
              alt="Deepanshu Yadav"
              className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 shadow-md hover:scale-105 transition"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-cyan-300">
              Deepanshu Yadav
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              BCA (Computer Science), Integral University
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              From Siddharth Nagar, Uttar Pradesh 🇮🇳
            </p>
          </div>
        </motion.div>

        {/* 💻 Tech Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold text-blue-500 dark:text-cyan-300">
            🛠 Tech Stack Used
          </h2>
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide py-4">
            <div className="inline-flex gap-4">
              {techList.map((tech, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm shadow ${tech.color}`}
                  title={tech.name}
                >
                  {tech.icon} {tech.name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 📊 Animated Skill Bars */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-blue-500 dark:text-cyan-300">
            🚧 My Proficiency
          </h3>
          <div className="mt-4 space-y-4">
            {skillLevels.map((skill, idx) => (
              <div key={idx}>
                <p className="text-sm mb-1">{skill.label}</p>
                <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: skill.width }}
                    transition={{ duration: 1.2, delay: idx * 0.2 }}
                    className="h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📘 Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-md text-gray-700 dark:text-gray-300"
        >
          <p>
            This app extracts resume data using <strong>pdf-parse</strong>,
            processes it with a Node backend, and displays filtered jobs via <strong>RemoteOK</strong>,
            <strong> Upwork</strong>, and other sources.
          </p>
          <p className="mt-2">
            Designed with a scalable frontend, modular backend, and API integration
            to give users real-world job opportunities based on their profile.
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
            Built to empower job seekers with automation, clarity, and confidence 🚀
          </p>
        </motion.div>

        {/* 🔍 Demo Upload CTA */}
        <div className="mt-9 text-center">
          <button
            className="bg-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-700 transition shadow-lg"
            onClick={() => alert("Resume parsing feature coming soon!")}
          >
            🔍 Upload Resume
          </button>
        </div>
      </div>

      {/* 🌐 Floating Social Buttons */}
      <div className="fixed bottom-7 right-6 flex flex-col gap-3 z-50">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 dark:bg-white text-white dark:text-black p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </section>
  );
};

export default About;
