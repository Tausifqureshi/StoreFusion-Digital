// Order Components 
import React, { useContext, useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MyContext } from "../../context api/myContext";

function Order() {
  const [userOrders, setUserOrders] = useState([]);
  const { mode, loading } = useContext(MyContext);

  useEffect(() => {
    const userid = JSON.parse(localStorage.getItem('user')).uid;
    
    // Get all orders from localStorage
    const ordersFromLocalStorage = JSON.parse(localStorage.getItem('orders')) ?? [];

    // Filter orders by the logged-in user's id
    const filteredOrders = ordersFromLocalStorage.filter(order => order.userid === userid);
    
    setUserOrders(filteredOrders);
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      {userOrders.length > 0 ? (
        <div className="h-full pt-10">
          {userOrders.map((orderItem, index) => (
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={index}>
              {orderItem.cartItems.map((item, idx) => (
                <div className="rounded-lg md:w-2/3" key={idx}>
                  <div
                    className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    style={{
                      backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                      color: mode === 'dark' ? 'white' : 'black',
                    }}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product-image"
                      className="w-full h-32 object-contain rounded-lg sm:w-40 sm:h-32"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                          {item.title}
                        </h2>
                        <p className="mt-1 text-xs" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;






// Crat Sile
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
            return newState; // Return new state after deletion
        },

        setOrders(state, action) {
            return action.payload; // Set orders from payload
        },

        // New reducer to clear the cart after successful payment
        clearCart() {
            localStorage.removeItem('cart'); // Clear local storage
            return []; // Empty array represents cleared cart
        }
    }
});

// Export the new clearCart action
export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity, clearCart, setOrders } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;






































//RozarPay code

import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'; 
// import { clearCart } from '../../redux/cartSlice';

function Razorpay({ cartItems, totalAmount }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch();

  const buyNow = async () => {
    let user;
    try {
      const userData = localStorage.getItem("user");
      console.log("User data from localStorage:", userData);
      user = JSON.parse(userData);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return toast.error('User data is corrupted or invalid');
    }

    if (!user || !user.email || !user.uid) {
      return toast.error('User information is missing or invalid');
    }

    const addressInfo = {
      name: formData.fullName,
      address: formData.address,
      pincode: formData.pincode,
      phoneNumber: formData.phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    var options = {
      key: "rzp_test_s2VG2G2HwcOQd6",
      key_secret: "13wTYUM144Kv98GujKu6kkB6",
      amount: parseInt(totalAmount * 100), 
      currency: "INR",
      order_receipt: 'order_rcptid_' + formData.fullName,
      name: "StoreFusion",
      description: "for testing purpose",
      handler: async function (response) {
        try {
          console.log("Razorpay response:", response);
          toast.success('Payment Successful', { autoClose: 1000 });

          const paymentId = response.razorpay_payment_id;
          const orderInfo = {
            cartItems, 
            addressInfo,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            email: user.email,
            userid: user.uid,
            paymentId,
            totalAmount,
          };

          const orderRef = collection(fireDB, "orders");
          await addDoc(orderRef, orderInfo); 
          toast.success('Order saved successfully');

          // Save orders to localStorage as well
          const existingOrders = JSON.parse(localStorage.getItem('orders')) ?? [];
          const updatedOrders = [...existingOrders, orderInfo];
          localStorage.setItem('orders', JSON.stringify(updatedOrders));

          // Clear cart from Redux and localStorage
          dispatch(clearCart());  
          localStorage.removeItem('cart');  
        } catch (error) {
          console.log("Error saving order:", error);
          toast.error('Failed to save order');
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <Modal buyNow={buyNow} formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default Razorpay;
