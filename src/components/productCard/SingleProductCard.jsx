import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageWithLoader from "../loader/ImageWithLoader";
import { saveCart } from "../../pages/cart/cartService";
import { store } from "../../redux/store";

function SingleProductCard({ item, expandedId, setExpandedId, mode }) {
  // const { mode } = useContext(ThemeContext);;

  // 👉 Fallback to title if id is missing to prevent all cards matching 'undefined === undefined'
  const uniqueId = item.id || item.title;
  const isExpanded = expandedId !== null && expandedId === uniqueId;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 👉 Select specific cart item to heavily optimize performance!
  const isProductInCart = useSelector((state) => 
    state.cart.find((cartItem) => cartItem.id === item.id)
  );

  const handleIncrement = async () => {
    if (isProductInCart && isProductInCart.quantity >= Number(item.stock || Infinity)) {
      toast.error(`Only ${item.stock} left in stock!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "❌",
      });
      return;
    }
    //Redux ko update krne ke liye yaha logic hai.
    dispatch(incrementQuantity(item.id));
    
    // Get updated cart instantly from store to avoid reactivity overhead
    const latestCart = store.getState().cart;
    // Firebase ko batne ke liye yaha logic hai.
    await saveCart(latestCart);
  };

  const handleDecrement = async () => {
    // 1. Pehle Redux Action chalega
    if (isProductInCart?.quantity === 1) {
      dispatch(deleteFromCart(item.id)); //agr quantity 1 hai to delete kr do 
      toast.info("Product removed from cart!", { icon: "🗑️", autoClose: 1000, position: "top-right" });
    } else {
      dispatch(decrementQuantity(item.id)); // agr quantity 1 se jyada hai to quantity 1 se kam kr do 
    }

    // Firebase ko batne ke liye yaha logic hai.
    const latestCart = store.getState().cart;
    await saveCart(latestCart);
  };

  const { title, price, imageUrl, discount = 0, category, description, id, stock = 0 } = item;
  const finalPrice = Math.round(price - (price * discount) / 100);

  const addCart = async (product) => {
    // Sirf naya item first time add karne ke liye (Increment ke liye handleIncrement use hoga)
    if (Number(product.stock || 0) === 0) {
      toast.error("Product is out of stock!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    const serializedProductForDispatch = {
      ...product,
      quantity: 1,
      time: product.time?.seconds ?? Date.now(),
    };

    // Redux aur Firebase Update
    dispatch(addToCart(serializedProductForDispatch));
    
    const latestCart = store.getState().cart;
    await saveCart(latestCart);

    toast.success("Product added to cart!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: "🛍️",
    });
  };

  return (
    <div className="p-4 w-full custom-md:w-1/2 md:w-1/2 lg:w-1/4 drop-shadow-lg self-start">
      <div
        className={`border-2 hover:shadow-2xl transition-shadow duration-300 ease-in-out ${mode === "dark"
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
            className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${mode === "dark" ? "text-white" : ""
              }`}
          >
            {category}
          </h2>
          <h1
            className={`title-font text-lg font-medium mb-3 truncate ${mode === "dark" ? "text-white" : "text-gray-900"
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
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <p
              className={`leading-relaxed mb-3 text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-600"
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
                  className="focus:outline-none text-white bg-red-500 font-medium rounded-lg text-sm w-full py-2 cursor-not-allowed uppercase tracking-wider text-[11px] max-w-[124px] px-0"
                >
                  Out of Stock
                </button>
              ) : isProductInCart ? (
                <div className="flex items-center justify-between w-full max-w-[124px] bg-blue-600 text-white rounded-lg h-[34px] shadow-sm overflow-hidden">
                  <button onClick={handleDecrement} className="h-full hover:bg-blue-700 font-bold transition-colors w-9 flex items-center justify-center text-lg active:scale-90">
                    -
                  </button>
                  <span className="text-[13px] font-black pointer-events-none flex-1 text-center border-x border-blue-500/30 flex items-center justify-center h-full">
                    {isProductInCart.quantity}
                  </span>
                  <button onClick={handleIncrement} className="h-full hover:bg-blue-700 font-bold transition-colors w-9 flex items-center justify-center text-lg active:scale-90">
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addCart(item)}
                  type="button"
                  className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full flex justify-center items-center gap-2 uppercase tracking-wider text-[11px] transition-all active:scale-95 max-w-[124px] h-[34px] px-0"
                >
                  Add To Cart
                </button>
              )}
              <button
                onClick={() => setExpandedId(isExpanded ? null : uniqueId)}
                className={`font-medium text-[11px] whitespace-nowrap px-3 py-2 rounded-lg transition-colors border ${mode === 'dark' ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-gray-600 border-gray-200 hover:bg-gray-100'
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

export default React.memo(SingleProductCard);
