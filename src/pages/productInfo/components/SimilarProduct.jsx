import React from "react";
import SingleProductCard from "../../../components/productCard/SingleProductCard";

const SimilarProduct = React.memo(function SimilarProduct({
  similarProducts,
  expandedId,
  setExpandedId,
  mode,
  handleViewAll,
  isDark,
}) {
  return (
    <section className="mt-12 lg:mt-24 border-t border-gray-100 dark:border-gray-800 pt-8 px-2 md:px-0">
      <div className="flex items-center justify-between mb-6 lg:mb-10">
        <div className="flex flex-col">
          <h2 className={`text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tighter italic ${isDark ? "text-white" : "text-gray-900"}`}>
            Similar <span className="text-blue-600">Products</span>
          </h2>
          <div className="w-10 md:w-16 h-1 bg-orange-500 mt-1"></div>
        </div>
        <button
          onClick={handleViewAll}
          className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-blue-600 pb-0.5 hover:text-orange-500 hover:border-orange-500 transition-all"
        >
          View All
        </button>
      </div>
      <div className="flex flex-wrap -m-4">
        {similarProducts.map((item, index) => (
          <SingleProductCard
            key={item.id || index}
            item={item}
            isExpanded={expandedId === (item.id || item.title)}
            setExpandedId={setExpandedId}
            mode={mode}
          />
        ))}
      </div>
    </section>
  );
});

export default SimilarProduct;
