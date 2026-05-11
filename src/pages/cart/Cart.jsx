
import { ThemeContext } from '../../context/AllContext';
import React, { useContext, useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import CartView from "./components/CartView";

function Cart() {
  const { items: cartItems, loading: cartLoading } = useSelector((state) => state.cart);
  const { mode } = useContext(ThemeContext);


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

  return (
    <>
      <CartView
        isDark={isDark}
        cartItems={cartItems}
        cartLoading={cartLoading}
        totalAmountRef={totalAmountRef}
        cartItemsRef={cartItemsRef}
      />
    </>
  );
}

export default React.memo(Cart);
