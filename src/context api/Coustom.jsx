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









































// service cloud.firestore {
//   match /databases/{database}/documents {
    
//     // Rules for Users Collection
//     match /users/{userId} {
//       // Allow read/write if user is authenticated and either it's the same user or they are an admin
//       allow read, write: if request.auth != null && 
//                         (request.auth.uid == userId || request.auth.token.role == 'admin');
//     }
    
//     // Rules for Admin-Specific Data
//     match /adminData/{document} {
//       // Only allow users with 'admin' role to read/write
//       allow read, write: if request.auth != null && request.auth.token.role == 'admin';
//     }

//     // General Rules for All Other Documents
//     match /{document=**} {
//       // Allow read/write only if the user is authenticated
//       allow read, write: if request.auth != null;
//     }
//   }
// }
























































// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";

// function Modal({ formData, setFormData, buyNow }) {
//   const { fullName, address, pincode, phoneNumber } = formData;
//   const [formError, setFormError] = useState("");

//   let [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBuyNow = () => {
//     if (!fullName || !address || !pincode || !phoneNumber) {
//       setFormError("All fields are required.");
//       return; // Modal will not close until form is complete
//     }
//     // Reset error and proceed with the buyNow logic
//     setFormError("");
//     buyNow();
//     closeModal();
//   };

//   return (
//     <>
//       <div className="text-center">
//         <button
//           type="button"
//           onClick={openModal}
//           className="w-full bg-blue-600 py-2 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Buy Now
//         </button>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-50" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-start justify-center pt-28 px-4 text-center sm:items-start sm:pt-[7.1rem] md:pt-[7.1rem] lg:pt-[7.1rem]">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
//                   <div className="flex flex-col items-center justify-center">
//                     <h2 className="text-lg font-semibold text-gray-900 mb-4">
//                       Complete Your Order
//                     </h2>

//                     <form className="w-full space-y-3">
//                       <div>
//                         <label
//                           htmlFor="fullName"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Full Name
//                         </label>
//                         <input
//                           type="text"
//                           name="fullName"
//                           id="fullName"
//                           className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
//                           value={fullName}
//                           onChange={handleInputChange}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           htmlFor="address"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Address
//                         </label>
//                         <input
//                           type="text"
//                           name="address"
//                           id="address"
//                           className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
//                           value={address}
//                           onChange={handleInputChange}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           htmlFor="pincode"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Pincode
//                         </label>
//                         <input
//                           type="text"
//                           name="pincode"
//                           id="pincode"
//                           className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
//                           value={pincode}
//                           onChange={handleInputChange}
//                         />
//                       </div>

//                       <div>
//                         <label
//                           htmlFor="phoneNumber"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Mobile Number
//                         </label>
//                         <input
//                           type="text"
//                           name="phoneNumber"
//                           id="phoneNumber"
//                           className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
//                           value={phoneNumber}
//                           onChange={handleInputChange}
//                         />
//                       </div>
//                     </form>

//                     {formError && (
//                       <p className="text-red-500 mt-2">{formError}</p>
//                     )}

//                     <button
//                       onClick={handleBuyNow}
//                       type="button"
//                       className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                     >
//                       Place Order
//                     </button>
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

// export default Modal;
