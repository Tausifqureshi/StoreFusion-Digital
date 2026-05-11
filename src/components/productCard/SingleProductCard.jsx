import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } from "../../features/cart/cartSlice";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageWithLoader from "../loader/ImageWithLoader";
import { cartService } from "../../services/cartService";



import { store } from "../../app/store";
import { FaStar } from "react-icons/fa";
import { SaleCountdown } from "./SaleCountdown";


function SingleProductCard({ item, isExpanded, setExpandedId, mode, colSize = "lg:w-1/4" }) {
  const { title, price, imageUrl, discount = 0, category, description, id, stock = 0, saleEndTime } = item;
  
  const uniqueId = id || title;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.loggedInUser);

  // 1. States
  const [isLoading, setIsLoading] = useState(false);

  // 2. Stock Logic
  const availableStock = Math.max(0, Number(stock) || 0);
  const isOutOfStock = availableStock === 0;

  // 3. Cart Logic
  const cartQuantity = useSelector((state) =>
    state.cart.items.find((c) => c.id === id)?.quantity || 0
  );

  
  const isProductInCart = cartQuantity > 0;
  const finalPrice = useMemo(() => Math.round(price - (price * discount) / 100), [price, discount]);

  // ✅ SIMPLE STYLE: Ek saaf-suthra function jo update aur save dono karta hai
  const updateCartSync = useCallback(async (action) => {
    dispatch(action); // 1. Redux update karo
    const latestCart = store.getState().cart.items; // 2. Latest cart lo
    await cartService.saveCart(latestCart, user); // 3. Firestore mein save karo



  }, [dispatch, user]);

  const handleIncrement = useCallback(async () => {
    if (isLoading) return;
    if (cartQuantity >= availableStock) {
      toast.error(`Only ${availableStock} left in stock!`, { toastId: `stock_max_${id}`, position: "top-right", autoClose: 1000 });
      return;
    }
    try {
      setIsLoading(true);
      await updateCartSync(incrementQuantity(id));
    } finally {
      setIsLoading(false);
    }
  }, [updateCartSync, id, cartQuantity, availableStock, isLoading]);

  const handleDecrement = useCallback(async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      if (cartQuantity === 1) {
        await updateCartSync(deleteFromCart(id));
        toast.info("Removed from cart!", { toastId: `removed_${id}`, autoClose: 1000 });
      } else {
        await updateCartSync(decrementQuantity(id));
      }
    } finally {
      setIsLoading(false);
    }
  }, [updateCartSync, id, cartQuantity, isLoading]);

  const addCart = useCallback(async (product) => {
    if (isLoading) return;
    if (availableStock === 0) {
      toast.error("Out of stock!", { toastId: `oos_${id}`, position: "top-right", autoClose: 1000 });
      return;
    }
    try {
      setIsLoading(true);
      const serializedProduct = { ...product, quantity: 1, time: product.time?.seconds ?? Date.now() };
      await updateCartSync(addToCart(serializedProduct));
      toast.success("Added to cart!", { toastId: `added_${id}`, position: "top-right", autoClose: 1000 });
    } finally {
      setIsLoading(false);
    }
  }, [updateCartSync, id, availableStock, isLoading]);


  const toggleExpand = useCallback(() => {
    setExpandedId(prev => prev === uniqueId ? null : uniqueId);
  }, [setExpandedId, uniqueId]);

  return (
    <div className={`p-4 w-full custom-md:w-1/2 md:w-1/2 ${colSize} drop-shadow-lg self-start transition-all duration-300`}>
      <div className={`border-2 transition-shadow duration-300 ease-in-out ${mode === "dark" ? "bg-[#1a1f2e] border-gray-700" : "border-gray-200 bg-white"} border-opacity-60 rounded-2xl overflow-hidden flex flex-col h-full ${isOutOfStock ? "opacity-70" : `hover:shadow-2xl ${mode === "dark" ? "hover:shadow-gray-900" : "hover:shadow-gray-100"}`}`}>
        
        <div
          onClick={() => navigate(`/productinfo/${id}`)}
          className="flex justify-center relative shrink-0 overflow-hidden pt-4 bg-transparent rounded-t-2xl cursor-pointer"
        >
          {discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black px-2 py-1 rounded z-10 uppercase tracking-tighter shadow-lg">⚡ {discount}% OFF</span>}

          {/* 🕒 FLASH SALE TIMER BADGE (Imported Component) */}
          <SaleCountdown saleEndTime={saleEndTime} />

          {isOutOfStock && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-blue-900/20 backdrop-blur-[3px] pointer-events-none">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl px-5 py-2.5 rounded-xl flex items-center justify-center">
                <span className="text-blue-950 text-xs md:text-sm font-black tracking-widest uppercase">Out of Stock</span>
              </div>
            </div>
          )}

          <div className="w-full">
            <ImageWithLoader src={imageUrl} alt="product" />
          </div>
        </div>
        
        <div className="p-5 border-t-2 flex flex-col flex-1 relative">
          <h2 className={`tracking-widest text-[10px] title-font font-black uppercase opacity-50 mb-1 ${mode === "dark" ? "text-white" : "text-gray-500"}`}>{category}</h2>
          <h1 className={`title-font text-lg font-black mb-1 truncate uppercase tracking-tighter ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{title}</h1>

          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`font-black text-xl tracking-tighter ${mode === "dark" ? "text-white" : "text-gray-900"}`}>₹ {finalPrice}</span>
            {discount > 0 && (
              <>
                <span className="line-through text-gray-400 text-[13px] font-bold">₹ {price}</span>
                <span className="text-red-500 text-[11px] font-black uppercase tracking-widest">Saved ₹{price - finalPrice}</span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between mb-3 w-full">
            <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">
              {!isOutOfStock ? `Stock Available: ${availableStock}` : <span className="text-red-500">Out of Stock</span>}
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md shadow-sm shrink-0 border ${mode === "dark" ? "bg-[#1a1f2e] border-gray-700" : "bg-white border-gray-200"}`}>
              <FaStar className="text-[#FFA41C] text-[12px]" />
              <span className="text-[12px] font-black text-[#FFA41C] tracking-wider">{item.rating || "4.5"}</span>
            </div>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[600px] opacity-100 mt-2 mb-4" : "max-h-0 opacity-0"}`}>
            <p className={`leading-relaxed text-xs font-bold uppercase opacity-70 ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>{description}</p>
          </div>

          <div className="mt-auto pt-3">
            <div className="flex justify-between gap-2">
              {isOutOfStock ? (
                <button disabled className="text-white bg-red-500 font-black rounded-lg text-[10px] w-full py-2 cursor-not-allowed uppercase tracking-[0.2em] max-w-[124px]">Sold Out</button>
              ) : isProductInCart ? (
                <div className={`flex items-center justify-between w-full max-w-[124px] text-white rounded-lg h-[34px] shadow-sm overflow-hidden ${isLoading ? "bg-blue-400 cursor-wait" : "bg-blue-600 shadow-blue-600/20 shadow-lg"}`}>
                  <button disabled={isLoading} onClick={handleDecrement} className="h-full hover:bg-blue-700 font-bold transition-colors w-9 flex items-center justify-center text-lg active:scale-90">-</button>
                  <span className="text-[13px] font-black pointer-events-none flex-1 text-center border-x border-blue-500/30 flex items-center justify-center h-full">{isLoading ? "..." : cartQuantity}</span>
                  <button disabled={isLoading} onClick={handleIncrement} className="h-full hover:bg-blue-700 font-bold transition-colors w-9 flex items-center justify-center text-lg active:scale-90">+</button>
                </div>
              ) : (
                <button disabled={isLoading} onClick={() => addCart(item)} className={`text-white font-black rounded-lg text-[10px] w-full flex justify-center items-center gap-2 uppercase tracking-[0.2em] transition-all active:scale-95 max-w-[124px] h-[34px] ${isLoading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 shadow-lg"}`}>
                  {isLoading ? "..." : "Add Cart"}
                </button>
              )}
              <button onClick={toggleExpand} className={`font-black uppercase tracking-widest text-[10px] whitespace-nowrap px-4 py-2 rounded-lg transition-all border shadow-sm ${mode === 'dark' ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'}`}>{isExpanded ? "Less" : "Info"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SingleProductCard, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.item.stock === nextProps.item.stock &&
    prevProps.item.discount === nextProps.item.discount &&
    prevProps.item.rating === nextProps.item.rating &&
    prevProps.item.saleEndTime === nextProps.item.saleEndTime &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.mode === nextProps.mode &&
    prevProps.colSize === nextProps.colSize
  );
});
