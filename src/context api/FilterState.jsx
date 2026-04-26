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

  // // Persist to localStorage whenever state changes
  // useEffect(() => {
  //   localStorage.setItem("searchkey", searchkey);
  //   localStorage.setItem("filterType", JSON.stringify(filterType));
  //   localStorage.setItem("filterPrice", JSON.stringify(filterPrice));
  //   localStorage.setItem("sortPrice", sortPrice);
  //   localStorage.setItem("filterColor", JSON.stringify(filterColor));
  // }, [searchkey, filterType, filterPrice, sortPrice, filterColor]);
  // ✅ Split Effects: Isse CPU par load kam padega
  useEffect(() => { localStorage.setItem("searchkey", searchkey); }, [searchkey]);
  useEffect(() => { localStorage.setItem("filterType", JSON.stringify(filterType)); }, [filterType]);
  useEffect(() => { localStorage.setItem("filterPrice", JSON.stringify(filterPrice)); }, [filterPrice]);
  useEffect(() => { localStorage.setItem("sortPrice", sortPrice); }, [sortPrice]);
  useEffect(() => { localStorage.setItem("filterColor", JSON.stringify(filterColor)); }, [filterColor]);

  const contextValue = useMemo(() => ({
    searchkey, setSearchkey,
    filterType, setFilterType,
    filterPrice, setFilterPrice,
    sortPrice, setSortPrice,
    filterColor, setFilterColor,
  }), [searchkey, filterType, filterPrice, sortPrice, filterColor]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
