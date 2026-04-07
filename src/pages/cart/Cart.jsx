
import { ThemeContext } from '../../context api/AllContext';
import React, { useContext, useMemo, useRef, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
import CartView from "./components/CartView";

function Cart({ cartLoading }) {
  const { mode } = useContext(ThemeContext);
  const cartItems = useSelector((state) => state.cart) || [];
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
    <Layout>
      <CartView
        isDark={isDark}
        cartItems={cartItems}
        cartLoading={cartLoading}
        totalAmountRef={totalAmountRef}
        cartItemsRef={cartItemsRef}
      />
      <ScrollToTopButoon mode={mode} />
    </Layout>
  );
}

const MemoizedCart = React.memo(Cart);
MemoizedCart.displayName = 'Cart';
export default MemoizedCart;