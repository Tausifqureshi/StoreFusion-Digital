// import { configureStore } from "@reduxjs/toolkit";
// import cartSlice from "./cartSlice";
// import orderSlice from "./orderSlice";

// export const store = configureStore({
//     reducer: {
//       cart: cartSlice
//     },
//     devTools:true
    
//   })
















import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice"; // Import the order slice

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        orders: orderSlice // Add orderSlice to the reducer
    },
    devTools: true // Enable Redux DevTools for debugging
});
