import { useSelector } from "react-redux";


/**
 * useProducts Hook: Feature-scoped hook for accessing products.
 * Provides filtered results and normalized data without triggering global rerenders.
 */
export const useProducts = () => {
  const products = useSelector((state) => state.products.items);
  const productsLoading = useSelector((state) => state.products.loading);
  const productsError = useSelector((state) => state.products.error);

  return {
    products,
    productsLoading,
    productsError,
  };
};

export default useProducts;
