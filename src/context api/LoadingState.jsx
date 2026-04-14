import React, { useContext, useState, useMemo } from "react";
import { LoadingContext } from "./AllContext";
import { useFetchAppData } from "../useFetchAppData";

// ✅ LoadingContext is now centralized in AllContext.jsx (with displayName set there)

export function LoadingProvider({ children }) {
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
}

LoadingProvider.displayName = 'LoadingProvider';

export const useAppLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    return { cartLoading: false, orderLoading: false };
  }
  return context;
};
