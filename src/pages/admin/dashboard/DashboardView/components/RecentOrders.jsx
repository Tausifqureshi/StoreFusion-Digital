import React from 'react';
import { FaShoppingCart, FaEye, FaBoxOpen } from 'react-icons/fa';
import { useMemo } from 'react';

function RecentOrders({ isDark, orders }) {
  const displayOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    return [...orders]
      .sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt))
      .slice(0, 4);
  }, [orders]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'processing': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-500/10 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'shipped': return 'text-blue-600 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      default: return 'text-green-600 bg-green-100 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-800'; // Match typical complete status for new rows
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all h-full flex flex-col ${isDark ? 'bg-[#1a1f2e] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <FaShoppingCart className="text-orange-500 text-xl" />
          <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Orders
          </h2>
        </div>
        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all border shadow-sm ${isDark ? 'bg-[#1a1f2e] text-gray-300 border-gray-700 hover:bg-gray-800' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>
          <FaEye size={12} /> View All
        </button>
      </div>

      <div className="flex flex-col gap-4 flex-grow overflow-y-auto pr-1 custom-scrollbar">
        {displayOrders.length > 0 ? displayOrders.map((order, i) => (
          <div key={order.id || i} className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${isDark ? 'bg-[#1a1f2e]/50 border-gray-800 hover:bg-[#1a1f2e]' : 'bg-gray-50/50 border-gray-100 hover:border-gray-200 hover:bg-white hover:shadow-sm'}`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
                <FaShoppingCart size={18} />
              </div>
              <div className="max-w-[120px] sm:max-w-full">
                <h3 className={`font-extrabold text-sm truncate ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  {order.addressInfo?.name || order.email || "Store User"}
                </h3>
                <p className={`text-xs font-bold mt-1 truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {order.cartItems?.[0]?.title || "Store Item"} <br className="sm:hidden" />
                  <span className={`text-[10px] sm:text-xs opacity-70 sm:ml-2`}>{order.paymentId || order.id || ("#ORD-" + i)}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className={`font-black text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                ₹{order.grandTotal || order.totalAmount || order.price || 0}
              </span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status || 'Completed')}`}>
                  {order.status || "Completed"}
                </span>
                <span className={`text-[10px] font-bold hidden sm:block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  {order.date || order.createdAt ? new Date(order.date || order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "Just now"}
                </span>
              </div>
            </div>
          </div>
        )) : (
          <div className="flex-grow flex flex-col items-center justify-center opacity-50 space-y-4">
            <FaBoxOpen size={40} className={isDark ? "text-gray-700" : "text-gray-200"} />
            <p className={`text-sm font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>No recent orders found in database.</p>
          </div>
        )}
      </div>
    </div>
  );
};

RecentOrders.displayName = 'RecentOrders';
export default React.memo(RecentOrders);
