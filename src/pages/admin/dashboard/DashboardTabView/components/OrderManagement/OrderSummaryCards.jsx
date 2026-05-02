import React from 'react';
import { FaShoppingCart, FaDollarSign, FaCheckCircle, FaBoxOpen } from 'react-icons/fa';

function OrderSummaryCards({ isDark, order }) {
  const totalOrders = order.length;
  const totalRevenue = order.reduce((acc, o) => acc + Number(o.grandTotal || o.totalAmount || o.price || 0), 0);
  
  // 👉 Backend status check karke delivered aur processing orders count kar rahe hain
  const deliveredCount = order.filter(o => o.status?.toLowerCase() === 'delivered').length;
  // 👉 Jo delivered nahi hai usko filhal processing maan rahe hain total count dikhane ke liye
  const processingCount = order.filter(o => o.status?.toLowerCase() !== 'delivered').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1a1f2e] border border-gray-700' : 'bg-[#eff6ff] text-[#1e40af]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Total Orders</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-blue-900'}`}>{totalOrders}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 shrink-0">
          <FaShoppingCart />
        </div>
      </div>

      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1a1f2e] border border-gray-700' : 'bg-[#ecfdf5] text-[#047857]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Total Revenue</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-green-900'}`}>${totalRevenue}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-500 text-white shadow-lg shadow-green-500/30 shrink-0">
          <FaDollarSign />
        </div>
      </div>

      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1a1f2e] border border-gray-700' : 'bg-[#faf5ff] text-[#6d28d9]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Delivered</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-purple-900'}`}>{deliveredCount}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/30 shrink-0">
          <FaCheckCircle />
        </div>
      </div>

      <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1a1f2e] border border-gray-700' : 'bg-[#fff7ed] text-[#c2410c]'}`}>
        <div>
          <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Processing</h3>
          <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-orange-900'}`}>{processingCount}</p>
        </div>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 shrink-0">
          <FaBoxOpen />
        </div>
      </div>
    </div>
  );
};

// 👉 React.memo: Absolute performance lock - preventing re-renders if order data hasn't changed
OrderSummaryCards.displayName = 'OrderSummaryCards';
export default React.memo(OrderSummaryCards);
