// import React, { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import Loader from "../loader/Loader";
// import { MdPerson } from "react-icons/md";
// import { FiMapPin } from "react-icons/fi";
// import { MdCheckCircle } from "react-icons/md";
// import { FaTrash } from "react-icons/fa";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { toast } from "react-toastify";
// import {
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   where,
// } from "firebase/firestore";
// import { saveOrderToFirestore ,cancelOrderFromFirestore} from "./orderFirestore";
// import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon"; 
// import { useDispatch, useSelector } from "react-redux";
// import { setOrders, cancelOrder } from "../../redux/orderSlice";

// function Order() { 
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userid = user?.uid;  
 
//   const { orders } = useSelector((state) => state.orders);//95597560
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false); 
//   const [mode, setMode] = useState("light");

//   // 🔹 Fetch Orders (Realtime listener from Firestore)  
//   useEffect(() => {
//     if (!userid) return;

//     const q = query(
//       collection(fireDB, "orders"),
//       where("userid", "==", userid)
//     );

//     const unsubscribe = onSnapshot(
//       q,
//       (snapshot) => {
//         const fetchedOrders = snapshot.docs.map((doc) => ({
//           id: doc.id, // Firestore document ka unique id
//           ...doc.data(), // us order ka pura data (jisne order kiya uska userid + addressInfo + cartItems etc.)
//         })); 
//         dispatch(setOrders(fetchedOrders)); // Redux me set karna
//       },
//       (error) => {
//         console.error("Error fetching orders:", error);
//       }
//     );  

//     return () => unsubscribe();
//   }, [userid, dispatch]);              

//   // 🔹 Cancel Order
//   const handleCancelOrder = async (orderItem) => {
//     if (!orderItem?.id) {
//       toast.error("Invalid order ID");
//       return;
//     }

//     setLoading(true);
//     try {  
//       await deleteDoc(doc(fireDB, "orders", orderItem.id));
 
//       // Redux se remove kar turant UI update ke liye
//       dispatch(cancelOrder({ id: orderItem.id }));

//       toast.success("Order cancelled successfully", {   
//         position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });
//     } catch (error) {
//       console.error("Error cancelling order:", error);
//       toast.error("Failed to cancel order. Try again.", {   
//         position: "top-right",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });


//     } finally {
//       setLoading(false);
//     }
//   }; 
  
//   return (
//     <Layout>
//       {loading && <Loader />}

//       {orders.length > 0 ? (
//         <div className="container mx-auto py-10">
//           <h1
//             className="text-4xl font-bold mb-6 text-center"
//             style={{ color: mode === "dark" ? "white" : "black" }}
//           >
//             Your Orders
//           </h1>

//           {orders.map((orderItem, index) => (
//             <div
//               className="bg-white rounded-lg shadow-lg mb-6 p-6 border-t-4 border-b-4 transition-transform transform"
//               key={index}
//               style={{
//                 backgroundColor: mode === "dark" ? "#282c34" : "white",
//                 borderColor: mode === "dark" ? "#444" : "#e0e0e0",
//               }}
//             >
//               {/* User */}
//               <div className="flex items-center mb-4">
//                 <MdPerson className="text-4xl text-blue-500 mr-2" />
//                 <h2
//                   className="text-lg font-bold"
//                   style={{ color: mode === "dark" ? "white" : "black" }}
//                 >
//                   {user?.fullName}
//                 </h2>
//               </div>

//               {/* Address */}
//               {orderItem.addressInfo && (
//                 <div className="border-b border-gray-300 pb-4 mb-4">
//                   <h3
//                     className="text-xl font-semibold flex items-center"
//                     style={{ color: mode === "dark" ? "white" : "black" }}
//                   >
//                     <FiMapPin className="mr-2" />
//                     Shipping Address:
//                   </h3>
//                   {Object.entries(orderItem.addressInfo).map(
//                     ([key, value], idx) => (
//                       <div
//                         key={idx}
//                         className="text-sm"
//                         style={{ color: mode === "dark" ? "white" : "gray" }}
//                       >
//                         <strong>{key}: </strong>
//                         {value}
//                       </div>
//                     )
//                   )}
//                 </div>
//               )}

