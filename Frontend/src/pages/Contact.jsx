import React, { useState } from "react";
import { FaEnvelope, FaUser, FaCommentDots, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      e.preventDefault(); // stop form if validation fails
      setErrors(errs);
      return;
    }
    setErrors({});
    setToast(true);

    //  Hide toast after 3 seconds
    setTimeout(() => setToast(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="min-h-screen pt-28 px-4 bg-gradient-to-br from-blue-100 to-white dark:from-gray-800 dark:to-gray-900 dark:text-white">
      {/*  Toast */}
      {toast && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg transition-all z-50">
          ✅ Message Sent Successfully!
        </div>
      )}

      {/* 3D Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white dark:bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl space-y-6 border border-blue-300/30 hover:shadow-blue-500/20 transition-all"
      >
        {/*  Header */}
        <h2 className="text-3xl font-bold text-blue-600 dark:text-cyan-400 text-center">
          📧 Contact Me
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Let’s connect! I'd love to hear about your ideas or questions.
        </p>

        {/*  Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-200">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500 dark:text-cyan-400" />
              <span className="cursor-pointer">deepanshuyadav711@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-500 dark:text-cyan-400" />
              <span className="cursor-pointer">+91 9118808753</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-500 dark:text-cyan-400" />
              <span className="cursor-pointer">Lucknow, Uttar Pradesh, India</span>
            </div>
          </div>

          {/*  Form */}
          <form
            onSubmit={handleSubmit}
            action="https://formsubmit.co/deepanshuyadav711@gmail.com"  // Replace with your email
            method="POST"
            className="space-y-4"
          >
            <input type="hidden" name="_captcha" value="false" />

            {/* Name */}
            <div className={`flex items-center gap-3 border rounded-lg px-4 py-2 bg-gray-100 dark:bg-white/5 focus-within:ring-2 ${errors.name ? "ring-red-500" : "ring-blue-400"}`}>
              <FaUser className="text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm -mt-3">{errors.name}</p>}

            {/* Email */}
            <div className={`flex items-center gap-3 border rounded-lg px-4 py-2 bg-gray-100 dark:bg-white/5 focus-within:ring-2 ${errors.email ? "ring-red-500" : "ring-blue-400"}`}>
              <FaEnvelope className="text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm -mt-3">{errors.email}</p>}

            {/* Message */}
            <div className={`flex items-start gap-3 border rounded-lg px-4 py-2 bg-gray-100 dark:bg-white/5 focus-within:ring-2 ${errors.message ? "ring-red-500" : "ring-blue-400"}`}>
              <FaCommentDots className="text-gray-400 mt-1" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                className="bg-transparent w-full outline-none text-sm resize-none"
              ></textarea>
            </div>
            {errors.message && <p className="text-red-500 text-sm -mt-3">{errors.message}</p>}

            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300 shadow-md cursor-pointer"
            >
              ✉️ Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
