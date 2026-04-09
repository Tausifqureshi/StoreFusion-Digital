// import React, { useContext, useState } from "react";
// import { ThemeContext } from '../../../../context api/AllContext';
// import { FiBox, FiClipboard, FiMessageSquare } from "react-icons/fi";
// import { FaUsers } from "react-icons/fa";
// import Testimonial from "../../../../components/testimonial/Testimonial";

// // ✅ ISOLATED TAB MENU: Prevents button map from re-creating Context Consumers in DevTools
// const TabMenu = React.memo(({ tabs, activeTab, handleTabChange, isDark }) => {
//   return (
//     <div className="mb-8 w-full flex justify-start">
//       <div className={`inline-flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${isDark ? 'bg-[#1e293b] border-gray-600 shadow-lg' : 'bg-white border-gray-200'}`}>
//         {tabs.map((tab) => {
//           const isSelected = activeTab === tab.id;
//           return (
//             <button
//               key={tab.id}
//               onClick={() => handleTabChange(tab.id)}
//               className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-[14px] transition-all duration-300 ${isSelected
//                 ? isDark ? tab.darkActive : tab.lightActive
//                 : isDark ? tab.darkInactive : tab.lightInactive
//                 }`}
//             >
//               {tab.icon}
//               <span className="tracking-wide">{tab.label}</span>
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// });

// // 👉 Performance subcomponents: Tab panels now independently handle their own data
// import ProductManagementTab from "./components/ProductManagement/ProductManagementTab";
// import OrderManagementTab from './components/OrderManagement/OrderManagementTab';
// import CustomerManagementTab from "./components/CustomerManagementTab";

// function DashboardTab() {
//   const { mode } = useContext(ThemeContext);
//   const isDark = mode === 'dark';

//   // 👉 Tab State (Local to this component, doesn't affect shell)
//   const [activeTab, setActiveTab] = useState("Products");

//   // 👉 Memoized stable handler to prevent tab button re-renders
//   const handleTabChange = React.useCallback((id) => {
//     setActiveTab(id);
//   }, []);

//   const tabs = [
//     {
//       id: "Products",
//       lightActive: "bg-orange-600 text-white border-2 border-white/50",
//       lightInactive: "bg-orange-500 text-white hover:bg-orange-600",
//       darkActive: "bg-orange-600 text-white border-2 border-black/30",
//       darkInactive: "bg-orange-500 text-white hover:bg-orange-600",
//       icon: <FiBox size={19} />,
//       label: "Products"
//     },
//     {
//       id: "Orders",
//       lightActive: "bg-blue-600 text-white border-2 border-white/50",
//       lightInactive: "bg-blue-500 text-white hover:bg-blue-600",
//       darkActive: "bg-blue-600 text-white border-2 border-black/30",
//       darkInactive: "bg-blue-500 text-white hover:bg-blue-600",
//       icon: <FiClipboard size={19} />,
//       label: "Orders"
//     },
//     {
//       id: "Users",
//       lightActive: "bg-green-600 text-white border-2 border-white/50",
//       lightInactive: "bg-green-500 text-white hover:bg-green-600",
//       darkActive: "bg-green-600 text-white border-2 border-black/30",
//       darkInactive: "bg-green-500 text-white hover:bg-green-600",
//       icon: <FaUsers size={19} />,
//       label: "Users"
//     },
//     {
//       id: "Reviews",
//       lightActive: "bg-purple-600 text-white border-2 border-white/50",
//       lightInactive: "bg-purple-500 text-white hover:bg-purple-600",
//       darkActive: "bg-purple-600 text-white border-2 border-black/30",
//       darkInactive: "bg-purple-500 text-white hover:bg-purple-600",
//       icon: <FiMessageSquare size={19} />,
//       label: "Reviews"
//     },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">

//       {/* 👉 Pure UI Tab Menu */}
//       <TabMenu 
//         tabs={tabs} 
//         activeTab={activeTab} 
//         handleTabChange={handleTabChange} 
//         isDark={isDark} 
//       />

//       {/* 👉 DYNAMIC TAB RENDERING (Panels handle their own data) */}
//       <div className="relative">
//         {activeTab === "Products" && <ProductManagementTab />}
//         {activeTab === "Orders" && <OrderManagementTab />}
//         {activeTab === "Users" && <CustomerManagementTab />}
//         {activeTab === "Reviews" && (
//           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 rounded-3xl border transition-all overflow-hidden bg-inherit border-inherit">
//              <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
//               Feedback
//             </h1>
//             <Testimonial isAdmin={true} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default React.memo(DashboardTab);







import React, { useContext, useState, useCallback, useMemo } from "react";
import { ThemeContext } from '../../../../context api/AllContext';
import { FiBox, FiClipboard, FiMessageSquare } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import Testimonial from "../../../../components/testimonial/Testimonial";

// 👉 Subcomponents Imports
import ProductManagementTab from "./components/ProductManagement/ProductManagementTab";
import OrderManagementTab from './components/OrderManagement/OrderManagementTab';
import CustomerManagementTab from "./components/CustomerManagementTab";

// 🔥 FIX 1: TABS data ko component ke bahar rakho. 
// Isse ye memory mein sirf ek baar banega aur TabMenu ko baar-baar render nahi karega.
const TABS_DATA = [
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

// ✅ ISOLATED TAB MENU
const TabMenu = React.memo(function TabMenu({ activeTab, handleTabChange, isDark }) {
  return (
    <div className="mb-8 w-full flex justify-start">
      <div className={`inline-flex items-center gap-2 p-1.5 rounded-2xl border transition-all ${isDark ? 'bg-[#1e293b] border-gray-600 shadow-lg' : 'bg-white border-gray-200'}`}>
        {TABS_DATA.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
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
  );
});



function DashboardTab() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';

  // 👉 Tab State
  const [activeTab, setActiveTab] = useState("Products");

  // 🔥 FIX 2: Handler ko useCallback mein wrap kiya taaki ye har render par naya na bane.
  const handleTabChange = useCallback((id) => {
    setActiveTab(id);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 👉 Pure UI Tab Menu: Now truly isolated */}
      <TabMenu
        activeTab={activeTab}
        handleTabChange={handleTabChange}
        isDark={isDark}
      />

      {/* 👉 DYNAMIC TAB RENDERING */}
      <div className="relative">
        {activeTab === "Products" && <ProductManagementTab />}
        {activeTab === "Orders" && <OrderManagementTab />}
        {activeTab === "Users" && <CustomerManagementTab />}
        {activeTab === "Reviews" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 p-6 rounded-3xl border transition-all overflow-hidden bg-inherit border-inherit">
            <h1 className={`text-3xl md:text-4xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
              Feedback
            </h1>
            <Testimonial isAdmin={true} />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(DashboardTab);
