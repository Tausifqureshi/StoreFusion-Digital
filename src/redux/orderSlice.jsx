// redux/orderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  orders: [], // Initial state for orders
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: { 
    addOrder(state, action) {
      state.orders.push(action.payload); // Add new order
    },
    clearOrders(state) {
      state.orders = []; // Clear all orders
    },
    cancelOrder(state, action) {
      const orderToCancel = state.orders.find((order) => order.id === action.payload.id);
      if (orderToCancel) {
        orderToCancel.status = "cancelled";
      }
    },
    setOrders(state, action) {
      state.orders = action.payload; // Replace with fresh orders (from Firebase fetch)
    },
  },
});

export const { addOrder, clearOrders, cancelOrder, setOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
