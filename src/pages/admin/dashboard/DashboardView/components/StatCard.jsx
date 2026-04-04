import React from 'react';

const StatCard = ({ title, value, icon, bgClass, shadowClass, trend, trendValue, isDark }) => {

  return (
    <div className={`p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${bgClass} ${isDark ? 'border border-[#1e293b] shadow-md' : `border border-transparent shadow shadow-gray-200/50 hover:shadow-xl ${shadowClass}`}`}>
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

// 👉 React.memo: sirf tab re-render karo jab value, isDark, ya trendValue badlen
// 👉 Navbar scroll ya dusre unrelated state changes pe render NAHI hoga
export default React.memo(StatCard, (prev, next) => {
  if (prev.isDark !== next.isDark) return false;
  if (prev.value !== next.value) return false;
  if (prev.title !== next.title) return false;
  if (prev.trendValue !== next.trendValue) return false;
  return true;
});
