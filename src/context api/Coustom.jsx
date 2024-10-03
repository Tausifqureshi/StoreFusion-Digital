// Cart Silce File Code. Quantity 


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addToCart(state, action) {
          state.push(action.payload); // New product added with quantity 1
      },
      // Quantity increment function
      incrementQuantity(state, action) {
          const item = state.find(item => item.id === action.payload);
          if (item) {
              item.quantity += 1;  // Quantity ko 1 se badhao
          }
      },
      deleteFromCart(state, action) {
          return state.filter(item => item.id !== action.payload.id);
      }
  }
});

// Export the actions to be used in components
export const { addToCart, incrementQuantity, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;








//Add Cart Code
const addCart = (product) => {
  // Check if the product is already in the cart
  const isProductInCart = cartItems.some(item => item.id === product.id);

  if (isProductInCart) {
      // Agar product pehle se cart mein hai, to quantity badhao
      dispatch(incrementQuantity(product.id));  // Quantity ko badhane ke liye naya action
      toast.info(`Product quantity updated!`, {
          position: "top-right",
          autoClose: 1500, // 1.5 seconds auto close
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored"
      });
  } else {
      // Agar product cart mein nahi hai, to product ko add karo aur initial quantity 1 set karo
      const serializedProduct = {
          ...product,
          time: product.time?.seconds ?? Date.now(),
          quantity: 1 // Initial quantity 1
      };
      dispatch(addToCart(serializedProduct));
      toast.success(`Product added to cart!`, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored"
      });
  }
};



























