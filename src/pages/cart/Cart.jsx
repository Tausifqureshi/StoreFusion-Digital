// import React, { useContext, useMemo, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import { MyContext } from "../../context api/myContext";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteFromCart,
//   incrementQuantity,
//   decrementQuantity,
//   clearCart,
// } from "../../redux/cartSlice";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import Razorpay from "../razorpay/Razorpay";
// import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
// // import {
// //   saveCartToFirestore,
// //   clearUserCartFromFirestore,
// //   saveGuestCartToFirestore,
// //   clearGuestCartFromFirestore,
// // } from "./cartFirestore";
// import Loader from "../../components/loader/Loader";
// import SmallSpinner from "../../components/loader/SmallSipnner";
// import { saveCart, clearCartStorage } from "./cartService";
// import { saveCartDebounce } from "./debounce";

// function Cart({ cartLoading }) {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const { mode } = useContext(MyContext);
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart) || [];
//   // const [loading, setLoading] = useState(false);
//   const [clearingCart, setClearingCart] = useState(false);
//   const [cartUpdating, setCartUpdating] = useState(null);

//   const [descOpen, setDescOpen] = useState({});
//   const toggleDesc = (index) => {
//     setDescOpen((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const [descExpanded, setDescExpanded] = useState({});
//   const toggleDescExpand = (index) => {
//     setDescExpanded((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   // See More / See Less (per cart item)
//   // const [seeMoreExpanded, setSeeMoreExpanded] = useState({});
//   // const toggleSeeMore = (index) => {
//   //   setSeeMoreExpanded((prev) => ({
//   //     ...prev,
//   //     [index]: !prev[index],
//   //   }));
//   // };

//   // Firestore sync wrapper
//   // const syncCart = async (updatedCart) => {
//   //   setLoading(true);
//   //   if (user?.uid) {
//   //     await saveCartToFirestore(user.uid, updatedCart);
//   //     setLoading(false);
//   //   } else {
//   //     // Handle guest cart logic if needed
//   //     await saveGuestCartToFirestore(updatedCart); // 🔥 MISSING
//   //     setLoading(false);
//   //   }
//   // };
//   // const syncCart = async (updatedCart) => {
//   //   // setLoading(true);
//   //   try {
//   //     if (user?.uid) {
//   //       await saveCartToFirestore(user.uid, updatedCart);
//   //     } else {
//   //       await saveGuestCartToFirestore(updatedCart);
//   //     }
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   //   // finally {
//   //   //   // 👇 loader ko dikne ka time milta hai
//   //   //   setTimeout(() => {
//   //   //     setLoading(false);
//   //   //   }, 300);
//   //   // }
//   // };

//   // Delete from cart

//   //   const syncCart = async (updatedCart) => {
//   //   await saveCart(updatedCart);
//   // };

//   const deleteCart = async (itemId) => {
//     // await syncCart(cartItems.filter((i) => i.id !== item.id));
//     const updatedCart = cartItems.filter((i) => i.id !== itemId);
//     dispatch(deleteFromCart(itemId));
//     saveCartDebounce(updatedCart);
//     toast.info("Item deleted from cart", {
//       position: "top-right",
//       autoClose: 1000,
//       icon: "🗑️",
//     });
//   };

//   // Increment quantity
//   // const incrementCartQuantity = async (itemId) => {
//   //   dispatch(incrementQuantity(itemId));
//   //   const updatedCart = cartItems.map((item) =>
//   //     item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//   //   );
//   //   await syncCart(updatedCart);
//   // };

//   // const incrementCartQuantity = async (itemId) => {
//   //   // setLoading(true);
//   //   // setCartItemUpdatingId(itemId);
//   //   setCartUpdating({ id: itemId, type: "increment" });
//   //   const updatedCart = cartItems.map((item) =>
//   //     item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
//   //   );

//   //   try {
//   //     // UI fast response (optimistic update)
//   //     dispatch(incrementQuantity(itemId));

//   //     // Firestore sync
//   //     // await syncCart(updatedCart);
//   //     saveCartDebounce(updatedCart);   // 🔥 main change
//   //     setCartUpdating(null);
//   //   } catch (error) {
//   //     console.error("Increment failed:", error);
//   //     toast.error("Failed to update quantity");
//   //   } finally {
//   //     // setLoading(false);
//   //     // setCartItemUpdatingId(null);
//   //     setCartUpdating(null);
//   //   }
//   // };
//   const incrementCartQuantity = (itemId) => {
//     setCartUpdating({ id: itemId, type: "increment" });

