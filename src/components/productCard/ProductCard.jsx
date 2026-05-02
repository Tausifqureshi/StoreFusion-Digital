import { FilterContext, ProductContext, ThemeContext } from '../../context api/AllContext';
import React, { useContext, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import SingleProductCard from "./SingleProductCard";
import ProductSkeleton from "../loader/ProductSkeleton";
import { FaChevronRight } from "react-icons/fa";

// Flipkart/Amazon style colorful mini card for Home Page
const HomeProductCard = React.memo(({ item, mode }) => {
  const navigate = useNavigate();
  const { title, price, imageUrl, discount = 0, category, id } = item;
  const finalPrice = Math.round(price - (price * discount) / 100);

  return (
    <div
      onClick={() => navigate(`/productinfo/${id}`)}
      className="p-2 w-[220px] md:w-[260px] flex-shrink-0 cursor-pointer group"
    >
      <div className={`border-2 hover:shadow-xl transition-all duration-300 ease-in-out ${mode === "dark" ? "bg-gray-800 hover:shadow-gray-900 border-gray-700" : "border-gray-100 hover:border-blue-100 hover:shadow-blue-900/10 bg-white"} rounded-2xl overflow-hidden flex flex-col h-[320px] relative`}>
        {discount > 0 && <span className="absolute top-3 left-3 bg-red-500 text-white text-[11px] font-black tracking-widest px-2 py-1 rounded z-10 shadow-sm">{discount}% OFF</span>}

        <div className="flex justify-center items-center h-44 p-4 shrink-0 relative overflow-hidden bg-transparent">
          <img loading="lazy" src={imageUrl} alt={title} className={`max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500`} />
        </div>

        <div className={`p-4 border-t-2 flex flex-col flex-1 ${mode === 'dark' ? 'border-gray-700' : 'border-gray-50'}`}>
          <h2 className={`tracking-widest text-[10px] title-font font-bold uppercase mb-1 ${mode === "dark" ? "text-gray-400" : "text-gray-400"}`}>{category}</h2>
          <h1 className={`title-font text-sm font-bold mb-2 truncate ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{title}</h1>

          <div className="flex items-center gap-2 mt-auto">
            <span className={`font-black text-lg ${mode === "dark" ? "text-white" : "text-gray-900"}`}>₹{finalPrice}</span>
            {discount > 0 && (
              <span className="line-through text-gray-400 text-[11px] font-medium">₹{price}</span>
            )}
          </div>
          {discount > 0 ? (
            <p className="text-[10px] font-black text-green-500 mt-1 uppercase tracking-widest">Special Deal</p>
          ) : (
            <p className="text-[10px] font-black text-orange-500 mt-1 uppercase tracking-widest">Trending Now</p>
          )}
        </div>
      </div>
    </div>
  );
});

function ProductCard() {
  const { mode } = useContext(ThemeContext);
  const { product, productLoading } = useContext(ProductContext);
  const navigate = useNavigate();

  // 🚀 REDUCE KA JADU: Sirf ek loop mein grouping + unique subcategory logic
  const groupedCategoryData = useMemo(() => {
    if (!product || product.length === 0) return [];

    // Ye Set record rakhega ki kaun-kaun si subcategories humne add kar li hain
    const seenSubCategories = new Set(); 

    const resultObject = product.reduce((acc, p) => {
      const cat = p.category?.trim().toUpperCase(); // Ex: "ELECTRONICS"
      const sub = p.subcategory?.trim().toUpperCase(); // Ex: "MOBILES"

      if (cat && sub) { // Agar category aur subcategory dono exist karti hain tabhi aage badho
        
        // Ek unique key banayi (Ex: "ELECTRONICS-MOBILES") taaki check kar sakein ki kya ye subcategory pehle aa chuki hai?
        const subKey = `${cat}-${sub}`; 
        
        // 1. Agar ye main category object me pehli baar aayi hai, toh array initialize karo
        if (!acc[cat]) acc[cat] = [];

        // 2. YAHAN EK PRODUCT PER SUBCATEGORY WALA LOGIC HAI:
        // Agar ye subcategory (subKey) pehli baar aayi hai (!seenSubCategories.has)
        // aur humein total 6 se kam items chahiye...
        if (!seenSubCategories.has(subKey) && acc[cat].length < 6) {
          
          acc[cat].push(p); // Is product ko array mein push kar do
          
          // Agli baar is subcategory ka doosra product aaye toh skip ho jaye, isliye isko Set me dal diya
          seenSubCategories.add(subKey); 
        }
      }
      return acc;
    }, {}); // {} is the initial empty object accumulator (acc)

    // Niche ka JSX `{ category, categoryProducts }` object format expect kar raha hai
    // isliye Object.entries ko wapas object format me map karke bhej rahe hain:
    return Object.entries(resultObject).map(([catName, items]) => ({
      category: catName,
      categoryProducts: items
    }));
  }, [product]);

  return (
    <section className="body-font">
      <div className="container px-5 py-8 md:py-12 mx-auto">
        {productLoading ? (
          <ProductSkeleton />
        ) : (
          <>
            {/* Global Product Header */}
            <div className="flex items-end justify-between mb-8 md:mb-12 px-2 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <h1 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter italic ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                  Our <span className="text-orange-500">Store</span>
                </h1>
                <div className="w-16 h-1 bg-blue-600 mt-2"></div>
              </div>
              <button
                onClick={() => navigate('/allproducts')}
                className="group flex items-center gap-2 text-blue-600 hover:text-orange-500 font-black uppercase tracking-widest text-[10px] md:text-xs pb-1 border-b-2 border-transparent hover:border-orange-500 transition-all"
              >
                All Products <FaChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* CATEGORY WISE HOME LAYOUT (FLIPKART/AMAZON STYLE) */}
            <div className="space-y-12 md:space-y-16">
              {groupedCategoryData.map(({ category, categoryProducts }, idx) => (
                <div key={idx} className={`rounded-3xl p-4 md:p-6 shadow-sm border ${mode === 'dark' ? 'bg-[#1a1f2e] border-gray-800' : 'bg-white border-gray-100 shadow-blue-900/5'}`}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200 dark:border-gray-800 px-2">
                    <div>
                      <h2 className={`text-2xl md:text-3xl font-black italic tracking-tighter uppercase ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                        Top in <span className="text-orange-500">{category}</span>
                      </h2>
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Premium {category} Collection</p>
                    </div>
                    <button
                      onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                      className="flex flex-shrink-0 items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-8 h-8 md:w-10 md:h-10 rounded-full transition-all active:scale-95 shadow-md shadow-blue-500/30"
                      title="View All"
                    >
                      <FaChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>

                  {/* Products Grid (Horizontal Scroll like Flipkart/Amazon) */}
                  <div className="flex overflow-x-auto pb-4 -m-2 hidden-scrollbar snap-x snap-mandatory items-center">
                    {categoryProducts.map(item => (
                      <div key={item.id || item.title} className="snap-start shrink-0">
                        <HomeProductCard
                          item={item}
                          mode={mode}
                        />
                      </div>
                    ))}

                    {/* View All Card at the end of the row */}
                    <div className="snap-start shrink-0 p-2">
                      <div
                        onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                        className={`w-[160px] h-[320px] flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 rounded-2xl border-2 border-dashed group ${mode === 'dark' ? 'border-gray-700 hover:border-blue-500 bg-gray-800/50' : 'border-gray-300 hover:border-blue-500 bg-gray-50'}`}
                      >
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                          <FaChevronRight size={18} />
                        </div>
                        <span className={`font-black uppercase tracking-widest text-xs ${mode === 'dark' ? 'text-gray-300' : 'text-blue-600'}`}>View All</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 text-center px-4">Explore More {category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default React.memo(ProductCard);
