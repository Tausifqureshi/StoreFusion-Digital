import { ProductContext, ThemeContext, FilterContext } from '../../context api/AllContext';
import React, { useContext, useMemo, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
;
;
import {
  FaArrowLeft,
} from "react-icons/fa";
import Testimonial from "../../components/testimonial/Testimonial";
import SingleProductCard from "../../components/productCard/SingleProductCard";
import Filter from "../../components/filter/Filter";
import ProductSkeleton from "../loader/ProductSkeleton";
import LoaderSpinner from "../../components/loader/LoaderSpinner";

function CategoryProducts() {
  const { name } = useParams();
  const { product, productLoading } = useContext(ProductContext);
  const { mode } = useContext(ThemeContext);
  const { filterPrice, sortPrice, filterColor, filterSize, searchkey } = useContext(FilterContext);
  const navigate = useNavigate();
  const isDark = mode === "dark";
  const [expandedId, setExpandedId] = useState(null);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const [searchParams] = useSearchParams();
  const subQuery = searchParams.get("sub");
  const displayTitle = subQuery ? subQuery : name;

  // Extract unique subcategories for the current main category
  const uniqueSubCategories = useMemo(() => {
    const normalizedName = name?.trim().toUpperCase() || "";
    const uniqueSet = new Set(
      (product || [])
        .filter(p => p.category?.trim().toUpperCase() === normalizedName && p.subcategory)
        .map(p => p.subcategory?.trim().toUpperCase())
    );
    return [...uniqueSet];
  }, [product, name]);

  // Reset selected subcategories when the main category changes
  useEffect(() => {
    setSelectedSubcategories([]);
  }, [name]);

  // Memoized state updater function
  const handleSubcategoryToggle = useCallback((sub) => {
    setSelectedSubcategories(prev =>
      prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]
    );
  }, []);

  // Trigger loading spinner when filters or category changes
  useEffect(() => {
    setIsFilterLoading(true);
    const timer = setTimeout(() => setIsFilterLoading(false), 500);
    return () => clearTimeout(timer);
  }, [filterPrice, sortPrice, filterColor, filterSize, searchkey, name, selectedSubcategories]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  const filteredProducts = useMemo(() => {
    return product
      // category wise product ko filter kar rahe hain lekin yaha dynamic ara hai name ka use kar re is me.
      .filter((item) => item.category?.toLowerCase() === name.toLowerCase())

      .filter((item) => {
        // Filter By Search
        if (!searchkey) return true;
        return item.title?.toLowerCase().includes(searchkey.toLowerCase());
      })
      .filter((item) => {
        // Amazon jaisa filter: Agar URL mein ?sub=laptop hai, toh sirf laptop dikhao! Tarika 1: URL ke through
        if (subQuery) {
          return item.subcategory?.toLowerCase() === subQuery.toLowerCase();
        }
        // Filter by Subcategory checkboxes yaha tab show hoga jab user bina url ke aye ga warna show nhi hoga yaha product ko hide show karne ke liye hai yaha check box. 
        if (selectedSubcategories.length === 0) return true;
        return item.subcategory && selectedSubcategories.includes(item.subcategory.trim().toUpperCase());
      })
      .filter((item) => {
        if (!filterPrice || filterPrice.length !== 2) return true;
        const [minPrice, maxPrice] = filterPrice;
        return item.price >= minPrice && item.price <= maxPrice;
      })
      .filter((item) => {
        if (!filterColor || filterColor.length === 0) return true;
        return filterColor.includes(item.color || "N/A");
      })
      .filter((item) => {
        if (!filterSize || filterSize.length === 0) return true;
        return filterSize.includes((item.size || "N/A").trim().toUpperCase());
      })
      .sort((a, b) => {
        if (sortPrice === "low-to-high") return a.price - b.price;
        if (sortPrice === "high-to-low") return b.price - a.price;
        return 0;
      });
  }, [product, name, filterPrice, filterColor, filterSize, sortPrice, selectedSubcategories, searchkey]);

  return (
    <>
      <div
        className={`min-h-screen pt-28 pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 mb-3"
              >
                <FaArrowLeft /> Back to Shopping
              </button>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                {displayTitle} <span className="text-blue-600">Collection</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                Showing {filteredProducts.length} Premium Results
              </p>
            </div>
          </div>

          {/* Layout changes for Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Sidebar Filter (Without Category Checkboxes) */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 w-full flex flex-col gap-6">

              {/*jab bhi user url ke thorw aye ge jaise  searchParams ka use kar Subcategory dehke gi.subCategory se reltive Checkboxes show nhi hoge productInfo page pe veiw all. agar user category se ata hai tab shoga subCategory se reltive checkbox*/}
              {!subQuery && uniqueSubCategories.length > 0 && (
                <div className={`p-5 rounded-[2rem] border ${isDark ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-gray-100 shadow-sm'}`}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-orange-500">
                    Filter by Type
                  </h3>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {uniqueSubCategories.map(sub => (
                      <div
                        key={sub}
                        onClick={() => handleSubcategoryToggle(sub)}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        {/* Custom Checkbox UI */}
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border-2 transition-all ${selectedSubcategories.includes(sub) ? 'bg-orange-500 border-orange-500' : isDark ? 'border-gray-600 group-hover:border-orange-500' : 'border-gray-300 group-hover:border-orange-500'}`}>
                          {selectedSubcategories.includes(sub) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm font-bold truncate ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {sub}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Filter mode={mode} />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-9 w-full">
              {productLoading ? (
                <ProductSkeleton />
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 opacity-50 font-black uppercase tracking-widest">
                  No Products Found in this Category
                </div>
              ) : (
                <div className="relative min-h-[400px]">
                  {isFilterLoading && (
                    <div className={`absolute inset-0 z-10 flex justify-center items-start ${mode === 'dark' ? 'bg-[#111827]/60' : 'bg-white/60'} backdrop-blur-[2px] transition-all duration-300`}>
                      <LoaderSpinner isDark={mode === 'dark'} label="" />
                    </div>
                  )}
                  <div className={`flex flex-wrap -m-4 transition-opacity duration-300 ${isFilterLoading ? 'opacity-50' : 'opacity-100'}`}>
                    {filteredProducts.map((item, index) => (
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
              )}
            </div>
          </div>

          {/* ⭐ TESTIMONIAL SECTION */}
          <section className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black uppercase italic">
                Category <span className="text-blue-600">Feedback</span>
              </h2>
            </div>

            <div className="max-w-5xl mx-auto px-2">
              <Testimonial categoryName={name} mode={mode} />
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

export default React.memo(CategoryProducts);