//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
//     );

//     dispatch(incrementQuantity(itemId));
//     saveCartDebounce(updatedCart);

//     setTimeout(() => setCartUpdating(null), 250);
//   };

//   // Decrement quantity
//   // const decrementCartQuantity = async (itemId) => {
//   //   const item = cartItems.find((i) => i.id === itemId);
//   //   if (!item || item.quantity <= 1) return;
//   //   dispatch(decrementQuantity(itemId));
//   //   const updatedCart = cartItems.map((item) =>
//   //     item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
//   //   );
//   //   await syncCart(updatedCart);
//   // };
//   const decrementCartQuantity = async (itemId) => {
//     const item = cartItems.find((i) => i.id === itemId);
//     // 👇 agar quantity 1 hai → kuch bhi mat karo
//     if (!item || item.quantity === 1) {
//       return; // ❌ NO loader, NO firestore, NO redux
//     }
//     // setCartItemUpdatingId(itemId);
//     setCartUpdating({ id: itemId, type: "decrement" });
//     const updatedCart = cartItems.map((item) => {
//       if (item.id === itemId) {
//         // quantity 1 se niche nahi jaane dena
//         if (item.quantity === 1) return item;

//         return { ...item, quantity: item.quantity - 1 };
//       }
//       return item;
//     });

//     // setLoading(true);
//     dispatch(decrementQuantity(itemId));
//     saveCartDebounce(updatedCart);
//     setTimeout(() => setCartUpdating(null), 250);
//   };

//   // Clear cart
//   // const clearCartItems = async () => {
//   //   dispatch(clearCart());
//   //   await syncCart([]);
//   //   toast.success("Cart cleared", { position: "top-right", autoClose: 1000 });
//   // };
//   // const clearCartItems = async () => {
//   //   setLoading(true);
//   //   dispatch(clearCart());
//   //   try {
//   //     // if (user?.uid) {
//   //     //   await clearUserCartFromFirestore(user.uid);
//   //     // } else {
//   //     //   await clearGuestCartFromFirestore();
//   //     // }
//   //     // toast.success("Cart cleared");
//   //     await clearCartStorage();
//   //   } catch (err) {
//   //     console.error(err);
//   //   } finally {
//   //     setTimeout(() => {
//   //       setLoading(false);
//   //     }, 300);
//   //   }
//   // };

//   const clearCartItems = async () => {
//     setClearingCart(true);

//     try {
//       await clearCartStorage();
//       toast.success("Cart cleared");

//       // 👇 spinner ko dikne ka time
//       setTimeout(() => {
//         dispatch(clearCart());
//         setClearingCart(false);
//       }, 400);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to clear cart");
//       setClearingCart(false);
//     }
//   };

//   //   const clearCartItems = async () => {
//   //   dispatch(clearCart());
//   //   if (user?.uid) {
//   //     await clearUserCartFromFirestore(user.uid);
//   //   } else {
//   //     await clearGuestCartFromFirestore ();
//   //   }

//   //   toast.success("Cart cleared");
//   // };

//   // Total calculation
//   // const totalAmount = cartItems.reduce(
//   //   (acc, item) =>
//   //     acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0),
//   //   0,
//   // );
//   const totalAmount = useMemo(() => {
//     return cartItems.reduce(
//       (acc, item) =>
//         acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0),
//       0,
//     );
//   }, [cartItems]);

//   const shippingCharge = 20;
//   const totalWithShipping =
//     totalAmount > 0 ? (totalAmount + shippingCharge).toFixed(2) : 0;

//   return (
//     <Layout>
//       {cartLoading ? (
//         <Loader />
//       ) : (
//         <div
//           className={`min-h-screen pt-5 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
//         >
//           <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

//           {cartItems.length > 0 ? (
//             <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
//               <div className="md:w-2/3">
//                 {cartItems?.map?.((item, index) => {
//                   // const isExpanded = seeMoreExpanded[index] || false;
//                   const isDescOpen = descOpen[index] || false;
//                   const isDescExpanded = descExpanded[index] || false;

