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
























function ProductCard() {

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Our Latest Collection
          </h1>
  <div className="h-1 w-20 bg-blue-800 rounded transition-all duration-300 ease-in-out hover:bg-blue-600"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {product.map((item, index) => {
            const { title, price, imageUrl, description } = item;
            const isExpanded = showMoreIndex[index];
            return (
              <div className="p-4" key={index}>
                <div className={`border-2 hover:shadow-xl transition-shadow duration-300 ease-in-out ${mode === 'dark' ? 'bg-gray-800' : 'border-gray-200'} border-opacity-60 rounded-2xl overflow-hidden`}>
                  <div className="flex justify-center cursor-pointer">
                    <img className="rounded-2xl w-full h-56 object-cover p-2 hover:scale-110 transition-transform duration-300 ease-in-out" src={imageUrl} alt="product" />
                  </div>

                  <div className="p-5 border-t-2 flex flex-col">
                    <h2 className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${mode === 'dark' ? 'text-white' : ''}`}>
                      StoreFusion
                    </h2>
                    <h1 className={`title-font text-lg font-medium mb-3 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {title}
                    </h1>

                    <p className={`leading-relaxed mb-3 ${mode === 'dark' ? 'text-white' : ''}`}>₹ {price}</p>

                    <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isExpanded ? 'max-h-[600px]' : 'max-h-0'}`} style={{ transitionProperty: 'max-height' }}>
                      <p className={`leading-relaxed mb-3 ${mode === "dark" ? "text-white" : ""}`}>
                        {description}
                      </p>
                    </div>

                    <div className="flex justify-between mt-3">
                      <button onClick={() => addCart(item)} type="button" className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 mr-2">
                        Add To Cart
                      </button>
                      <button onClick={() => { toggleShowMore(index) }} className="text-gray-600 hover:text-blue-600 font-medium text-sm">
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


