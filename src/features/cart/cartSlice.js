import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Full cart items (Old logic)
  totalQuantity: 0, // Metadata (For Navbar)
  totalPrice: 0, // Metadata (For Navbar)
  loading: false,
  error: null,
};

/**
 * 🛠️ Helper to sync totals whenever items array changes
 * This prevents repetitive code in reducers.
 */
const updateCartTotals = (state) => {
  state.totalQuantity = state.items.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );
  state.totalPrice = state.items.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ➕ Loading & Error
    setCartLoading(state, action) {
      state.loading = action.payload;
    },
    setCartError(state, action) {
      state.error = action.payload;
    },

    // ➕ Add product
    addToCart(state, action) {
      const item = state.items.find(p => p.id === action.payload.id);
      if (item) {
        if (item.quantity < Number(action.payload.stock || Infinity)) {
          item.quantity += action.payload.quantity;
        }
      } else {
        if (Number(action.payload.stock || 0) > 0) {
          state.items.push(action.payload);
        }
      }
      updateCartTotals(state);
    },

    incrementQuantity(state, action) {
      const item = state.items.find(p => p.id === action.payload);
      if (item && item.quantity < Number(item.stock || Infinity)) {
        item.quantity += 1;
      }
      updateCartTotals(state);
    },

    decrementQuantity(state, action) {
      const item = state.items.find(p => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      updateCartTotals(state);
    },

    deleteFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalQuantity = state.items.reduce((acc, i) => acc + i.quantity, 0);
      state.totalPrice = state.items.reduce((acc, i) => acc + (i.price * i.quantity), 0);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },

    setCart(state, action) {
      const newItems = action.payload || [];
      const isIdentical = state.items.length === newItems.length &&
        state.items.every((item, index) => 
          item.id === newItems[index].id && item.quantity === newItems[index].quantity
        ); //ska matlab hai: "Bhai, jab data badla hi nahi, toh state ko chhedo mat, jaisa hai waisa hi rehne do."

      if (isIdentical) return state;  //agar data badla nahi hai toh state ko mat badlo 

      state.items = newItems; // agar data badla hai toh state ko badlo
      updateCartTotals(state); // or agar data badla hai toh totals ko update karo


  //immutable way
  //  const newItems = action.payload || [];

  // const isIdentical =
  //   state.items.length === newItems.length &&
  //   state.items.every(
  //     (item, index) =>
  //       item.id === newItems[index]?.id &&
  //       item.quantity === newItems[index]?.quantity
  //   );

  // if (isIdentical) {
  //   return state;
  // }

  // return {
  //   ...state,
  //   items: newItems,
  //   totalQuantity: newItems.reduce(
  //     (acc, item) => acc + (item.quantity || 1),
  //     0
  //   ),
  //   totalPrice: newItems.reduce(
  //     (acc, item) =>
  //       acc + (Number(item.price) || 0) * (item.quantity || 1),
  //     0
  //   ),
  // };


    
    }


  }
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  deleteFromCart,
  clearCart,
  setCart,
  setCartLoading,
  setCartError
} = cartSlice.actions;


export default cartSlice.reducer;
