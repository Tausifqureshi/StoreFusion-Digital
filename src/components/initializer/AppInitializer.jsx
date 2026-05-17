import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setProductsLoading, setProductsError } from "../../features/products/productSlice";
import { setLoggedInUser, setUsers, setUsersLoading } from "../../features/users/userSlice";
import { setOrders, setOrdersLoading } from "../../features/orders/orderSlice";
import { setCart, setCartLoading, setCartError } from "../../features/cart/cartSlice";
import { productService } from "../../services/productService";
import { orderService } from "../../services/orderService";
import { cartService } from "../../services/cartService";
import { authService } from "../../services/authService";
import { testimonialService } from "../../services/testimonialService";
import { setTestimonials, setTestimonialsLoading, setTestimonialsError } from "../../features/testimonials/testimonialSlice";

/**
 * AppInitializer: Centralized controller for all real-time data streams.
 * Ensures data consistency and handles clean-ups to prevent memory leaks.
 */
const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.users.loggedInUser);

  // 🔐 AUTH OBSERVER (Bootstrap)
  useEffect(() => {
    const unsubscribe = authService.trackAuthUser(
      (user) => dispatch(setLoggedInUser(user)),
      (loading) => { /* Optional: Auth loading state */ }
    );
    return () => unsubscribe();
  }, [dispatch]);

  // 🛒 CART INITIALIZER (Sync with Cloud)
  useEffect(() => {
    if (!loggedInUser?.uid) {
      dispatch(setCart([]));
      return;
    }

    const syncCart = async () => {
      dispatch(setCartLoading(true));
      try {
        const cartData = await cartService.loadCart(loggedInUser);
        if (cartData) dispatch(setCart(cartData));
      } catch (error) {
        dispatch(setCartError(error.message));
      } finally {
        dispatch(setCartLoading(false));
      }
    };
    syncCart();
  }, [loggedInUser?.uid, dispatch]);


  // 📝 USER ORDERS LISTENER
  useEffect(() => {
    // 🛡️ Skip if no user or if we already have orders (prevents blocking nav)
    if (!loggedInUser?.uid) {
      dispatch(setOrders([]));
      return;
    }

    // Monitor personal orders
    let isSubscribed = true;
    const unsubscribe = orderService.getUserOrders(loggedInUser.uid, (orders) => {
      if (isSubscribed) {
        dispatch(setOrders(orders));
        dispatch(setOrdersLoading(false));
      }
    });

    return () => {
      isSubscribed = false;
      if (unsubscribe) unsubscribe();
    };
  }, [loggedInUser?.uid, dispatch]);


  return children;
};

export default AppInitializer;