//                   const shortDesc =
//                     item.description?.length > 70
//                       ? item.description.slice(0, 70) + "..."
//                       : item.description;
//                   return (
//                     <div
//                       key={index}
//                       className={`mb-6 p-6 rounded-lg border drop-shadow-xl ${
//                         mode === "dark" ? "bg-gray-800" : "bg-white"
//                       } sm:flex sm:justify-between`}
//                     >
//                       <img
//                         src={item.imageUrl}
//                         alt="product"
//                         loading="lazy"
//                         className="w-full h-32 object-contain rounded-lg sm:w-40 sm:h-32"
//                       />

//                       <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                         <div className="mt-5 sm:mt-0">
//                           <h2
//                             className={`text-lg font-bold ${mode === "dark" ? "text-white" : "text-gray-900"}`}
//                           >
//                             {item.title}
//                           </h2>

//                           {/* Description Accordion */}
//                           <div className="mt-2">
//                             <button
//                               onClick={() => toggleDesc(index)}
//                               className="flex items-center gap-1 text-blue-600 text-sm font-semibold"
//                             >
//                               <span className="hover:underline">
//                                 {isDescOpen
//                                   ? "Hide description"
//                                   : "View description"}
//                               </span>

//                               <span
//                                 className={`transform transition-transform duration-300 ${
//                                   isDescOpen ? "rotate-180" : "rotate-0"
//                                 }`}
//                               >
//                                 ▼
//                               </span>
//                             </button>
//                             {isDescOpen && (
//                               <div className="mt-1">
//                                 <p
//                                   className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
//                                 >
//                                   {isDescExpanded
//                                     ? item.description
//                                     : shortDesc}

//                                   {item.description?.length > 70 && (
//                                     <span
//                                       onClick={() => toggleDescExpand(index)}
//                                       className="text-blue-600 ml-1 cursor-pointer text-xs font-semibold hover:underline mt-1"
//                                     >
//                                       {isDescExpanded ? "See Less" : "See More"}
//                                     </span>
//                                   )}
//                                 </p>
//                               </div>
//                             )}
//                           </div>

//                           <div
//                             className={`mt-2 p-2 rounded-md ${mode === "dark" ? "bg-gray-700" : "bg-gray-50"}`}
//                           >
//                             <p className="text-lg font-semibold text-black">
//                               ₹ {item.price}
//                             </p>
//                           </div>
//                         </div>

//                         <div className="mt-4 sm:mt-0 flex flex-col sm:block sm:space-x-6 relative">
//                           <div className="flex items-center space-x-2">
//                             {/* Decrement */}
//                             <button
//                               onClick={() => decrementCartQuantity(item.id)}
//                               disabled={
//                                 cartUpdating?.id === item.id &&
//                                 cartUpdating?.type === "decrement"
//                               }
//                               className="w-8 h-8 bg-gray-300 rounded flex justify-center items-center"
//                             >
//                               {cartUpdating?.id === item.id &&
//                               cartUpdating?.type === "decrement" ? (
//                                 <span className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" />
//                               ) : (
//                                 "-"
//                               )}
//                             </button>

//                             <span>{item.quantity}</span>

//                             {/* Increment */}
//                             <button
//                               onClick={() => incrementCartQuantity(item.id)}
//                               disabled={
//                                 cartUpdating?.id === item.id &&
//                                 cartUpdating?.type === "increment"
//                               }
//                               className="w-8 h-8 bg-gray-300 rounded flex justify-center items-center"
//                             >
//                               {cartUpdating?.id === item.id &&
//                               cartUpdating?.type === "increment" ? (
//                                 <span className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" />
//                               ) : (
//                                 "+"
//                               )}
//                             </button>
//                           </div>

//                           <div
//                             onClick={() => deleteCart(item.id)}
//                             className="absolute bottom-0 right-0"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               strokeWidth={1.5}
//                               stroke="currentColor"
//                               className="w-6 h-6 cursor-pointer hover:text-red-500"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
//                               />
//                             </svg>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div
//                 className={`mt-6 h-full p-6 rounded-lg border shadow-md md:mt-0 md:w-1/3 sticky top-[7.1rem] ${
//                   mode === "dark" ? "bg-gray-800" : "bg-white"
//                 }`}
//               >
//                 <div className="mb-2 flex justify-between">
//                   <p>Total Amount</p>
//                   <p>₹ {totalAmount.toFixed(2)}</p>
//                 </div>
//                 <div className="flex justify-between">
//                   <p>Shipping</p>
//                   <p>₹ {shippingCharge}</p>
//                 </div>
//                 <hr className="my-4" />
//                 <div className="flex justify-between mb-3">
//                   <p className="text-lg font-bold">Total</p>
//                   <p className="text-lg font-bold">₹ {totalWithShipping}</p>
//                 </div>

