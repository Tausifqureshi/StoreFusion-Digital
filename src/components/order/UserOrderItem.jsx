import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import { FiPackage } from 'react-icons/fi';
import { FaArrowRight, FaEdit } from 'react-icons/fa';

const UserOrderItem = ({ order, isDark, navigate, setUpdatingOrderId, updatingOrderId }) => {
  return (
    <div 
      onClick={() => navigate(`/order-details/${order.id}`)} 
      className={`rounded-[30px] border-2 p-5 md:p-6 transition-all hover:shadow-xl cursor-pointer ${isDark ? "bg-[#1e293b] border-gray-800 shadow-none" : "bg-white border-gray-100 shadow-blue-500/5"}`}
    >
      {/* Top Row: Order ID & Badge */}
      <div className="flex justify-between items-center mb-3">
        <p className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Order Id {order.id}
        </p>
        <OrderStatusBadge status={order.status || "placed"} isDark={isDark} />
      </div>

      {/* Delivery Title */}
      <h3 className={`text-base md:text-lg font-black uppercase mb-4 tracking-tighter ${isDark ? "text-white" : "text-gray-900"}`}>
        {order.status?.toLowerCase() === 'delivered' ? 'Delivered on' : 'Estimated delivery'} <span className="text-blue-600 ml-1">{order.date || new Date().toLocaleDateString('en-GB')}</span>
      </h3>

      {/* Tags / Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1.5 ${isDark ? "bg-[#131921] border border-gray-700 text-gray-300" : "bg-gray-50 border border-gray-200 text-gray-700"}`}>
          <FiPackage className="text-orange-500" /> Open packet delivery <FaArrowRight size={10} className="ml-1 opacity-50" />
        </span>
      </div>

      {/* Bottom Row: Images and Status/Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t pt-5 border-gray-200 dark:border-gray-800">

        {/* Images Logic */}
        <div className="flex gap-3">
          {order.cartItems?.slice(0, 2).map((item, i) => (
            <div key={i} className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl p-2 flex items-center justify-center border transition-all ${isDark ? "bg-[#131921] border-gray-700" : "bg-white border-gray-200 shadow-sm"}`}>
              <img src={item.imageUrl} alt="product" className="max-h-full object-contain" />
            </div>
          ))}
          {order.cartItems?.length > 2 && (
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center text-sm font-black ${isDark ? "bg-[#131921] border-gray-700 text-gray-300" : "bg-gray-50 border-gray-200 text-gray-600 shadow-sm"}`}>
              +{order.cartItems.length - 2}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col items-start md:items-end gap-5 w-full md:w-auto">
          <div className="flex flex-wrap gap-2 w-full justify-start md:justify-end md:mt-auto">
            <button onClick={(e) => { e.stopPropagation(); navigate(`/order-details/${order.id}`); }} className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${isDark ? "bg-[#131921] border border-gray-700 text-white hover:border-gray-500" : "bg-gray-100 text-gray-900 border border-transparent hover:bg-gray-200"}`}>
              View Details
            </button>
            {!["cancelled", "refunded", "returned"].includes(order.status?.toLowerCase()) && (
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setUpdatingOrderId(updatingOrderId !== order.id ? order.id : null); 
                }} 
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 bg-blue-600 text-white hover:bg-blue-700"
              >
                <FaEdit size={12} /> Update status
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserOrderItem);
