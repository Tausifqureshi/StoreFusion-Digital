import React from 'react'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiTruck, FiGift, FiShield, FiClock, FiCreditCard } from 'react-icons/fi';

function Track({ mode }) {
  const isDark = mode === 'dark';

  const tracks = [
    {
      title: "Premium Quality",
      description: "Our products are 100% genuine and made with top tier materials.",
      icon: <FiShoppingBag className="w-8 h-8" />,
      color: "from-orange-500 to-amber-500",
      bgLight: "bg-orange-50",
      bgDark: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      title: "Free & Fast Shipping",
      description: "We ship all over India for FREE. Get your orders delivered at lightning speed.",
      icon: <FiTruck className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Exciting Offers",
      description: "We provide amazing offers, seasonal discounts & special membership perks.",
      icon: <FiGift className="w-8 h-8" />,
      color: "from-orange-500 to-amber-500",
      bgLight: "bg-orange-50",
      bgDark: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      title: "Secure Payments",
      description: "100% secure payment gateways to ensure your data is always safe.",
      icon: <FiShield className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "24/7 Support",
      description: "Our support team is available round the clock to help you out.",
      icon: <FiClock className="w-8 h-8" />,
      color: "from-orange-500 to-amber-500",
      bgLight: "bg-orange-50",
      bgDark: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      title: "Easy Returns",
      description: "Not satisfied? Return it within 7 days for a full refund. No questions asked.",
      icon: <FiCreditCard className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-500/10",
      iconColor: "text-blue-500",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-8 md:py-12 transition-all duration-300 overflow-hidden">
      <div className="container mx-auto px-5">
        <div className={`rounded-3xl p-4 md:p-6 md:px-8 shadow-sm border ${isDark ? 'bg-[#1a1f2e] border-gray-800' : 'bg-white border-gray-100 shadow-blue-900/5'}`}>
          {/* Section Heading */}
          <div className="flex items-center justify-between mb-10 border-l-4 border-orange-500 pl-4">
            <div>
            <h2 className={`text-3xl md:text-4xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Choose <span className="text-orange-500">StoreFusion</span>
            </h2>
            <p className={`text-xs md:text-sm font-bold uppercase tracking-[0.3em] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Top Tier E-Commerce Experience
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tracks.map((feature, index) => (
            <motion.div 
              variants={itemVariants}
              key={index} 
              className={`group relative overflow-hidden rounded-[2rem] p-6 transition-all duration-500 hover:-translate-y-2 border
                ${isDark 
                  ? 'bg-gradient-to-b from-[#1e293b] to-[#131921] border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-orange-500/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]' 
                  : 'bg-gradient-to-br from-white to-orange-50/40 border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:border-orange-200'
                }
              `}
            >
              {/* Decorative Gradient Blob */}
              <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-[0.08] dark:opacity-[0.15] bg-gradient-to-br ${feature.color} group-hover:scale-150 transition-transform duration-700 ease-out blur-2xl`}></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner
                  ${isDark ? feature.bgDark : feature.bgLight} ${feature.iconColor}
                `}>
                  {feature.icon}
                </div>
                <h3 className={`text-lg md:text-xl font-black italic tracking-wide mb-2 uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed text-[14px] font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>

              {/* Bottom decorative line */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-500 ease-out`}></div>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Track);
