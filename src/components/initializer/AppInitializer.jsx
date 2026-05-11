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
    const syncCart = async () => {
      dispatch(setCartLoading(true));
      try {
        const cartData = await cartService.loadCart(loggedInUser);
        dispatch(setCart(cartData));
      } catch (error) {
        dispatch(setCartError(error.message));
      } finally {
        dispatch(setCartLoading(false));
      }
    };
    syncCart();
  }, [loggedInUser?.uid, dispatch]);


  // 📝 ORDERS LISTENER (Real-time Sync)
  useEffect(() => {
    if (!loggedInUser?.uid) {
      dispatch(setOrders([]));
      return;
    }

    dispatch(setOrdersLoading(true));
    let unsubscribe;
    
    const onUpdate = (orders) => {
      dispatch(setOrders(orders));
      dispatch(setOrdersLoading(false));
    };

    if (loggedInUser.role === 'admin') {
      unsubscribe = orderService.getAllOrders(onUpdate);
    } else {
      unsubscribe = orderService.getUserOrders(loggedInUser.uid, onUpdate);
    }

    return () => {
      if (unsubscribe) unsubscribe();
      orderService.stopLiveUpdates();
    };
  }, [loggedInUser?.uid, loggedInUser?.role, dispatch]);


  // 👥 USERS LISTENER (Admin Dashboard Only)
  useEffect(() => {
    if (!loggedInUser || loggedInUser.role !== 'admin') {
      dispatch(setUsers([]));
      return;
    }

    dispatch(setUsersLoading(true));
    const unsubscribeUsers = authService.userListAdmin(
      (usersArray) => {
        dispatch(setUsers(usersArray));
        dispatch(setUsersLoading(false));
      },
      (error) => {
        console.error("❌ Users list error:", error);
        dispatch(setUsersLoading(false));
      }
    );

    return () => unsubscribe();
  }, [loggedInUser?.uid, loggedInUser?.role, dispatch]);


  // 💬 TESTIMONIALS LISTENER (Public Data)
  useEffect(() => {
    dispatch(setTestimonialsLoading(true));
    const unsubscribe = testimonialService.observeTestimonials(
      null, 
      (testimonials) => {
        dispatch(setTestimonials(testimonials));
        dispatch(setTestimonialsLoading(false));
      },
      (error) => {
        dispatch(setTestimonialsError(error.message));
        dispatch(setTestimonialsLoading(false));
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
      testimonialService.stopListener();
    };
  }, [dispatch]);


  // 📦 PRODUCT LISTENER (Store-wide Singleton)
  useEffect(() => {
    dispatch(setProductsLoading(true));
    const unsubscribe = productService.getAllProductsFromFirestore(
      (newProducts) => {
        dispatch(setProducts(newProducts));
        dispatch(setProductsLoading(false));
      },
      (error) => {
        dispatch(setProductsError(error));
        dispatch(setProductsLoading(false));
      }
    );
    return () => {
      if (unsubscribe) unsubscribe();
      productService.stopLiveUpdates();
    };
  }, [dispatch]);


  return children;
};

export default AppInitializer;
