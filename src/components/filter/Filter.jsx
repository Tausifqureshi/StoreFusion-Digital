import { ProductContext, FilterContext } from '../../context api/AllContext';
import Search from '../search/Search';
import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { FiRefreshCw, FiSliders, FiX, FiCheck } from "react-icons/fi";
import { Drawer, IconButton, Slider } from "@mui/material";

// ✅ DESKTOP VIEW: Sidebar layout (Vertical)
const DesktopFilter = React.memo(function DesktopFilter({
  isDark, filterType, localPrice, sortPrice, filterColor, filterSize,
  uniqueCategories, uniqueColors, uniqueSizes, maxProductPrice,
  toggleCategory, toggleColor, toggleSize, setLocalPrice, setFilterPrice, setSortPrice, resetFilters, isRotating,
  showCategoryFilter, hasActiveFilters
}) {
  return (
    <div className={`hidden lg:flex flex-col p-6 rounded-2xl border-2 transition-all duration-300 ${isDark ? "bg-[#1a1f2e] border-gray-700 shadow-2xl" : "bg-white border-gray-100 shadow-xl shadow-blue-100/40"} sticky top-28`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-black italic tracking-tighter uppercase ${isDark ? "text-white" : "text-blue-600"}`}>
          Filters
        </h2>
        {hasActiveFilters && (
          <button onClick={resetFilters} className={`p-2 rounded-lg transition-all shadow-sm ${isDark ? "bg-gray-800 text-red-400 hover:bg-red-900" : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"}`} title="Clear Filters">
            <FiRefreshCw size={18} className={`transition-transform duration-500 ${isRotating ? "rotate-180" : "rotate-0"}`} />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div><Search placeholder="Search products..." isMobile={false} /></div>

        {/* Categories Checkboxes */}
        {showCategoryFilter && (
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Categories</p>
            <div className="flex flex-col max-h-40 overflow-y-auto hidden-scrollbar">
              {uniqueCategories.map((cat, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer py-1.5 group">
                  <div className={`relative flex items-center justify-center w-5 h-5 rounded md:rounded-md border ${filterType.includes(cat) ? 'bg-orange-500 border-orange-500 shadow-md shadow-orange-500/20' : isDark ? 'border-gray-700 bg-[#1a1f2e]' : 'border-gray-300 bg-white'} transition-all`}>
                    <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer" checked={filterType.includes(cat)} onChange={() => toggleCategory(cat)} />
                    {filterType.includes(cat) && <FiCheck className="text-white w-3.5 h-3.5" strokeWidth={4} />}
                  </div>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} capitalize transition-colors`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range Slider */}
        <div className="px-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Price Range</p>
          <Slider
            value={localPrice}
            onChange={(e, newValue) => setLocalPrice(newValue)}
            onChangeCommitted={(e, newValue) => setFilterPrice(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={maxProductPrice}
            sx={{ color: '#f97316' }}
          />
          <div className="flex justify-between text-xs font-semibold text-gray-500 mt-2">
            <span>₹{localPrice[0]}</span>
            <span>₹{localPrice[1]}</span>
          </div>
        </div>

        {/* Color Filter */}
        {uniqueColors.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Colors</p>
            <div className="flex flex-wrap gap-2">
              {uniqueColors.map((color, i) => (
                <div key={i} onClick={() => toggleColor(color)} className={`w-8 h-8 rounded-full cursor-pointer border-2 shadow-sm transition-all flex items-center justify-center ${filterColor.includes(color) ? "border-orange-500 scale-110" : "border-gray-300 hover:scale-105"}`} style={{ backgroundColor: color.toLowerCase() }} title={color}>
                  {filterColor.includes(color) && <FiX className={['white', 'yellow', 'light'].some(c => color.toLowerCase().includes(c)) ? 'text-black' : 'text-white'} size={14} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Size Filter */}
        {uniqueSizes.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Sizes</p>
            <div className="flex flex-wrap gap-2">
              {uniqueSizes.map((size, i) => (
                <div key={i} onClick={() => toggleSize(size)} className={`cursor-pointer select-none flex items-center justify-center px-3 py-1.5 rounded-lg border-2 shadow-sm transition-all ${filterSize.includes(size) ? "border-orange-500 bg-orange-50 text-orange-700 font-black scale-105" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 font-bold"}`}>
                  <span className="text-[10px] uppercase">{size}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sort by */}
        <div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Sort by</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSortPrice(sortPrice === "low-to-high" ? "" : "low-to-high")}
              className={`p-3 rounded-xl border-none text-[10px] font-black tracking-wider uppercase transition-all shadow-sm text-white ${sortPrice === "low-to-high"
                ? "bg-blue-800 shadow-inner ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#1a2332] scale-[1.02]"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              PRICE: LOW TO HIGH
            </button>
            <button
              onClick={() => setSortPrice(sortPrice === "high-to-low" ? "" : "high-to-low")}
              className={`p-3 rounded-xl border-none text-[10px] font-black tracking-wider uppercase transition-all shadow-sm text-white ${sortPrice === "high-to-low"
                ? "bg-orange-700 shadow-inner ring-2 ring-orange-500 ring-offset-2 dark:ring-offset-[#1a2332] scale-[1.02]"
                : "bg-orange-500 hover:bg-orange-600"
                }`}
            >
              PRICE: HIGH TO LOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

// ✅ MOBILE VIEW: Handles chips and triggers
const MobileFilter = React.memo(function MobileFilter({ isDark, filterType, filterColor, filterSize, sortPrice, toggleCategory, toggleColor, toggleSize, setSortPrice, setDrawerOpen, showCategoryFilter }) {
  return (
    <div className="lg:hidden flex flex-col gap-3">
      <div className="relative">
        <Search placeholder="Search StoreFusion..." isMobile={true} />
      </div>
      <div className="flex flex-wrap items-center gap-2 pb-1">
        <button onClick={() => setDrawerOpen(true)} className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white" : "bg-white border-gray-300 text-gray-700 shadow-sm"}`}>
          Filters <FiSliders className="text-orange-500" />
        </button>
        {/* Only show category chips if not hidden */}
        {showCategoryFilter && filterType.map((cat) => (
          <div key={cat} className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in duration-300">
            {cat} <FiX onClick={() => toggleCategory(cat)} className="cursor-pointer" size={14} />
          </div>
        ))}
        {filterColor.map((col) => (
          <div key={col} className="flex items-center gap-2 px-3 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in duration-300" style={{ backgroundColor: col.toLowerCase(), color: ['white', 'yellow'].includes(col.toLowerCase()) ? 'black' : 'white', borderColor: 'gray' }}>
            {col} <FiX onClick={() => toggleColor(col)} className="cursor-pointer" size={14} />
          </div>
        ))}
        {filterSize.map((size) => (
          <div key={size} className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 text-white border-2 border-gray-700 text-[10px] font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in duration-300">
            {size} <FiX onClick={() => toggleSize(size)} className="cursor-pointer" size={14} />
          </div>
        ))}
        {sortPrice && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-tighter shadow-sm animate-in fade-in zoom-in duration-300">
            {sortPrice.replace("-", " ")} <FiX onClick={() => setSortPrice("")} className="cursor-pointer" size={14} />
          </div>
        )}
      </div>
    </div>
  );
});

function Filter({ mode, showCategoryFilter = false }) {
  const { product } = useContext(ProductContext);
  const {
    filterType, setFilterType,
    filterPrice, setFilterPrice,
    sortPrice, setSortPrice,
    filterColor, setFilterColor,
    filterSize, setFilterSize
  } = useContext(FilterContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [localPrice, setLocalPrice] = useState(filterPrice);
  const location = useLocation();

  const isDark = mode === "dark";

  // Compute dynamic filter data directly from product database
  const uniqueCategories = useMemo(() => {
    const uniqueSet = new Set((product || []).map(p => p.category?.trim().toUpperCase()).filter(Boolean));
    return [...uniqueSet];
  }, [product]);

  const uniqueColors = useMemo(() => {
    const uniqueSet = new Set((product || []).map(p => p.color?.trim().toUpperCase()).filter(Boolean));
    return [...uniqueSet];
  }, [product]);

  const uniqueSizes = useMemo(() => {
    const uniqueSet = new Set((product || []).map(p => p.size?.trim().toUpperCase()).filter(Boolean));
    // Provide a logical sort for known sizes if desired, otherwise standard sort
    return [...uniqueSet].sort();
  }, [product]);

  const maxProductPrice = useMemo(() => product.length > 0 ? Math.max(...product.map(p => Number(p.price) || 0)) : 100000, [product]);

  // Set default max price on first load if missing
  useEffect(() => {
    if (filterPrice[1] === 100000 && maxProductPrice !== 100000) {
      setFilterPrice([0, maxProductPrice]);
    }
  }, [maxProductPrice]);

  useEffect(() => {
    setLocalPrice(filterPrice);
  }, [filterPrice]);

  // 🚀 Standard Pattern: Reset animation ko stop karo aur cleanup karo
  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => setIsRotating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isRotating]);

  // ✅ STABLE CALLBACKS
  const resetFilters = useCallback(() => {
    setIsRotating(true);
    setFilterType([]);
    setFilterPrice([0, maxProductPrice]);
    setSortPrice("");
    setFilterColor([]);
    setFilterSize([]);
  }, [setFilterType, setFilterPrice, setSortPrice, setFilterColor, setFilterSize, maxProductPrice]);

  const toggleCategory = useCallback((cat) => {
    setFilterType(prev => prev.includes(cat) ? prev.filter(item => item !== cat) : [...prev, cat]);
  }, [setFilterType]);

  const toggleColor = useCallback((col) => {
    setFilterColor(prev => prev.includes(col) ? prev.filter(item => item !== col) : [...prev, col]);
  }, [setFilterColor]);

  const toggleSize = useCallback((size) => {
    setFilterSize(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]);
  }, [setFilterSize]);

  useEffect(() => {
    const resizeListener = () => { if (window.innerWidth >= 1024) setDrawerOpen(false); };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  // ✅ PERFORMANCE: useMemo ka use kiya hai taaki faltu render na ho (useState se double render hota hai)
  const hasActiveFilters = useMemo(() => {
    return filterType.length > 0 || 
           filterColor.length > 0 || 
           filterSize.length > 0 ||
           sortPrice !== "" || 
           localPrice[0] !== 0 || 
           localPrice[1] !== maxProductPrice;
  }, [filterType, filterColor, filterSize, sortPrice, localPrice, maxProductPrice]);

  return (
    <div className="w-full">
      <h2 className={`text-xl font-black italic tracking-tighter mb-4 uppercase ${isDark ? "text-white" : "text-blue-600"} lg:hidden`}>
        Filter <span className="text-orange-500">Products</span>
      </h2>

      <DesktopFilter
        isDark={isDark}
        filterType={filterType}
        localPrice={localPrice}
        sortPrice={sortPrice}
        filterColor={filterColor}
        filterSize={filterSize}
        uniqueCategories={uniqueCategories}
        uniqueColors={uniqueColors}
        uniqueSizes={uniqueSizes}
        maxProductPrice={maxProductPrice}
        toggleCategory={toggleCategory}
        toggleColor={toggleColor}
        toggleSize={toggleSize}
        setLocalPrice={setLocalPrice}
        setFilterPrice={setFilterPrice}
        setSortPrice={setSortPrice}
        resetFilters={resetFilters}
        isRotating={isRotating}
        showCategoryFilter={showCategoryFilter}
        hasActiveFilters={hasActiveFilters}
      />

      <MobileFilter
        isDark={isDark}
        filterType={filterType}
        filterColor={filterColor}
        filterSize={filterSize}
        sortPrice={sortPrice}
        toggleCategory={toggleCategory}
        toggleColor={toggleColor}
        toggleSize={toggleSize}
        setSortPrice={setSortPrice}
        setDrawerOpen={setDrawerOpen}
        showCategoryFilter={showCategoryFilter}
      />

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            className: `rounded-t-[30px] p-6 !transition-all !duration-500 ${isDark ? "!bg-[#1a1f2e] !text-white" : "!bg-white !text-gray-900"}`,
            style: { maxHeight: "85vh" },
          }
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black italic tracking-tighter uppercase">Quick <span className="text-orange-500">Filters</span></h2>
          <IconButton onClick={() => setDrawerOpen(false)} className={isDark ? "!text-white" : ""}><FiX size={24} /></IconButton>
        </div>

        <div className="space-y-8 overflow-y-auto pb-6 hidden-scrollbar">
          {/* Mobile Checkboxes Categories */}
          {showCategoryFilter && (
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Categories</p>
              <div className="flex flex-col max-h-40 overflow-y-auto hidden-scrollbar">
                {uniqueCategories.map((cat, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer py-2 group">
                    <div className={`relative flex items-center justify-center w-5 h-5 rounded md:rounded-md border ${filterType.includes(cat) ? 'bg-orange-500 border-orange-500 shadow-md shadow-orange-500/20' : isDark ? 'border-gray-700 bg-[#1a1f2e]' : 'border-gray-300 bg-white'} transition-all`}>
                      <input type="checkbox" className="absolute opacity-0 w-full h-full cursor-pointer" checked={filterType.includes(cat)} onChange={() => toggleCategory(cat)} />
                      {filterType.includes(cat) && <FiCheck className="text-white w-3.5 h-3.5" strokeWidth={4} />}
                    </div>
                    <span className={`text-sm font-medium ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'} capitalize transition-colors`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Slider */}
          <div className="px-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Price Range</p>
            <Slider value={localPrice} onChange={(e, newValue) => setLocalPrice(newValue)} onChangeCommitted={(e, newValue) => setFilterPrice(newValue)} valueLabelDisplay="auto" min={0} max={maxProductPrice} sx={{ color: '#f97316' }} />
            <div className="flex justify-between text-xs font-semibold text-gray-500 mt-2">
              <span>₹{localPrice[0]}</span>
              <span>₹{localPrice[1]}</span>
            </div>
          </div>

          {/* Mobile Colors */}
          {uniqueColors.length > 0 && (
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Colors</p>
              <div className="flex flex-wrap gap-2">
                {uniqueColors.map((color, i) => (
                  <div key={i} onClick={() => toggleColor(color)} className={`w-8 h-8 rounded-full cursor-pointer border-2 shadow-sm flex items-center justify-center ${filterColor.includes(color) ? "border-orange-500 scale-110" : "border-gray-300"}`} style={{ backgroundColor: color.toLowerCase() }}>
                    {filterColor.includes(color) && <FiX className={['white', 'yellow', 'light'].some(c => color.toLowerCase().includes(c)) ? 'text-black' : 'text-white'} size={14} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile Sizes */}
          {uniqueSizes.length > 0 && (
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Sizes</p>
              <div className="flex flex-wrap gap-2">
                {uniqueSizes.map((size, i) => (
                  <div key={i} onClick={() => toggleSize(size)} className={`cursor-pointer select-none flex items-center justify-center px-4 py-2 rounded-lg border-2 shadow-sm transition-all ${filterSize.includes(size) ? "border-orange-500 bg-orange-50 text-orange-700 font-black scale-105" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600 font-bold"}`}>
                    <span className="text-[10px] uppercase">{size}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sort by Price */}
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Sort by Price</p>
            <div className="flex gap-3">
              <button onClick={() => setSortPrice(sortPrice === "low-to-high" ? "" : "low-to-high")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "low-to-high" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>LOW TO HIGH</button>
              <button onClick={() => setSortPrice(sortPrice === "high-to-low" ? "" : "high-to-low")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "high-to-low" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>HIGH TO LOW</button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800 mt-4">
          {hasActiveFilters && (
            <button onClick={resetFilters} className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-gray-800 text-red-400" : "bg-gray-100 text-gray-500"}`}>Clear All</button>
          )}
          <button onClick={() => setDrawerOpen(false)} className={`${hasActiveFilters ? "flex-[2]" : "w-full"} py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black shadow-lg uppercase tracking-widest active:scale-95 transition-all`}>Apply Filters</button>
        </div>
      </Drawer>
    </div>
  );
}

export default React.memo(Filter);
