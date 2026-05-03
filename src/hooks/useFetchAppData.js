import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/cartSlice";
import { setOrders, clearOrders } from "../redux/orderSlice";
import { loadCart } from "../pages/cart/cartService";
import { getUserOrdersFromFirestore } from "../components/order/orderFirestore";

export const useFetchAppData = (setCartLoading, setOrderLoading) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      setCartLoading(true);
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
      setOrderLoading(false); // 👈 Yahan handle karein
      return;
    }
    setOrderLoading(true);

    // ⛑️ Safety: agar 6 sec mein koi response nahi → loader force-off
    const safetyTimer = setTimeout(() => setOrderLoading(false), 6000);

    const unsubscribe = getUserOrdersFromFirestore(user.uid, (orders) => {
      clearTimeout(safetyTimer);
      dispatch(setOrders(orders));
      setOrderLoading(false);
    });
    return () => {
      clearTimeout(safetyTimer);
      unsubscribe && unsubscribe();
    };
  }, [dispatch, setOrderLoading]);
};
