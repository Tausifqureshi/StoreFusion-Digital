import React from 'react';

const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue, isDark }) => {
  return (
    <div className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl ${isDark ? 'bg-[#1e293b] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]'}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl ${iconBg} ${iconColor} ${isDark ? 'mix-blend-lighten opacity-90' : ''}`}>
          {icon}
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 text-sm font-extrabold px-3 py-1 rounded-full ${trend === 'up' ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
            {trend === 'up' ? '↗' : '↘'} {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className={`text-sm font-black uppercase tracking-widest mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{title}</h3>
        <h2 className={`text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;
