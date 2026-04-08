import React, { createContext, useContext, useState, useMemo } from "react";
import { useFetchAppData } from "../useFetchAppData";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [cartLoading, setCartLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);

  // Background fetch logic is isolated here
  useFetchAppData(setCartLoading, setOrderLoading);

  const value = useMemo(() => ({ cartLoading, orderLoading }), [cartLoading, orderLoading]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useAppLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    return { cartLoading: false, orderLoading: false }; // Secure fallback
  }
  return context;
};
