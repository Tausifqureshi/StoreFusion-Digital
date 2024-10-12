import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'; // Redux dispatch import
import { clearCart } from '../../redux/cartSlice'; // Import clearCart action


function Razorpay({ cartItems, totalAmount }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch(); // Initialize Redux dispatch

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

          // Clear cart from Redux and localStorage
          dispatch(clearCart());  // Clear cart from Redux state
          localStorage.removeItem('cart');  // Clear cart from local storage
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







// aisa ho sakta haija  me products add karo or cart me  payment kar do payment karne ke baad localstorage se products delete and but jis ki payment hohi hai o sirf ordert page pe hi show ho lekin localstorage se delete ho chuka ho kaiss kar re ge redux ke sath