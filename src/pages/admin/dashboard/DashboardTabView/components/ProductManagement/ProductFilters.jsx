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
    <div className={`p-4 rounded-3xl md:rounded-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8 transition-all ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      <div className="relative w-full md:w-1/2 flex items-center">
        <FaSearch className={`absolute left-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-full text-sm font-bold outline-none transition-all ${
            isDark 
              ? 'bg-[#131921] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50' 
              : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20'
          }`}
        />
      </div>
      
      <div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar gap-3 hide-scrollbar pb-2 md:pb-0">
        
        {/* Category Dropdown */}
        <div className="relative shrink-0">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-blue-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/20'}`}
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
            className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-blue-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/20'}`}
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
            className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-blue-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/20'}`}
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

export default ProductFilters;
