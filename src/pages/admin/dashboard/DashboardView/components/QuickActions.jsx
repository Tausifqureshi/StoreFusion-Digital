import React from 'react';
import { FaBoxes, FaUsers, FaChartPie, FaChartLine } from 'react-icons/fa';

const QuickActions = ({ isDark, navigate }) => {
  const actions = [
    { title: "Manage Inventory", icon: <FaBoxes size={24} />, bg: "bg-orange-500 hover:bg-orange-600 text-white", shadow: "shadow-orange-500/40", path: null },
    { title: "Manage Users", icon: <FaUsers size={24} />, bg: "bg-green-500 hover:bg-green-600 text-white", shadow: "shadow-green-500/40", path: null },
    { title: "View Reports", icon: <FaChartPie size={24} />, bg: "bg-purple-500 hover:bg-purple-600 text-white", shadow: "shadow-purple-500/40", path: null },
    { title: "Analytics", icon: <FaChartLine size={24} />, bg: "bg-blue-500 hover:bg-blue-600 text-white", shadow: "shadow-blue-500/40", path: null }
  ];

  return (
    <div className={`p-8 rounded-3xl border transition-all flex flex-col justify-center h-full w-full ${isDark ? 'bg-[#1e293b] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      <h3 className={`text-xl font-extrabold mb-6 flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
        <span className="text-orange-500 text-2xl">⚡</span> Quick Actions
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={() => action.path ? navigate(action.path) : null}
            className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${action.bg} ${action.shadow} group cursor-pointer`}
          >
            <div className="mb-3 transition-transform duration-300 group-hover:scale-110">{action.icon}</div>
            <span className="text-sm font-extrabold tracking-wide">{action.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