//               {/* Cart Items */}
//               <h3
//                 className="text-xl font-semibold mb-2 flex items-center"
//                 style={{ color: mode === "dark" ? "white" : "black" }}
//               >
//                 <MdCheckCircle className="mr-2" />
//                 Order Items:
//               </h3>
//               {orderItem.cartItems.map((item, idx) => (
//                 <div
//                   className="flex items-start border-b border-gray-200 py-4"
//                   key={idx}
//                 >
//                   <img
//                     src={item.imageUrl}
//                     alt="product"
//                     className="w-32 h-32 object-contain rounded-lg mr-4"
//                   />
//                   <div className="flex-1">
//                     <h4
//                       className="text-lg font-bold"
//                       style={{ color: mode === "dark" ? "white" : "black" }}
//                     >
//                       {item.title}
//                     </h4>
//                     <p
//                       className="text-sm mb-1"
//                       style={{ color: mode === "dark" ? "white" : "gray" }}
//                     >
//                       {item.description}
//                     </p>
//                     <p
//                       className="text-lg font-semibold"
//                       style={{ color: mode === "dark" ? "white" : "black" }}
//                     >
//                       ₹{item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}

//               {/* Cancel Order */}
//               <button
//                 onClick={() => handleCancelOrder(orderItem)}
//                 className="mt-4 text-red-500 flex items-center"
//               >
//                 <FaTrash className="mr-1" /> Cancel Order
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h2 className="text-center text-2xl text-white">No Orders Found</h2>
//       )}

//       <ScrollToTopButoon />
//     </Layout>
//   );






// }

// export default Order;   



 








import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MdPerson, MdCheckCircle } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";

import { useDispatch, useSelector } from "react-redux";
import { setOrders, cancelOrder } from "../../redux/orderSlice";

import { getUserOrdersFromFirestore, cancelOrderFromFirestore } from "./orderFirestore";

function Order() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user?.uid;

  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // ✅ Realtime fetch orders
  useEffect(() => {
    if (!userid) return;

    const unsubscribe = getUserOrdersFromFirestore(userid, (orders) => {
      dispatch(setOrders(orders));
    });

    return () => unsubscribe();
  }, [userid, dispatch]);

  // ✅ Cancel order (UI se remove, Firestore me status = cancelled)
  const handleCancelOrder = async (order) => {
    setLoading(true);
    try {
      // Firestore me status update
      await cancelOrderFromFirestore(order.id);

      // Redux/UI se turant remove
      dispatch(cancelOrder({ id: order.id }));

      toast.success("Order cancelled successfully");
    } catch (err) {
      toast.error("Failed to cancel order");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {loading && <Loader />}

      {orders.length > 0 ? (
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold mb-6 text-center">Your Orders</h1>

          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow mb-6 p-6">
              {/* User */}
              <div className="flex items-center mb-3">
                <MdPerson className="text-2xl mr-2" />
                <h2 className="font-bold">{user?.fullName}</h2>
              </div>

              {/* Address */}
              <div className="mb-4">
                <h3 className="font-semibold flex items-center">
                  <FiMapPin className="mr-1" /> Address
                </h3>
                {Object.entries(order.addressInfo || {}).map(([k, v]) => (
                  <p key={k} className="text-sm">
                    <b>{k}</b>: {v}
                  </p>
                ))}
              </div>

              {/* Items */}
              <h3 className="font-semibold flex items-center mb-2">
                <MdCheckCircle className="mr-1" /> Items
              </h3>
              {order.cartItems.map((item, i) => (
                <div key={i} className="flex gap-4 mb-3">
                  <img src={item.imageUrl} className="w-20 h-20 object-contain" />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p>₹{item.price}</p>
                  </div>
                </div>
              ))}

              {/* Cancel button only if order placed */}
              {order.status === "placed" && (
                <button
                  onClick={() => handleCancelOrder(order)}
                  className="text-red-600 flex items-center mt-3"
                >
                  <FaTrash className="mr-1" /> Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl">No Orders Found</h2>
      )}

      <ScrollToTopButoon />
    </Layout>
  );
}

export default Order;









// import React, { useContext, useEffect } from "react";
// import Layout from "../../components/layout/Layout";
// import { MyContext } from "../../context api/myContext";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteFromCart, incrementQuantity, decrementQuantity } from "../../redux/cartSlice";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import Razorpay from "../razorpay/Razorpay";
// import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
// import { saveCartToFirestore } from "./cartFirestore";

// function Cart() {
//   const { mode } = useContext(MyContext);
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);
// // const user = JSON.parse(localStorage.getItem("user"));
// // // console.log("User in Cart:", user);
// // // console.log("UID:", user?.uid);

// // useEffect(() => {
// //   console.log("Cart changed:", cartItems);
// //   if (user?.uid) {
// //     console.log("Saving to Firestore...");
// //     saveCartToFirestore(user.uid, cartItems);
// //   } else {
// //     console.log("No UID, not saving");
// //   }
// // }, [cartItems]);


//   // Delete from cart
//   const deleteCart = (products) => {
//     dispatch(deleteFromCart(products));
//     toast.info("Item deleted from cart", {
//       position: "top-right",
//       autoClose: 1000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       icon: "🗑️",
//     });
//   };

//   // Total Amount Calculation
//   const totalAmount = cartItems.reduce((acc, item) => {
//     const price = parseFloat(item.price) || 0;
//     const quantity = parseInt(item.quantity) || 0;
//     return acc + price * quantity;
//   }, 0);

//   const shippingCharge = 20;
//   const totalWithShipping = totalAmount > 0 ? (totalAmount + shippingCharge).toFixed(2) : 0;

//   // Increment quantity
//   const incrementCartQuantity = (itemId) => {
//     dispatch(incrementQuantity(itemId));
//   };

//   // Decrement quantity
//   const decrementCartQuantity = (itemId) => {
//     dispatch(decrementQuantity(itemId));
//   };

//   return (
//     <Layout>
//       <div className={`min-h-screen pt-5 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
//         <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

//         {cartItems.length > 0 ? (
//           <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
//             {/* Cart Items */}
//             <div className="md:w-2/3">
//               {cartItems.map((item, index) => {
//                 const { title, imageUrl, price, description, quantity } = item;
//                 return (
//                   <div
//                     key={index}
//                     className={`mb-6 p-6 rounded-lg border drop-shadow-xl ${mode === "dark" ? "bg-gray-800" : "bg-white"} sm:flex sm:justify-between`}
//                   >
//                     <img src={imageUrl} alt="product" className="w-full h-32 object-contain rounded-lg sm:w-40 sm:h-32" />

//                     <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                       <div className="mt-5 sm:mt-0">
//                         <h2 className={`text-lg font-bold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
//                           {title}
//                         </h2>
//                         <p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
//                           {description}
//                         </p>
//                         <div className={`mt-2 p-2 rounded-md ${mode === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
//                           <p className="text-lg font-semibold text-black">₹ {price}</p>
//                         </div>
//                       </div>

//                       <div className="mt-4 sm:mt-0 flex flex-col sm:block sm:space-x-6 relative">
//                         {/* Quantity */}
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => decrementCartQuantity(item.id)}
//                             className="px-2 py-1 text-lg font-semibold bg-gray-300 rounded hover:bg-gray-400"
//                           >
//                             -
//                           </button>
//                           <span className={`px-2 py-1 text-lg ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
//                             {quantity}
//                           </span>
//                           <button
//                             onClick={() => incrementCartQuantity(item.id)}
//                             className="px-2 py-1 text-lg font-semibold bg-gray-300 rounded hover:bg-gray-400"
//                           >
//                             +
//                           </button>
//                         </div>

