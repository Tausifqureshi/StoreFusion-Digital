import React from 'react';
import { FaSearch } from 'react-icons/fa';

const OrderFilters = ({ isDark, searchQuery, setSearchQuery, filterStatus, setFilterStatus, sortOrder, setSortOrder, uniqueStatuses }) => {
  return (
    <div className={`p-4 rounded-2xl mb-8 transition-all flex flex-col md:flex-row items-center justify-start gap-4 ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      
      {/* 👉 Search karne wala Input Pill */}
      <div className="relative w-full md:max-w-md flex items-center shrink-0">
        <FaSearch className={`absolute left-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search orders, customers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold outline-none focus:outline-none focus:ring-0 transition-all ${
            isDark 
              ? 'bg-[#1e293b] border border-gray-700 text-white placeholder-gray-500' 
              : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>
      
      {/* 👉 Dropdown menus (Search ke right side aligned) */}
      <div className="flex w-full md:w-auto overflow-x-auto gap-3 hide-scrollbar shrink-0">
        
        {/* 👉 Status wala Dropdown */}
        <div className="relative shrink-0">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold transition-all outline-none focus:outline-none focus:ring-0 cursor-pointer border ${isDark ? 'bg-[#1e293b] border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
          >
            <option value="All Status">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
        </div>

        {/* 👉 Sorting wala Dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold transition-all outline-none focus:outline-none focus:ring-0 cursor-pointer border ${isDark ? 'bg-[#1e293b] border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
          >
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
            <option value="Amount High to Low">Amount High to Low</option>
          </select>
          <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
        </div>
        
      </div>
    </div>
  );
};

// 👉 React.memo: Ensure filter bar doesn't re-render unless its own logic/state changes
export default React.memo(OrderFilters, (prev, next) => {
  return (
    prev.isDark === next.isDark &&
    prev.searchQuery === next.searchQuery &&
    prev.filterStatus === next.filterStatus &&
    prev.sortOrder === next.sortOrder
  );
});
