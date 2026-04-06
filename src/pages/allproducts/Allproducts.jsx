import { FilterContext, ProductAdminContext, ProductContext, ThemeContext } from '../../context api/AllContext';
import React, { useContext, useEffect, useRef, useState, useMemo } from "react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout";
import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
import ProductSkeleton from "../../components/loader/ProductSkeleton";
import SingleProductCard from "../../components/productCard/SingleProductCard";

// ✅ ALL PRODUCTS VIEW: Saare products, filters aur pagination yahan locked hain
const AllProductsView = React.memo(({
  mode, product, productLoading,
  searchkey, filterType, filterPrice, sortPrice,
  currentPage, setCurrentPage, expandedId, setExpandedId, productsRef
}) => {
  const productsPerPage = 8;

  // 👉 Filtered products calculation (locked inside)
  const filteredProducts = useMemo(() => {
    return product
      .filter((item) =>
        item.title.toLowerCase().includes(searchkey.toLowerCase())
      )
      .filter((item) => {
        if (filterType.length === 0) return true;
        return filterType.includes(item.category);
      })
      .filter((item) => {
        if (filterPrice === "") return true;
        const [minPrice, maxPrice] = filterPrice.split("-").map(Number);
        return item.price >= minPrice && item.price <= maxPrice;
      })
      .sort((a, b) => {
        if (sortPrice === "low-to-high") return a.price - b.price;
        if (sortPrice === "high-to-low") return b.price - a.price;
        return 0;
      });
  }, [product, searchkey, filterType, filterPrice, sortPrice]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
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

            <div className="flex flex-wrap -m-4">
              {currentProducts.map((item, index) => (
                <SingleProductCard
                  key={item.id || index}
                  item={item}
                  isExpanded={expandedId === (item.id || item.title)}
                  setExpandedId={setExpandedId}
                  mode={mode}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8">
                <p className="text-center text-sm text-gray-500 mt-4">
                  Page <span className="font-semibold">{currentPage}</span> of{" "}
                  <span className="font-semibold">{totalPages}</span>
                </p>

                <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow"}`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium transition ${currentPage === i + 1 ? "bg-blue-600 text-white shadow" : "bg-gray-100 hover:bg-gray-200"}`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700 shadow"}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}, (prev, next) => {
  // 🚀 Strict performance comparison
  return (
    prev.mode === next.mode &&
    prev.product.length === next.product.length &&
    prev.productLoading === next.productLoading &&
    prev.searchkey === next.searchkey &&
    prev.filterPrice === next.filterPrice &&
    prev.sortPrice === next.sortPrice &&
    prev.currentPage === next.currentPage &&
    prev.expandedId === next.expandedId &&
    prev.filterType.join(',') === next.filterType.join(',')
  );
});

function Allproducts() {
  const { mode } = useContext(ThemeContext);
  const { product, productLoading } = useContext(ProductContext);
  const { searchkey, filterType, filterPrice, sortPrice } = useContext(FilterContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const productsRef = useRef(null);

  useEffect(() => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpandedId(null);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      {/* 👉 Filters separate taaki scroll button inhein na chede */}
      <Filter mode={mode} />

      <AllProductsView
        mode={mode}
        product={product}
        productLoading={productLoading}
        searchkey={searchkey}
        filterPrice={filterPrice}
        filterType={filterType}
        sortPrice={sortPrice}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        expandedId={expandedId}
        setExpandedId={setExpandedId}
        productsRef={productsRef}
      />

      <ScrollToTopButoon mode={mode} />
    </Layout>
  );
}

export default Allproducts;
