// import React, { useContext, useState } from "react";
// import { MyContext } from "../../context api/myContext";
// import Layout from "../../components/layout/Layout";
// import {
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaEnvelope,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// function Contact() {
//   const { mode } = useContext(MyContext);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowSuccess(true);
//     // Reset form after submission
//     setFormData({ name: "", email: "", message: "" });
//     // Hide success after 3s
//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   return (
//     <Layout>
//       <section
//         className={`py-16 px-6 md:px-20 min-h-screen flex items-center transition-colors duration-300 ${
//           mode === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-black"
//         }`}
//       >
//         <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//           {/* Left Side - Info */}
//           <div className="space-y-6">
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight">
//               Let’s Connect ✨
//             </h1>
//             <p className="text-lg opacity-80">
//               Have a question, feedback, or collaboration idea? Fill out the
//               form and we’ll get back to you as soon as possible.
//             </p>

//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <FaMapMarkerAlt className="text-blue-500 text-xl" />
//                 <span>Mumbai, India</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaPhoneAlt className="text-blue-500 text-xl" />
//                 <span>+91 98765 43210</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <FaEnvelope className="text-blue-500 text-xl" />
//                 <span>support@storefusion.com</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Side - Form */}
//           <div
//             className={`relative shadow-2xl rounded-2xl p-8 backdrop-blur-md border transition ${
//               mode === "dark"
//                 ? "bg-gray-900/70 border-gray-700"
//                 : "bg-white/90 border-gray-200"
//             }`}
//           >
//             {/* Success Message */}
//             <AnimatePresence>
//               {showSuccess && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className="mb-6 flex items-center justify-center bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow dark:bg-green-900 dark:border-green-700 dark:text-green-200"
//                 >
//                   <FaCheckCircle className="w-5 h-5 mr-2" />
//                   <span>Your message has been sent successfully 🎉</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label className="block text-sm font-semibold mb-2">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`w-full p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${
//                     mode === "dark"
//                       ? "bg-gray-800 text-white border border-gray-700"
//                       : "bg-gray-50 text-black border border-gray-300"
//                   }`}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${
//                     mode === "dark"
//                       ? "bg-gray-800 text-white border border-gray-700"
//                       : "bg-gray-50 text-black border border-gray-300"
//                   }`}
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-2">
//                   Message
//                 </label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows="5"
//                   className={`w-full p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500 ${
//                     mode === "dark"
//                       ? "bg-gray-800 text-white border border-gray-700"
//                       : "bg-gray-50 text-black border border-gray-300"
//                   }`}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Contact;




// import React, { useContext, useState } from "react";
// import { MyContext } from "../../context api/myContext";
// import Layout from "../../components/layout/Layout";
// import {
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaHeadset,
//   FaChevronDown,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// function Contact() {
//   const { mode } = useContext(MyContext);
//   const isDark = mode === "dark";

//   const [showMap, setShowMap] = useState(false);
//   const [openIndex, setOpenIndex] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const [showSuccess, setShowSuccess] = useState(false);

//   const faqData = [
//     {
//       title: "How long does delivery take?",
//       text: "Orders are usually delivered within 3-5 business days depending on your location.",
//     },
//     {
//       title: "Can I return a product?",
//       text: "Yes, we provide a 7-day return policy for unused products.",
//     },
//     {
//       title: "How do I contact support?",
//       text: "You can contact us through email, phone, or by submitting the contact form.",
//     },
//   ];

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setShowSuccess(true);

//     setFormData({
//       name: "",
//       email: "",
//       message: "",
//     });

//     setTimeout(() => setShowSuccess(false), 3000);
//   };

//   const toggleAccordion = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <Layout>
//       <section
//         className={`min-h-screen pt-24 pb-16 px-6 transition-all ${
//           isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"
//         }`}
//       >
//         <div className="max-w-6xl mx-auto">

//           {/* HERO */}
//           <div className="text-center mb-16">
//             <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
//               Contact <span className="text-blue-600 italic">Support</span>
//             </h1>

//             <p className="max-w-2xl mx-auto opacity-70 text-sm md:text-base">
//               Have a question or need help with your order? Our team is here
//               to assist you.
//             </p>
//           </div>

//           {/* CONTACT GRID */}
//           <div className="grid md:grid-cols-2 gap-10 items-start">

//             {/* LEFT INFO */}
//             <div className="space-y-6">

