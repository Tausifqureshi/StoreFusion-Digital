import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

function OrderDetailHeader({ navigate, isDark }) {
  return (
    <div className={`mb-10 border-b pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
      <div className="flex flex-col gap-2">
        <button onClick={() => navigate("/order")} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 hover:tracking-widest transition-all w-fit">
          <FaArrowLeft /> BACK TO ORDERS
        </button>
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
          ORDER <span className="text-blue-600">DETAILS</span>
        </h1>
      </div>
    </div>
  );
}

export default React.memo(OrderDetailHeader);
