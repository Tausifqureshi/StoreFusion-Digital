// import { createSlice } from '@reduxjs/toolkit';

// // Initial state for the cart (empty array initially)
// const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

// // Create a slice for cart with actions to add and delete items
// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         // Add item to the cart
//         addToCart(state, action) {
//             state.push(action.payload); // Directly pushing payload into state (safe in Redux Toolkit)
//         },
//         // Quantity increment function
//          incrementQuantity(state, action) {
//         const item = state.find(item => item.id === action.payload);
//         if (item) {
//             item.quantity += 1;  // Quantity ko 1 se badhao
//         }
//         },
//         // Remove item from the cart based on the item id
//          deleteFromCart(state, action) {
//             // return state.filter(item => item.id !== action.payload.id); // Return new state without the item to be deleted
//             return state.filter(item => item.id !== action.payload.id); // Filter by ID
//         }
//     }
// });

// // Export the actions to be used in components
// export const { addToCart, deleteFromCart, incrementQuantity } = cartSlice.actions;
   
// // Export the reducer to be used in the Redux store
// export default cartSlice.reducer;




import { createSlice } from '@reduxjs/toolkit';

// Initial state for the cart (empty array initially)
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

// Create a slice for cart with actions to add, delete, increment, and decrement items
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add item to the cart
        addToCart(state, action) {
            state.push(action.payload); // Directly pushing payload into state (safe in Redux Toolkit)
        },
        // Quantity increment function
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;  // Quantity ko 1 se badhao
            }
        },
        // Quantity decrement function
        decrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload);
            if (item && item.quantity > 1) { // Quantity sirf tab hi kam karein jab wo 1 se zyada ho
                item.quantity -= 1;  // Quantity ko 1 se ghatao
            }
        },
        // Remove item from the cart based on the item id
        deleteFromCart(state, action) {
            return state.filter(item => item.id !== action.payload.id); // Filter by ID
        }
    }
});

// Export the actions to be used in components
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
   
// Export the reducer to be used in the Redux store
export default cartSlice.reducer;
