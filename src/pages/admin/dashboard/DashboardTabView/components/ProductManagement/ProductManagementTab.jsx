import React, { useState, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import subcomponents
import SummaryCards from './SummaryCards';
import ProductFilters from './ProductFilters';
import ProductGrid from './ProductGrid';
import ProductPagination from './ProductPagination';

const ProductManagementTab = ({ isDark, product = [], order = [], edithandle, deleteProduct }) => {
  const navigate = useNavigate();

  // State for Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Name A-Z");

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 👉 saari unique categories filter kar rahe hain taaki dropdown me dikha sakein
  const availableProductCategories = useMemo(() => {
    // 👉 "All Categories" ke saath product array se unique categories nikal kar ek array bana rahe hain
    return ["All Categories", ...new Set(product.map(p => p.category).filter(Boolean))];
  }, [product]);

  // // 👉 Har product ki TOTAL BIKRI (sales) calculate kar rahe hain — saare orders milake
  // const productSalesCountMap = useMemo(() => {

  //   // 👉 khali object jo har product ki bikri store karega — { "product_id": totalSales }
  //   const salesByProductId = {};

  //   // 👉 har ek order pe loop chal raha hai
  //   order.forEach(orderItem => {

  //     // 👉 agar cartItems array nahi hai to is order ko skip karo
  //     if (!Array.isArray(orderItem.cartItems)) return;

  //     // 👉 us order ke har ek product pe loop
  //     orderItem.cartItems.forEach(product => {

  //       // 👉 agar product ki ID nahi hai to skip karo — bina ID ke track nahi kar sakte
  //       if (!product.id) return;

  //       // 👉 quantity nikaalo, agar invalid ho to default 1
  //       const quantity = Number(product.quantity) || 1;

  //       // 👉 product.id DYNAMIC KEY ban raha hai — purani bikri lo (ya 0), usme nayi quantity jodo
  //       salesByProductId[product.id] = //Dynamic Key
  //         (salesByProductId[product.id] || 0) + quantity; //Dynamic Value
  //     });
  //   });

  //   // 👉 final object return — { "abc123": 15, "xyz789": 7 }
  //   return salesByProductId;

  // }, [order]); // 👉 sirf jab order change ho tabhi dobara chalega

  const productSalesCountMap = order.reduce((acc, orderItem) => {
    // agar cartItems array nahi hai to skip
    if (!Array.isArray(orderItem.cartItems)) return acc;

    orderItem.cartItems.forEach(product => {
      if (!product.id) return;
      const quantity = Number(product.quantity) || 1;

      // dynamic key + accumulation
      acc[product.id] = (acc[product.id] || 0) + quantity;
    });

    return acc;
  }, {}); // initial value empty object hai reducer me jo bhi initial value hoti hai o accumulator ban jata hai is me initial value empty object hai tu yaha accumulator ban gaya ab jo bhi value aye gi is obejct me stor hogi same kaam forEach waela upper command hai lekin react me aisa hi use hota jayda.

  // 👉 filtering aur sorting ka combined processing yaha ho raha hai
  const filteredAndSortedProducts = useMemo(() => {
    // 👉 step 1: base products array me real sales data map inject kar rahe hain
    const productsWithSalesData = product.map(p => ({
      ...p,
      sales: productSalesCountMap[p.id] || 0
    }));

    // 👉 step 2: enriched array ko filter aur phir sort karte hain
    return productsWithSalesData
      .filter((p) => {
        // 👉 search query check karte hain product title ya category me
        const matchesSearch = p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchQuery.toLowerCase());

        // 👉 dropdown category check
        const matchesCategory = filterCategory === "All Categories" || p.category === filterCategory;

        // 👉 stock greater than 0 hai toh product active hai
        const isActive = Number(p.stock) > 0;
        const matchesStatus = filterStatus === "All Status" ||
          (filterStatus === "Active" && isActive) ||
          (filterStatus === "Out of Stock" && !isActive);

        // 👉 teeno conditions true honi chahiye product ko grid me dikhane ke liye
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        // 👉 dropdown ki sorting choices handle kar rahe hain
        if (sortOrder === "Name A-Z") return a.title?.localeCompare(b.title || "");
        if (sortOrder === "Name Z-A") return b.title?.localeCompare(a.title || "");

        // 👉 price string se currency symbols aur commas nikal kar float me badal rahe hain
        const priceA = Number(String(a.price || "0").replace(/[^0-9.-]+/g, ""));
        const priceB = Number(String(b.price || "0").replace(/[^0-9.-]+/g, ""));

        // 👉 price low to high ya high to low sort kar rahe hain
        if (sortOrder === "Price Low to High") return priceA - priceB;
        if (sortOrder === "Price High to Low") return priceB - priceA;

        return 0; // 👉 default
      });
  }, [product, productSalesCountMap, searchQuery, filterCategory, filterStatus, sortOrder]);

  // 👉 pagination ka logic - current page ke items calculate karna
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  // 👉 array slice kar rahe hain taaki sirf active page ke exactly selected items grid me bheje jaayein
  const productsOnCurrentPage = filteredAndSortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // If filter changes, reset to page 1
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterCategory, filterStatus, sortOrder]);

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

      {/* Summary Cards */}
      <SummaryCards
        isDark={isDark}
        product={product}
        filteredAndSortedProducts={filteredAndSortedProducts}
      />

      {/* Search & Filters */}
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

      {/* Product Grid */}
      <ProductGrid
        productsOnCurrentPage={productsOnCurrentPage}
        isDark={isDark}
        edithandle={edithandle}
        deleteProduct={deleteProduct}
      />

      {/* Pagination */}
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

export default React.memo(ProductManagementTab);
