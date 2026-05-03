import React, { useState, useMemo, useContext, useEffect, useRef, useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ProductContext, OrderContext, ProductAdminContext, ThemeContext } from '../../../../../../context/AllContext';
import LoaderSpinner from '../../../../../../components/loader/LoaderSpinner';

// Subcomponents ko yahan import kiya hai
import SummaryCards from './SummaryCards';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import ProductPagination from './ProductPagination';

function ProductManagementTab() {
  const navigate = useNavigate();

  // 🚀 Har tab apna data khud handle kar raha hai (Context se)
  const themeContext = useContext(ThemeContext) || {};
  const { mode = "light" } = themeContext;
  
  const productContext = useContext(ProductContext) || {};
  const { product = [], productLoading = false } = productContext;
  
  const orderContext = useContext(OrderContext) || {};
  const { order = [] } = orderContext;
  
  const productAdminContext = useContext(ProductAdminContext) || {};
  const { edithandle = () => {}, deleteProduct = () => {} } = productAdminContext;

  const isDark = mode === 'dark';

  // Filters ke states (SessionStorage me save taaki refresh par ya page change par data na ude)
  const [searchQuery, setSearchQuery] = useState(() => sessionStorage.getItem("pm_search") || "");
  const [filterCategory, setFilterCategory] = useState(() => sessionStorage.getItem("pm_category") || "All Categories");
  const [filterStatus, setFilterStatus] = useState(() => sessionStorage.getItem("pm_status") || "All Status");
  const [sortOrder, setSortOrder] = useState(() => sessionStorage.getItem("pm_sort") || "Name A-Z");

  // Pagination ka state (Kaunse page par hain hum)
  const [currentPage, setCurrentPage] = useState(() => Number(sessionStorage.getItem("pm_page")) || 1);
  const itemsPerPage = 8;

  // Update Product se wapas aane par Filters aur Pagination ko waisa hi rakhne ke liye SessionStorage me save kar rahe hain
  useEffect(() => {
    sessionStorage.setItem("pm_search", searchQuery);
    sessionStorage.setItem("pm_category", filterCategory);
    sessionStorage.setItem("pm_status", filterStatus);
    sessionStorage.setItem("pm_sort", sortOrder);
    sessionStorage.setItem("pm_page", currentPage.toString());
  }, [searchQuery, filterCategory, filterStatus, sortOrder, currentPage]);

  // 👉 Product ki unique categories nikal rahe hain (Duplicates hata kar uppercase me)
  const availableProductCategories = useMemo(() => {
    const uniqueCategories = new Set(
      (product || [])
        .map(p => p.category?.trim().toUpperCase())
        .filter(Boolean)
    );
    return ["All Categories", ...uniqueCategories];
  }, [product]);

  // 👉 Total sales count nikalne ka calculation
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
        // RHS → purani value nikaal(agar nahi hai toh 0)
        // RHS → usme new quantity add kar
        // LHS → updated value wapas store kar
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
        // Search Filter
        const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchQuery.toLowerCase());

        // Category Filter
        const matchesCategory = filterCategory === "All Categories" || 
          p.category?.trim().toLowerCase() === filterCategory?.trim().toLowerCase();

        // Stock Filter
        const isActive = Number(p.stock) > 0;

        // Status Filter
        const matchesStatus = filterStatus === "All Status" ||
          (filterStatus === "Active" && isActive) ||
          (filterStatus === "Out of Stock" && !isActive);
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {  //Sort Filter
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

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) { // Pahli baar page load ho raha hai toh 1 par hi rakho
      isInitialMount.current = false; //ya to false hi rahega mtlb pahli baar load ho chuka hai
      return;
    }
    setCurrentPage(1); // Jab bhi search, filter, status, ya sort change ho toh 1 par le jao
  }, [searchQuery, filterCategory, filterStatus, sortOrder]);

  // Products load hone ke baad scroll ko wapas wahin set karo jahan par chhora tha
  useEffect(() => {
    if (productLoading) return; // Jab tak products load na ho tab tak ruko

    let scrollTimer; // Timer banane ke liye
    const savedScroll = sessionStorage.getItem("pm_scroll"); // Save ki hui purani scroll position nikalo
    if (savedScroll) {
      // Products screen par aane ke baad thik wahi par scroll karo jahan se gaye the
      scrollTimer = setTimeout(() => window.scrollTo({ top: Number(savedScroll), behavior: 'instant' }), 100);
    }

    return () => clearTimeout(scrollTimer); // Faltu timer clear karo taaki error na aaye
  }, [productLoading]);

  // Scroll position ko lagataar track karo aur save karte raho
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("pm_scroll", window.scrollY.toString()); // Jaise jaise scroll ho, number save karte raho
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // Scroll karne par handleScroll chalao
    return () => window.removeEventListener("scroll", handleScroll); // Kaam khatam hone par tracker hata do
  }, []);

  // 👉 ProductGrid ke functions taaki faltu re-renders na ho
  const memoizedEditHandle = useCallback((item) => edithandle(item), [edithandle]);
  const memoizedDeleteProduct = useCallback((item) => deleteProduct(item), [deleteProduct]);

  if (productLoading) return <LoaderSpinner isDark={isDark} label="Loading products..." />;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Upar ka Header Section */}
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
