import { FilterContext, ProductAdminContext, ProductContext, ThemeContext } from '../../context api/AllContext';
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import Filter from "../../components/filter/Filter";
// ScrollToTopButton removed as it is globally handled
import ProductSkeleton from "../../components/loader/ProductSkeleton";
import LoaderSpinner from "../../components/loader/LoaderSpinner";
import SingleProductCard from "../../components/productCard/SingleProductCard";

// ✅ ALL PRODUCTS VIEW: Saare products, filters aur pagination yahan locked hain
const AllProductsView = React.memo(function AllProductsView({
  mode, product, productLoading,
  searchkey, filterType, filterPrice, sortPrice, filterColor,
  currentPage, setCurrentPage, expandedId, setExpandedId, productsRef
}) {
  const productsPerPage = 8;
  const [isFiltering, setIsFiltering] = useState(false);

  // Trigger loading spinner when filters or page changes
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => setIsFiltering(false), 500);
    return () => clearTimeout(timer);
  }, [searchkey, filterType, filterPrice, sortPrice, filterColor, currentPage]);

  // 👉 Filtered products calculation (locked inside)
  const filteredProducts = useMemo(() => {
    return product
      .filter((item) => //Filter By Search
        item.title.toLowerCase().includes(searchkey.toLowerCase())
      )
      .filter((item) => { //Filter By Category
        if (filterType.length === 0) return true;
        const itemCat = item.category?.trim().toLowerCase();
        return filterType.some(t => t.trim().toLowerCase() === itemCat);
      })
      .filter((item) => { //Range Slider Price
        if (!filterPrice || filterPrice.length !== 2) return true;
        const [minPrice, maxPrice] = filterPrice;
        return item.price >= minPrice && item.price <= maxPrice;
      })
      .filter((item) => { //Filter By Color
        if (!filterColor || filterColor.length === 0) return true;
        const itemColor = (item.color || "N/A").trim().toLowerCase();
        return filterColor.some(c => c.trim().toLowerCase() === itemColor);
      })
      .sort((a, b) => { //Sort By Price
        if (sortPrice === "low-to-high") return a.price - b.price;
        if (sortPrice === "high-to-low") return b.price - a.price;
        return 0;
      });
  }, [product, searchkey, filterType, filterPrice, sortPrice, filterColor]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="text-gray-600 body-font w-full">
      <div className="w-full">
        {productLoading ? (
          <ProductSkeleton />
        ) : (
          <>
            <div ref={productsRef} className="lg:w-1/2 w-full mb-6 lg:mb-10">
              <h1 className={`sm:text-3xl text-2xl font-black uppercase tracking-tighter mb-2 ${mode === "dark" ? "text-white" : "text-blue-600"}`}>
                Our Latest <span className="text-orange-500">Collection</span>
              </h1>
              <div className="h-1 w-20 bg-blue-800 rounded transition-all duration-300 ease-in-out hover:bg-blue-600"></div>
            </div>

            <div className="relative min-h-[400px]">
              {isFiltering && (
                <div className={`absolute inset-0 z-10 flex justify-center items-start ${mode === 'dark' ? 'bg-[#111827]/60' : 'bg-white/60'} backdrop-blur-[2px] transition-all duration-300`}>
                  <LoaderSpinner isDark={mode === 'dark'} label="" />
                </div>
              )}
              <div className={`flex flex-wrap -m-4 transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
                {currentProducts.map((item, index) => (
                  <SingleProductCard
                    key={index}
                    item={item}
                    isExpanded={expandedId === (item.id || item.title)}
                    setExpandedId={setExpandedId}
                    mode={mode}
                    colSize="lg:w-1/3"
                  />
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <div className={`mt-10 py-4 border-t ${mode === 'dark' ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center gap-4`}>
                <p className={`text-sm font-medium ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2 md:gap-4">
                  {currentPage > 1 && (
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                      className="text-blue-600 font-bold uppercase tracking-wider text-xs md:text-sm hover:underline px-2"
                    >
                      Previous
                    </button>
                  )}

                  <div className="flex items-center gap-1 md:gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition-colors ${currentPage === i + 1
                          ? "bg-blue-600 text-white"
                          : `${mode === 'dark' ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'}`
                          }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  {currentPage < totalPages && (
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                      className="text-blue-600 font-bold uppercase tracking-wider text-xs md:text-sm hover:underline px-2"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
});

const Allproducts = React.memo(function Allproducts() {
  const { mode } = useContext(ThemeContext);
  const { product, productLoading } = useContext(ProductContext);
  const { searchkey, filterType, filterPrice, sortPrice, filterColor } = useContext(FilterContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const productsRef = useRef(null);

  useEffect(() => {
    if (productsRef.current) {
      //  Yahan DOM ko order diya ja raha hai ke is box ke bilkul start mein scroll karke chale jao
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpandedId(null); // jaise hi user page change kar re ga to open wala mode close ho jae ga
  }, [currentPage]); // Jaise hi user page change karega (currentPage badlega), ye trigger hoga

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 mt-8 lg:mt-24 mb-16 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Filter */}
      <div className="lg:col-span-3 lg:sticky lg:top-24 w-full">
        <Filter mode={mode} showCategoryFilter={true} />
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-9 w-full">
        <AllProductsView
          mode={mode}
          product={product}
          productLoading={productLoading}
          searchkey={searchkey}
          filterPrice={filterPrice}
          filterType={filterType}
          sortPrice={sortPrice}
          filterColor={filterColor}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          productsRef={productsRef}
        />
      </div>
    </div>
  );
});

export default Allproducts;