//                         {/* Delete */}
//                         <div onClick={() => deleteCart(item)} className="absolute bottom-0 right-0">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             strokeWidth={1.5}
//                             stroke="currentColor"
//                             className="w-6 h-6 cursor-pointer hover:text-red-500"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                             />
//                           </svg>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Checkout Summary */}
//             <div
//               className={`mt-6 h-full p-6 rounded-lg border shadow-md md:mt-0 md:w-1/3 sticky top-[7.1rem] ${
//                 mode === "dark" ? "bg-gray-800" : "bg-white"
//               }`}
//             >
//               <div className="mb-2 flex justify-between">
//                 <p>Total Amount</p>
//                 <p>₹ {totalAmount.toFixed(2)}</p>
//               </div>
//               <div className="flex justify-between">
//                 <p>Shipping</p>
//                 <p>₹ {shippingCharge}</p>
//               </div>
//               <hr className="my-4" />
//               <div className="flex justify-between mb-3">
//                 <p className="text-lg font-bold">Total</p>
//                 <p className="text-lg font-bold">₹ {totalWithShipping}</p>
//               </div>

//               <p className={`mt-4 p-2 rounded-md ${mode === "dark" ? "bg-gray-700" : "bg-gray-50"} mb-8`}>
//                 <span className="text-sm font-semibold">
//                   Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}
//                 </span>
//               </p>

//               <Razorpay cartItems={cartItems} totalAmount={totalWithShipping} />
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-screen">
//             <div className="flex flex-col items-center justify-center">
//               <h2 className="text-2xl font-bold">Your cart is currently empty</h2>
//               <p className="mt-2 text-gray-500">It looks like you haven’t added anything to your cart yet.</p>
//               <Link to="/" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//                 Continue Shopping
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//       <ScrollToTopButoon />
//     </Layout>
//   );
// }