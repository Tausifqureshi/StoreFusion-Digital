import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'; // Redux dispatch import
import { clearCart } from '../../redux/cartSlice'; // Import clearCart action
import { addOrder } from '../../redux/orderSlice';
import { saveCartToFirestore, clearUserCartFromFirestore } from "../cart/cartFirestore";
import { saveOrderToFirestore } from "../../components/order/orderFirestore"

// ✅ ABSOLUTE ISOLATION: Razorpay component remains 100% IDLE during cart updates.
// It pulls the latest data via stable Ref snapshots only when the trigger is fired.
const Razorpay = React.memo(function Razorpay({ cartItemsRef, totalAmountRef }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch(); // Initialize Redux dispatch

  const cashOnDelivery = async () => {
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      toast.error("Invalid user data");
      return;
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

      const savedOrder = await saveOrderToFirestore(orderInfo);
      toast.success('Order placed successfully via COD', { autoClose: 1000 });
      // Red  ux store me order ko add kar rahe hain
      dispatch(addOrder(savedOrder));
      // Redux store se cart ko clear kar rahe hain
      dispatch(clearCart());
      // Firestore se cart ko clear kar rahe hain
      await clearUserCartFromFirestore(user.uid);
      // paymentSuccess event ko dispatch kar rahe hain
      window.dispatchEvent(new Event("paymentSuccess"));
    } catch (error) {
      console.error("Error saving COD order:", error);
      toast.error('Failed to place COD order', { autoClose: 1000 });
    }
  };

  const buyNow = async () => {
    // const user = JSON.parse(localStorage.getItem("user"));
    let user;

    // try {
    //   const userData = localStorage.getItem("user");
    //   console.log("User data from localStorage:", userData);
    //   user = JSON.parse(userData);
    // } catch (error) {
    //   console.error("Error parsing user data:", error);
    //   return toast.error('User data is corrupted or invalid');
    // }

    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      toast.error("Invalid user data");
      return;
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

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET, // ⚠️ Test only — production me backend me hoga
      amount: parseInt(totalAmountRef.current * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + formData.fullName,
      name: "StoreFusion",
      description: "for testing purpose",
      handler: async function (response) {
        //  console.log("Razorpay response received:", response);
        try {
          window.dispatchEvent(new Event("paymentSuccess"));
          // console.log("Razorpay response:", response);
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

          // const orderRef = collection(fireDB, "orders");
          // await addDoc(orderRef, orderInfo); 
          const savedOrder = await saveOrderToFirestore(orderInfo);
          toast.success('Order saved successfully', { autoClose: 1000 });
          // ✅ Redux update (immediate UI update)
          dispatch(addOrder(savedOrder));
          // dispatch(addOrder(orderInfo)); // use saved order with ID

          // Clear cart from Redux and localStorage
          dispatch(clearCart());  // Clear cart from Redux state
          // localStorage.removeItem('cart');  // Clear cart from local storage
          // ✅ LocalStorage clear (user specific)
          // const cartKey = user ? `cart_${user.email}` : "cart_guest";
          // localStorage.removeItem(cartKey);


          // 4️⃣ Firestore → clear cart 🔥
          // await saveCartToFirestore(user.uid, []);
          await clearUserCartFromFirestore(user.uid);

        } catch (error) {
          console.error("Error saving order:", error);
          toast.error('Failed to save order', { autoClose: 1000 });
        }
      },
      // ✅ YAHI add karna haia
      modal: {
        ondismiss: function () {
          window.dispatchEvent(new Event("paymentClosed"));
        },
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
      <Modal buyNow={buyNow} cashOnDelivery={cashOnDelivery} formData={formData} setFormData={setFormData} />
    </div>
  );
});

export default Razorpay;
