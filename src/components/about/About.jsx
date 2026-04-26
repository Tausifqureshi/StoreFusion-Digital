import { ThemeContext } from '../../context api/AllContext';
import React, { useContext, useState } from "react";
;
import {
  FaRocket, FaShieldAlt, FaUsers, FaChartLine,
  FaCheckCircle, FaChevronDown, FaStore, FaTruck, FaGlobe
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Link import kiya

function About() {
  const { mode } = useContext(ThemeContext);;
  const isDark = mode === "dark";

  // Accordion State
  const [openIndex, setOpenIndex] = useState(null);

  const stats = [
    { label: "Happy Customers", value: "500K+", icon: <FaUsers className="text-blue-600" /> },
    { label: "Products Sold", value: "1M+", icon: <FaRocket className="text-orange-500" /> },
    { label: "Cities Covered", value: "200+", icon: <FaChartLine className="text-green-500" /> },
  ];

  const accordionData = [
    {
      title: "How we ensure Quality?",
      content: "Every product at StoreFusion undergoes a rigorous 3-step quality check process. From sourcing to final packaging, we ensure that only the best reaches your doorstep.",
      icon: <FaShieldAlt className="text-blue-600" />
    },
    {
      title: "Our Fast Delivery Network",
      content: "We have partnered with top-tier logistics providers to ensure 24-48 hour delivery in major metro cities and 3-5 days delivery across India.",
      icon: <FaTruck className="text-orange-500" />
    },
    {
      title: "Safe & Secure Payments",
      content: "Your data is 100% safe. We use SSL encryption and PCI-DSS compliant payment gateways to handle all your transactions securely.",
      icon: <FaCheckCircle className="text-green-500" />
    }
  ];

  return (
    <>
      <section className={`min-h-screen transition-colors duration-300 pt-20 ${isDark ? "bg-[#131921] text-white" : "bg-white text-gray-900"}`}>

        {/* 🚀 Modern Hero Section */}
        <div className={`relative py-16 md:py-28 px-6 overflow-hidden ${isDark ? "bg-[#1e293b]" : "bg-gray-50/50"}`}>
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
            <span className="bg-blue-600 text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-8 animate-pulse">
              Our Journey
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-none mb-8">
              FUSING <span className="text-blue-600 italic">STYLE</span> WITH <br />
              <span className="text-orange-500">TRUSTED</span> TECHNOLOGY
            </h1>
            <p className="text-sm md:text-lg max-w-3xl mx-auto opacity-70 font-medium leading-relaxed mb-4">
              StoreFusion is India's premier destination for high-quality lifestyle and tech products.
              We don't just sell, we create experiences that matter.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        </div>

        {/* 📊 Stats Section */}
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-[40px] border shadow-2xl transition-all hover:shadow-blue-500/10 ${isDark ? "bg-[#232f3e] border-gray-800 shadow-black/50" : "bg-white border-gray-100 shadow-gray-200/50"}`}>
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col md:flex-row items-center gap-5 justify-center md:justify-start group">
                <div className={`p-5 rounded-[25px] text-2xl transition-transform group-hover:scale-110 ${isDark ? "bg-gray-800" : "bg-gray-50"}`}>
                  {stat.icon}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-black tracking-tight">{stat.value}</h3>
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 💡 Section: Values & Progress */}
        <div className="max-w-7xl mx-auto px-6 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left: Accordion Section */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-10 italic">
                Why Choose <span className="text-blue-600">StoreFusion?</span>
              </h2>

              <div className="space-y-4">
                {accordionData.map((item, index) => (
                  <div
                    key={index}
                    className={`border rounded-3xl overflow-hidden transition-all duration-300 ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-100 bg-gray-50/50 shadow-sm"}`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 text-left outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xl">{item.icon}</span>
                        <span className="font-black text-xs md:text-sm uppercase tracking-widest">{item.title}</span>
                      </div>
                      <FaChevronDown className={`text-xs transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`} />
                    </button>

                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="px-16 pb-6 text-xs md:text-sm opacity-70 leading-relaxed font-medium">
                        {item.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Modern Visuals */}
            <div className="relative">
              <div className={`relative p-3 rounded-[50px] border ${isDark ? "border-gray-800 bg-gray-800/30" : "border-gray-100 bg-gray-100/30"}`}>
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                  alt="Store"
                  loading="lazy"
                  className="rounded-[40px] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
                {/* Floating Badge */}
                <div className="absolute -top-10 -right-4 bg-orange-500 text-white p-8 rounded-full w-28 h-28 flex flex-col items-center justify-center shadow-xl animate-bounce">
                  <p className="text-[10px] font-black uppercase">Growth</p>
                  <p className="text-xl font-black italic">100%</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 🌍 Final CTA Section */}
        <div className={`py-24 text-center px-6 ${isDark ? "bg-[#1e293b]" : "bg-gray-50/50"}`}>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">
            READY TO <span className="text-blue-600">UPGRADE?</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base opacity-70 font-medium leading-relaxed mb-12">
            Join thousands of happy customers who have already experienced the StoreFusion difference.
            Premium quality, delivered right to your door.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/allproducts" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all active:scale-95 shadow-2xl shadow-blue-600/20">
                Shop All Products
              </button>
            </Link>
            <button className={`w-full sm:w-auto px-12 py-5 border-2 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all ${isDark ? "border-gray-700 hover:bg-gray-800" : "border-gray-200 hover:bg-white"}`}>
              Contact Support
            </button>
          </div>
        </div>

      </section>
    </>
  );
}

export default React.memo(About);



