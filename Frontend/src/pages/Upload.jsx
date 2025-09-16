import React, { useState } from "react";
import axios from "axios";
import { HiUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Upload = ({ setResumeText }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return alert("❗ Please select a file first!");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/upload", formData);
      const extractedText = res.data.text;

      setResumeText(extractedText);
      navigate("/result");
    } catch (error) {
      console.error("Upload failed:", error);
      alert(" Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen pt-24 px-6 flex justify-center items-start"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #fefcea, #f1f1f1, #e1f5fe, #fefefe)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl max-w-xl w-full border border-blue-200 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-20 pointer-events-none z-0" />

        {/*  Heading */}
        <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center z-10 relative">
          📄 Upload Your Resume
        </h2>

        {/*  Modern File Drop Box */}
        <label
          htmlFor="resume"
          className="w-full border-2 border-dashed border-blue-300 rounded-2xl px-6 py-12 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 transition relative z-10 group"
        >
          <motion.div
            className="text-blue-600 text-6xl mb-2 group-hover:animate-bounce"
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            <HiUpload />
          </motion.div>
          <p className="text-gray-700 font-medium text-center">
            {file ? (
              <span className="text-blue-700">{file.name}</span>
            ) : (
              <>
                <strong>Drag & drop</strong> or <u>click to upload</u> <br />
                (Only PDF, DOC, DOCX)
              </>
            )}
          </p>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            className="hidden"
          />
        </label>

        {/*  File Preview */}
        {file && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-sm text-gray-600 border border-blue-100 p-4 rounded-xl bg-white shadow-inner backdrop-blur z-10 relative"
          >
            <p>
              <strong>📎 :</strong> {file.name}
            </p>
            <p>
              <strong>📏 Size:</strong> {(file.size / 1024).toFixed(2)} KB
            </p>
            <p>
              <strong>🧾 Type:</strong> {file.type}
            </p>
          </motion.div>
        )}

        {/*  Submit Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-8 w-full py-3 rounded-xl font-semibold transition-all ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
          } text-white shadow-lg text-lg z-10 relative`}
        >
          {loading ? "⏳ Uploading..." : "🚀 Submit Resume"}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Upload;
