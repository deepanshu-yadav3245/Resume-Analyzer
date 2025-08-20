// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; //  Footer added

// Pages
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Result from "./pages/Result";
import About from "./pages/About";     //  About Page added
import Contact from "./pages/Contact"; //  Contact Page added

function App() {
  const [resumeText, setResumeText] = useState("");

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition duration-500">
        {/* Navigation Bar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/upload"
            element={<Upload setResumeText={setResumeText} />}
          />
          <Route
            path="/result"
            element={<Result resumeText={resumeText} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
