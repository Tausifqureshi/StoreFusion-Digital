import React, { useContext, useState } from "react";
import { ThemeContext } from '../../../../context api/AllContext';
import { FiBox, FiClipboard, FiMessageSquare } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import Testimonial from "../../../../components/testimonial/Testimonial";

// 👉 Performance subcomponents: Tab panels now independently handle their own data
import ProductManagementTab from "./components/ProductManagement/ProductManagementTab";
import OrderManagementTab from './components/OrderManagement/OrderManagementTab';
import CustomerManagementTab from "./components/CustomerManagementTab";

function DashboardTab() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';

  // 👉 Tab State (Local to this component, doesn't affect shell)
  const [activeTab, setActiveTab] = useState("Products");

  // 👉 Animation for tab switching
  const tabTransitionAnimationProps = useSpring({
    opacity: 1,
    transform: `translateY(0px)`,
    from: { opacity: 0, transform: `translateY(10px)` },
    reset: true,
  });

  const tabs = [
    {
      id: "Products",
      lightActive: "bg-orange-600 text-white border-2 border-white/50",
      lightInactive: "bg-orange-500 text-white hover:bg-orange-600",
      darkActive: "bg-orange-600 text-white border-2 border-black/30",
      darkInactive: "bg-orange-500 text-white hover:bg-orange-600",
      icon: <FiBox size={19} />,
      label: "Products"
    },
    {
      id: "Orders",
      lightActive: "bg-blue-600 text-white border-2 border-white/50",
      lightInactive: "bg-blue-500 text-white hover:bg-blue-600",
      darkActive: "bg-blue-600 text-white border-2 border-black/30",
      darkInactive: "bg-blue-500 text-white hover:bg-blue-600",
      icon: <FiClipboard size={19} />,
      label: "Orders"
    },
    {
      id: "Users",
      lightActive: "bg-green-600 text-white border-2 border-white/50",
      lightInactive: "bg-green-500 text-white hover:bg-green-600",
      darkActive: "bg-green-600 text-white border-2 border-black/30",
      darkInactive: "bg-green-500 text-white hover:bg-green-600",
      icon: <FaUsers size={19} />,
      label: "Users"
    },
    {
      id: "Reviews",
      lightActive: "bg-purple-600 text-white border-2 border-white/50",
      lightInactive: "bg-purple-500 text-white hover:bg-purple-600",
      darkActive: "bg-purple-600 text-white border-2 border-black/30",
      darkInactive: "bg-purple-500 text-white hover:bg-purple-600",
      icon: <FiMessageSquare size={19} />,
      label: "Reviews"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">

      {/* 👉 Pure UI Tab Menu */}
      <div className="mb-8 w-full flex justify-start">
        <div className={`inline-flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${isDark ? 'bg-[#1e293b] border-gray-600 shadow-lg' : 'bg-white border-gray-200'}`}>
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-300 ${isSelected
                  ? isDark ? tab.darkActive : tab.lightActive
                  : isDark ? tab.darkInactive : tab.lightInactive
                  }`}
              >
                {tab.icon}
                <span className="tracking-wide">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 👉 DYNAMIC TAB RENDERING (Panels handle their own data) */}
      <div className="relative">
        <animated.div style={tabTransitionAnimationProps}>
          {activeTab === "Products" && <ProductManagementTab />}
          {activeTab === "Orders" && <OrderManagementTab />}
          {activeTab === "Users" && <CustomerManagementTab />}
          {activeTab === "Reviews" && (
            <div className="p-6 rounded-3xl border transition-all overflow-hidden bg-inherit border-inherit">
               <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
                Feedback
              </h1>
              <Testimonial isAdmin={true} />
            </div>
          )}
        </animated.div>
      </div>
    </div>
  );
}

export default React.memo(DashboardTab);
