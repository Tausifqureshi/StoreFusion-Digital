// import React, { useState } from "react";
// // import Cart from "../cart/Cart";
// import Modal from "../../components/modal/Modal";
// import { addDoc,collection } from "firebase/firestore";
// // import { fireDB } from "../../firebase/FirebaseConfig";
// import { fireDB } from "../../firebase/FirebaseConfig";

// function Razorpay() {

//     const [formData, setFormData] = useState({ fullName: '', address: '',pincode: '' ,phoneNumber: ''});
//     // const [fullName, setFullName] = useState("")
//     // const [address, setAddress] = useState("");
//     // const [pincode, setPincode] = useState("")
//     // const [phoneNumber, setPhoneNumber] = useState("")
//     // console.log(fullName)
  
  
//     const buyNow = async () => {
//       // validation 
//       if (formData.fullName === "" || formData.address == "" || formData.pincode == "" || formData.phoneNumber == "") {
//         return toast.error("All fields are required", {
//           position: "top-center",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         })
       
//       }
     
//       const addressInfo = {
//         name,
//         address,
//         pincode,
//         phoneNumber,
//         date: new Date().toLocaleString(
//           "en-US",
//           {
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//           }
//         )
//       }
//       console.log(addressInfo)
  
//       var options = {
//         key: "",
//         key_secret: "",
//         amount: parseInt(grandTotal * 100),
//         currency: "INR",
//         order_receipt: 'order_rcptid_' + name,
//         name: "E-Bharat",
//         description: "for testing purpose",
//         handler: function (response) {
  
//           // console.log(response)
//           toast.success('Payment Successful')
  
//           const paymentId = response.razorpay_payment_id
//           // store in firebase 
//           const orderInfo = {
//             cartItems,
//             addressInfo,
//             date: new Date().toLocaleString(
//               "en-US",
//               {
//                 month: "short",
//                 day: "2-digit",
//                 year: "numeric",
//               }
//             ),
//             email: JSON.parse(localStorage.getItem("user")).user.email,
//             userid: JSON.parse(localStorage.getItem("user")).user.uid,
//             paymentId
//           }
  
//           try {
//             const result = addDoc(collection(fireDB, "orders"), orderInfo)
//           } catch (error) {
//             console.log(error)
//           }
//         },
  
//         theme: {
//           color: "#3399cc"
//         }
//       };
//       var pay = new window.Razorpay(options);
//       pay.open();
//       // console.log(pay)
//     }
//   return <div>


// <Modal
// buyNow={buyNow} 
// formData={focus}
// setFormData={setFormData}
// />
//   </div>;
// }

// export default Razorpay;















// import React, { useState } from "react";
// import Modal from "../../components/modal/Modal";
// import { addDoc, collection } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { toast } from "react-toastify";

// function Razorpay() {
//   const [formData, setFormData] = useState({ fullName: '', address: '', pincode: '', phoneNumber: '' });

//   const buyNow = async () => {
//     // validation 
//     if (formData.fullName === "" || formData.address === "" || formData.pincode === "" || formData.phoneNumber === "") {
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
//       key: "",
//       key_secret: "",
//       amount: parseInt(1000 * 100), // Assuming `grandTotal` as 1000 for now
//       currency: "INR",
//       order_receipt: 'order_rcptid_' + formData.fullName,
//       name: "E-Bharat",
//       description: "for testing purpose",
//       handler: async function (response) {
//         toast.success('Payment Successful');

//         const paymentId = response.razorpay_payment_id;
//         const orderInfo = {
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
//           await addDoc(collection(fireDB, "orders"), orderInfo);
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
//   };

//   return (
//     <div>
//       <Modal buyNow={buyNow} formData={formData} setFormData={setFormData} />
//     </div>
//   );
// }

// export default Razorpay;












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
      key: "",
      key_secret: "",
      amount: parseInt(1000 * 100), // Assuming `grandTotal` as 1000 for now
      currency: "INR",
      order_receipt: 'order_rcptid_' + formData.fullName,
      name: "E-Bharat",
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
