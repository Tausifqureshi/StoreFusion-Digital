// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { toast } from "react-toastify";

// function Modal({ formData, setFormData, buyNow }) {
//   const { fullName, address, pincode, phoneNumber } = formData;
//   const [isOpen, setIsOpen] = useState(false);

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
//       toast.error("All fields are required.");
//       return; // Modal will not close until form is complete
//     }

//     buyNow();
//     closeModal();
//     // Reset the formData after successful submission
//     setFormData({
//       fullName: '',
//       address: '',
//       pincode: '',
//       phoneNumber: '',
//     });
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
//             <div className="flex min-h-full items-start justify-center pt-28 px-4 text-center sm:items-start sm:pt-[7.1rem]">
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
//                         <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
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
//                         <label htmlFor="address" className="block text-sm font-medium text-gray-700">
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
//                         <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
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
//                         <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
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





import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

function Modal({ formData, setFormData, buyNow }) {
  const { fullName, address, pincode, phoneNumber } = formData;

  const [isOpen, setIsOpen] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
   const [loading, setLoading] = useState(false); // 🔹 loader for Buy Now button

    const handleBuyNowClick = () => {
    setLoading(true); // loader start
    setTimeout(() => {
      setIsOpen(true); // modal open
      setLoading(false); // loader stop
    }, 200); // 0.7s delay before modal
  };
  // const openModal = () => setIsOpen(true);
  const closeModal = () => {
    if (!placingOrder) setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 // 🔹 Stop loader and close modal on payment events
  useEffect(() => {
    const stopLoading = () => {
      setPlacingOrder(false);
      setIsOpen(false); // modal bhi close
    };

    window.addEventListener("paymentClosed", stopLoading);
    window.addEventListener("paymentSuccess", stopLoading);

    return () => {
      window.removeEventListener("paymentClosed", stopLoading);
      window.removeEventListener("paymentSuccess", stopLoading);
    };
  }, []);


  // const handleBuyNow = async () => {
  //   if (!fullName || !address || !pincode || !phoneNumber) {
  //     toast.error("All fields are required");
  //     return;
  //   }
  //   if (placingOrder) return;
  //   setPlacingOrder(true);
  //   setTimeout(() => {
  //   buyNow();
  // }, 500);
  // };

  const handleBuyNow = async () => {
    if (!fullName || !address || !pincode || !phoneNumber) {
      toast.error("All fields are required");
      return;
    }

    if (placingOrder) return;

    setPlacingOrder(true);

    try {
      await buyNow(); // Razorpay open
       setFormData({
      fullName: '',
      address: '',
      pincode: '',
      phoneNumber: '',
    });
    } catch (err) {
      setPlacingOrder(false);
    }
  };
  return (
    <>
      <button
        onClick={handleBuyNowClick}
        disabled={loading}
        className="w-full bg-blue-600 py-2 text-white font-bold rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2"
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
        ) : (
          "Buy Now"
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
          <div className="fixed inset-0 bg-black bg-opacity-50" />

          <div className="fixed inset-0 flex items-center justify-center px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">

                {/* Close */}
                <button
                  onClick={closeModal}
                  disabled={placingOrder}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
                >
                  ✕
                </button>

                <Dialog.Title className="text-lg font-semibold mb-4 text-center">
                  Complete Your Order
                </Dialog.Title>

                <div className="space-y-3">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={address}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Mobile Number"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* 🔥 Place Order */}
                <button
                  onClick={handleBuyNow}
                  disabled={placingOrder}
                  className="mt-5 w-full bg-blue-600 text-white py-2 rounded flex justify-center items-center gap-2"
                >
                  {placingOrder ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Opening Payment...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;



// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";
// import { toast } from "react-toastify";

// function Modal({ formData, setFormData, buyNow }) {
//   const { fullName, address, pincode, phoneNumber } = formData;
//   const [isOpen, setIsOpen] = useState(false);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleBuyNow = () => {
//     if (!fullName || !address || !pincode || !phoneNumber) {
//       toast.error("All fields are required", { 
//         position: "top-right" ,
//         autoClose: 1000 ,
//         hideProgressBar: false,

//       });
//       return;
//     }

//      if (placingOrder) return; // double click prevention
//   setPlacingOrder(true);

//     buyNow();
//     closeModal();

//     setFormData({
//       fullName: "",
//       address: "",
//       pincode: "",
//       phoneNumber: "",
//     });
//   };

//   return (
//     <>
//       {/* Buy Now Button */}
//       <button
//         onClick={openModal}
//         className="w-full bg-blue-600 py-2 text-white font-bold rounded-lg hover:bg-blue-700"
//       >
//         Buy Now
//       </button>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-50"
//           onClose={() => {}}   // ❌ outside click disable
//         >
//           {/* Backdrop */}
//           <div className="fixed inset-0 bg-black bg-opacity-50" />

//           <div className="fixed inset-0 flex items-center justify-center px-4">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               {/* Modal Box */}
//               <Dialog.Panel
//                 onClick={(e) => e.stopPropagation()} // extra safety
//                 className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
//               >
//                 {/* ❌ CLOSE BUTTON */}
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
//                 >
//                   ✕
//                 </button>

//                 <Dialog.Title className="text-lg font-semibold mb-4 text-center">
//                   Complete Your Order
//                 </Dialog.Title>

//                 {/* FORM */}
//                 <div className="space-y-3">
//                   <input
//                     type="text"
//                     name="fullName"
//                     placeholder="Full Name"
//                     value={fullName}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded"
//                   />

//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     value={address}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded"
//                   />

//                   <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={pincode}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded"
//                   />

//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     placeholder="Mobile Number"
//                     value={phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full border p-2 rounded"
//                   />
//                 </div>

//                 <button
//                   onClick={handleBuyNow}
//                   className="mt-5 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//                 >
//                   Place Order
//                 </button>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

// export default Modal;
