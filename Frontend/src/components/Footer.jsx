import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full relative z-53 px-4 pt-12 pb-8">
      {/* Top Divider */}
      <div className="max-w-6xl mx-auto border-t border-cyan-500/20 mb-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/0 border border-cyan-400/10 shadow-xl rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute -top-10 -left-10 w-48 h-50 bg-cyan-500/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 -right-10 w-56 h-57 bg-purple-500/20 rounded-full blur-2xl opacity-30" />

        {/* Text */}
        <p className="text-center text-white/90 text-base sm:text-lg font-medium mb-6 z-10 relative tracking-wide">
          © {currentYear} <span className="text-cyan-400 font-semibold">Deepanshu Yadav</span>. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-8 sm:gap-12 mb-6 relative z-10">
          {[
            {
              icon: <FaGithub />,
              label: "GitHub",
              url: "https://github.com/deepanshu-123",
              color: "hover:text-cyan-300",
            },
            {
              icon: <FaLinkedin />,
              label: "LinkedIn",
              url: "https://linkedin.com/in/deepanshu-123",
              color: "hover:text-blue-400",
            },
            {
              icon: <FaEnvelope />,
              label: "Email",
              url: "mailto:deepanshu@example.com",
              color: "hover:text-pink-500",
            },
          ].map(({ icon, label, url, color }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15 }}
              className="relative group text-white text-2xl sm:text-3xl transition"
            >
              <a href={url} target="_blank" rel="noopener noreferrer" className={`transition ${color}`}>
                {icon}
              </a>
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 text-xs sm:text-sm text-white bg-black/80 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                {label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Back to Top */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="mx-auto flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-full shadow-lg text-sm font-semibold hover:from-cyan-700 hover:to-purple-700 transition"
        >
          <FaArrowUp />
          Back to Top
        </motion.button>
      </motion.div>
    </footer>
  );
};

export default Footer;
