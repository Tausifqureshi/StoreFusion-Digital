import { useSelector } from "react-redux";
import { useMemo } from "react";

/**
 * useProducts Hook: Feature-scoped hook for accessing products.
 * Provides filtered results and normalized data without triggering global rerenders.
 */
export const useProducts = (filterFn = null) => {
  const products = useSelector((state) => state.products.items);
  const productsLoading = useSelector((state) => state.products.loading);
  const productsError = useSelector((state) => state.products.error);

  const filteredProducts = useMemo(() => {
    if (!filterFn) return products;
    return products.filter(filterFn);
  }, [products, filterFn]);


  return {
    products,
    filteredProducts,
    productsLoading,
    productsError,
  };
};

export default useProducts;
