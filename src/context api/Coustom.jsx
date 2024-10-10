

import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context api/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from 'react-toastify';

function ProductCard() {
  const { mode, product, searchkey, filterType, filterPrice, sortPrice } = useContext(MyContext);
  const [showMoreIndex, setShowMoreIndex] = useState({});

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    const isProductInCart = cartItems.some(item => item.id === product.id);
    if (isProductInCart) {
      toast.info(`Product is already in your cart!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "🗑️",
      });
    } else {
      const serializedProduct = {
        ...product,
        quantity: 1,
        time: product.time?.seconds ?? Date.now(),
      };
      dispatch(addToCart(serializedProduct));
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "🗑️",
      });
    }
  };

  // Apply filters
  const filteredProducts = product
    .filter((item) =>
      // Filter by search key
      item.title.toLowerCase().includes(searchkey.toLowerCase())
    )
    .filter((item) =>
      // Filter by category (filterType)
      filterType === '' || item.category === filterType
    )
    .filter((item) => {
      // Filter by price range
      if (filterPrice === "") return true; // No price filter
      const [minPrice, maxPrice] = filterPrice.split('-').map(Number);
      return item.price >= minPrice && item.price <= maxPrice;
    })
    // Apply sorting
    .sort((a, b) => {
      if (sortPrice === 'low-to-high') {
        return a.price - b.price; // Low to High
      } else if (sortPrice === 'high-to-low') {
        return b.price - a.price; // High to Low
      }
      return 0; // No sorting
    });

  return (
    <div className="container mx-auto px-4 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            className="rounded-lg shadow-lg border border-gray-300 p-5"
            style={{
              backgroundColor: mode === "dark" ? "#1F1F1F" : "white",
              color: mode === "dark" ? "white" : "black",
            }}
          >
            <img src={product.image} alt={product.title} className="w-full h-40 object-cover mb-4" />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-sm text-gray-600">Category: {product.category}</p>
            <p className="text-xl font-bold">₹{product.price}</p>
            <button
              onClick={() => addCart(product)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
            >
              Add to Cart
            </button>
            <div className="mt-3">
              <button
                onClick={() => toggleShowMore(index)}
                className="text-blue-500 hover:underline"
              >
                {showMoreIndex[index] ? 'Show Less' : 'Show More'}
              </button>
              {showMoreIndex[index] && (
                <p className="mt-2">{product.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCard;
