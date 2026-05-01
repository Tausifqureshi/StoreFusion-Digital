import React, { useState, useCallback } from 'react';
import { FiPackage } from "react-icons/fi";

function OrderItemsList({ order, isDark, navigate }) {
  const [visibleCount, setVisibleCount] = useState(2);

  const handleSeeMore = useCallback(() => setVisibleCount((prev) => prev + 2), []);
  const handleSeeLess = useCallback(() => setVisibleCount(2), []);

  return (
    <div className="space-y-4">
      <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
        <FiPackage className="text-blue-600" size={18} /> Package Content
      </h3>
      <div className="space-y-4">
        {order.cartItems?.slice(0, visibleCount).map((item, i) => (
          <div key={i} onClick={() => navigate("/productInfo/" + item.id)} className={`flex gap-5 items-center p-5 rounded-[30px] border cursor-pointer transition-all hover:shadow-lg ${isDark ? "bg-[#131921] border-gray-700 hover:border-blue-500/50" : "bg-white border-gray-100 hover:border-blue-200"}`}>
            <div className="w-20 h-20 bg-white rounded-2xl p-2 shrink-0 flex items-center justify-center border border-gray-100">
              <img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async" className="max-h-full object-contain" />
            </div>
            <div className="flex-1">
              <h4 className={`text-sm font-black uppercase line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h4>
              <p className={`font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"} text-sm`}>₹ {item.price}</p>
              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Quantity: {item.quantity || 1}</p>
            </div>
          </div>
        ))}
      </div>

      {order.cartItems?.length > 2 && (
        <div className="flex gap-4 mt-6">
          {visibleCount < order.cartItems.length && (
            <button
              onClick={handleSeeMore}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-[#1e293b] text-white hover:bg-gray-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
            >
              See More
            </button>
          )}
          {visibleCount > 2 && (
            <button
              onClick={handleSeeLess}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-[#131921] border border-gray-700 text-gray-400 hover:text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
            >
              See Less
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(OrderItemsList);