//               {/* LOCATION CARD (CLICK MAP) */}
//               <div
//                 onClick={() => setShowMap(!showMap)}
//                 className={`cursor-pointer p-6 rounded-3xl border flex gap-4 items-center ${
//                   isDark
//                     ? "bg-[#232f3e] border-gray-800"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <FaMapMarkerAlt className="text-blue-600 text-2xl" />
//                 <div>
//                   <h3 className="font-bold text-sm uppercase">Location</h3>
//                   <p className="text-sm opacity-70">
//                     Mumbai, India (Click to view map)
//                   </p>
//                 </div>
//               </div>

//               {/* MAP */}
//               <AnimatePresence>
//                 {showMap && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: 300 }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="overflow-hidden rounded-3xl border"
//                   >
//                     <iframe
//                       title="map"
//                       src="https://www.google.com/maps?q=mumbai&output=embed"
//                       className="w-full h-[300px]"
//                     ></iframe>
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               {/* PHONE */}
//               <div
//                 className={`p-6 rounded-3xl border flex gap-4 items-center ${
//                   isDark
//                     ? "bg-[#232f3e] border-gray-800"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <FaPhoneAlt className="text-orange-500 text-2xl" />
//                 <div>
//                   <h3 className="font-bold text-sm uppercase">Phone</h3>
//                   <p className="text-sm opacity-70">+91 98765 43210</p>
//                 </div>
//               </div>

//               {/* EMAIL */}
//               <div
//                 className={`p-6 rounded-3xl border flex gap-4 items-center ${
//                   isDark
//                     ? "bg-[#232f3e] border-gray-800"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <FaEnvelope className="text-blue-600 text-2xl" />
//                 <div>
//                   <h3 className="font-bold text-sm uppercase">Email</h3>
//                   <p className="text-sm opacity-70">
//                     support@storefusion.com
//                   </p>
//                 </div>
//               </div>

//               {/* SUPPORT */}
//               <div
//                 className={`p-6 rounded-3xl border flex gap-4 items-center ${
//                   isDark
//                     ? "bg-[#232f3e] border-gray-800"
//                     : "bg-white border-gray-200"
//                 }`}
//               >
//                 <FaHeadset className="text-orange-500 text-2xl" />
//                 <div>
//                   <h3 className="font-bold text-sm uppercase">
//                     Customer Support
//                   </h3>
//                   <p className="text-sm opacity-70">
//                     24/7 Dedicated Support Team
//                   </p>
//                 </div>
//               </div>

//               {/* ACCORDION */}
//               <div className="mt-8 space-y-3">
//                 {faqData.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`border rounded-xl overflow-hidden ${
//                       isDark
//                         ? "border-gray-700 bg-[#232f3e]"
//                         : "border-gray-200 bg-white"
//                     }`}
//                   >
//                     <button
//                       onClick={() => toggleAccordion(index)}
//                       className="w-full flex justify-between items-center p-4 text-left font-semibold text-sm"
//                     >
//                       {item.title}
//                       <FaChevronDown
//                         className={`transition ${
//                           openIndex === index ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     <AnimatePresence>
//                       {openIndex === index && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="px-4 pb-4 text-sm opacity-80"
//                         >
//                           {item.text}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* RIGHT FORM */}
//             <div
//               className={`relative p-8 md:p-10 rounded-3xl border shadow-xl max-w-md mx-auto w-full ${
//                 isDark
//                   ? "bg-[#232f3e] border-gray-800"
//                   : "bg-white border-gray-200"
//               }`}
//             >
//               {/* SUCCESS */}
//               <AnimatePresence>
//                 {showSuccess && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -15 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -15 }}
//                     className="mb-6 flex items-center justify-center bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg"
//                   >
//                     <FaCheckCircle className="mr-2" />
//                     Message sent successfully 🎉
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <form onSubmit={handleSubmit} className="space-y-5">

//                 <div>
//                   <label className="text-xs font-black uppercase tracking-wider mb-2 block">
//                     Name
//                   </label>

//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     className={`w-full p-3 rounded-xl outline-none border text-sm ${
//                       isDark
//                         ? "bg-[#131921] border-gray-700 text-white"
//                         : "bg-gray-50 border-gray-300"
//                     }`}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs font-black uppercase tracking-wider mb-2 block">
//                     Email
//                   </label>

//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className={`w-full p-3 rounded-xl outline-none border text-sm ${
//                       isDark
//                         ? "bg-[#131921] border-gray-700 text-white"
//                         : "bg-gray-50 border-gray-300"
//                     }`}
//                   />
//                 </div>

//                 <div>
//                   <label className="text-xs font-black uppercase tracking-wider mb-2 block">
//                     Message
//                   </label>

