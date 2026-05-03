// services/cartService.js

import {
  saveCartToFirestore,
  saveGuestCartToFirestore,
  getCartFromFirestore,
  getGuestCartFromFirestore,
  clearUserCartFromFirestore,
  clearGuestCartFromFirestore,
} from "./cartFirestore";

// 🔥 Save cart
export const saveCart = async (cart) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.uid) {
      return await saveCartToFirestore(user.uid, cart);
    } else {
      return await saveGuestCartToFirestore(cart);
    }
  } catch (error) {
    console.error("❌ saveCart service error:", error);
    throw error; // 👉 VERY IMPORTANT
  }
};

// 🔥 Load cart
export const loadCart = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.uid) {
      return await getCartFromFirestore(user.uid);
    } else {
      return await getGuestCartFromFirestore();
    }
  } catch (error) {
    console.error("❌ loadCart service error:", error);
    return []; // 👉 safe fallback
  }
};

// 🔥 Clear cart
export const clearCartStorage = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.uid) {
      return await clearUserCartFromFirestore(user.uid);
    } else {
      return await clearGuestCartFromFirestore();
    }
  } catch (error) {
    console.error("❌ clearCart service error:", error);
    throw error;
  }
};
