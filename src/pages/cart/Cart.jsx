import { ThemeContext } from '../../context api/AllContext';
import React, { useContext, useMemo, useState, useCallback, useRef, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Razorpay from "../razorpay/Razorpay";
import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
import LoaderSpinner from "../../components/loader/LoaderSpinner";
import { clearCartStorage } from "./cartService";
import { saveCartDebounce } from "./debounce";
import { FiTrash2, FiMinus, FiPlus, FiChevronDown, FiShield, FiTruck } from "react-icons/fi";
import CartItemCard from "./CartItemCard";

// ✅ CART VIEW: Saare items list aur sidebar yahan isolation mein locked hain
const CartView = React.memo(({
  isDark, cartItems, cartLoading, clearingCart, cartUpdating,
  deleteCart, decrementCartQuantity, incrementCartQuantity, clearCartItems,
  totalAmountRef, cartItemsRef // ✅ Dual Ref injection
}) => {
  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * (item.quantity || 0), 0);
  }, [cartItems]);

  const shippingCharge = 20;
  const totalWithShipping = totalAmount > 0 ? (totalAmount + shippingCharge).toFixed(2) : 0;

  if (cartLoading) return <LoaderSpinner isDark={isDark} label="Loading bag..." />;

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
            My <span className="text-blue-600">Shopping Bag</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
            {cartItems.length} Premium Items Selected
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Items List */}
            <div className="w-full lg:flex-1 space-y-4">
              {cartItems.map((item, index) => (
                <CartItemCard
                  key={item.id || index}
                  item={item}
                  index={index}
                  isDark={isDark}
                  deleteCart={deleteCart}
                  decrementCartQuantity={decrementCartQuantity}
                  incrementCartQuantity={incrementCartQuantity}
                  cartUpdatingType={cartUpdating?.id === item.id ? cartUpdating.type : null}
                />
              ))}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-[380px] lg:sticky lg:top-32">
              <div className={`p-6 rounded-[30px] border ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"}`}>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 opacity-50">Pricing Details</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                    <span>Bag Total</span>
                    <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>₹ {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                    <span>Shipping Fee</span>
                    <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>₹ {shippingCharge}</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                    <span className="text-sm font-black uppercase">Total Payable</span>
                    <span className={`text-2xl font-medium ${isDark ? "text-white" : "text-gray-900"}`}>₹ {totalWithShipping}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Razorpay cartItemsRef={cartItemsRef} totalAmountRef={totalAmountRef} />
                  <button onClick={clearCartItems} disabled={clearingCart} className={`w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all duration-300 ${isDark ? "border-gray-700 text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-none" : "border-gray-200 text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 shadow-none"}`}>
                    {clearingCart ? "Processing..." : "Empty Shopping Bag"}
                  </button>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-2 rounded-full ${isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}><FiTruck size={20} /></div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-gray-500">Fast Ship</span>
                  </div>
                  <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`p-2 rounded-full ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}><FiShield size={20} /></div>
                    <span className="text-[8px] font-black uppercase tracking-wider text-gray-500">Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 opacity-20">Your Bag is Empty</h2>
            <Link to="/allproducts" className="mt-4 px-8 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">Continue Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
});

function Cart({ cartLoading }) {
  const { mode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart) || [];
  const [clearingCart, setClearingCart] = useState(false);
  const [cartUpdating, setCartUpdating] = useState(null);
  const isDark = mode === "dark";

  // 👉 ABSOLUTE ISOLATION REFS: This locks the payment data without triggering re-renders
  const totalAmountRef = useRef(0);
  const cartItemsRef = useRef([]);

  const totalAmountValue = useMemo(() => {
    const amount = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * (item.quantity || 0), 0);
    return amount > 0 ? (amount + 20).toFixed(2) : 0;
  }, [cartItems]);

  useEffect(() => {
    totalAmountRef.current = totalAmountValue;
    cartItemsRef.current = cartItems;
  }, [totalAmountValue, cartItems]);

  const deleteCart = useCallback((itemId) => {
    const updatedCart = cartItems.filter((i) => i.id !== itemId);
    dispatch(deleteFromCart(itemId));
    saveCartDebounce(updatedCart);
    toast.info("Removed from bag", { position: "bottom-right", autoClose: 1000 });
  }, [cartItems, dispatch]);

  const incrementCartQuantity = useCallback((itemId) => {
    // 🚀 STABLE HANDLER: Avoiding dependency on the entire cartItems array! 
    // This stops the Waterfall Re-render of the entire list.
    setCartUpdating({ id: itemId, type: "increment" });
    dispatch(incrementQuantity(itemId));

    // UI state reset
    setTimeout(() => setCartUpdating(null), 200);
  }, [dispatch]);

  const decrementCartQuantity = useCallback((itemId) => {
    setCartUpdating({ id: itemId, type: "decrement" });
    dispatch(decrementQuantity(itemId));

    // UI state reset
    setTimeout(() => setCartUpdating(null), 200);
  }, [dispatch]);

  const clearCartItems = async () => {
    setClearingCart(true);
    try {
      await clearCartStorage();
      setTimeout(() => {
        dispatch(clearCart());
        setClearingCart(false);
        toast.success("Bag cleared");
      }, 400);
    } catch (err) { setClearingCart(false); }
  };

  return (
    <Layout>
      <CartView
        isDark={isDark}
        cartItems={cartItems}
        cartLoading={cartLoading}
        clearingCart={clearingCart}
        cartUpdating={cartUpdating}
        deleteCart={deleteCart}
        decrementCartQuantity={decrementCartQuantity}
        incrementCartQuantity={incrementCartQuantity}
        clearCartItems={clearCartItems}
        totalAmountRef={totalAmountRef}
        cartItemsRef={cartItemsRef}
      />
      <ScrollToTopButoon mode={mode} />
    </Layout>
  );
}

export default React.memo(Cart);