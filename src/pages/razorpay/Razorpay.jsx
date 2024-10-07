
import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

function Razorpay() {
  const [formData, setFormData] = useState({ fullName: '', address: '', pincode: '', phoneNumber: '' });

  const buyNow = async () => {
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
      amount: parseInt(1000 * 100), // Assuming `grandTotal` as 1000 for now
      currency: "INR",
      order_receipt: 'order_rcptid_' + formData.fullName,
      name: "StoreFusion",
      description: "for testing purpose",
      handler: async function (response) {
        toast.success('Payment Successful');

        const paymentId = response.razorpay_payment_id;
        const orderInfo = {
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };

        try {
          await addDoc(collection(fireDB, "orders"), orderInfo);
        } catch (error) {
          console.log(error);
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
      {/* Passing the buyNow function and formData state to Modal */}
      <Modal buyNow={buyNow} formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default Razorpay;








// import React, { useState } from "react";
// import Modal from "../../components/modal/Modal";
// import { addDoc, collection } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { toast } from "react-toastify";

// function Razorpay() {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     address: '',
//     pincode: '',
//     phoneNumber: ''
//   });

//   const buyNow = async () => {
//     const addressInfo = {
//       name: formData.fullName,
//       address: formData.address,
//       pincode: formData.pincode,
//       phoneNumber: formData.phoneNumber,
//       date: new Date().toLocaleString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//     };

//     var options = {
//       key: "YOUR_TEST_KEY", // Test API Key
//       amount: parseInt(1000 * 100), // Replace with your grandTotal variable
//       currency: "INR",
//       order_receipt: 'order_rcptid_' + formData.fullName,
//       name: "E-Bharat",
//       description: "for testing purpose",
//       handler: async function (response) {
//         const paymentId = response.razorpay_payment_id;

//         // Success message
//         toast.success('Payment Successful');

//         const orderInfo = {
//           addressInfo,
//           date: new Date().toLocaleString("en-US", {
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//           }),
//           paymentId,
//         };

//         try {
//           await addDoc(collection(fireDB, "orders"), orderInfo);
//           toast.success('Order placed successfully!');
//         } catch (error) {
//           console.error(error);
//           toast.error('Error while placing order');
//         }
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     var pay = new window.Razorpay(options);
//     pay.open();
//   };

//   return (
//     <div>
//       {/* Passing the buyNow function and formData state to Modal */}
//       <Modal buyNow={buyNow} formData={formData} setFormData={setFormData} />
//     </div>
//   );
// }

// export default Razorpay;
