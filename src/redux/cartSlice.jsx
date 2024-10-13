
import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart (empty array initially)
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

// Add clearCart to the reducers inside cartSlice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.push(action.payload);
            localStorage.setItem('cart', JSON.stringify(state)); // Update local storage
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(state)); // Update local storage after incrementing
            }
        },
        decrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(state)); // Update local storage after decrementing
            }
        },
        deleteFromCart(state, action) {
            const newState = state.filter(item => item.id !== action.payload.id);
            // localStorage.setItem('cart', JSON.stringify(newState)); // Update local storage after deletion
            return newState; // Return new state after deletion
        },

       
 
        // New reducer to clear the cart after successful payment
        clearCart(state) {
            localStorage.removeItem('cart'); // Clear local storage
            return []; // Empty array represents cleared cart
        },
        
          // Cancel the order by removing it from the state
          cancelOrder(state, action) {
            return state.filter(order => order.id !== action.payload.id); // Remove the cancelled order
        }
    }
});

// Export the new clearCart action
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart, cancelOrder} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
