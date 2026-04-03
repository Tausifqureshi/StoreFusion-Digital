import React, { useState, useMemo } from 'react';
import { FilterContext } from './AllContext';

export function FilterState({ children }) {
  // Filters
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState([]);
  const [filterPrice, setFilterPrice] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const contextValue = useMemo(() => ({
    searchkey, setSearchkey,
    filterType, setFilterType,
    filterPrice, setFilterPrice,
    sortPrice, setSortPrice,
  }), [searchkey, filterType, filterPrice, sortPrice]);

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
