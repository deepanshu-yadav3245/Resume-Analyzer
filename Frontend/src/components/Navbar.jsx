import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRobot } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-5 py-4 backdrop-blur-md bg-gradient-to-r from-blue-800/60 via-gray-900/40 to-purple-800/50 shadow-lg border-b border-blue-500/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/*  Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-cyan-300 hover:text-cyan-400 transition"
        >
          <FaRobot className="text-2xl animate-pulse" />
          <span className="text-xl font-extrabold tracking-wide drop-shadow-sm">
            Smart Resume
          </span>
        </Link>

        {/*  Links */}
        <div className="space-x-6 text-sm sm:text-base font-medium">
          <Link
            to="/"
            className={`hover:text-cyan-400 transition ${
              isActive("/") ? "text-cyan-400 underline underline-offset-4" : "text-white"
            }`}
          >
            Home
          </Link>

          <Link
            to="/upload"
            className={`hover:text-cyan-400 transition ${
              isActive("/upload") ? "text-cyan-400 underline underline-offset-4" : "text-white"
            }`}
          >
            Upload
          </Link>

          <Link
            to="/about"
            className={`hover:text-cyan-400 transition ${
              isActive("/about") ? "text-cyan-400 underline underline-offset-4" : "text-white"
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`hover:text-cyan-400 transition ${
              isActive("/contact") ? "text-cyan-400 underline underline-offset-4" : "text-white"
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
