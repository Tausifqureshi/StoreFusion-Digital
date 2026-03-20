import React, { useContext, useState } from "react";
import { MyContext } from "../../context api/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageWithLoader from "../loader/ImageWithLoader";
import { saveCart } from "../../pages/cart/cartService";

function SingleProductCard({ item, expandedId, setExpandedId }) {
  const { mode } = useContext(MyContext);
  const isExpanded = expandedId === item.id;
  
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const { title, price, imageUrl, discount = 0, category, description, id, stock = 0 } = item;
  const finalPrice = Math.round(price - (price * discount) / 100);

  const addCart = async (product) => {
    const isProductInCart = cartItems.find((cartItem) => cartItem.id === product.id);
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
      const updatedCart = [...cartItems, serializedProduct];
      await saveCart(updatedCart);

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

  return (
    <div className="p-4 w-full custom-md:w-1/2 md:w-1/2 lg:w-1/4 drop-shadow-lg">
      <div
        className={`border-2 hover:shadow-2xl transition-shadow duration-300 ease-in-out ${
          mode === "dark"
            ? "bg-gray-800 hover:shadow-gray-900 border-gray-700"
            : "border-gray-200 hover:shadow-gray-100 bg-white"
        } border-opacity-60 rounded-2xl overflow-hidden flex flex-col h-full`}
      >
        <div
          onClick={() => navigate(`/productinfo/${id}`)}
          className="flex justify-center cursor-pointer bg-white relative shrink-0"
        >
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
              {discount}% OFF
            </span>
          )}
          <ImageWithLoader src={imageUrl} alt="product" />
        </div>

        <div className="p-5 border-t-2 flex flex-col flex-1">
          <h2
            className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${
              mode === "dark" ? "text-white" : ""
            }`}
          >
            {category}
          </h2>
          <h1
            className={`title-font text-lg font-medium mb-3 line-clamp-2 ${
              mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h1>

          <div className="flex items-center gap-2 mb-1">
            <span className={`font-medium ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              ₹ {finalPrice}
            </span>

            {discount > 0 && (
              <>
                <span className="line-through text-gray-400 text-sm">
                  ₹ {price}
                </span>
                <span className="text-red-500 text-sm font-semibold">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>
          
          <div className="mb-3 text-[10px] font-black uppercase tracking-widest text-orange-500">
            {Number(stock) > 0 ? `Stock Available: ${stock}` : <span className="text-red-500">Out of Stock</span>}
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p
              className={`leading-relaxed mb-3 text-sm ${
                mode === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Spacer to push buttons to the bottom */}
          <div className="mt-auto pt-3">
            <div className="flex justify-between gap-2">
              {Number(stock) === 0 ? (
                <button
                  disabled
                  type="button"
                  className="focus:outline-none text-white bg-red-400 font-medium rounded-lg text-sm w-full py-2 cursor-not-allowed uppercase tracking-wider text-[11px] max-w-[124px] px-0"
                >
                  Out of Stock
                </button>
              ) : (
                <button
                  onClick={() => addCart(item)}
                  type="button"
                  className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 flex justify-center items-center gap-2 uppercase tracking-wider text-[11px] transition-all active:scale-95 max-w-[124px] px-0"
                >
                  Add To Cart
                </button>
              )}
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className={`font-medium text-[11px] whitespace-nowrap px-3 py-2 rounded-lg transition-colors border ${
                  mode === 'dark' ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductCard;
