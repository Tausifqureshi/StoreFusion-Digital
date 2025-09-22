import { createSlice } from "@reduxjs/toolkit";

// Helper function: current cart key 
const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? `cart_${user.email}` : "cart_guest";
};

// Initial state: load user-specific cart
// let initialState;{
//   const cartKey = getCartKey(); // Pehle check karo user login hai ya guest
//   initialState = JSON.parse(localStorage.getItem(cartKey)) ?? [];
// }


// Initial state: load user-specific cart
const initialState = JSON.parse(localStorage.getItem(getCartKey())) ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ Add product
    addToCart(state, action) {
      // console.log (state, "State milri hai")
      const cartKey = getCartKey();
      state.push(action.payload);
      //  console.log("➡️ After Add:", state);
      localStorage.setItem(cartKey, JSON.stringify(state));
    },

    // 🔼 Increment quantity
    incrementQuantity(state, action) {
      const cartKey = getCartKey();
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem(cartKey, JSON.stringify(state));
      }
    },

    // 🔽 Decrement quantity
    decrementQuantity(state, action) {
      const cartKey = getCartKey();
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem(cartKey, JSON.stringify(state));
      }
    },

    // ❌ Delete item
    deleteFromCart(state, action) {
      const cartKey = getCartKey();
      const newState = state.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(cartKey, JSON.stringify(newState));
      return newState;
    },

    // 🗑 Clear cart (for logout)
    clearCart() {
      return [];
    },

    // 🔄 Set cart (for login)
    setCart(state, action) {
      return action.payload || [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;