//                 <p
//                   className={`mt-4 p-2 rounded-md ${mode === "dark" ? "bg-gray-700" : "bg-gray-50"} mb-8`}
//                 >
//                   <span className="text-sm font-semibold">
//                     Total items:{" "}
//                     {cartItems.reduce(
//                       (total, item) => total + item.quantity,
//                       0,
//                     )}
//                   </span>
//                 </p>

//                 {/* <button
//                 onClick={clearCartItems}
//                 className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
//               >
//                 Clear Cart
//               </button> */}
//                 <button
//                   onClick={clearCartItems}
//                   disabled={clearingCart}
//                   className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full flex justify-center items-center gap-2"
//                 >
//                   {clearingCart ? (
//                     <>
//                       <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                       Clearing...
//                     </>
//                   ) : (
//                     "Clear Cart"
//                   )}
//                 </button>

//                 <Razorpay
//                   cartItems={cartItems}
//                   totalAmount={totalWithShipping}
//                 />
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-screen">
//               <div className="flex flex-col items-center justify-center">
//                 <h2 className="text-2xl font-bold">
//                   Your cart is currently empty
//                 </h2>
//                 <p className="mt-2 text-gray-500">
//                   It looks like you haven’t added anything to your cart yet.
//                 </p>
//                 <Link
//                   to="/"
//                   className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//                 >
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       <ScrollToTopButoon />
//     </Layout>
//   );

// }

// export default Cart;








// import React, { useContext, useMemo, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import { MyContext } from "../../context api/myContext";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteFromCart,
//   incrementQuantity,
//   decrementQuantity,
//   clearCart,
// } from "../../redux/cartSlice";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import Razorpay from "../razorpay/Razorpay";
// import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
// import Loader from "../../components/loader/Loader";
// import { clearCartStorage } from "./cartService";
// import { saveCartDebounce } from "./debounce";
// import { FiTrash2, FiMinus, FiPlus, FiChevronDown, FiShield, FiTruck } from "react-icons/fi";

// function Cart({ cartLoading }) {
//   const { mode } = useContext(MyContext);
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart) || [];
//   const [clearingCart, setClearingCart] = useState(false);
//   const [cartUpdating, setCartUpdating] = useState(null);

//   // --- DESCRIPTION LOGIC (Wahi Original Jo Aapne Manga) ---
//   const [descOpen, setDescOpen] = useState({});
//   const toggleDesc = (index) => setDescOpen((prev) => ({ ...prev, [index]: !prev[index] }));
//   const [descExpanded, setDescExpanded] = useState({});
//   const toggleDescExpand = (index) => setDescExpanded((prev) => ({ ...prev, [index]: !prev[index] }));

//   const isDark = mode === "dark";

//   // Actions
//   const deleteCart = (itemId) => {
//     const updatedCart = cartItems.filter((i) => i.id !== itemId);
//     dispatch(deleteFromCart(itemId));
//     saveCartDebounce(updatedCart);
//     toast.error("Item Removed", { position: "bottom-right", autoClose: 1000 });
//   };

//   const incrementCartQuantity = (itemId) => {
//     setCartUpdating({ id: itemId, type: "increment" });
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
//     );
//     dispatch(incrementQuantity(itemId));
//     saveCartDebounce(updatedCart);
//     setTimeout(() => setCartUpdating(null), 250);
//   };

//   const decrementCartQuantity = (itemId) => {
//     const item = cartItems.find((i) => i.id === itemId);
//     if (!item || item.quantity === 1) return;
//     setCartUpdating({ id: itemId, type: "decrement" });
//     const updatedCart = cartItems.map((item) =>
//       item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
//     );
//     dispatch(decrementQuantity(itemId));
//     saveCartDebounce(updatedCart);
//     setTimeout(() => setCartUpdating(null), 250);
//   };

//   const clearCartItems = async () => {
//     setClearingCart(true);
//     try {
//       await clearCartStorage();
//       setTimeout(() => {
//         dispatch(clearCart());
//         setClearingCart(false);
//         toast.success("Bag Cleared");
//       }, 400);
//     } catch (err) { setClearingCart(false); }
//   };

