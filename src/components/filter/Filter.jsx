import { ProductContext, FilterContext } from '../../context api/AllContext';
import Search from '../search/Search';
import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FiRefreshCw, FiSliders, FiX } from "react-icons/fi";
import { Drawer, IconButton } from "@mui/material";

// ✅ DESKTOP VIEW: Memoized for main layout stability
const DesktopFilter = React.memo(({ isDark, searchkey, filterType, filterPrice, uniqueCategories, toggleCategory, setFilterPrice, resetFilters, isRotating }) => (
  <div className={`hidden lg:flex p-4 rounded-2xl border transition-all duration-300 ${isDark ? "bg-[#232f3e] border-gray-700 shadow-2xl" : "bg-white border-gray-100 shadow-xl shadow-blue-100/40"}`}>
    <div className="flex items-center justify-between w-full gap-4">
      <Search placeholder="Search products..." isMobile={false} />
      <div className="flex items-center gap-3">
        <select
          value=""
          onChange={(e) => e.target.value && toggleCategory(e.target.value)}
          className={`px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${isDark ? "bg-[#131921] text-gray-300 border-gray-600 hover:border-orange-500" : "bg-white border-gray-200 text-gray-600 hover:border-blue-500"}`}
        >
          <option value="">Categories ({filterType.length})</option>
          {uniqueCategories.map((cat, i) => (
            <option key={i} value={cat}>
              {filterType.includes(cat) ? `✓ ${cat.toUpperCase()}` : cat.toUpperCase()}
            </option>
          ))}
        </select>
        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          className={`px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${isDark ? "bg-[#131921] text-gray-300 border-gray-600 hover:border-orange-500" : "bg-white border-gray-200 text-gray-600 hover:border-blue-500"}`}
        >
          <option value="">Price Range</option>
          <option value="0-100">Under ₹100</option>
          <option value="100-500">₹100 - ₹500</option>
          <option value="500-2000">₹500 - ₹2000</option>
          <option value="2000-10000">Above ₹2000</option>
        </select>
        <button
          onClick={resetFilters}
          className={`p-2.5 rounded-lg transition-all shadow-sm ${isDark ? "bg-gray-800 text-red-400 hover:bg-red-900" : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"}`}
        >
          <FiRefreshCw size={18} className={`transition-transform duration-500 ${isRotating ? "rotate-180" : "rotate-0"}`} />
        </button>
      </div>
    </div>
  </div>
));

// ✅ MOBILE VIEW: Handles chips and triggers
const MobileFilter = React.memo(({ isDark, filterType, sortPrice, toggleCategory, setSortPrice, setDrawerOpen }) => (
  <div className="lg:hidden flex flex-col gap-3">
    <div className="relative">
      <Search placeholder="Search StoreFusion..." isMobile={true} />
    </div>
    <div className="flex flex-wrap items-center gap-2 pb-1">
      <button
        onClick={() => setDrawerOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-[#232f3e] border-gray-600 text-white" : "bg-white border-gray-300 text-gray-700 shadow-sm"}`}
      >
        Filters <FiSliders className="text-orange-500" />
      </button>
      {filterType.map((cat) => (
        <div key={cat} className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in duration-300">
          {cat}
          <FiX onClick={() => toggleCategory(cat)} className="cursor-pointer" size={14} />
        </div>
      ))}
      {sortPrice && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in duration-300">
          {sortPrice.replace("-", " ")}
          <FiX onClick={() => setSortPrice("")} className="cursor-pointer" size={14} />
        </div>
      )}
    </div>
  </div>
));

function Filter({ mode }) {
  const { product } = useContext(ProductContext);
  const {
    filterType, setFilterType,
    filterPrice, setFilterPrice,
    sortPrice, setSortPrice,
  } = useContext(FilterContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const location = useLocation();

  const isDark = mode === "dark";
  const marginTopClass = location.pathname === "/" ? "mt-8" : "mt-28";

  // ✅ STABLE CALLBACKS
  const resetFilters = useCallback(() => {
    setIsRotating(true);
    setFilterType([]);
    setFilterPrice("");
    setSortPrice("");
    setTimeout(() => setIsRotating(false), 500);
  }, [setFilterType, setFilterPrice, setSortPrice]);

  const uniqueCategories = useMemo(() => [...new Set(product.map((item) => item.category))], [product]);

  const toggleCategory = useCallback((cat) => {
    setFilterType(prev => prev.includes(cat) ? prev.filter(item => item !== cat) : [...prev, cat]);
  }, [setFilterType]);

  useEffect(() => {
    const resizeListener = () => { if (window.innerWidth >= 1024) setDrawerOpen(false); };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <div className={`container mx-auto px-4 ${marginTopClass} mb-16 transition-all duration-300`}>
      <h2 className={`text-xl font-black italic tracking-tighter mb-4 uppercase ${isDark ? "text-white" : "text-blue-600"}`}>
        Filter <span className="text-orange-500">Products</span>
      </h2>

      <DesktopFilter 
        isDark={isDark} 
        filterType={filterType} 
        filterPrice={filterPrice} 
        uniqueCategories={uniqueCategories} 
        toggleCategory={toggleCategory} 
        setFilterPrice={setFilterPrice} 
        resetFilters={resetFilters} 
        isRotating={isRotating} 
      />

      <MobileFilter 
        isDark={isDark} 
        filterType={filterType} 
        sortPrice={sortPrice} 
        toggleCategory={toggleCategory} 
        setSortPrice={setSortPrice} 
        setDrawerOpen={setDrawerOpen} 
      />

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            className: `rounded-t-[30px] p-6 !transition-all !duration-500 ${isDark ? "!bg-[#131921] !text-white" : "!bg-white !text-gray-900"}`,
            style: { maxHeight: "85vh" },
          }
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black italic tracking-tighter uppercase">Quick <span className="text-orange-500">Filters</span></h2>
          <IconButton onClick={() => setDrawerOpen(false)} className={isDark ? "!text-white" : ""}><FiX size={24} /></IconButton>
        </div>

        <div className="space-y-8 overflow-y-auto pb-6">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Categories</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType([])}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterType.length === 0 ? "bg-orange-500 border-orange-500 text-white shadow-lg" : "border-gray-200"}`}
              >ALL</button>
              {uniqueCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${filterType.includes(cat) ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "border-gray-200"}`}
                >{cat}</button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Sort by Price</p>
            <div className="flex gap-3">
              <button onClick={() => setSortPrice("low-to-high")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "low-to-high" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>LOW TO HIGH</button>
              <button onClick={() => setSortPrice("high-to-low")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "high-to-low" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>HIGH TO LOW</button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800 mt-4">
          <button onClick={resetFilters} className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-gray-800 text-red-400" : "bg-gray-100 text-gray-500"}`}>Clear All</button>
          <button onClick={() => setDrawerOpen(false)} className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black shadow-lg uppercase tracking-widest active:scale-95 transition-all">Apply Filters</button>
        </div>
      </Drawer>
    </div>
  );
}

export default React.memo(Filter);
