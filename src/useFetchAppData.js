import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "./redux/cartSlice";
import { setOrders, clearOrders } from "./redux/orderSlice";
import { loadCart } from "./pages/cart/cartService";
import { getUserOrdersFromFirestore } from "./components/order/orderFirestore";

export const useFetchAppData = (setCartLoading, setOrderLoading) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await loadCart();
        dispatch(setCart(cartData));
      } finally {
        setCartLoading(false);
      }
    };
    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.uid) {
      dispatch(clearOrders());
      return;
    }
    setOrderLoading(true);
    const unsubscribe = getUserOrdersFromFirestore(user.uid, (orders) => {
      dispatch(setOrders(orders));
      setOrderLoading(false);
    });
    return () => unsubscribe && unsubscribe();
  }, [dispatch]);
};
