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


  // 📝 USER ORDERS LISTENER (Real-time Sync for Navbar Count)
  useEffect(() => {
    if (!loggedInUser?.uid) {
      dispatch(setOrders([]));
      return;
    }

    // Only track specific user orders at root for Navbar count consistency
    // Global admin orders will be tracked in the Dashboard component
    if (loggedInUser.role === 'admin') return;

    dispatch(setOrdersLoading(true));
    const unsubscribe = orderService.getUserOrders(loggedInUser.uid, (orders) => {
      dispatch(setOrders(orders));
      dispatch(setOrdersLoading(false));
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [loggedInUser?.uid, loggedInUser?.role, dispatch]);


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
    };
  }, [dispatch]);


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
    };
  }, [dispatch]);


  return children;
};

export default AppInitializer;
