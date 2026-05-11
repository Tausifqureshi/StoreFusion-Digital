import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  items: [], // Full orders history
  orderCount: 0, // Metadata (Active orders count for Navbar)
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: { 
    setOrdersLoading(state, action) {
      state.loading = action.payload;
    },

    setOrdersError(state, action) {
      state.error = action.payload;
    },

    addOrder(state, action) {
      state.items.push(action.payload);
      state.orderCount = state.items.filter(o => 
        !["delivered", "cancelled", "refunded", "returned"].includes(o.status?.toLowerCase())
      ).length;

    },
    
    clearOrders(state) {
      state.items = [];
      state.orderCount = 0;
    },
    cancelOrder(state, action) {
      const orderToCancel = state.items.find((order) => order.id === action.payload.id);
      if (orderToCancel) {
        orderToCancel.status = "cancelled";
      }
    },
    setOrders(state, action) {
      state.items = action.payload || [];
      state.orderCount = state.items.filter(o => 
        !["delivered", "cancelled", "refunded", "returned"].includes(o.status?.toLowerCase())
      ).length;

    },
  },
});

export const { addOrder, clearOrders, cancelOrder, setOrders, setOrdersLoading, setOrdersError } = orderSlice.actions;

export default orderSlice.reducer;
