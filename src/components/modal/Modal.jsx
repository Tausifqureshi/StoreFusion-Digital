// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";

// function Modal({ formData , setFormData }) {
//   // const {fullName , address, pincode, phoneNumber } = formData
//   console.log(formData)
//   let [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   const handleChange = (e) => {
//     // const { name, value } = e.target;
//     // setFormData((prev) => ({ ...prev, [name]: value }));
//     console.log("Clicked Form")
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
//                 {/* Modal Panel */}
//                 <Dialog.Panel className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg transform overflow-hidden rounded-lg bg-white p-6 sm:p-8 shadow-xl transition-all">
//                   <div className="flex flex-col items-center justify-center">
//                     <h2 className="text-lg font-semibold text-gray-900 mb-4">
//                       Complete Your Order
//                     </h2>
//                     <form className="w-full space-y-3">
//                       <div>
//                         <label
//                           htmlFor="name"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Full Name
//                         </label>
//                         <input
//                           type="text"
//                           name="fullName"
//                           id="name"
//                           className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
//                           // value={fullName} 
//                           onChange={ handleChange }

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
//                           // value={address} 
//                           // onChange={ handleChange }

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
//                           // value={pincode} 
//                           // onChange={handleChange }

//                         />
//                       </div>

//                       <div>
//                         <label
//                           htmlFor="mobileNumber"
//                           className="block text-sm font-medium text-gray-700"
//                         >
//                           Mobile Number
//                         </label>
//                         <input
//                           type="text"
//                           name="phoneNumber"
//                           id="phoneNumber"
//                           className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
//                           // value={phoneNumber} 
//                           // onChange={ handleChange }
//                         />
//                       </div>
//                     </form>

//                     <button
//                       onClick={closeModal}
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
import { Fragment, useState } from "react";

function Modal({ formData, setFormData }) {
  // console.log(formData)
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("Click now");
  };

  return (
    <>
      <div className="text-center">
        <button
          type="button"
          onClick={openModal}
          className="w-full bg-blue-600 py-2 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Buy Now
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center pt-28 px-4 text-center sm:items-start sm:pt-[7.1rem] md:pt-[7.1rem] lg:pt-[7.1rem]">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all">
                  <div className="flex flex-col items-center justify-center">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Complete Your Order
                    </h2>
                    <form className="w-full space-y-3">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
                          // value={formData.fullName} // Use formData
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          id="address"
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
                          // value={formData.address} // Use formData
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="pincode"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          id="pincode"
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
                          // value={formData.pincode} // Use formData
                          onChange={handleChange}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 outline-none focus:ring-blue-500 focus:border-blue-500"
                          // value={formData.phoneNumber} // Use formData
                          onChange={handleChange}
                        />
                      </div>
                    </form>

                    <button
                      onClick={closeModal}
                      type="button"
                      className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
