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























import React, { useContext } from 'react';
import Layout from '../../components/layout/Layout';
import { MyContext } from '../../context api/myContext';
import Modal from '../../components/modal/Modal';

function Cart() {
  const { mode } = useContext(MyContext);

  return (
    <Layout>
      <div className={`min-h-screen pt-5 ${mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

        <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items Section */}
          <div className="md:w-2/3">
            <div className={`mb-6 p-6 rounded-lg border drop-shadow-xl ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} sm:flex sm:justify-between`}>
              <img
                src="https://dummyimage.com/400x400"
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>This is title</h2>
                  <p className={`text-sm ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>desc</p>
                  <p className={`mt-1 text-xs font-semibold ${mode === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>₹100</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-4 sm:block sm:space-x-6">
                  {/* Modern Quantity Design */}
                  <div className="flex items-center space-x-2">
                    <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-semibold text-gray-700 flex justify-center items-center">
                      -
                    </button>
                    <span className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>1</span>
                    <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-lg font-semibold text-gray-700 flex justify-center items-center">
                      +
                    </button>
                  </div>

                  {/* Modern Remove Icon */}
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Summary Section */}
          <div className={`mt-6 h-full p-6 rounded-lg border shadow-md md:mt-0 md:w-1/3 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mb-2 flex justify-between">
              <p className={`${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>Subtotal</p>
              <p className={`${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>₹100</p>
            </div>
            <div className="flex justify-between">
              <p className={`${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>Shipping</p>
              <p className={`${mode === 'dark' ? 'text-white' : 'text-gray-700'}`}>₹20</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">₹200</p>
            </div>

            {/* Buy Now Button */}
            <Modal />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;




