
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { MyContext } from "../../context api/myContext";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, incrementQuantity, decrementQuantity } from "../../redux/cartSlice";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom"; // Import Link for navigation
import Razorpay from "../razorpay/Razorpay";
// import PayU from "../payu/PayU";


function Cart() {
  // console.log(fullName)
  const { mode } = useContext(MyContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);


  // Delete from cart 
  const deleteCart = (products) => {
    dispatch(deleteFromCart(products));
    toast.info('Item deleted from cart', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: "🗑️",
    });
  }

  // Local Storage se bhi products delete hona
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Total Amount Calculation
  const totalAmount = cartItems.reduce((accumulator, currentValue) => {
    const price = parseFloat(currentValue.price) || 0; // Ensure price is a number
    const quantity = parseInt(currentValue.quantity) || 0; // Ensure quantity is a number
    return accumulator + (price * quantity);
  }, 0);

  const shippingCharge = 20; // Fixed shipping charge
  const totalWithShipping = totalAmount > 0 
    ? (totalAmount + shippingCharge).toFixed(2)
    : 0;

  // Increment quantity of item
  const incrementCartQuantity = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  // Decrement quantity of item
  const decrementCartQuantity = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

return (
  <Layout>
    <div className={`min-h-screen pt-5 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

      {cartItems.length > 0 ? (
        <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
          {/* Cart Items Section */}
          <div className="md:w-2/3">
            {cartItems.map((item, index) => {
              const { title, imageUrl, price, description, quantity } = item;
              return (
                <div
                  key={index}
                  className={`mb-6 p-6 rounded-lg border drop-shadow-xl ${mode === "dark" ? "bg-gray-800" : "bg-white"} sm:flex sm:justify-between`}
                >
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className={`text-lg font-bold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                        {title}
                      </h2>
                      <p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {description}
                      </p>
                      <div className={`mt-2 p-2 rounded-md ${mode === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
                        <p className={`text-lg font-semibold text-black`}>
                          ₹ {price}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col sm:block sm:space-x-6 relative">
                      {/* Quantity Design */}
                      <div className="flex items-center space-x-2">
                        <button onClick={() => decrementCartQuantity(item.id)} className="px-2 py-1 text-lg font-semibold bg-gray-300 rounded hover:bg-gray-400">
                          -
                        </button>
                        <span className={`px-2 py-1 text-lg ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                          {quantity}
                        </span>
                        <button onClick={() => incrementCartQuantity(item.id)} className="px-2 py-1 text-lg font-semibold bg-gray-300 rounded hover:bg-gray-400">
                          +
                        </button>
                      </div>

                      {/* Delete Icon */}
                      <div onClick={() => { deleteCart(item) }} className="absolute bottom-0 right-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout Summary Section */}
          <div className={`mt-6 h-full p-6 rounded-lg border shadow-md md:mt-0 md:w-1/3 sticky top-[7.1rem] ${mode === "dark" ? "bg-gray-800" : "bg-white"}`}>
            <div className="mb-2 flex justify-between">
              <p className={`${mode === "dark" ? "text-white" : "text-gray-700"}`}>
                Total Amount
              </p>
              <p className={`${mode === "dark" ? "text-white" : "text-gray-700"}`}>
                ₹ {totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className={`${mode === "dark" ? "text-white" : "text-gray-700"}`}>
                Shipping
              </p>
              <p className={`${mode === "dark" ? "text-white" : "text-gray-700"}`}>
                ₹ {shippingCharge}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold">Total</p>
              <p className="text-lg font-bold">₹ {totalWithShipping}</p>
            </div>
            {/* Total Items Display */}
            <p className={`mt-4 p-2 rounded-md ${mode === "dark" ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-50"} mb-8`}>
              <span className={`text-sm font-semibold ${mode === "dark" ? "text-gray-300" : "text-gray-900"}`}>
                Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
           
            {/* <Modal  */}
              {/* fullName={fullName} setFullName={setFullName} address={address} setAddress={setAddress} pincode={pincode} setPincode={setPincode} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} */}
            

            {/* //  /> */}
             <Razorpay />
          </div>
      
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className={`flex flex-col items-center justify-center ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
            <h2 className="text-2xl font-bold">Your cart is currently empty</h2>
            <p className="mt-2 text-gray-500">It looks like you haven’t added anything to your cart yet.</p>
            <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  </Layout>
);

  
}

export default Cart;
