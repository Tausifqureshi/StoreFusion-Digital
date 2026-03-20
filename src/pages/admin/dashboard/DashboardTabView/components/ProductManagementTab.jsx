import React, { useState } from 'react';
import { FaSearch, FaPlus, FaBox, FaChartLine, FaShoppingCart, FaDollarSign, FaEdit, FaTrash, FaStar, FaEllipsisH } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const SummaryCard = ({ title, value, colorClass, iconBgClass, icon, isDark }) => (
  <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${
    isDark ? `bg-gray-800/50 border border-gray-700` : `${colorClass} shadow-sm`
  }`}>
    <div>
      <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-gray-400' : ''}`}>{title}</h3>
      <p className={`text-3xl font-black ${isDark ? 'text-white' : ''}`}>{value}</p>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${iconBgClass} text-white`}>
      {icon}
    </div>
  </div>
);

const ProductManagementTab = ({ isDark, product, edithandle, deleteProduct }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  // New States for Filters
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Name A-Z");

  // Dynamically extract unique categories from products
  const uniqueCategories = ["All Categories", ...new Set(product.map(p => p.category).filter(Boolean))];

  // Filtering and Sorting Logic
  const filteredProducts = product
    .filter((p) => {
      const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.category?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "All Categories" || p.category === filterCategory;
      
      // Active means stock > 0
      const isActive = Number(p.stock) > 0;
      const matchesStatus = filterStatus === "All Status" || 
                           (filterStatus === "Active" && isActive) || 
                           (filterStatus === "Out of Stock" && !isActive);
                           
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === "Name A-Z") return a.title?.localeCompare(b.title);
      if (sortOrder === "Name Z-A") return b.title?.localeCompare(a.title);
      if (sortOrder === "Price Low to High") return Number(a.price) - Number(b.price);
      if (sortOrder === "Price High to Low") return Number(b.price) - Number(a.price);
      return 0;
    });

  // Derived Stats
  const totalProducts = product.length;
  const activeProducts = product.filter(p => Number(p.stock) > 0).length;
  const totalSales = 34873; 
  const revenue = product.reduce((acc, p) => acc + Number(p.price || 0), 0);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Product Management
          </h1>
          <p className={`text-sm font-bold mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your inventory with advanced tools and analytics
          </p>
        </div>
        <button 
          onClick={() => navigate('/addproduct')}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-95"
        >
          <FaPlus size={14} /> Add Product
        </button>
      </div>

      {/* --- SUMMARY CARDS ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#f0f7ff] text-[#1e40af]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Total Products</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-blue-900'}`}>{totalProducts}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 shrink-0">
            <FaBox />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#f0fdf4] text-[#166534]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Active Products</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-green-900'}`}>{activeProducts}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-500 text-white shadow-lg shadow-green-500/30 shrink-0">
            <FaChartLine />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#faf5ff] text-[#6b21a8]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>Total Value</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-purple-900'}`}>{filteredProducts.length}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/30 shrink-0">
            <FaShoppingCart />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#fff7ed] text-[#9a3412]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Est. Revenue</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-orange-900'}`}>₹{(revenue/1000).toFixed(1)}k</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 shrink-0">
            <FaDollarSign />
          </div>
        </div>
      </div>

      {/* --- SEARCH & FILTER ROW --- */}
      <div className={`p-4 rounded-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8 transition-all ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
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
        
        <div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar gap-3 hide-scrollbar">
          
          {/* Category Dropdown */}
          <div className="relative shrink-0">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-blue-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500/20'}`}
            >
              {uniqueCategories.map((cat, i) => (
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

      {/* --- PRODUCT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => (
            <div key={i} className={`relative rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-[#1e293b] border border-gray-800 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-xl'}`}>
              
              {/* Product Image Box */}
              <div className={`relative w-full h-40 rounded-2xl mb-5 flex items-center justify-center p-4 ${isDark ? 'bg-[#131921]' : 'bg-gray-50'}`}>
                 
                 {/* Status Pill Badge */}
                 {Number(item.stock) === 0 ? (
                   <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full z-10 ${isDark ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-red-100 text-red-600'}`}>Out of Stock</span>
                 ) : (
                   <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full z-10 ${isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-green-100 text-green-600'}`}>Active</span>
                 )}

                 <img src={item.imageUrl} alt={item.title} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform hover:scale-110 duration-500" />
              </div>

              {/* Title & Desc */}
              <h2 className={`font-black text-lg leading-tight line-clamp-1 mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h2>
              <p className={`text-xs font-semibold line-clamp-2 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.description || "High-quality product with amazing features and premium build quality."}
              </p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-black text-green-500 tracking-tighter">₹{item.price}</span>
                <div className="flex items-center gap-1">
                  <span className={`text-sm font-extrabold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>4.8</span>
                  <FaStar className="text-yellow-400 text-sm" />
                </div>
              </div>

              {/* Metrics Row */}
              <div className={`flex items-center justify-between py-3 border-t border-b mb-5 ${isDark ? 'border-gray-800' : 'border-gray-100'}`}>
                 <div className="text-center w-1/2 border-r border-gray-100 dark:border-gray-800">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Stock</p>
                    <p className={`text-sm font-black ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {Number(item.stock) > 0 ? item.stock : <span className="text-red-500">0</span>}
                    </p>
                 </div>
                 <div className="text-center w-1/2">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Sales</p>
                    <p className={`text-sm font-black ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>892</p>
                 </div>
              </div>

              {/* Footer: Category & Actions */}
              <div className="flex items-center justify-between">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  {item.category || "General"}
                </span>

                {/* 3 Dots Ellipsis Menu Simulation */}
                <div className="relative">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'}`}
                  >
                    <FaEllipsisH />
                  </button>
                  
                  {activeDropdown === i && (
                    <div className={`absolute bottom-full right-0 mb-2 w-36 rounded-2xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-white border border-gray-100'}`}>
                       <Link 
                         to="/updateProduct" 
                         onClick={() => edithandle(item)}
                         className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-2 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                       >
                         <FaEdit /> Edit Product
                       </Link>
                       <button 
                         onClick={() => { deleteProduct(item); setActiveDropdown(null); }}
                         className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-2 transition-all ${isDark ? 'text-red-400 hover:bg-gray-800' : 'text-red-500 hover:bg-red-50'}`}
                       >
                         <FaTrash /> Delete
                       </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
               <FaBox className={`text-3xl ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <p className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No products found.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductManagementTab;