//   const totalAmount = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * (item.quantity || 0), 0);
//   }, [cartItems]);

//   const shippingCharge = 20;
//   const totalWithShipping = totalAmount > 0 ? (totalAmount + shippingCharge).toFixed(2) : 0;

//   return (
//     <Layout>
//       {cartLoading ? <Loader /> : (
//         <div className={`min-h-screen pt-24 pb-32 md:pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}>
//           <div className="max-w-7xl mx-auto px-4">

//             {/* Header */}
//             <div className="mb-6 md:mb-10 border-b border-gray-200 dark:border-gray-800 pb-4">
//               <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">
//                 Shopping <span className="text-blue-600">Bag</span>
//               </h1>
//               <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">
//                 {cartItems.length} Premium Items
//               </p>
//             </div>

//             {cartItems.length > 0 ? (
//               <div className="flex flex-col lg:flex-row gap-6">

//                 {/* Left: Cart Items (Amazon Style Mobile Cards) */}
//                 <div className="flex-1 space-y-3">
//                   {cartItems.map((item, index) => {
//                     const isDescOpen = descOpen[index] || false;
//                     const isDescExpanded = descExpanded[index] || false;
//                     const shortDesc = item.description?.length > 60 ? item.description.slice(0, 60) + "..." : item.description;

//                     return (
//                       <div key={index} className={`p-3 md:p-6 rounded-2xl md:rounded-[30px] border transition-all ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
//                         <div className="flex gap-4">
//                           {/* Image Wrapper */}
//                           <div className={`w-24 h-28 md:w-36 md:h-36 rounded-xl p-2 flex shrink-0 items-center justify-center border bg-white ${isDark ? "border-gray-700" : "border-gray-50"}`}>
//                             <img src={item.imageUrl} alt="product" className="max-h-full object-contain" />
//                           </div>

//                           {/* Details Wrapper */}
//                           <div className="flex-1 min-w-0 flex flex-col justify-between">
//                             <div>
//                               <div className="flex justify-between items-start">
//                                 <h2 className="text-[13px] md:text-lg font-black uppercase tracking-tight leading-tight line-clamp-2">{item.title}</h2>
//                                 <button onClick={() => deleteCart(item.id)} className="text-gray-400 hover:text-red-500 pl-2"><FiTrash2 size={18} /></button>
//                               </div>
//                               <p className="text-[8px] md:text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1">{item.category}</p>

//                               {/* --- DESCRIPTION LOGIC (Original) --- */}
//                               <div className="mt-2">
//                                 <button onClick={() => toggleDesc(index)} className="flex items-center gap-1 text-blue-600 text-[9px] font-black uppercase">
//                                   {isDescOpen ? "Hide Specs" : "View Specs"} <FiChevronDown className={isDescOpen ? "rotate-180" : ""} />
//                                 </button>
//                                 {isDescOpen && (
//                                   <div className={`mt-2 p-2 rounded-lg text-[10px] leading-relaxed font-bold ${isDark ? "bg-[#131921] text-gray-400" : "bg-gray-100 text-gray-600"}`}>
//                                     {isDescExpanded ? item.description : shortDesc}
//                                     {item.description?.length > 60 && (
//                                       <span onClick={() => toggleDescExpand(index)} className="text-blue-600 ml-1 cursor-pointer underline">
//                                         {isDescExpanded ? "Less" : "More"}
//                                       </span>
//                                     )}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             {/* Price & Qty Bar (Flipkart Style) */}
//                             <div className="flex items-center justify-between mt-3">
//                               <span className="text-base md:text-xl font-black text-blue-600">₹{item.price}</span>
//                               <div className={`flex items-center rounded-lg border ${isDark ? "bg-[#131921] border-gray-700" : "bg-gray-50 border-gray-200"}`}>
//                                 <button onClick={() => decrementCartQuantity(item.id)} className="w-7 h-7 flex items-center justify-center border-r border-inherit hover:text-blue-600"><FiMinus size={12}/></button>
//                                 <span className="px-3 text-xs font-black">{item.quantity}</span>
//                                 <button onClick={() => incrementCartQuantity(item.id)} className="w-7 h-7 flex items-center justify-center border-l border-inherit hover:text-blue-600"><FiPlus size={12}/></button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })}

