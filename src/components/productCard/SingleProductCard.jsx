import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ImageWithLoader from "../loader/ImageWithLoader";
import { saveCart } from "../../pages/cart/cartService";
import { FaStar } from "react-icons/fa";

function SingleProductCard({ item, isExpanded, setExpandedId, mode, colSize = "lg:w-1/4" }) {
  const { title, price, imageUrl, discount = 0, category, description, id, stock = 0 } = item;
  
  const uniqueId = id || title;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Race condition prevention state
  const [isLoading, setIsLoading] = useState(false);

  // 2. Explicit and safe stock logic
  const availableStock = Math.max(0, Number(stock) || 0);
  const isOutOfStock = availableStock === 0;

  // 3. Optimized Redux Selector
  // Selecting only the primitive 'quantity' prevents the component from re-rendering
  // every time a different cart item is updated (avoids the .find() reference issue).
  const cartQuantity = useSelector((state) =>
    state.cart.find((c) => c.id === id)?.quantity || 0
  );
  
  const isProductInCart = cartQuantity > 0;

  // Derived data
  const finalPrice = useMemo(() => Math.round(price - (price * discount) / 100), [price, discount]);

  // 4. Redux Async Thunk pattern inside component to avoid store.getState()
  const dispatchAndSaveCart = useCallback((action) => async (dispatchFn, getState) => {
    dispatchFn(action);
    await saveCart(getState().cart);
  }, []);

  // ✅ STABLE CALLBACKS
  const handleIncrement = useCallback(async () => {
    if (isLoading) return;
    
    if (cartQuantity >= availableStock) {
      toast.error(`Only ${availableStock} left in stock!`, { toastId: `stock_max_${id}`, position: "top-right", autoClose: 1000, icon: "❌" });
      return;
    }
    
    try {
      setIsLoading(true);
      await dispatch(dispatchAndSaveCart(incrementQuantity(id)));
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, dispatchAndSaveCart, id, cartQuantity, availableStock, isLoading]);

  const handleDecrement = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      if (cartQuantity === 1) {
        await dispatch(dispatchAndSaveCart(deleteFromCart(id)));
        toast.info("Product removed from cart!", { toastId: `removed_${id}`, icon: "🗑️", autoClose: 1000, position: "top-right" });
      } else {
        await dispatch(dispatchAndSaveCart(decrementQuantity(id)));
      }
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, dispatchAndSaveCart, id, cartQuantity, isLoading]);

  const addCart = useCallback(async (product) => {
    if (isLoading) return;
    
    if (availableStock === 0) {
      toast.error("Product is out of stock!", { toastId: `oos_${id}`, position: "top-right", autoClose: 1000 });
      return;
    }
    
    try {
      setIsLoading(true);
      const serializedProductForDispatch = { ...product, quantity: 1, time: product.time?.seconds ?? Date.now() };
      await dispatch(dispatchAndSaveCart(addToCart(serializedProductForDispatch)));
      toast.success("Product added to cart!", { toastId: `added_${id}`, position: "top-right", autoClose: 1000, icon: "🛍️" });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, dispatchAndSaveCart, id, availableStock, isLoading]);

  const toggleExpand = useCallback(() => {
    setExpandedId(prev => prev === uniqueId ? null : uniqueId);
  }, [setExpandedId, uniqueId]);

  return (
    <div className={`p-4 w-full custom-md:w-1/2 md:w-1/2 ${colSize} drop-shadow-lg self-start transition-all duration-300`}>
      {/* Fixed UX: Removed pointer-events-none from card container so clicks on the image pass through */}
      <div className={`border-2 transition-shadow duration-300 ease-in-out ${mode === "dark" ? "bg-[#1a1f2e] border-gray-700" : "border-gray-200 bg-white"} border-opacity-60 rounded-2xl overflow-hidden flex flex-col h-full ${isOutOfStock ? "opacity-70" : `hover:shadow-2xl ${mode === "dark" ? "hover:shadow-gray-900" : "hover:shadow-gray-100"}`}`}>
        
        <div
          onClick={() => navigate(`/productinfo/${id}`)}
          className="flex justify-center relative shrink-0 overflow-hidden pt-4 bg-transparent rounded-t-2xl cursor-pointer"
        >
          {discount > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">{discount}% OFF</span>}

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-blue-900/20 backdrop-blur-[3px] pointer-events-none">
              <div className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xl px-5 py-2.5 rounded-xl flex items-center justify-center">
                <span className="text-blue-950 text-xs md:text-sm font-black tracking-widest uppercase drop-shadow-sm">
                  Out of Stock
                </span>
              </div>
            </div>
          )}

          <div className="w-full">
            <ImageWithLoader src={imageUrl} alt="product" />
          </div>
        </div>
        
        <div className="p-5 border-t-2 flex flex-col flex-1 relative">
          <h2 className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${mode === "dark" ? "text-white" : ""}`}>{category}</h2>
          <h1 className={`title-font text-lg font-medium mb-1 truncate ${mode === "dark" ? "text-white" : "text-gray-900"}`}>{title}</h1>

          {/* Price Side */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`font-medium ${mode === "dark" ? "text-white" : "text-gray-900"}`}>₹ {finalPrice}</span>
            {discount > 0 && (
              <>
                <span className="line-through text-gray-400 text-[13px]">₹ {price}</span>
                <span className="text-red-500 text-[13px] font-semibold">{discount}% OFF</span>
              </>
            )}
          </div>

          {/* Stock & Rating Side */}
          <div className="flex items-center justify-between mb-3 w-full">
            <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">
              {!isOutOfStock ? `Stock Available: ${availableStock}` : <span className="text-red-500">Out of Stock</span>}
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md shadow-sm shrink-0 border ${mode === "dark" ? "bg-[#1a1f2e] border-gray-700" : "bg-white border-gray-200"}`}>
              <FaStar className="text-[#FFA41C] text-[12px]" />
              <span className="text-[12px] font-black text-[#FFA41C] tracking-wider">{item.rating || "4.5"}</span>
            </div>
          </div>

          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
            <p className={`leading-relaxed mb-3 text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-600"}`}>{description}</p>
          </div>

          <div className="mt-auto pt-3">
            <div className="flex justify-between gap-2">
              {isOutOfStock ? (
                <button disabled className="text-white bg-red-500 font-medium rounded-lg text-[11px] w-full py-2 cursor-not-allowed uppercase tracking-wider max-w-[124px]">Out of Stock</button>
              ) : isProductInCart ? (
                <div className={`flex items-center justify-between w-full max-w-[124px] text-white rounded-lg h-[34px] shadow-sm overflow-hidden ${isLoading ? "bg-blue-400 cursor-wait" : "bg-blue-600"}`}>
                  <button disabled={isLoading} onClick={handleDecrement} className="h-full hover:bg-blue-700 font-bold transition-colors w-9 flex items-center justify-center text-lg active:scale-90">-</button>
                  <span className="text-[13px] font-black pointer-events-none flex-1 text-center border-x border-blue-500/30 flex items-center justify-center h-full">
                    {isLoading ? "..." : cartQuantity}
                  </span>
                  <button disabled={isLoading} onClick={handleIncrement} className="h-full hover:bg-blue-700 font-bold transition-colors w-9 flex items-center justify-center text-lg active:scale-90">+</button>
                </div>
              ) : (
                <button disabled={isLoading} onClick={() => addCart(item)} className={`text-white font-medium rounded-lg text-[11px] w-full flex justify-center items-center gap-2 uppercase tracking-wider transition-all active:scale-95 max-w-[124px] h-[34px] ${isLoading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700"}`}>
                  {isLoading ? "Adding..." : "Add To Cart"}
                </button>
              )}
              <button onClick={toggleExpand} className={`font-medium text-[11px] whitespace-nowrap px-3 py-2 rounded-lg transition-colors border ${mode === 'dark' ? 'text-gray-300 border-gray-600 hover:bg-gray-700' : 'text-gray-600 border-gray-200 hover:bg-gray-100'}`}>{isExpanded ? "See Less" : "See More"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Safe & Scalable React.memo 
export default React.memo(SingleProductCard, (prevProps, nextProps) => {
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.price === nextProps.item.price &&
    prevProps.item.stock === nextProps.item.stock &&
    prevProps.item.discount === nextProps.item.discount &&
    prevProps.item.rating === nextProps.item.rating &&
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.mode === nextProps.mode &&
    prevProps.colSize === nextProps.colSize
  );
});
