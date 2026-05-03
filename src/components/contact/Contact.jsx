import { ThemeContext } from '../../context/AllContext';
import React, { useContext, useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeadset,
  FaChevronDown,
  FaPaperPlane,
  FaWhatsapp,
  FaClock,
  FaShieldAlt,
  FaGlobe,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Contact() {
  const { mode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const isDark = mode === "dark";
  const [openIndex, setOpenIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const faqData = [
    { title: "WHAT IS THE AVERAGE RESPONSE TIME?", text: "Our dedicated support team typically responds within 2-4 business hours." },
    { title: "DO YOU OFFER INTERNATIONAL SHIPPING?", text: "Currently, StoreFusion operates across all major cities in India with express delivery." },
    { title: "HOW SECURE IS MY PERSONAL DATA?", text: "We use industry-standard SSL encryption to ensure your data is 100% protected." },
  ];

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className={`min-h-screen py-6 lg:py-10 pt-28 lg:pt-28 transition-all duration-500 ${isDark ? "bg-[#1a1f2e] text-white" : "bg-white text-gray-900"}`}>

        {/* 🚀 BOX 1: HERO SECTION */}
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className={`p-8 md:p-12 rounded-[40px] border-2 transition-all ${isDark ? "bg-[#1a1f2e]/40 border-gray-800 shadow-2xl" : "bg-gray-50/50 border-gray-100 shadow-xl shadow-gray-100/50"}`}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className={`text-3xl md:text-5xl font-black tracking-tighter leading-none uppercase mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                READY TO <span className="text-orange-500">FUSE?</span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-1.5 w-24 bg-orange-500 rounded-full"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Global Support Network</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 📦 TOP CONTENT: MAP & FORM */}
        <div className="max-w-7xl mx-auto px-4 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          <div className="lg:col-span-5 space-y-6">
            <div className={`relative rounded-[45px] overflow-hidden border-4 shadow-2xl h-[450px] transition-transform hover:scale-[1.01] ${isDark ? "border-gray-800 bg-[#1a1f2e]" : "border-gray-100 bg-white"}`}>
              <iframe
                title="StoreFusion HQ"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.116099042!2d72.7410999570965!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709830000000!5m2!1sen!2sin"
                className="w-full h-full object-cover"
                loading="lazy"
                style={{ border: 0 }}
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-xl rounded-[25px] flex justify-between items-center shadow-2xl border border-white">
                <div>
                  <p className="text-[8px] font-black uppercase text-blue-600 tracking-widest mb-1">Visit Our Hub</p>
                  <p className="text-xs font-black text-black uppercase">BKC, Mumbai, India</p>
                </div>
                <FaGlobe className="text-2xl text-blue-600" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-6 rounded-[30px] border ${isDark ? "bg-[#1a1f2e] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                <FaClock className="text-orange-500 text-xl mb-3" />
                <h4 className="text-[9px] font-black uppercase tracking-widest opacity-60">Available</h4>
                <p className="text-xs font-black">24/7 SUPPORT</p>
              </div>
              <div className={`p-6 rounded-[30px] border ${isDark ? "bg-[#1a1f2e] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                <FaShieldAlt className="text-green-500 text-xl mb-3" />
                <h4 className="text-[9px] font-black uppercase tracking-widest opacity-60">Security</h4>
                <p className="text-xs font-black">100% SECURE</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className={`p-10 rounded-[50px] border-2 transition-all ${isDark ? "bg-[#1a1f2e]/30 border-gray-800 shadow-2xl" : "bg-white border-gray-50 shadow-2xl shadow-gray-100"}`}>
              <div className="mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter">DROP A <span className="text-blue-600 underline decoration-blue-600/30 underline-offset-8">LINE.</span></h2>
              </div>
              <AnimatePresence>
                {showSuccess && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 p-5 rounded-2xl bg-blue-600 text-white text-[10px] font-black uppercase flex items-center gap-4 shadow-xl">
                    <FaCheckCircle size={22} /> System: Message Deployed Successfully!
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" name="name" placeholder="FULL NAME" className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase outline-none border ${isDark ? "bg-[#1a1f2e] border-gray-800 focus:border-blue-600 text-white" : "bg-gray-50 border-gray-200 focus:border-blue-600"}`} required value={formData.name} onChange={handleFormChange} />
                  <input type="email" name="email" placeholder="EMAIL ADDRESS" className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase outline-none border ${isDark ? "bg-[#1a1f2e] border-gray-800 focus:border-blue-600 text-white" : "bg-gray-50 border-gray-200 focus:border-blue-600"}`} required value={formData.email} onChange={handleFormChange} />
                </div>
                <textarea rows="5" name="message" placeholder="WHAT'S ON YOUR MIND?" className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase outline-none border resize-none ${isDark ? "bg-[#1a1f2e] border-gray-800 focus:border-blue-600 text-white" : "bg-gray-50 border-gray-200 focus:border-blue-600"}`} required value={formData.message} onChange={handleFormChange}></textarea>
                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">Inquire Now <FaPaperPlane /></button>
              </form>
              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Instant Support</p>
                <div className="flex gap-4">
                  <FaInstagram className="text-xl cursor-pointer hover:text-blue-600 transition-colors" />
                  <FaTwitter className="text-xl cursor-pointer hover:text-blue-600 transition-colors" />
                  <FaWhatsapp className="text-xl cursor-pointer text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 BOX 2: KNOWLEDGE BASE */}
        <div className="max-w-6xl mx-auto px-6 mb-24">
          <div className={`p-8 md:p-12 rounded-[40px] border-2 transition-all ${isDark ? "bg-[#1a1f2e]/40 border-gray-800 shadow-2xl" : "bg-gray-50/50 border-gray-100 shadow-xl shadow-gray-100/50"}`}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-3">
                KNOWLEDGE <span className="text-blue-600">BASE</span>
              </h2>
              <div className="w-20 h-1.5 bg-orange-500 mx-auto"></div>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqData.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className={`border rounded-[30px] overflow-hidden transition-all duration-300 ${isDark ? "border-gray-800 bg-[#1a1f2e]" : "border-gray-100 bg-gray-50 shadow-sm"}`}>
                    <button onClick={() => setOpenIndex(isOpen ? null : index)} className="w-full p-6 flex justify-between items-center text-left outline-none">
                      <span className="text-[10px] md:text-[12px] font-black uppercase tracking-widest">{faq.title}</span>
                      <FaChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                    </button>
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-40 opacity-100 px-6 pb-6" : "max-h-0 opacity-0"}`}>
                      <p className="text-xs md:text-sm font-medium opacity-60 leading-relaxed text-left border-l-4 border-orange-500 pl-4">{faq.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🚀 BOX 3: LET'S CONVERGE */}
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className={`p-8 md:p-16 rounded-[50px] border-2 transition-all relative overflow-hidden ${isDark ? "bg-[#1a1f2e]/40 border-gray-800 shadow-2xl" : "bg-gray-50/50 border-gray-100 shadow-xl shadow-gray-100/50"}`}>
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 leading-none">
                LET'S <span className="text-orange-500">CONVERGE.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { icon: <FaMapMarkerAlt className="text-blue-600" />, title: "The Studio", line1: "BKC, Tech Tower", line2: "Mumbai, MH 400051" },
                  { icon: <FaPhoneAlt className="text-orange-500" />, title: "The Hotline", line1: "+91 98765 43210", line2: "10:00 AM - 07:00 PM" },
                  { icon: <FaHeadset className="text-green-500" />, title: "Support Hub", line1: "support@fusion.com", line2: "24/7 Priority Mail" }
                ].map((card, i) => (
                  <div key={i} className="space-y-4 group cursor-default">
                    <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-[30px] text-3xl transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white ${isDark ? "bg-[#1a1f2e] border border-gray-800" : "bg-white shadow-xl"}`}>
                      {card.icon}
                    </div>
                    <h4 className="font-black uppercase text-[12px] tracking-[0.3em]">{card.title}</h4>
                    <div className="space-y-1">
                      <p className="text-[11px] font-black uppercase opacity-50 tracking-tight">{card.line1}</p>
                      <p className="text-[11px] font-black uppercase opacity-50 tracking-tight">{card.line2}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Contact);
