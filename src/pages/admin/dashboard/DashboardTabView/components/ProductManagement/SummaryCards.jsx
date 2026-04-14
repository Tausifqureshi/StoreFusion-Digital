import React from 'react';
import { FaBox, FaChartLine, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

function SummaryCards({ isDark, product, filteredAndSortedProducts }) {
  // 👉 total products array ki length se nikal rahe hain
  const totalProducts = product.length;

  // 👉 active products filter kar rahe hain (jin products ka stock 0 se bada hai wo active hain)
  const activeProducts = product.filter(p => Number(p.stock) > 0).length;
  
  // 👉 total website revenue sum kar rahe hain
  const revenue = product.reduce((acc, p) => {
    // 👉 price ke andar koi string character (comma, currency symbol) ho toh use strict regex se remove karke sirf number rakhein (NaN error fix)
    const rawPrice = String(p.price || "0").replace(/[^0-9.-]+/g, "");
    // 👉 total (acc) value me current price add karein
    return acc + Number(rawPrice);
  }, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#f0f7ff] text-[#1e40af]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Total Products</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-blue-900'}`}>{totalProducts}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 shrink-0">
          <FaBox />
        </div>
      </div>

      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#f0fdf4] text-[#166534]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Active Products</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-green-900'}`}>{activeProducts}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-500 text-white shadow-lg shadow-green-500/30 shrink-0">
          <FaChartLine />
        </div>
      </div>

      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#faf5ff] text-[#6b21a8]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Filtered Results</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-purple-900'}`}>{filteredAndSortedProducts.length}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/30 shrink-0">
          <FaShoppingCart />
        </div>
      </div>

      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#fff7ed] text-[#9a3412]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Est. Revenue</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-orange-900'}`}>
            ₹{(revenue / 1000).toFixed(1)}k
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 shrink-0">
          <FaDollarSign />
        </div>
      </div>
    </div>
  );
};

// 👉 React.memo: Ensure product summary cards only re-render when base data changes
SummaryCards.displayName = 'SummaryCards';
export default React.memo(SummaryCards);
