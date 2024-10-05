// import React, { useState } from "react";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { addDoc, collection } from "firebase/firestore";
// import { v4 as uuidv4 } from 'uuid';
// import Cart from "./Cart";

// function Razorpay() {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const buyNow = async () => {
//     // validation
//     if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
//       return toast.error("All fields are required", {
//         position: "top-center",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//     const addressInfo = {
//       name,
//       address,
//       pincode,
//       phoneNumber,
//       date: new Date().toLocaleString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//     };
//     console.log(addressInfo);

//     var options = {
//       key: "",
//       key_secret: "",
//       amount: parseInt(grandTotal * 100),
//       currency: "INR",
//       order_receipt: "order_rcptid_" + name,
//       name: "StoreFusion",
//       description: "for testing purpose",
//       handler: function (response) {
//         // console.log(response)
//         toast.success("Payment Successful");

//         const paymentId = response.razorpay_payment_id;
//         // store in firebase
//         const orderInfo = {
//           cartItems,
//           addressInfo,
//           date: new Date().toLocaleString("en-US", {
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//           }),
//           email: JSON.parse(localStorage.getItem("user")).user.email,
//           userid: JSON.parse(localStorage.getItem("user")).user.uid,
//           paymentId,
//         };

//         try {
//           const result = await addDoc(collection(fireDB, "orders"), orderInfo);
//         } catch (error) {
//           console.log(error);
//         }
//       },

//       theme: {
//         color: "#3399cc",
//       },
//     };
//     var pay = new window.Razorpay(options);
//     pay.open();
//     console.log(pay);
//   };

//   return <>
//   <Cart />
   
//   </>;
// }

// export default Razorpay;































































































