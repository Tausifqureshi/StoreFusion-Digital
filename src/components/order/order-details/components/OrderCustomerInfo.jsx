import React from 'react';
import { MdPerson, MdPhone, MdLocationOn, MdInfoOutline } from "react-icons/md";

function OrderCustomerInfo({ user, addressInfo, order, isDark, cancellingId, handleCancelOrder }) {
  return (
    <div className="space-y-6">
      <div className={`rounded-[30px] p-6 md:p-8 border h-full flex flex-col justify-between ${isDark ? "bg-[#131921] border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className={`text-[11px] font-black uppercase tracking-widest border-b pb-3 flex items-center gap-2 ${isDark ? "border-gray-800 text-blue-400" : "border-gray-200 text-blue-600"}`}>
              <MdPerson size={18} /> Customer Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-[9px] font-black text-gray-400 uppercase">Full Name</p><p className={`text-xs font-bold uppercase mt-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}>{user?.fullName}</p></div>
              <div><p className="text-[9px] font-black text-gray-400 uppercase">Phone</p><p className={`text-xs font-bold uppercase mt-1 flex items-center gap-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}><MdPhone size={12} className="text-blue-600" /> {addressInfo?.phoneNumber || "N/A"}</p></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className={`text-[11px] font-black uppercase tracking-widest border-b pb-3 flex items-center gap-2 ${isDark ? "border-gray-800 text-orange-400" : "border-gray-200 text-orange-500"}`}>
              <MdLocationOn size={18} /> Shipping Info
            </h3>
            <div className={`p-6 rounded-[25px] border ${isDark ? "bg-[#1e293b] border-gray-700" : "bg-white border-gray-200 shadow-sm"}`}>
              <p className="text-[10px] font-black uppercase text-blue-500 mb-1.5">{addressInfo?.name || "Recipient"}</p>
              <p className="text-[11px] font-bold uppercase tracking-tight leading-relaxed">{addressInfo?.address}<br />{addressInfo?.pincode}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700/30 flex flex-row justify-between gap-4">
          {!["cancelled", "delivered", "returned", "refunded"].includes(order.status?.toLowerCase()) && (
            <button
              disabled={cancellingId === order.id}
              onClick={() => handleCancelOrder(order.id)}
              className="flex-1 py-3 px-4 rounded-xl border-2 border-red-500 text-red-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center"
            >
              {cancellingId === order.id ? "Processing..." : "Cancel Order"}
            </button>
          )}

          <button className="flex-1 py-3 px-4 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg active:scale-95">
            <MdInfoOutline size={16} /> Need Help?
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(OrderCustomerInfo);
