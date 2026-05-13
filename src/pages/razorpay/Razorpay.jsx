import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/cart/cartSlice';
import { addOrder } from '../../features/orders/orderSlice';
import { cartService } from "../../services/cartService";
import { orderService } from "../../services/orderService";

/**
 * Razorpay Component: Handles Payment processing and Order placement.
 * Uses Ref snapshots for cart data to prevent unnecessary re-renders during cart updates.
 */
const Razorpay = React.memo(function Razorpay({ cartItemsRef, totalAmountRef }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.loggedInUser);

  // 💵 Cash on Delivery Handler
  const cashOnDelivery = async () => {
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

    try {
      const orderInfo = {
        cartItems: cartItemsRef.current,
        addressInfo,
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        email: user.email,
        userid: user.uid,
        paymentId: "COD",
        totalAmount: totalAmountRef.current,
      };

      /* 
         PURANA CODE (Direct Firebase):
         const orderRef = collection(fireDB, "orders");
         await addDoc(orderRef, orderInfo); 
      */
      
      // ✅ NEW CODE (Service Pattern)
      const savedOrder = await orderService.saveOrder(orderInfo);
      
      dispatch(addOrder(savedOrder));
      toast.success("Order placed successfully! 🛍️");
      dispatch(clearCart());
      
      await cartService.clearUserCart(user.uid);
      
      window.dispatchEvent(new Event("paymentSuccess"));
    } catch (error) {
      console.error("Error saving COD order:", error);
      toast.error('Failed to place COD order');
    }
  };

  // 💳 Razorpay Online Payment Handler
  const buyNow = async () => {
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

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
      amount: parseInt(totalAmountRef.current * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + formData.fullName,
      name: "StoreFusion",
      description: "Secure Payment",
      handler: async function (response) {
        try {
          window.dispatchEvent(new Event("paymentSuccess"));
          toast.success('Payment Successful', { autoClose: 1000 });

          const paymentId = response.razorpay_payment_id;
          const orderInfo = {
            cartItems: cartItemsRef.current,
            addressInfo,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            email: user.email,
            userid: user.uid,
            paymentId,
            totalAmount: totalAmountRef.current,
          };

          /* 
             PURANA CODE (Direct Firebase):
             const orderRef = collection(fireDB, "orders");
             await addDoc(orderRef, orderInfo); 
          */

          // ✅ NEW CODE (Service Pattern)
          const savedOrder = await orderService.saveOrder(orderInfo);
          
          dispatch(addOrder(savedOrder));
          toast.success("Order placed successfully! 🛍️");
          dispatch(clearCart());

          await cartService.clearUserCart(user.uid);

        } catch (error) {
          console.error("Error saving order:", error);
          toast.error('Failed to save order');
        }
      },
      modal: {
        ondismiss: function () {
          window.dispatchEvent(new Event("paymentClosed"));
        },
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <Modal buyNow={buyNow} cashOnDelivery={cashOnDelivery} formData={formData} setFormData={setFormData} />
    </div>
  );
});

export default Razorpay;