//                   {/* Clear Cart Button */}
//                   <button onClick={clearCartItems} disabled={clearingCart} className={`w-full py-3 text-[10px] font-black uppercase tracking-widest border-2 rounded-xl transition-all ${isDark ? "border-gray-800 text-gray-500" : "border-gray-200 text-gray-400"}`}>
//                     {clearingCart ? "Clearing..." : "Empty Shopping Bag"}
//                   </button>
//                 </div>

//                 {/* Right Sidebar: Checkout Details */}
//                 <div className="w-full lg:w-[380px]">
//                   <div className={`sticky top-32 p-6 rounded-[30px] border ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-xl"}`}>
//                     <h3 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">Payment Details</h3>
//                     <div className="space-y-4 mb-6">
//                       <div className="flex justify-between text-[11px] font-black uppercase text-gray-500"><span>Bag Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
//                       <div className="flex justify-between text-[11px] font-black uppercase text-gray-500"><span>Shipping</span><span className="text-green-600">₹{shippingCharge}</span></div>
//                       <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
//                         <span className="text-sm font-black uppercase">Grand Total</span>
//                         <span className="text-2xl font-black text-blue-600 tracking-tighter">₹{totalWithShipping}</span>
//                       </div>
//                     </div>

//                     <div className="hidden lg:block">
//                       <Razorpay cartItems={cartItems} totalAmount={totalWithShipping} />
//                       <div className="mt-4 flex items-center gap-2 opacity-50"><FiShield/><span className="text-[8px] font-black uppercase">100% Safe Payments</span></div>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             ) : (
//               <div className="flex flex-col items-center justify-center py-20">
//                 <h2 className="text-xl font-black uppercase opacity-20">Your Bag is Empty</h2>
//                 <Link to="/" className="mt-4 px-8 py-3 bg-blue-600 text-white text-[10px] font-black uppercase rounded-xl">Shop Now</Link>
//               </div>
//             )}
//           </div>

//           {/* MOBILE BOTTOM STICKY BAR (Amazon/Flipkart Style) */}
//           {cartItems.length > 0 && (
//             <div className={`lg:hidden fixed bottom-0 left-0 w-full p-4 border-t z-50 flex items-center justify-between gap-4 ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-200 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]"}`}>
//               <div className="flex flex-col">
//                 <span className="text-[10px] font-bold text-gray-400 uppercase">Total Amount</span>
//                 <span className="text-xl font-black text-blue-600 tracking-tighter">₹{totalWithShipping}</span>
//               </div>
//               <div className="flex-1 max-w-[200px]">
//                 <Razorpay cartItems={cartItems} totalAmount={totalWithShipping} />
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//       <ScrollToTopButoon />
//     </Layout>
//   );
// }

// export default Cart;










import React, { useContext, useMemo, useState, useCallback } from "react";
import Layout from "../../components/layout/Layout";
import { MyContext } from "../../context api/myContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Razorpay from "../razorpay/Razorpay";
import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
import LoaderSpinner from "../../components/loader/LoaderSpinner";
import { clearCartStorage } from "./cartService";
import { saveCartDebounce } from "./debounce";
import { FiTrash2, FiMinus, FiPlus, FiChevronDown, FiShield, FiTruck } from "react-icons/fi";
import CartItemCard from "./CartItemCard";

