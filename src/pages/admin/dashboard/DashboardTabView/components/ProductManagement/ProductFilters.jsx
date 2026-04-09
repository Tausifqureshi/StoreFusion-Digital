import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ProductFilters = ({
  isDark,
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder,
  availableProductCategories
}) => {
  return (
    <div className={`p-4 rounded-2xl mb-8 transition-all flex flex-col md:flex-row items-center justify-start gap-4 ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      
      {/* 👉 Search Input Pill */}
      <div className="relative w-full md:max-w-md flex items-center shrink-0">
        <FaSearch className={`absolute left-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm font-semibold outline-none focus:outline-none focus:ring-0 transition-all ${
            isDark 
              ? 'bg-[#1e293b] border border-gray-700 text-white placeholder-gray-500' 
              : 'bg-white border border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
        />
      </div>
      
      {/* 👉 Dropdowns (Aligned Left Next to Search) */}
      <div className="flex w-full md:w-auto overflow-x-auto gap-3 hide-scrollbar shrink-0 pb-2 md:pb-0">
        
        {/* Category Dropdown */}
        <div className="relative shrink-0">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold transition-all outline-none focus:outline-none focus:ring-0 cursor-pointer border ${isDark ? 'bg-[#1e293b] border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
          >
            {availableProductCategories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
          <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
        </div>

        {/* Status Dropdown */}
        <div className="relative shrink-0">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold transition-all outline-none focus:outline-none focus:ring-0 cursor-pointer border ${isDark ? 'bg-[#1e293b] border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
          >
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
          <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
        </div>

        {/* Sorting Dropdown */}
        <div className="relative shrink-0">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`appearance-none pl-4 pr-10 py-2.5 rounded-xl text-sm font-semibold transition-all outline-none focus:outline-none focus:ring-0 cursor-pointer border ${isDark ? 'bg-[#1e293b] border-gray-700 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}
          >
            <option value="Name A-Z">Name A-Z</option>
            <option value="Name Z-A">Name Z-A</option>
            <option value="Price Low to High">Price Low to High</option>
            <option value="Price High to Low">Price High to Low</option>
          </select>
          <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
        </div>

      </div>
    </div>
  );
};

// 👉 React.memo: Absolute performance lock for product filters
export default React.memo(ProductFilters);
