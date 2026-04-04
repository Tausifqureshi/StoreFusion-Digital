import { ThemeContext } from '../../context api/AllContext';
import React, { useContext, useState } from "react";
;
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcStripe,
  FaCcApplePay,
} from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail, FiSend, FiChevronUp, FiChevronRight } from "react-icons/fi";

function Footer() {
  const { mode } = useContext(ThemeContext);;
  const isDark = mode === "dark";

  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    setEmail("");
  }


  return (
    <footer className={`relative transition-all duration-300 ${isDark ? "bg-[#131921] text-gray-300" : "bg-gray-50 text-gray-700"} font-sans border-t ${isDark ? "border-gray-800" : "border-gray-200"}`}>

      {/* Newsletter Section - Premium Touch */}
      <div className={`${isDark ? "bg-[#232f3e]" : "bg-blue-600"} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className={`text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-white"} mb-2`}>
              Subscribe to our Newsletter
            </h2>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-blue-100"}`}>
              Get the latest updates, exclusive deals, and special offers directly in your inbox.
            </p>
          </div>

          <div className="w-full md:w-auto flex-1 max-w-md flex relative shadow-lg rounded-full">
            <form action="" onSubmit={handleSubmit} className="w-full flex justify-end">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className={`w-full py-3 px-5 pr-14 rounded-full text-sm font-medium outline-none transition-all ${isDark ? "bg-[#131921] text-white border border-gray-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500" : "bg-white text-gray-800 border-none focus:ring-2 focus:ring-orange-400"}`}
              />
              <button className="absolute right-1 top-1 bottom-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 flex items-center justify-center transition-colors shadow-md">
                <FiSend size={16} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* 1. Brand & Description */}
          <div className="flex flex-col">
            <Link to="/" className={`text-3xl font-black italic tracking-tighter ${isDark ? "text-white" : "text-blue-600"} mb-3`}>
              STORE<span className="text-orange-500">FUSION</span>
            </Link>
            <p className={`text-[13px] leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"} text-justify pr-2 mb-5`}>
              Elevate your shopping experience with StoreFusion. We bring you handpicked quality products with a seamless, secure, and lightning-fast digital storefront.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF size={14} />, link: "https://facebook.com", color: "hover:bg-blue-600 hover:text-white hover:border-blue-600 text-[#1877F2]" },
                { icon: <FaTwitter size={14} />, link: "https://twitter.com", color: "hover:bg-sky-500 hover:text-white hover:border-sky-500 text-[#1DA1F2]" },
                { icon: <FaInstagram size={14} />, link: "https://instagram.com", color: "hover:bg-pink-600 hover:text-white hover:border-pink-600 text-[#E4405F]" },
                { icon: <FaLinkedinIn size={14} />, link: "https://linkedin.com", color: "hover:bg-blue-700 hover:text-white hover:border-blue-700 text-[#0A66C2]" },
                { icon: <FaYoutube size={14} />, link: "https://youtube.com", color: "hover:bg-red-600 hover:text-white hover:border-red-600 text-[#FF0000]" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-300 transform hover:-translate-y-1 ${isDark ? "bg-[#1e293b] border-gray-700" : "bg-white border-gray-200 shadow-sm"} ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className={`text-sm font-black mb-5 uppercase tracking-[0.15em] ${isDark ? "text-white" : "text-gray-900"}`}>
              Shop Directory
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "All Products", path: "/allproducts" },
                { name: "New Arrivals", path: "/allproducts" },
                { name: "My Cart", path: "/cart" },
                { name: "Local For Vocal", path: "/localforvocal" }
              ].map((item, idx) => (
                <li key={idx} className="group overflow-hidden">
                  <Link
                    to={item.path}
                    className={`text-[13px] font-medium flex items-center gap-2 transition-colors duration-300 ${isDark ? "text-gray-400 group-hover:text-orange-500" : "text-gray-600 group-hover:text-orange-600"}`}
                  >
                    <span className={`transition-all duration-300 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-orange-500`}>
                      <FiChevronRight size={14} />
                    </span>
                    <span className="transform -translate-x-5 transition-all duration-300 group-hover:translate-x-0">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Help & Support */}
          <div>
            <h3 className={`text-sm font-black mb-5 uppercase tracking-[0.15em] ${isDark ? "text-white" : "text-gray-900"}`}>
              Help & Support
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Track Order", path: "/order" },
                { name: "Return Policy", path: "/returnpolicy" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacypolicy" }
              ].map((item, idx) => (
                <li key={idx} className="group overflow-hidden">
                  <Link
                    to={item.path}
                    className={`text-[13px] font-medium flex items-center gap-2 transition-colors duration-300 ${isDark ? "text-gray-400 group-hover:text-orange-500" : "text-gray-600 group-hover:text-orange-600"}`}
                  >
                    <span className={`transition-all duration-300 transform -translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-orange-500`}>
                      <FiChevronRight size={14} />
                    </span>
                    <span className="transform -translate-x-5 transition-all duration-300 group-hover:translate-x-0">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h3 className={`text-sm font-black mb-5 uppercase tracking-[0.15em] ${isDark ? "text-white" : "text-gray-900"}`}>
              Contact Us
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className={`mt-0.5 p-2 rounded-lg transition-all duration-300 ${isDark ? "bg-[#232f3e] text-orange-500 group-hover:bg-orange-500 group-hover:text-white" : "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"}`}>
                  <FiMapPin size={16} />
                </div>
                <div>
                  <h4 className={`text-[13px] font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>Find Us</h4>
                  <p className={`text-[12px] mt-0.5 leading-relaxed ${isDark ? "text-gray-400" : "text-gray-500"}`}>123 Fusion Street, Tech City<br />Mumbai, IN 400001</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className={`mt-0.5 p-2 rounded-lg transition-all duration-300 ${isDark ? "bg-[#232f3e] text-orange-500 group-hover:bg-orange-500 group-hover:text-white" : "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white"}`}>
                  <FiPhone size={16} />
                </div>
                <div>
                  <h4 className={`text-[13px] font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>Call Us</h4>
                  <p className={`text-[12px] mt-0.5 font-medium transition-colors ${isDark ? "text-gray-400 group-hover:text-orange-400" : "text-gray-500 group-hover:text-orange-600"}`}>+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer">
                <div className={`mt-0.5 p-2 rounded-lg transition-all duration-300 ${isDark ? "bg-[#232f3e] text-orange-500 group-hover:bg-orange-500 group-hover:text-white" : "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"}`}>
                  <FiMail size={16} />
                </div>
                <div>
                  <h4 className={`text-[13px] font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>Email Us</h4>
                  <p className={`text-[12px] mt-0.5 font-medium transition-colors ${isDark ? "text-gray-400 group-hover:text-orange-400" : "text-gray-500 group-hover:text-orange-600"}`}>support@storefusion.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Payments */}
      <div className={`border-t relative ${isDark ? "border-gray-800 bg-[#0d1117]" : "border-gray-200 bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Copyright */}
          <p className={`text-[12px] font-medium ${isDark ? "text-gray-500" : "text-gray-500"} text-center md:text-left`}>
            &copy; {new Date().getFullYear()} <span className={`font-black tracking-tight ${isDark ? "text-gray-300" : "text-gray-800"}`}>Store<span className="text-orange-500">Fusion</span></span>. All Rights Reserved. Designed for Excellence.
          </p>

          {/* Colored Payment Icons with Scale Hover Magic */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className={`p-1.5 rounded-md transition-transform duration-300 hover:scale-125 hover:-translate-y-1 ${isDark ? "bg-white" : "bg-gray-50 border border-gray-100 shadow-sm"}`}>
              <FaCcVisa size={28} className="text-[#1434CB]" />
            </div>
            <div className={`p-1.5 rounded-md transition-transform duration-300 hover:scale-125 hover:-translate-y-1 ${isDark ? "bg-white" : "bg-gray-50 border border-gray-100 shadow-sm"}`}>
              <FaCcMastercard size={28} className="text-[#EB001B]" />
            </div>
            <div className={`p-1.5 rounded-md transition-transform duration-300 hover:scale-125 hover:-translate-y-1 ${isDark ? "bg-white" : "bg-gray-50 border border-gray-100 shadow-sm"}`}>
              <FaCcPaypal size={28} className="text-[#00457C]" />
            </div>
            <div className={`p-1.5 rounded-md transition-transform duration-300 hover:scale-125 hover:-translate-y-1 ${isDark ? "bg-white" : "bg-gray-50 border border-gray-100 shadow-sm"}`}>
              <FaCcStripe size={28} className="text-[#635BFF]" />
            </div>
            <div className={`p-1.5 rounded-md transition-transform duration-300 hover:scale-125 hover:-translate-y-1 ${isDark ? "bg-white" : "bg-gray-50 border border-gray-100 shadow-sm"}`}>
              <FaCcApplePay size={28} className="text-[#000000]" />
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;