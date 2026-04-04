import React, { useState, useEffect, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FilterContext, ThemeContext } from '../../context api/AllContext';

function Search({ placeholder = "Search StoreFusion...", isMobile = false }) {
  const { mode } = useContext(ThemeContext);
  const { searchkey, setSearchkey } = useContext(FilterContext);

  const isDark = mode === "dark";

  // 👉 Local state and debounce for Search to fix global re-render lag
  const [localSearch, setLocalSearch] = useState(searchkey);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchkey(localSearch);
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchkey]);

  // 👉 Keep localSearch in sync if searchkey is cleared externally
  useEffect(() => {
    if (searchkey === "") setLocalSearch("");
  }, [searchkey]);

  // Two different class names for mobile and desktop versions based on original implementation
  const desktopClasses = `w-full pl-12 pr-4 py-2.5 rounded-xl border outline-none text-sm font-medium transition-all ${
    isDark
      ? "bg-[#131921] border-gray-600 text-white focus:border-orange-500"
      : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400"
  }`;

  const mobileClasses = `w-full pl-12 pr-4 py-3 rounded-xl border shadow-md outline-none text-sm font-medium ${
    isDark ? "bg-[#232f3e] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"
  }`;

  return (
    <div className="relative flex-1">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        type="text"
        placeholder={placeholder}
        className={isMobile ? mobileClasses : desktopClasses}
      />
    </div>
  );
}

export default React.memo(Search);
