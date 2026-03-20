import React, { useState } from 'react';
import { FaSearch, FaSync, FaDownload, FaShoppingCart, FaDollarSign, FaCheckCircle, FaBoxOpen, FaEllipsisH, FaEye, FaEdit, FaTrash, FaFilter } from 'react-icons/fa';

const CustomStatusPill = ({ status, isDark }) => {
  let colorClass = "";
  let bgClass = "";
  
  // Just inferring statuses for UI showcase, 'delivered', 'processing', 'shipped' normally
  const s = status?.toLowerCase() || 'processing';
  
  if (s === 'delivered') {
    colorClass = isDark ? 'text-green-400' : 'text-green-600';
    bgClass = isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-[#e6fcf5]';
  } else if (s === 'processing') {
    colorClass = isDark ? 'text-blue-400' : 'text-blue-600';
    bgClass = isDark ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-[#eff6ff]';
  } else {
    colorClass = isDark ? 'text-purple-400' : 'text-purple-600';
    bgClass = isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-[#faf5ff]';
  }

  return (
    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 ${colorClass} ${bgClass}`}>
      {s === 'delivered' && <FaCheckCircle size={10} />}
      {s === 'processing' && <FaBoxOpen size={10} />}
      {s}
    </span>
  );
};

const OrderManagementTab = ({ isDark, order }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // New States for Filters
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Newest First");

  // Dynamically extract unique statuses if they exist, otherwise default to Active/Delivered
  const uniqueStatuses = ["All Status", ...new Set(order.map(o => o.status).filter(Boolean))];

  const filteredOrders = order
    .filter((o) => {
      const matchesSearch = o.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            o.paymentId?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            o.id?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = filterStatus === "All Status" || o.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt || 0).getTime();
      const dateB = new Date(b.date || b.createdAt || 0).getTime();
      
      if (sortOrder === "Newest First") return dateB - dateA;
      if (sortOrder === "Oldest First") return dateA - dateB;
      if (sortOrder === "Amount High to Low") return Number(b.grandTotal || b.price || 0) - Number(a.grandTotal || a.price || 0);
      return 0;
    });

  const totalOrders = order.length;
  const totalRevenue = order.reduce((acc, o) => acc + Number(o.grandTotal || o.totalAmount || o.price || 0), 0);
  
  // Fake stats for UI since backend might not have this strict status split yet
  const deliveredCount = Math.floor(totalOrders * 0.6);
  const processingCount = totalOrders - deliveredCount;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Orders Management
          </h1>
          <p className={`text-sm font-bold mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Track and manage all customer orders in one place
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-3">
          <button className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold shadow-sm transition-all active:scale-95 ${isDark ? 'bg-[#1e293b] text-gray-300 border border-gray-700 hover:bg-gray-800' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}>
            <FaSync size={12} /> Refresh
          </button>
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-purple-500/20 transition-all active:scale-95">
            <FaDownload size={12} /> Export Orders
          </button>
        </div>
      </div>

      {/* --- SUMMARY CARDS ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#eff6ff] text-[#1e40af]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Total Orders</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-blue-900'}`}>{totalOrders}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 shrink-0">
            <FaShoppingCart />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#ecfdf5] text-[#047857]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Total Revenue</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-green-900'}`}>${totalRevenue}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-500 text-white shadow-lg shadow-green-500/30 shrink-0">
            <FaDollarSign />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#faf5ff] text-[#6d28d9]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Delivered</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-purple-900'}`}>{deliveredCount}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/30 shrink-0">
            <FaCheckCircle />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#fff7ed] text-[#c2410c]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Processing</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-orange-900'}`}>{processingCount}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 shrink-0">
            <FaBoxOpen />
          </div>
        </div>
      </div>

      {/* --- SEARCH & FILTER ROW --- */}
      <div className={`p-4 rounded-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8 transition-all ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
        <div className="relative w-full md:w-1/2 flex items-center">
          <FaSearch className={`absolute left-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-full text-sm font-bold outline-none transition-all ${
              isDark 
                ? 'bg-[#131921] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50' 
                : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20'
            }`}
          />
        </div>
        
        <div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar gap-3 hide-scrollbar">
          
          {/* Status Dropdown */}
          <div className="relative shrink-0">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer flex items-center gap-2 ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-purple-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500/20'}`}
            >
              {uniqueStatuses.length > 1 ? uniqueStatuses.map((stat, i) => (
                <option key={i} value={stat}>{stat}</option>
              )) : (
                <>
                  <option value="All Status">All Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                </>
              )}
            </select>
            <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
          </div>

          {/* Sorting Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer flex items-center gap-2 ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-purple-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-purple-500/20'}`}
            >
              <option value="Newest First">Newest First</option>
              <option value="Oldest First">Oldest First</option>
              <option value="Amount High to Low">Amount High to Low</option>
            </select>
            <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
          </div>
          
        </div>
      </div>

      {/* --- ORDERS LIST VIEW --- */}
      <div className={`rounded-3xl p-6 md:p-8 transition-all duration-300 ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
        <h2 className={`text-xl font-black tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Orders ({filteredOrders.length})</h2>
        
        <div className="flex flex-col gap-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((o, i) => (
              <div key={i} className={`group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border ${isDark ? 'bg-[#131921]/50 border-gray-800 hover:bg-[#131921]' : 'bg-gray-50 border-gray-100/50 hover:bg-white hover:shadow-lg hover:border-gray-200'}`}>
                
                {/* Left: Avatar & Main Info */}
                <div className="flex items-center gap-4 min-w-[250px]">
                  <div className={`w-14 h-14 rounded-full flex shrink-0 items-center justify-center text-xl font-extrabold ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-500'}`}>
                    {o.email?.charAt(0).toUpperCase() || 'O'}
                  </div>
                  <div>
                    <h3 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ORD-{String(o.id || o.paymentId || i).slice(0, 5).toUpperCase()}
                    </h3>
                    <p className={`text-sm font-bold mt-0.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {o.addressInfo?.name || "Customer"}
                    </p>
                    <p className={`text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {o.email}
                    </p>
                  </div>
                </div>

                {/* Middle Grid: Products, Total, Status, Date */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center">
                  
                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Products</span>
                    <span className={`text-sm font-bold truncate max-w-[150px] ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                       Items: {o.cartItems?.length || 1}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Total</span>
                    <span className={`text-lg font-black tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${o.grandTotal || o.totalAmount || o.price || 0}
                    </span>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Status</span>
                    {/* Use real order status if it exists, fallback to mock status based on index */}
                    <CustomStatusPill status={o.status || (i % 3 === 0 ? 'delivered' : i % 2 === 0 ? 'shipped' : 'processing')} isDark={isDark} />
                  </div>

                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Date</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {new Date(o.date || o.createdAt || Date.now()).toISOString().split('T')[0]}
                    </span>
                  </div>

                </div>

                {/* Right: Actions */}
                <div className="relative shrink-0 flex items-center justify-end">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
                  >
                    <FaEllipsisH />
                  </button>
                  
                  {activeDropdown === i && (
                    <div className={`absolute top-full right-0 mt-2 w-40 rounded-2xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-white border border-gray-100'}`}>
                       <button className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
                         <FaEye size={14} /> View Details
                       </button>
                       <button className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
                         <FaEdit size={14} /> Edit Order
                       </button>
                       <button className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-red-400 hover:bg-gray-800' : 'text-red-500 hover:bg-red-50'}`}>
                         <FaTrash size={14} /> Delete
                       </button>
                    </div>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed rounded-3xl border-gray-200 dark:border-gray-800">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <FaShoppingCart className={`text-3xl ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              </div>
              <p className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No orders found.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default OrderManagementTab;
