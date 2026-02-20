// services/cartService.js

import {
  saveCartToFirestore,
  saveGuestCartToFirestore,
  getCartFromFirestore,
  getGuestCartFromFirestore,
  clearUserCartFromFirestore,
  clearGuestCartFromFirestore,
} from "../pages/cart/cartFirestore";

// 🔥 Save cart (user ya guest automatically detect karega)
export const saveCart = async (cart) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.uid) {
    return await saveCartToFirestore(user.uid, cart);
  } else {
    return await saveGuestCartToFirestore(cart);
  }
};

// 🔥 Load cart
export const loadCart = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.uid) {
    return await getCartFromFirestore(user.uid);
  } else {
    return await getGuestCartFromFirestore();
  }
};

// 🔥 Clear cart
export const clearCartStorage = async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.uid) {
    return await clearUserCartFromFirestore(user.uid);
  } else {
    return await clearGuestCartFromFirestore();
  }
};
