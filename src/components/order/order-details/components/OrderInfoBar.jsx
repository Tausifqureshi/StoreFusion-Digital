import React from 'react';
import { FiCalendar, FiHash } from "react-icons/fi";
import OrderStatusBadge from "../../status/OrderStatusBadge";

function OrderInfoBar({ order, totalPrice, isDark }) {
  return (
    <div className={`px-8 py-5 flex flex-wrap items-center justify-between gap-4 ${isDark ? "bg-[#131921]" : "bg-gray-50/80"}`}>
      <div className="flex flex-wrap gap-8">
        <div className="flex items-center gap-2">
          <FiCalendar className="text-blue-600" />
          <div>
            <p className="text-[8px] font-black text-gray-400 uppercase">Booking Date</p>
            <p className={`text-[11px] font-bold uppercase ${isDark ? "text-gray-200" : "text-gray-900"}`}>{order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiHash className="text-orange-500" />
          <div>
            <p className="text-[8px] font-black text-gray-400 uppercase">Order ID</p>
            <p className={`text-[11px] font-bold uppercase tracking-tight ${isDark ? "text-blue-400" : "text-blue-600"}`}>{order.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l pl-8 border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-[8px] font-black text-gray-400 uppercase">Grand Total</p>
            <p className={`text-[13px] font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>₹ {totalPrice}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 border-l pl-8 border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-[8px] font-black text-gray-400 uppercase">Payment Status</p>
            {order.paymentId === "COD" ? (
              <p className={`text-[11px] font-bold uppercase tracking-tight ${isDark ? "text-orange-400" : "text-orange-600"}`}>Cash on Delivery</p>
            ) : (
              <p className="text-[11px] font-bold uppercase tracking-tight text-green-500 flex items-center gap-1">Verified <span className="text-xs">✅</span></p>
            )}
          </div>
        </div>
      </div>
      <OrderStatusBadge status={order.status || "placed"} isDark={isDark} />
    </div>
  );
}

export default React.memo(OrderInfoBar);
