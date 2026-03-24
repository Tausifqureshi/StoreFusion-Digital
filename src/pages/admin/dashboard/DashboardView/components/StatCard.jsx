import React from 'react';

const StatCard = ({ title, value, icon, iconBg, iconColor, trend, trendValue, isDark }) => {

  // Extract base color from the original iconBg prop (e.g., "bg-green-100" -> "green")
  const colorMatch = iconBg?.match(/bg-([a-z]+)-/);
  const color = colorMatch ? colorMatch[1] : 'blue';

  const colorStyles = {
    green: "bg-green-500 hover:bg-green-600 shadow-green-500/40 border-green-500",
    pink: "bg-pink-500 hover:bg-pink-600 shadow-pink-500/40 border-pink-500",
    orange: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/40 border-orange-500",
    purple: "bg-purple-500 hover:bg-purple-600 shadow-purple-500/40 border-purple-500",
    blue: "bg-blue-500 hover:bg-blue-600 shadow-blue-500/40 border-blue-500",
  };

  const cardStyle = colorStyles[color] || colorStyles.blue;

  return (
    <div className={`p-6 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${cardStyle}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 flex items-center justify-center rounded-[1rem] text-2xl bg-white/20 text-white shadow-inner`}>
          {icon}
        </div>
        {trendValue && (
          <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${trend === 'up' ? 'bg-white/20' : 'bg-black/20'} text-white`}>
            {trend === 'up' ? '↗' : '↘'} {trendValue}
          </div>
        )}
      </div>
      <div>
        <h3 className={`text-sm font-black uppercase tracking-widest mb-1 text-white/80`}>{title}</h3>
        <h2 className={`text-4xl font-extrabold tracking-tight text-white`}>{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;
