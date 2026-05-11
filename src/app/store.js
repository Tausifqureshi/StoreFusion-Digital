import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/orderSlice";
import productReducer from "../features/products/productSlice";
import userReducer from "../features/users/userSlice";
import testimonialReducer from "../features/testimonials/testimonialSlice";

/**
 * Global Redux Store: Centralized state management.
 * Middleware is configured for performance and debugging.
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orders: orderReducer,
    products: productReducer,
    users: userReducer,
    testimonials: testimonialReducer,
  },

  // 🛡️ SERIALIZABLE CHECK ENABLED: Ensuring production-grade data flow.
  // We've normalized Firestore timestamps to ISO Strings in the Service Layer.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true, 
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
