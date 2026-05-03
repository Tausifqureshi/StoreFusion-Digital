import React, { useState, useEffect, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FilterContext, ThemeContext } from '../../context/AllContext';

function Search({ placeholder = "Search StoreFusion...", isMobile = false }) {
  const { mode } = useContext(ThemeContext);
  const { searchkey, setSearchkey } = useContext(FilterContext);
  const isDark = mode === "dark";

  // Live typing text (local state)
  const [typingText, setTypingText] = useState(searchkey);

  // Debounce: 400ms wait karke hi global search update karo (No lag)
  useEffect(() => {
    const delayTimer = setTimeout(() => setSearchkey(typingText), 400);
    return () => clearTimeout(delayTimer);
  }, [typingText, setSearchkey]);

  // Sync: Agar global search clear ho jaye toh box bhi clear kar do
  useEffect(() => {
    if (searchkey === "") setTypingText("");
  }, [searchkey]);

  // Two different class names for mobile and desktop versions based on original implementation
  const desktopClasses = `w-full pl-12 pr-4 py-2.5 rounded-xl border-2 ${isDark
      ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-orange-500"
      : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400"
    }`;

  const mobileClasses = `w-full pl-12 pr-4 py-3 rounded-xl border-2 shadow-md outline-none text-sm font-medium ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"
    }`;

  return (
    <div className="relative flex-1">
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={typingText}
        onChange={(e) => setTypingText(e.target.value)}
        type="text"
        placeholder={placeholder}
        className={isMobile ? mobileClasses : desktopClasses}
      />
    </div>
  );
}

export default React.memo(Search);
