// import React from 'react'

// function CategoryProducts() {
//   return (
//     <div>CategoryProducts</div>
//   )
// }

// export default CategoryProducts

import React, { useContext, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { MyContext } from "../../context api/myContext";

function CategoryProducts() {
  const { name } = useParams();
  const { product, mode } = useContext(MyContext);

  // ⭐ category filter
  const filteredProducts = useMemo(() => {
    return product.filter(
      (item) => item.category?.toLowerCase() === name.toLowerCase(),
    );
  }, [product, name]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* ⭐ heading */}
        <h1 className="text-2xl md:text-3xl font-bold mb-8 capitalize">
          {name} Products
        </h1>

        {/* ⭐ empty */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No product found</p>
        )}

        {/* ⭐ grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => {
            const itemPrice = Number(item.price) || 0;
  const itemDiscount = Number(item.discount) || 0;
  const finalPrice = Math.round(
    itemPrice - (itemPrice * itemDiscount) / 100
  );
           

            return (
              <Link
                key={item.id}
                to={`/productInfo/${item.id}`}
                className={`rounded-xl overflow-hidden shadow hover:shadow-lg transition ${
                  mode === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                {/* image */}
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="h-48 w-full object-cover"
                  />

                  {/* discount badge */}
                  {item.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                      {itemDiscount}% OFF
                    </span>
                  )}
                </div>

                {/* info */}
                <div className="p-3">
                  <h2 className="font-semibold line-clamp-1">{item.title}</h2>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-bold text-green-600">
                      ₹{finalPrice}
                    </span> 
                    {item.discount > 0 && (
                      <>
                        <span className="line-through text-gray-400">
                          ₹ {itemPrice}
                        </span>
                        <span className="text-red-500 text-sm font-semibold">
                          {itemDiscount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                </div>

              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProducts;
