import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux'; // Redux dispatch import
import { clearCart } from '../../redux/cartSlice'; // Import clearCart action
import { addOrder} from '../../redux/orderSlice';
import { saveCartToFirestore,clearUserCartFromFirestore } from "../cart/cartFirestore";
import { saveOrderToFirestore } from "../../components/order/orderFirestore"

function Razorpay({ cartItems, totalAmount }) {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch(); // Initialize Redux dispatch

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
      // key: "rzp_test_s2VG2G2HwcOQd6",
      // key_secret: "13wTYUM144Kv98GujKu6kkB6",
      key: "rzp_test_S9C6txeTqRW5Ri",
      key_secret: "C4qX468lGMuWl1wmyHL2fqEZ",
      amount: parseInt(totalAmount * 100), 
      currency: "INR",
      order_receipt: 'order_rcptid_' + formData.fullName,
      name: "StoreFusion",
      description: "for testing purpose",
      handler: async function (response) {
        try {
          // console.log("Razorpay response:", response);
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

          // const orderRef = collection(fireDB, "orders");
          // await addDoc(orderRef, orderInfo); 
          toast.success('Order saved successfully',{ autoClose: 1000 });
          const savedOrder = await saveOrderToFirestore(orderInfo);
          // ✅ Redux update (immediate UI update)
          // dispatch(addOrder(orderInfo));
          dispatch(addOrder(savedOrder)); // use saved order with ID

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
          console.log("Error saving order:", error);
          toast.error('Failed to save order',{ autoClose: 1000 });
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
