import React, { useContext, useState } from "react";
import { MyContext } from "../../context api/myContext";
import Layout from "../../components/layout/Layout";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Contact() {
  const { mode } = useContext(MyContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
    // Hide success after 3s
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <Layout>
      <section
        className={`py-16 px-6 md:px-20 min-h-screen flex items-center transition-colors duration-300 ${
          mode === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side - Info */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Let’s Connect ✨
            </h1>
            <p className="text-lg opacity-80">
              Have a question, feedback, or collaboration idea? Fill out the
              form and we’ll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-500 text-xl" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500 text-xl" />
                <span>support@storefusion.com</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={`relative shadow-2xl rounded-2xl p-8 backdrop-blur-md border transition ${
              mode === "dark"
                ? "bg-gray-900/70 border-gray-700"
                : "bg-white/90 border-gray-200"
            }`}
          >
            {/* Success Message */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6 flex items-center justify-center bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                >
                  <FaCheckCircle className="w-5 h-5 mr-2" />
                  <span>Your message has been sent successfully 🎉</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode === "dark"
                      ? "bg-gray-800 text-white border border-gray-700"
                      : "bg-gray-50 text-black border border-gray-300"
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode === "dark"
                      ? "bg-gray-800 text-white border border-gray-700"
                      : "bg-gray-50 text-black border border-gray-300"
                  }`}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${
                    mode === "dark"
                      ? "bg-gray-800 text-white border border-gray-700"
                      : "bg-gray-50 text-black border border-gray-300"
                  }`}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Contact;
