// orderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [] // Initial state for orders
};

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder(state, action) {
            state.orders.push(action.payload); // Add a new order to the orders array
        },
        clearOrders(state) {
            state.orders = []; // Clear orders in Redux state
        }
    }
});

// Export the actions
export const { addOrder, clearOrders } = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
