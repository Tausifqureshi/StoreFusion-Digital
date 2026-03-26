import React, { useContext, useState } from "react";
import { MyContext } from "../../../../context api/myContext";
import { FiBox, FiClipboard, FiMessageSquare } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import Testimonial from "../../../../components/testimonial/Testimonial";

// 👉 Performance badhane aur code clean rakhne ke liye naye tabs ko alag alag file me toda gaya hai
import ProductManagementTab from "./components/ProductManagement/ProductManagementTab";
import OrderManagementTab from './components/OrderManagement/OrderManagementTab';
import CustomerManagementTab from "./components/CustomerManagementTab";

function DashboardTab() {
  const { mode, product, edithandle, deleteProduct, order, user } = useContext(MyContext);
  const isDark = mode === 'dark';

  // 👉 Naya Tab System: React-tabs ko hata kar normal state se condition handling
  const [activeTab, setActiveTab] = useState("Products");

  const tabTransitionAnimationProps = useSpring({
    opacity: 1,
    transform: `translateY(0px)`,
    from: { opacity: 0, transform: `translateY(20px)` },
    reset: true,
  });

  const tabs = [
    { 
      id: "Products", 
      lightActive: "bg-orange-600 text-white shadow-inner border-2 border-white/50",
      lightInactive: "bg-orange-500 text-white border-2 border-transparent hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/40",
      darkActive: "bg-orange-600 text-white shadow-inner border-2 border-black/30",
      darkInactive: "bg-orange-500 text-white border-2 border-transparent hover:bg-orange-600 hover:shadow-md hover:shadow-orange-900/60",
      icon: <FiBox size={19} strokeWidth={2.5} className="transition-colors drop-shadow-sm" />, 
      label: "Products" 
    },
    { 
      id: "Orders", 
      lightActive: "bg-blue-600 text-white shadow-inner border-2 border-white/50",
      lightInactive: "bg-blue-500 text-white border-2 border-transparent hover:bg-blue-600 hover:shadow-md hover:shadow-blue-500/40",
      darkActive: "bg-blue-600 text-white shadow-inner border-2 border-black/30",
      darkInactive: "bg-blue-500 text-white border-2 border-transparent hover:bg-blue-600 hover:shadow-md hover:shadow-blue-900/60",
      icon: <FiClipboard size={19} strokeWidth={2.5} className="transition-colors drop-shadow-sm" />, 
      label: "Orders" 
    },
    { 
      id: "Users", 
      lightActive: "bg-green-600 text-white shadow-inner border-2 border-white/50",
      lightInactive: "bg-green-500 text-white border-2 border-transparent hover:bg-green-600 hover:shadow-md hover:shadow-green-500/40",
      darkActive: "bg-green-600 text-white shadow-inner border-2 border-black/30",
      darkInactive: "bg-green-500 text-white border-2 border-transparent hover:bg-green-600 hover:shadow-md hover:shadow-green-900/60",
      icon: <FaUsers size={19} className="transition-colors drop-shadow-sm" />, 
      label: "Users" 
    },
    { 
      id: "Reviews", 
      lightActive: "bg-purple-600 text-white shadow-inner border-2 border-white/50",
      lightInactive: "bg-purple-500 text-white border-2 bozrder-transparent hover:bg-purple-600 hover:shadow-md hover:shadow-purple-500/40",
      darkActive: "bg-purple-600 text-white shadow-inner border-2 border-black/30",
      darkInactive: "bg-purple-500 text-white border-2 border-transparent hover:bg-purple-600 hover:shadow-md hover:shadow-purple-900/60",
      icon: <FiMessageSquare size={19} strokeWidth={2.5} className="transition-colors drop-shadow-sm" />, 
      label: "Reviews" 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">

      {/* 👉 Premium Modern Tab Menu (Proper professional container style) */}
      <div className="mb-8 w-full flex justify-start">
        <div className={`inline-flex overflow-x-auto hide-scrollbar custom-scrollbar items-center gap-2 p-1.5 sm:rounded-2xl rounded-xl transition-all border ${isDark ? 'bg-[#1e293b] border-gray-600 shadow-lg shadow-black/20' : 'bg-white border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)]'}`}>
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group cursor-pointer shrink-0 outline-none flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-300 ${isSelected
                    ? isDark ? tab.darkActive : tab.lightActive
                    : isDark ? tab.darkInactive : tab.lightInactive
                  }`}
              >
                {/* Icon wrapper inherits color directly from button text color automatically */}
                <div className={`flex items-center justify-center transition-all duration-300 ${isSelected ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
                  {tab.icon}
                </div>
                <span className="tracking-wide">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 👉 DYNAMIC TAB RENDERING (Jo active hai sirf wahi module load hoga) */}
      <div className="relative">

        {/* 👉 PRODUCT TAB */}
        {activeTab === "Products" && (
          <animated.div style={tabTransitionAnimationProps}>
            <ProductManagementTab isDark={isDark} product={product} order={order} edithandle={edithandle} deleteProduct={deleteProduct} />
          </animated.div>
        )}

        {/* 👉 ORDER TAB */}
        {activeTab === "Orders" && (
          <animated.div style={tabTransitionAnimationProps}>
            <OrderManagementTab isDark={isDark} order={order} />
          </animated.div>
        )}

        {/* 👉 USER TAB */}
        {activeTab === "Users" && (
          <animated.div style={tabTransitionAnimationProps}>
            <CustomerManagementTab isDark={isDark} user={user} />
          </animated.div>
        )}

        {/* 👉 REVIEWS TAB */}
        {activeTab === "Reviews" && (
          <animated.div style={tabTransitionAnimationProps}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
              <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Customer Feedback
              </h1>
            </div>
            <div className={`p-6 rounded-3xl border transition-all overflow-hidden ${isDark ? "bg-[#1e293b] border-gray-800 shadow-lg" : "bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"}`}>
              <Testimonial isAdmin={true} />
            </div>
          </animated.div>
        )}

      </div>
    </div>
  );
}

export default DashboardTab;