//                   <textarea
//                     name="message"
//                     rows="4"
//                     value={formData.message}
//                     onChange={handleChange}
//                     required
//                     className={`w-full p-3 rounded-xl outline-none border text-sm ${
//                       isDark
//                         ? "bg-[#131921] border-gray-700 text-white"
//                         : "bg-gray-50 border-gray-300"
//                     }`}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-widest rounded-xl transition"
//                 >
//                   Send Message
//                 </button>

//               </form>
//             </div>

//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }

// export default Contact;
import React, { useContext, useState } from "react";
import { MyContext } from "../../context api/myContext";
import Layout from "../../components/layout/Layout";
import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
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
  const { mode } = useContext(MyContext);
  const isDark = mode === "dark";
  const [openIndex, setOpenIndex] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const faqData = [
    { title: "WHAT IS THE AVERAGE RESPONSE TIME?", text: "Our dedicated support team typically responds within 2-4 business hours." },
    { title: "DO YOU OFFER INTERNATIONAL SHIPPING?", text: "Currently, StoreFusion operates across all major cities in India with express delivery." },
    { title: "HOW SECURE IS MY PERSONAL DATA?", text: "We use industry-standard SSL encryption to ensure your data is 100% protected." },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <Layout>
      <section className={`min-h-screen transition-all duration-500 pt-28 pb-20 ${isDark ? "bg-[#131921] text-white" : "bg-white text-gray-900"}`}>
        
        {/* 🚀 HERO SECTION (Bold & Italic Mix) */}
        <div className="max-w-6xl mx-auto px-6 text-center lg:text-left mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none uppercase mb-4">
              READY TO <span className="text-blue-600 italic">FUSE?</span>
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-4">
               <div className="h-1.5 w-24 bg-orange-500 rounded-full"></div>
               <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Global Support Network</p>
            </div>
          </motion.div>
        </div>

        {/* 📦 TOP CONTENT: MAP & FORM */}
        <div className="max-w-7xl mx-auto px-4 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24">
          
          {/* 📍 LEFT: VIBRANT MAP (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`relative rounded-[45px] overflow-hidden border-4 shadow-2xl h-[450px] transition-transform hover:scale-[1.01] ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-100 bg-white"}`}>
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
                <FaGlobe className="text-2xl text-blue-600 animate-spin-slow" />
              </div>
            </div>

            {/* Quick Stats/Values */}
            <div className="grid grid-cols-2 gap-4">
                <div className={`p-6 rounded-[30px] border ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                    <FaClock className="text-orange-500 text-xl mb-3" />
                    <h4 className="text-[9px] font-black uppercase tracking-widest opacity-60">Available</h4>
                    <p className="text-xs font-black">24/7 SUPPORT</p>
                </div>
                <div className={`p-6 rounded-[30px] border ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
                    <FaShieldAlt className="text-green-500 text-xl mb-3" />
                    <h4 className="text-[9px] font-black uppercase tracking-widest opacity-60">Security</h4>
                    <p className="text-xs font-black">100% SECURE</p>
                </div>
            </div>
          </div>

          {/* ✉️ RIGHT: COMPACT FORM (7 Columns) */}
          <div className="lg:col-span-7">
            <div className={`p-10 rounded-[50px] border-2 transition-all ${isDark ? "bg-[#1e293b]/30 border-gray-800 shadow-2xl" : "bg-white border-gray-50 shadow-2xl shadow-gray-100"}`}>
              <div className="mb-10">
                <h2 className="text-3xl font-black uppercase tracking-tighter italic">DROP A <span className="text-blue-600 underline decoration-blue-600/30 underline-offset-8">LINE.</span></h2>
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
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Identity</label>
                    <input type="text" placeholder="FULL NAME" className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none border transition-all ${isDark ? "bg-[#131921] border-gray-800 focus:border-blue-600 text-white" : "bg-gray-50 border-gray-200 focus:border-blue-600 focus:bg-white"}`} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Digital Mail</label>
                    <input type="email" placeholder="EMAIL ADDRESS" className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none border transition-all ${isDark ? "bg-[#131921] border-gray-800 focus:border-blue-600 text-white" : "bg-gray-50 border-gray-200 focus:border-blue-600 focus:bg-white"}`} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Inquiry Details</label>
                  <textarea rows="5" placeholder="WHAT'S ON YOUR MIND?" className={`w-full p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none border transition-all resize-none ${isDark ? "bg-[#131921] border-gray-800 focus:border-blue-600 text-white" : "bg-gray-50 border-gray-200 focus:border-blue-600 focus:bg-white"}`} required></textarea>
                </div>

                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-orange-500 text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3">
                  Inquire Now <FaPaperPlane />
                </button>
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

        {/* ❓ FAQ SECTION (Fills empty space) */}
        <div className="max-w-4xl mx-auto px-6 mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none mb-3">
              KNOWLEDGE <span className="text-blue-600">BASE</span>
            </h2>
            <div className="w-20 h-1.5 bg-orange-500 mx-auto"></div>
          </div>
          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`border rounded-[30px] overflow-hidden transition-all duration-300 ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-100 bg-gray-50 shadow-sm"}`}>
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

        {/* 🌍 FOOTER INFO SECTION (ProductInfo Signature Look) */}
        <div className={`py-24 relative overflow-hidden ${isDark ? "bg-[#1e293b]" : "bg-gray-50"}`}>
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16 italic leading-none">
                   LET'S <span className="text-orange-500">CONVERGE.</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                      { icon: <FaMapMarkerAlt className="text-blue-600" />, title: "The Studio", line1: "BKC, Tech Tower", line2: "Mumbai, MH 400051" },
                      { icon: <FaPhoneAlt className="text-orange-500" />, title: "The Hotline", line1: "+91 98765 43210", line2: "10:00 AM - 07:00 PM" },
                      { icon: <FaHeadset className="text-green-500" />, title: "Support Hub", line1: "support@fusion.com", line2: "24/7 Priority Mail" }
                    ].map((card, i) => (
                      <div key={i} className="space-y-4 group cursor-default">
                          <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-[30px] text-3xl transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white ${isDark ? "bg-[#131921]" : "bg-white shadow-xl"}`}>
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
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full"></div>
        </div>

      </section>
    </Layout>
  );
}

export default Contact;



// import { MyContext } from "../../context api/myContext";
// import Layout from "../../components/layout/Layout";
// import {
//   FaCheckCircle,
//   FaMapMarkerAlt,
//   FaPhoneAlt,
//   FaEnvelope,
//   FaPaperPlane,
//   FaWhatsapp,
//   FaArrowRight,
//   FaChevronDown,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedin,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// function Contact() {
//   const { mode } = useContext(MyContext);
//   const isDark = mode === "dark";
//   const [openFaq, setOpenFaq] = useState(null);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const faqs = [
//     { q: "How long does delivery take?", a: "Standard delivery takes 3-5 business days across India." },
//     { q: "Can I return a product?", a: "Yes, we have a 7-day easy return policy for all tech and lifestyle products." },
//     { q: "Do you offer bulk discounts?", a: "For corporate or bulk orders, please email us at sales@storefusion.com." },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowSuccess(true);
//     setTimeout(() => setShowSuccess(false), 4000);
//   };

//   // ✅ Fix: Real Google Maps URL for Mumbai
//   const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.7410978611104!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1709885000000!5m2!1sen!2sin";

//   return (
//     <Layout>
//       <section className={`min-h-screen transition-colors duration-500 pt-28 pb-20 ${isDark ? "bg-[#131921] text-white" : "bg-white text-gray-900"}`}>
        
//         {/* 🚀 HERO SECTION */}
//         <div className="max-w-6xl mx-auto px-6 text-center mb-20">
//           <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic mb-4 leading-none">
//             TALK TO <span className="text-blue-600">US.</span>
//           </h1>
//           <p className="text-[11px] font-black uppercase tracking-[0.5em] opacity-50">We're here to bridge the gap between style and tech</p>
//         </div>

//         {/* 📦 TOP: FORM & MAP SECTION (COMPACT) */}
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-10 gap-10 items-start mb-32">
          
//           {/* 📍 LEFT: Map & Socials */}
//           <div className="lg:col-span-4 space-y-8">
//             <div className={`relative rounded-[40px] overflow-hidden border-4 shadow-2xl h-[400px] ${isDark ? "border-gray-800" : "border-gray-50"}`}>
//               {/* ✅ FIXED IFRAME */}
//               <iframe
//                 title="StoreFusion HQ"
//                 src={mapEmbedUrl}
//                 className="w-full h-full object-cover"
//                 style={{ border: 0 }}
//                 allowFullScreen=""
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               ></iframe>

//               <a 
//                 href="https://maps.google.com/?q=Mumbai" 
//                 target="_blank" 
//                 rel="noreferrer" 
//                 className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl flex justify-between items-center group shadow-xl"
//               >
//                 <span className="text-[10px] font-black uppercase text-black">Get Directions</span>
//                 <FaArrowRight className="text-blue-600 group-hover:translate-x-2 transition-transform" />
//               </a>
//             </div>

//             {/* Social Connect Cards */}
//             <div className="flex gap-4">
//                {[<FaInstagram />, <FaTwitter />, <FaLinkedin />, <FaWhatsapp />].map((icon, i) => (
//                  <div key={i} className={`flex-1 h-14 flex items-center justify-center rounded-2xl border text-xl cursor-pointer transition-all hover:bg-blue-600 hover:text-white ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-gray-50 border-gray-100"}`}>
//                    {icon}
//                  </div>
//                ))}
//             </div>
//           </div>

//           {/* ✉️ RIGHT: Compact Form */}
//           <div className="lg:col-span-6">
//             <div className={`p-10 rounded-[45px] border-2 transition-all ${isDark ? "bg-[#1e293b]/30 border-gray-800 shadow-2xl shadow-black/50" : "bg-white border-gray-100 shadow-xl shadow-gray-100"}`}>
//               <AnimatePresence>
//                 {showSuccess && (
//                   <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 rounded-2xl bg-green-500 text-white text-[10px] font-black uppercase flex items-center gap-3">
//                     <FaCheckCircle size={18} /> Message Sent!
//                   </motion.div>
//                 )}
//               </AnimatePresence>

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <input type="text" placeholder="Full Name" className={`w-full p-4 rounded-2xl text-xs font-bold outline-none border transition-all ${isDark ? "bg-[#131921] border-gray-800 focus:border-blue-600" : "bg-gray-50 border-gray-200 focus:border-blue-600"}`} required />
//                 <input type="email" placeholder="Email Address" className={`w-full p-4 rounded-2xl text-xs font-bold outline-none border transition-all ${isDark ? "bg-[#131921] border-gray-800 focus:border-blue-600" : "bg-gray-50 border-gray-200 focus:border-blue-600"}`} required />
//                 <textarea rows="4" placeholder="Your Message" className={`w-full p-4 rounded-2xl text-xs font-bold outline-none border transition-all resize-none ${isDark ? "bg-[#131921] border-gray-800 focus:border-blue-600" : "bg-gray-50 border-gray-200 focus:border-blue-600"}`} required></textarea>
//                 <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-orange-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95">Send Message</button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* ❓ FAQ SECTION */}
//         <div className="max-w-4xl mx-auto px-6 mb-32">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-black uppercase italic tracking-tighter">Common <span className="text-orange-500">Queries</span></h2>
//           </div>
//           <div className="space-y-4">
//             {faqs.map((faq, index) => (
//               <div key={index} className={`border rounded-3xl transition-all ${isDark ? "border-gray-800 bg-[#1e293b]/30" : "border-gray-100 bg-gray-50/50"}`}>
//                 <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full p-6 flex justify-between items-center outline-none">
//                   <span className="text-xs font-black uppercase tracking-widest">{faq.q}</span>
//                   <FaChevronDown className={`transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
//                 </button>
//                 <AnimatePresence>
//                   {openFaq === index && (
//                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
//                       <p className="px-6 pb-6 text-sm opacity-60 font-medium leading-relaxed">{faq.a}</p>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 🌍 FINAL INFO SECTION */}
//         <div className={`py-20 text-center relative overflow-hidden ${isDark ? "bg-[#1e293b]" : "bg-gray-50"}`}>
//             <div className="relative z-10 max-w-4xl mx-auto px-6">
//                 <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">WANT TO <span className="text-blue-600">VISIT?</span></h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
//                     <div>
//                         <FaMapMarkerAlt className="mx-auto text-blue-600 mb-4 text-2xl" />
//                         <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">Corporate Office</h4>
//                         <p className="text-xs opacity-60 font-bold">123 Tech Park, BKC<br/>Mumbai, 400051</p>
//                     </div>
//                     <div>
//                         <FaPhoneAlt className="mx-auto text-orange-500 mb-4 text-2xl" />
//                         <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">Support Line</h4>
//                         <p className="text-xs opacity-60 font-bold">Mon-Sat: 10AM - 7PM<br/>+91 98765 43210</p>
//                     </div>
//                     <div>
//                         <FaEnvelope className="mx-auto text-green-500 mb-4 text-2xl" />
//                         <h4 className="font-black uppercase text-[10px] tracking-widest mb-2">General Inquiry</h4>
//                         <p className="text-xs opacity-60 font-bold">support@storefusion.com<br/>info@storefusion.com</p>
//                     </div>
//                 </div>
//             </div>
//             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full"></div>
//             <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full"></div>
//         </div>

//       </section>
//     </Layout>
//   );
// }

// export default Contact;