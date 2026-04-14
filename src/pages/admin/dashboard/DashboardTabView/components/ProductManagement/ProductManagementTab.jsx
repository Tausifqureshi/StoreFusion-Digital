import React, { useState, useMemo, useContext, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ProductContext, OrderContext, ProductAdminContext, ThemeContext } from '../../../../../../context api/AllContext';
import LoaderSpinner from '../../../../../../components/loader/LoaderSpinner';

// Import subcomponents
import SummaryCards from './SummaryCards';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import ProductPagination from './ProductPagination';

function ProductManagementTab() {
  const navigate = useNavigate();

  // 🚀 CONTEXT ON DEMAND: Each tab now handles its own data
  const { mode } = useContext(ThemeContext);
  const { product, productLoading } = useContext(ProductContext);
  const { order } = useContext(OrderContext);
  const { edithandle, deleteProduct } = useContext(ProductAdminContext);

  const isDark = mode === 'dark';

  // State for Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Name A-Z");

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 👉 unique categories extraction
  const availableProductCategories = useMemo(() => {
    return ["All Categories", ...new Set((product || []).map(p => p.category).filter(Boolean))];
  }, [product]);

  // 👉 Sales calculation
  // const productSalesCountMap = useMemo(() => {
  //   if (!order) return {};
  //   return order.reduce((acc, orderItem) => {
  //     if (!Array.isArray(orderItem.cartItems)) return acc;
  //     orderItem.cartItems.forEach(cartItem => {
  //       if (!cartItem.id) return;
  //       const quantity = Number(cartItem.quantity) || 1;
  //       acc[cartItem.id] = (acc[cartItem.id] || 0) + quantity;
  //     });
  //     return acc;
  //   }, {});
  // }, [order]);

  const productSalesCountMap = useMemo(() => {
    const productSalesCountMap = {}
    if (!order) return
    // Main orders par loop chalao
    order.forEach(orderItem => {
      // Safety check: Agar cartItems array nahi hai toh skip karo
      if (!Array.isArray(orderItem.cartItems)) return
      // 3. Har order ke andar ke cartItems par loop chalao
      orderItem.cartItems.forEach(cartItem => {
        if (!cartItem.id) return
        // Quantity ko number mein convert karo (default 1)
        const quantity = Number(cartItem.quantity) || 1
        // Product ID ko key banao aur quantity ko add karo
        productSalesCountMap[cartItem.id] = (productSalesCountMap[cartItem.id] || 0) + quantity
      })
    })
    return productSalesCountMap
  }, [order])

  // 👉 filtering aur sorting combined
  const filteredAndSortedProducts = useMemo(() => {
    if (!product) return [];

    const productsWithSalesData = product.map(p => ({
      ...p,
      sales: productSalesCountMap[p.id] || 0
    }));

    return productsWithSalesData
      .filter((p) => {
        const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = filterCategory === "All Categories" || p.category === filterCategory;
        const isActive = Number(p.stock) > 0;
        const matchesStatus = filterStatus === "All Status" ||
          (filterStatus === "Active" && isActive) ||
          (filterStatus === "Out of Stock" && !isActive);
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOrder === "Name A-Z") return a.title?.localeCompare(b.title || "");
        if (sortOrder === "Name Z-A") return b.title?.localeCompare(a.title || "");
        const priceA = Number(String(a.price || "0").replace(/[^0-9.-]+/g, ""));
        const priceB = Number(String(b.price || "0").replace(/[^0-9.-]+/g, ""));
        if (sortOrder === "Price Low to High") return priceA - priceB;
        if (sortOrder === "Price High to Low") return priceB - priceA;
        return 0;
      });
  }, [product, productSalesCountMap, searchQuery, filterCategory, filterStatus, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const productsOnCurrentPage = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterStatus, sortOrder]);

  // 👉 Stable handlers for ProductGrid memoization
  const memoizedEditHandle = React.useCallback((item) => edithandle(item), [edithandle]);
  const memoizedDeleteProduct = React.useCallback((item) => deleteProduct(item), [deleteProduct]);

  if (productLoading) return <LoaderSpinner isDark={isDark} label="Loading products..." />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Product Management
          </h1>
          <p className={`text-sm font-bold mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your inventory with advanced tools and analytics
          </p>
        </div>
        <button
          onClick={() => navigate('/addproduct')}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-95"
        >
          <FaPlus size={14} /> Add Product
        </button>
      </div>

      <SummaryCards
        isDark={isDark}
        product={product}
        filteredAndSortedProducts={filteredAndSortedProducts}
      />

      <ProductFilters
        isDark={isDark}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        availableProductCategories={availableProductCategories}
      />

      <ProductGrid
        productsOnCurrentPage={productsOnCurrentPage}
        isDark={isDark}
        edithandle={memoizedEditHandle}
        deleteProduct={memoizedDeleteProduct}
      />

      <ProductPagination
        isDark={isDark}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredAndSortedProducts.length}
      />
    </div>
  );
};

ProductManagementTab.displayName = 'ProductManagementTab';
export default React.memo(ProductManagementTab);
