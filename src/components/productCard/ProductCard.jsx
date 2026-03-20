import React, { useContext, useState } from "react";
import { MyContext } from "../../context api/myContext";
import SingleProductCard from "./SingleProductCard";
import ProductSkeleton from "../loader/ProductSkeleton";

function ProductCard() {
  const {
    mode,
    product,
    searchkey,
    filterType,
    filterPrice,
    sortPrice,
    productLoading,
  } = useContext(MyContext);

  const [expandedId, setExpandedId] = useState(null);

  const filteredProducts = product
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
    })
    .slice(0, 8);

  return (
    <section className="body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        {productLoading ? (
          <ProductSkeleton />
        ) : (
          <>
            <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
              <h1
                className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${
                  mode === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Our Latest Collection
              </h1>
              <div className="h-1 w-20 bg-blue-800 rounded transition-all duration-300 ease-in-out hover:bg-blue-600"></div>
            </div>

            <div className="flex flex-wrap -m-4">
              {filteredProducts.map((item, index) => (
                <SingleProductCard
                  key={index}
                  item={item}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductCard;
