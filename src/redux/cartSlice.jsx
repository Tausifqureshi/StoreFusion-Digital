import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart (empty array initially)
const initialState = [];

// Create a slice for cart with actions to add and delete items
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add item to the cart
        addToCart(state, action) {
            state.push(action.payload); // Directly pushing payload into state (safe in Redux Toolkit)
        },
        // Remove item from the cart based on the item id
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id); // Return new state without the item to be deleted
        }
    }
});

// Export the actions to be used in components
export const { addToCart, deleteFromCart } = cartSlice.actions;

// Export the reducer to be used in the Redux store
export default cartSlice.reducer;
