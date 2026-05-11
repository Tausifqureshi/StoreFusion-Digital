import { FilterContext, ThemeContext } from '../../context/AllContext';
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import useProducts from "../../features/products/useProducts";
import Filter from "../../components/filter/Filter";
// ScrollToTopButton removed as it is globally handled
import ProductSkeleton from "../../components/loader/ProductSkeleton";
import LoaderSpinner from "../../components/loader/LoaderSpinner";
import SingleProductCard from "../../components/productCard/SingleProductCard";

// ✅ ALL PRODUCTS VIEW: Saare products, filters aur pagination yahan locked hain
const AllProductsView = React.memo(function AllProductsView({
  mode, products, productsLoading,
  searchkey, filterType, filterPrice, sortPrice, filterColor, filterSize,
  currentPage, setCurrentPage, expandedId, setExpandedId, productsRef
}) {

  const productsPerPage = 8;
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // Trigger loading spinner when filters or page changes
  useEffect(() => {
    setIsFilterLoading(true);
    const timer = setTimeout(() => setIsFilterLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchkey, filterType, filterPrice, sortPrice, filterColor, filterSize, currentPage]);

  // 👉 Master Filter Logic (useMemo pattern with clean chain)
  const filteredProducts = useMemo(() => {
    return products
      // 1. Search Filter
      .filter((p) => searchkey.trim() === "" || p.title.toLowerCase().includes(searchkey.toLowerCase()))

      // 2. Category Multi-select Filter
      .filter((p) => {
        if (filterType.length === 0) return true;
        const itemCat = p.category?.trim().toLowerCase();
        return filterType.some(t => t.trim().toLowerCase() === itemCat);
      })

      // 3. Price Range Filter
      .filter((p) => {
        if (!filterPrice || filterPrice.length !== 2) return true;
        const [minPrice, maxPrice] = filterPrice;
        return p.price >= minPrice && p.price <= maxPrice;
      })

      // 4. Color Multi-select Filter
      .filter((p) => {
        if (filterColor.length === 0) return true;
        const itemColor = (p.color || "N/A").trim().toLowerCase();
        return filterColor.some(c => c.trim().toLowerCase() === itemColor);
      })

      // 5. Size Multi-select Filter
      .filter((p) => {
        if (filterSize.length === 0) return true;
        const itemSize = (p.size || "N/A").trim().toUpperCase();
        return filterSize.some(s => s.trim().toUpperCase() === itemSize);
      })

      // 6. Sort Logic
      .sort((a, b) => {
        if (sortPrice === "low-to-high") return a.price - b.price;
        if (sortPrice === "high-to-low") return b.price - a.price;
        return 0;
      });
  }, [products, searchkey, filterType, filterPrice, sortPrice, filterColor, filterSize]);


  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchkey, filterType, filterPrice, sortPrice, filterColor, filterSize]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="text-gray-600 body-font w-full pt-4 pb-12">
      <div className="w-full">
        {productsLoading ? (
          <ProductSkeleton />
        ) : (
          <>
            <div ref={productsRef} className="lg:w-1/2 w-full mb-8 mt-4">
              <h1 className={`text-3xl md:text-4xl font-black uppercase tracking-tighter ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                OUR LATEST <span className="text-orange-500">COLLECTION</span>
              </h1>
              <div className="h-1.5 w-24 bg-orange-500 rounded-full transition-all duration-300"></div>
            </div>

            <div className="relative min-h-[400px]">
              {isFilterLoading && (
                <div className={`absolute inset-0 z-10 flex justify-center items-start ${mode === 'dark' ? 'bg-[#1a1f2e]/60' : 'bg-white/60'} backdrop-blur-[2px] transition-all duration-300`}>
                  <LoaderSpinner isDark={mode === 'dark'} label="" />
                </div>
              )}
              <div className={`flex flex-wrap -m-4 transition-opacity duration-300 ${isFilterLoading ? 'opacity-50' : 'opacity-100'}`}>
                {currentProducts.map((item, index) => (
                  <SingleProductCard
                    key={item.id || index}
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
  const { products, productsLoading } = useProducts();
  const { searchkey, filterType, filterPrice, sortPrice, filterColor, filterSize } = useContext(FilterContext);


  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const productsRef = useRef(null);

  useEffect(() => {
    if (productsRef.current) {
      // Jab bhi user page change karega, ye line smoothly product section ke start (top) par le jayegi
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
      <div className="lg:col-span-3 lg:sticky lg:top-32 w-full mt-4">
        <Filter mode={mode} showCategoryFilter={true} />
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-9 w-full">
        <AllProductsView
          mode={mode}
          products={products}
          productsLoading={productsLoading}
          searchkey={searchkey}
          filterPrice={filterPrice}
          filterType={filterType}
          sortPrice={sortPrice}
          filterColor={filterColor}
          filterSize={filterSize}
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
