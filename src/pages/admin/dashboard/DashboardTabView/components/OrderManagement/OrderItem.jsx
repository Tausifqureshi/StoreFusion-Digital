import React from 'react';
import { FaEllipsisH, FaEye, FaEdit, FaTrash, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import OrderStatusBadge from './OrderStatusBadge';

const OrderItem = ({ isDark, o, i, activeDropdown, setActiveDropdown }) => {
  
  // 👉 Handle text-based invoice generation and download
  const handleDownloadInvoice = () => {
    const invoiceContent = `
=================================
INVOICE - E-COMMERCE STORE
=================================
Order ID: ORD-${String(o.id || o.paymentId || i).slice(0, 5).toUpperCase()}
Date: ${o.date || (o.time ? new Date(o.time.seconds * 1000).toLocaleDateString() : "")}
Customer: ${o.addressInfo?.name || "Customer"}
Email: ${o.email}

---------------------------------
PRODUCTS PURCHASED:
---------------------------------
${o.cartItems?.map(item => `- ${item.title} (x${item.quantity || 1}) - $${Number(item.price || 0).toLocaleString()}`).join('\n') || '- None'}

=================================
TOTAL AMOUNT: $${Number(o.grandTotal || o.totalAmount || o.price || 0).toLocaleString()}
STATUS: ${(o.status || 'PROCESSING').toUpperCase()}
=================================
    `;
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_ORD-${String(o.id || o.paymentId || i).slice(0, 5).toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setActiveDropdown(null);
  };

  return (
    <div className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border hover:-translate-y-1 ${isDark ? 'bg-[#1e293b] border-gray-600 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-gray-500' : 'bg-white border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-xl'}`}>
      
      {/* Left: Avatar & Main Info */}
      <div className="flex items-center gap-4 min-w-[220px]">
        <div className={`w-12 h-12 rounded-full flex shrink-0 items-center justify-center text-lg ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-500'}`}>
          {o.email?.charAt(0).toUpperCase() || 'O'}
        </div>
        <div className="flex flex-col">
          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ORD-{String(o.id || o.paymentId || i).slice(0, 5).toUpperCase()}
          </h3>
          <p className={`text-[13px] ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {o.addressInfo?.name || o.email?.split('@')[0] || "Customer"}
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {o.email}
          </p>
        </div>
      </div>

      {/* Middle Grid: Products, Total, Status, Date */}
      <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-center">
        
        {/* Products Column */}
        <div className="flex flex-col items-center justify-center col-span-2 lg:col-span-1 text-center">
          <span className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Products</span>
          <div className="flex flex-col items-center">
            {o.cartItems && Array.isArray(o.cartItems) && o.cartItems.length > 0 ? (
              o.cartItems.map((item, idx) => (
                <span key={idx} className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.title} x{item.quantity || 1}
                </span>
              ))
            ) : (
              <span className={`text-sm font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No items</span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Total</span>
          <span className={`text-[17px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            ${Number(o.grandTotal || o.totalAmount || o.price || 0).toFixed(0)}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Status</span>
          <OrderStatusBadge status={o.status || 'processing'} isDark={isDark} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className={`text-xs mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Date</span>
          <span className={`text-[13px] font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {o.date || (o.time ? new Date(o.time.seconds * 1000).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year:'numeric'}) : "-")}
          </span>
        </div>

      </div>

      {/* Right: Actions */}
      <div className="relative shrink-0 flex items-center justify-end z-10">
        <button 
          onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
        >
          <FaEllipsisH size={14} />
        </button>
        
        {activeDropdown === i && (
          <div className={`absolute top-[110%] right-0 w-40 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-white border border-gray-100'}`}>
             <Link to="/order" className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
               <FaEye size={14} /> View Details
             </Link>
             <button className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
               <FaEdit size={14} /> Update Status
             </button>
             <button onClick={handleDownloadInvoice} className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-blue-400 hover:bg-gray-800' : 'text-blue-600 hover:bg-blue-50'}`}>
               <FaDownload size={14} /> Download Invoice
             </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default OrderItem;
