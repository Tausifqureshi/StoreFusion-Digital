import { ProductContext, ThemeContext } from '../../context api/AllContext';
import React, { useContext, useMemo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
;
;
import {
  FaArrowLeft,
} from "react-icons/fa";
import Testimonial from "../../components/testimonial/Testimonial";
import SingleProductCard from "../../components/productCard/SingleProductCard";
import ProductSkeleton from "../loader/ProductSkeleton";

function CategoryProducts() {
  const { name } = useParams();
  const { product, productLoading } = useContext(ProductContext);;
  const { mode } = useContext(ThemeContext);;
  const navigate = useNavigate();
  const isDark = mode === "dark";
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  // category wise product ko filter kar rahe hain lekin yaha dynamic ara hai name ka use kar re is me.
  const filteredProducts = useMemo(() => {
    return product.filter(
      (item) => item.category?.toLowerCase() === name.toLowerCase(),
    );
  }, [product, name]);

  return (
    <>
      <div
        className={`min-h-screen pt-24 pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}
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
                {name} <span className="text-blue-600">Collection</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                Showing {filteredProducts.length} Premium Results
              </p>
            </div>
          </div>

          {/* Grid Logic */}
          {productLoading ? (
            <ProductSkeleton />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 opacity-50 font-black uppercase tracking-widest">
              No Products Found in this Category
            </div>
          ) : (
            <div className="flex flex-wrap -m-4">
              {filteredProducts.map((item, index) => (
                <SingleProductCard
                  key={index}
                  item={item}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                  mode={mode}
                />
              ))}
            </div>
          )}

          {/* ⭐ TESTIMONIAL SECTION */}
          <section className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl font-black uppercase italic">
                Category <span className="text-blue-600">Feedback</span>
              </h2>
            </div>

            <div className="max-w-5xl mx-auto px-2">
              <Testimonial categoryName={name} />
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

export default CategoryProducts;

