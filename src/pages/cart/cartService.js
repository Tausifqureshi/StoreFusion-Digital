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
export const saveCart = async (cart, user) => {
  try {
    if (user?.uid) {
      return await saveCartToFirestore(user.uid, cart);
    } else {
      return await saveGuestCartToFirestore(cart);
    }
  } catch (error) {
    console.error("❌ saveCart service error:", error);
    throw error;
  }
};

// 🔥 Load cart
export const loadCart = async (user) => {
  try {
    if (user?.uid) {
      return await getCartFromFirestore(user.uid);
    } else {
      return await getGuestCartFromFirestore();
    }
  } catch (error) {
    console.error("❌ loadCart service error:", error);
    return [];
  }
};

// 🔥 Clear cart
export const clearCartStorage = async (user) => {
  try {
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

