import React, { useState, useMemo, useEffect } from 'react';
import { FilterContext } from './AllContext';

export function FilterState({ children }) {
  // Use lazy initialization for state to read from localStorage once
  const [searchkey, setSearchkey] = useState(() => localStorage.getItem("searchkey") || "");

  const [filterType, setFilterType] = useState(() => {
    try { return JSON.parse(localStorage.getItem("filterType")) || []; } catch { return []; }
  });
  
  const [filterPrice, setFilterPrice] = useState(() => {
    try { return JSON.parse(localStorage.getItem("filterPrice")) || [0, 100000]; } catch { return [0, 100000]; }
  });

  const [sortPrice, setSortPrice] = useState(() => localStorage.getItem("sortPrice") || "");

  const [filterColor, setFilterColor] = useState(() => {
    try { return JSON.parse(localStorage.getItem("filterColor")) || []; } catch { return []; }
  });

  const [filterSize, setFilterSize] = useState(() => {
    try { return JSON.parse(localStorage.getItem("filterSize")) || []; } catch { return []; }
  });

  // // Persist to localStorage whenever state changes
  // useEffect(() => {
  //   localStorage.setItem("searchkey", searchkey);
  //   localStorage.setItem("filterType", JSON.stringify(filterType));
  //   localStorage.setItem("filterPrice", JSON.stringify(filterPrice));
  //   localStorage.setItem("sortPrice", sortPrice);
  //   localStorage.setItem("filterColor", JSON.stringify(filterColor));
  // }, [searchkey, filterType, filterPrice, sortPrice, filterColor]);
  // ✅ Clean LocalStorage: Removes the key entirely if the filter is empty to keep storage clean
  useEffect(() => {
    if (searchkey) localStorage.setItem("searchkey", searchkey);
    else localStorage.removeItem("searchkey");
  }, [searchkey]);

  useEffect(() => {
    if (filterType.length > 0) localStorage.setItem("filterType", JSON.stringify(filterType));
    else localStorage.removeItem("filterType");
  }, [filterType]);

  useEffect(() => {
    // Only save if it deviates from the default price range [0, 100000]
    if (filterPrice[0] !== 0 || filterPrice[1] !== 100000) localStorage.setItem("filterPrice", JSON.stringify(filterPrice));
    else localStorage.removeItem("filterPrice");
  }, [filterPrice]);

  useEffect(() => {
    if (sortPrice) localStorage.setItem("sortPrice", sortPrice);
    else localStorage.removeItem("sortPrice");
  }, [sortPrice]);

  useEffect(() => {
    if (filterColor.length > 0) localStorage.setItem("filterColor", JSON.stringify(filterColor));
    else localStorage.removeItem("filterColor");
  }, [filterColor]);

  useEffect(() => {
    if (filterSize.length > 0) localStorage.setItem("filterSize", JSON.stringify(filterSize));
    else localStorage.removeItem("filterSize");
  }, [filterSize]);

  const contextValue = useMemo(() => ({
    searchkey, setSearchkey,
    filterType, setFilterType,
    filterPrice, setFilterPrice,
    sortPrice, setSortPrice,
    filterColor, setFilterColor,
    filterSize, setFilterSize,
  }), [searchkey, filterType, filterPrice, sortPrice, filterColor, filterSize]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
export default FilterState;