function Cart({ cartLoading }) {
  const { mode } = useContext(MyContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart) || [];
  const [clearingCart, setClearingCart] = useState(false);
  const [cartUpdating, setCartUpdating] = useState(null);



  const isDark = mode === "dark";

  // Actions Logic
  const deleteCart = useCallback((itemId) => {
    const updatedCart = cartItems.filter((i) => i.id !== itemId);
    dispatch(deleteFromCart(itemId));
    saveCartDebounce(updatedCart);
    toast.info("Removed from bag", { position: "bottom-right", autoClose: 1000 });
  }, [cartItems, dispatch]);

  const incrementCartQuantity = useCallback((itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item) return;

    if (item.quantity >= Number(item.stock || Infinity)) {
      toast.error(`Only ${item.stock || 'this'} left in stock!`, { position: "top-right", autoClose: 1000 });
      return;
    }

    setCartUpdating({ id: itemId, type: "increment" });
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    dispatch(incrementQuantity(itemId));
    saveCartDebounce(updatedCart);
    setTimeout(() => setCartUpdating(null), 250);
  }, [cartItems, dispatch]);

  const decrementCartQuantity = useCallback((itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (!item || item.quantity === 1) return;
    setCartUpdating({ id: itemId, type: "decrement" });
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === itemId ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    );
    dispatch(decrementQuantity(itemId));
    saveCartDebounce(updatedCart);
    setTimeout(() => setCartUpdating(null), 250);
  }, [cartItems, dispatch]);

  const clearCartItems = async () => {
    setClearingCart(true);
    try {
      await clearCartStorage();
      setTimeout(() => {
        dispatch(clearCart());
        setClearingCart(false);
        toast.success("Bag cleared");
      }, 400);
    } catch (err) { setClearingCart(false); }
  };

  const totalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (parseFloat(item.price) || 0) * (item.quantity || 0), 0);
  }, [cartItems]);

  const shippingCharge = 20;
  const totalWithShipping = totalAmount > 0 ? (totalAmount + shippingCharge).toFixed(2) : 0;

  return (
    <Layout>
      {cartLoading ? <LoaderSpinner isDark={isDark} label="Loading bag..." /> : (
        <div className={`min-h-screen pt-24 pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}>
          <div className="max-w-7xl mx-auto px-4">

            {/* Header Section */}
            <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                My <span className="text-blue-600">Shopping Bag</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                {cartItems.length} Premium Items Selected
              </p>
            </div>

            {cartItems.length > 0 ? (
              <div className="flex flex-col lg:flex-row gap-6 items-start">

                {/* Left: Cart Items List */}
                <div className="w-full lg:flex-1 space-y-4">
                  {cartItems.map((item, index) => (
                    <CartItemCard 
                      key={item.id || index}
                      item={item}
                      index={index}
                      isDark={isDark}
                      deleteCart={deleteCart}
                      decrementCartQuantity={decrementCartQuantity}
                      incrementCartQuantity={incrementCartQuantity}
                      cartUpdating={cartUpdating}
                    />
                  ))}
                </div>

                {/* Right: Modern Sticky Sidebar */}
                <div className="w-full lg:w-[380px] lg:sticky lg:top-32">
                  <div className={`p-6 rounded-[30px] border ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-gray-200/50"}`}>
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-6 opacity-50">Pricing Details</h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                        <span>Bag Total</span>
                        <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>₹ {totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-gray-500">
                        <span>Shipping Fee</span>
                        <span className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}>₹ {shippingCharge}</span>
                      </div>
                      <div className="border-t border-dashed border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center">
                        <span className="text-sm font-black uppercase">Total Payable</span>
                        <span className={`text-2xl font-medium ${isDark ? "text-white" : "text-gray-900"}`}>₹ {totalWithShipping}</span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-3 p-3 rounded-2xl mb-6 ${isDark ? "bg-[#131921]" : "bg-blue-50"}`}>
                      <FiShield className="text-blue-600 shrink-0" size={20} />
                      <p className="text-[9px] font-black uppercase leading-tight">Secure Payment Gateway <br /><span className="text-gray-400">100% Purchase Protection</span></p>
                    </div>

                    <div className="space-y-3">
                      <Razorpay cartItems={cartItems} totalAmount={totalWithShipping} />
                      <button onClick={clearCartItems} disabled={clearingCart} className={`w-full py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all duration-300 ${isDark ? "border-gray-700 text-gray-400 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]" : "border-gray-200 text-gray-500 hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md"}`}>
                        {clearingCart ? "Processing..." : "Clear Shopping Bag"}
                      </button>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                      <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-green-500/10 text-green-400 group-hover:bg-green-500/20' : 'bg-green-50 text-green-600 group-hover:bg-green-100'}`}>
                          <FiTruck size={20} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-wider text-gray-500 group-hover:text-green-600 transition-colors">Fast Ship</span>
                      </div>
                      <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                      <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'}`}>
                          <FiShield size={20} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-wider text-gray-500 group-hover:text-blue-600 transition-colors">Warranty</span>
                      </div>
                      <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                      <div className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className={`p-2 rounded-full transition-all duration-300 ${isDark ? 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100'}`}>
                          <FiPlus size={20} />
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-wider text-gray-500 group-hover:text-orange-600 transition-colors">Support</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <h2 className="text-2xl font-black uppercase tracking-tighter mb-2 opacity-20">Your Bag is Empty</h2>
                <Link to="/allproducts" className="mt-4 px-8 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">Continue Shopping</Link>
              </div>
            )}
          </div>
        </div>
      )}
      <ScrollToTopButoon />
    </Layout>
  );
}

export default Cart;