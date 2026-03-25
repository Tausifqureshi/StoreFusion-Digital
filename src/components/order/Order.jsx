// import React, { useEffect, useState } from "react";
// import Layout from "../layout/Layout";
// import Loader from "../loader/Loader";
// import { MdPerson, MdCheckCircle } from "react-icons/md";
// import { FiMapPin } from "react-icons/fi";
// import { FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";

// import { useDispatch, useSelector } from "react-redux";
// import { setOrders, cancelOrder } from "../../redux/orderSlice";

// import {
//   getUserOrdersFromFirestore,
//   cancelOrderFromFirestore,
// } from "./orderFirestore";
// // 5500 6700 0000 1002 // payment test card number

// function Order({ orderLoading }) {
//   const [mode, setMode] = useState("light");
//   const user = JSON.parse(localStorage.getItem("user"));
//   // const userid = user?.uid;

//   const { orders } = useSelector((state) => state.orders);
//   const dispatch = useDispatch();

//   // const [loading, setLoading] = useState(false);

//   // const handleOrders = (orders) => {
//   //   dispatch(setOrders(orders));
//   //   setLoading(false); // 👈 yahan loader OFF
//   // };

//   // // ✅ Realtime fetch orders
//   // useEffect(() => {
//   //   if (!userid) return; // No user ID, no orders
//   //    setLoading(true); // 👈 yahan loader ON

//   //   // const unsubscribe = getUserOrdersFromFirestore(userid, (orders) => {
//   //   //   dispatch(setOrders(orders));
//   //   //   setLoading(false); // 👈 yahan loader OFF
//   //   // });

//   //   const unsubscribe = getUserOrdersFromFirestore(userid, handleOrders);

//   //   return () => unsubscribe();
//   // }, [userid]);

//   // ✅ Cancel order (UI se remove, Firestore me status = cancelled)
//   const handleCancelOrder = async (order) => {
//     setLoading(true);
//     try {
//       // Firestore me status update
//       await cancelOrderFromFirestore(order.id);

//       // Redux/UI se turant remove
//       dispatch(cancelOrder({ id: order.id }));

//       toast.success("Order cancelled successfully");
//     } catch (err) {
//       toast.error("Failed to cancel order");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // return (
//   //   <Layout>
//   //     {loading && <Loader />}

//   //     {orders.length > 0 ? (
//   //       <div className="container mx-auto py-10">
//   //         <h1 className="text-4xl font-bold mb-6 text-center">Your Orders</h1>

//   //         {orders.map((order) => (
//   //           <div key={order.id} className="bg-white rounded-lg shadow mb-6 p-6">
//   //             {/* User */}
//   //             <div className="flex items-center mb-3">
//   //               <MdPerson className="text-2xl mr-2" />
//   //               <h2 className="font-bold">{user?.fullName}</h2>
//   //             </div>

//   //             {/* Address */}
//   //             <div className="mb-4">
//   //               <h3 className="font-semibold flex items-center">
//   //                 <FiMapPin className="mr-1" /> Address
//   //               </h3>
//   //               {Object.entries(order.addressInfo || {}).map(([k, v]) => (
//   //                 <p key={k} className="text-sm">
//   //                   <b>{k}</b>: {v}
//   //                 </p>
//   //               ))}
//   //             </div>

//   //             {/* Items */}
//   //             <h3 className="font-semibold flex items-center mb-2">
//   //               <MdCheckCircle className="mr-1" /> Items
//   //             </h3>
//   //             {order.cartItems.map((item, i) => (
//   //               <div key={i} className="flex gap-4 mb-3">
//   //                 <img src={item.imageUrl} className="w-20 h-20 object-contain" />
//   //                 <div>
//   //                   <p className="font-bold">{item.title}</p>
//   //                   <p>₹{item.price}</p>
//   //                 </div>
//   //               </div>
//   //             ))}

//   //             {/* Cancel button only if order placed */}
//   //             {/* {order.status === "placed" && (
//   //               <button
//   //                 onClick={() => handleCancelOrder(order)}
//   //                 className="text-red-600 flex items-center mt-3"
//   //               >
//   //                 <FaTrash className="mr-1" /> Cancel Order
//   //               </button>
//   //             )}  */}
//   //             <button
//   //                 onClick={() => handleCancelOrder(order)}
//   //                 className="text-red-600 flex items-center mt-3"
//   //               >
//   //                 <FaTrash className="mr-1" /> Cancel Order
//   //               </button>

//   //              {/* {order.status === "cancelled" && (
//   //               <span className="text-red-500">Cancelled</span>
//   //               )} */}

//   //           </div>
//   //         ))}
//   //       </div>
//   //     ) : (
//   //       <h2 className="text-center text-2xl">No Orders Found</h2>
//   //     )}

//   //     <ScrollToTopButoon />
//   //   </Layout>
//   // );
//   return (
//     <Layout>
//       {/* {orderloading && <Loader />} */}

//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10">
//           My Orders
//         </h1>

//         { orderLoading ? (
//            <Loader />
//         ):orders.length > 0 ? (
//           <div className="space-y-8">
//             {orders.map((order) => (
//               <div
//                 key={order.id}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 border"
//               >
//                 {/* Header */}
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
//                   <div className="flex items-center gap-2">
//                     <MdPerson className="text-xl text-gray-600" />
//                     <span className="font-semibold text-gray-800">
//                       {user?.fullName}
//                     </span>
//                   </div>

//                   <span className="text-sm text-gray-500">
//                     Order ID: <span className="font-medium">{order.id}</span>
//                   </span>
//                 </div>

//                 {/* Body */}
//                 <div className="p-6 grid md:grid-cols-3 gap-6">
//                   {/* Address */}
//                   <div>
//                     <h3 className="font-semibold mb-2 flex items-center gap-1 text-gray-700">
//                       <FiMapPin /> Delivery Address
//                     </h3>
//                     <div className="text-sm text-gray-600 space-y-1">
//                       {Object.entries(order.addressInfo || {}).map(([k, v]) => (
//                         <p key={k}>
//                           <span className="font-medium capitalize">{k}:</span>{" "}
//                           {v}
//                         </p>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Items */}
//                   <div className="md:col-span-2">
//                     <h3 className="font-semibold mb-4 flex items-center gap-1 text-gray-700">
//                       <MdCheckCircle /> Items
//                     </h3>

//                     <div className="space-y-4">
//                       {order.cartItems.map((item, i) => (
//                         <div
//                           key={i}
//                           className="flex items-center gap-4 p-3 border rounded-xl"
//                         >
//                           <img
//                             src={item.imageUrl}
//                             alt={item.title}
//                             className="w-20 h-20 object-contain rounded-lg border"
//                           />
//                           <div className="flex-1">
//                             <p className="font-semibold text-gray-800">
//                               {item.title}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               ₹{item.price}
//                             </p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Footer */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
//                   <div className="text-sm">
//                     Status:{" "}
//                     {order.status === "cancelled" ? (
//                       <span className="text-red-600 font-semibold">
//                         Cancelled
//                       </span>
//                     ) : (
//                       <span className="text-green-600 font-semibold">
//                         Placed
//                       </span>
//                     )}
//                   </div>

//                   {order.status !== "cancelled" && (
//                     <button
//                       onClick={() => handleCancelOrder(order)}
//                       className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700"
//                     >
//                       <FaTrash /> Cancel Order
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <p className="text-2xl font-semibold text-gray-600">
//               No Orders Found
//             </p>
//           </div>
//         )}
//       </div>

//       <ScrollToTopButoon />
//     </Layout>
//   );
// }

// export default Order;





import React, { useContext, useState, useMemo } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MdPerson, MdCheckCircle, MdPhone, MdLocationOn, MdPayment, MdLocalShipping } from "react-icons/md";
import { FiPackage, FiCalendar, FiHash } from "react-icons/fi";
import { FaTrash, FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../redux/orderSlice";
import { MyContext } from "../../context api/myContext";
import { useNavigate } from "react-router-dom";
import { cancelOrderFromFirestore } from "./orderFirestore";

function Order({ orderLoading }) {
  const { mode } = useContext(MyContext);
  const isDark = mode === "dark";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const { orders } = useSelector((state) => state.orders);
  const [cancellingId, setCancellingId] = useState(null);

  const handleCancelOrder = async (orderId) => {
    setCancellingId(orderId);
    try {
      await cancelOrderFromFirestore(orderId);
      dispatch(cancelOrder({ id: orderId }));
      toast.success("Order Cancelled!", { icon: "🔥" });
    } catch (err) {
      toast.error("Failed to cancel");
    } finally {
      setCancellingId(null);
    }
  };
  // const orderTotals = useMemo(() => {
  //   return orders.map(order => ({
  //     id: order.id,
  //     total: order.cartItems?.reduce((acc, item) =>
  //       acc + (Number(item.price) || 0) * (item.quantity || 1), 0) || 0
  //   }));
  // }, [orders]);

  return (
    <Layout>
      <div className={`min-h-screen pt-24 pb-12 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-[#f8fafc] text-gray-900"
        }`}>

        <div className="max-w-6xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-10 text-center md:text-left border-b border-gray-200 dark:border-gray-800 pb-6">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 mb-4 hover:tracking-widest transition-all"
            >
              <FaArrowLeft /> Back to Shop
            </button>
            <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tighter italic leading-none ${isDark ? "text-white" : "text-gray-900"}`}>
              Order <span className="text-blue-600">History</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">Manage your luxury purchases</p>
          </div>

          {orderLoading ? (
            <Loader />
          ) : orders.length > 0 ? (
            <div className="space-y-10">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className={`relative overflow-hidden rounded-[40px] border-2 transition-all duration-500 ${isDark
                    ? "bg-[#1e293b] border-gray-800 shadow-none"
                    : "bg-white border-gray-100 shadow-2xl shadow-blue-500/5"
                    }`}
                >
                  {/* --- TOP STRIP --- */}
                  <div className={`px-8 py-5 flex flex-wrap items-center justify-between gap-4 ${isDark ? "bg-[#131921]" : "bg-gray-50/80"
                    }`}>
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-blue-600" />
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase">Date</p>
                          <p className={`text-[11px] font-bold uppercase ${isDark ? "text-gray-200" : "text-gray-900"}`}>{new Date().toLocaleDateString('en-GB')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiHash className="text-orange-500" />
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase">Order ID</p>
                          <p className={`text-[11px] font-bold uppercase tracking-tight ${isDark ? "text-blue-400" : "text-blue-600"}`}>{order.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-l pl-4 md:pl-8 border-gray-200 dark:border-gray-700 ml-2 md:ml-4">
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase">Grand Total</p>
                          {/* <p className={`text-[13px] font-black uppercase tracking-tight ${isDark ? "text-green-400" : "text-green-600"}`}>
                            ₹{orderTotals[order.id]}
                          </p> */}
                          <p className={`text-[13px] font-medium uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                            ₹ {order.cartItems?.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${order.status === "cancelled"
                        ? "bg-red-500 text-white"
                        : "bg-green-600 text-white"
                        }`}>
                        {order.status || "Order Placed"}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="grid lg:grid-cols-12 gap-10">

                      {/* --- LEFT: PRODUCT --- */}
                      <div className="lg:col-span-7 space-y-6">
                        <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                          <FiPackage className="text-blue-600" size={18} /> Package Items
                        </h3>

                        <div className="space-y-4">
                          {order.cartItems.map((item, i) => (
                            <div key={i} onClick={() => navigate("/productInfo/" + item.id)} className={`flex gap-5 items-center p-4 rounded-[25px] border transition-all duration-300 cursor-pointer group ${isDark ? "bg-[#131921] border-gray-700 hover:bg-gray-800/50 hover:border-gray-600 hover:shadow-lg hover:shadow-black/20" : "bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50"
                              }`}>
                              <div className="w-24 h-24 bg-white rounded-2xl p-2 shrink-0 shadow-inner flex items-center justify-center border border-gray-100">
                                <img src={item.imageUrl} alt={item.title} className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                              </div>
                              <div className="flex-1">
                                <h4 className={`text-sm md:text-base font-black uppercase leading-tight line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h4>
                                <p className={`font-medium mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>₹ {item.price}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Qty: 01 | Color: Default</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Tracking */}

                        <div className="pt-6">
                          <div className="flex justify-between mb-2">
                            <p className={`text-[10px] font-black uppercase ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                              Shipment Status
                            </p>
                            <p className={`text-[10px] font-black uppercase ${isDark ? "text-blue-400" : "text-blue-600"}`}>
                              Arriving in 3 Days
                            </p>
                          </div>

                          <div className="flex items-center w-full gap-1">
                            {/* Step 1 Bar */}
                            <p className="h-1.5 flex-1 bg-blue-600 rounded-full"></p>

                            {/* Step 2 Bar */}
                            <p className={`h-1.5 flex-1 rounded-full ${isDark ? "bg-gray-700" : "bg-blue-600 opacity-30"}`}></p>

                            {/* Step 3 Bar */}
                            <p className={`h-1.5 flex-1 rounded-full ${isDark ? "bg-gray-700" : "bg-blue-600 opacity-30"}`}></p>
                          </div>
                        </div>

                      </div>
                      {/* --- RIGHT: CUSTOMER & ADDRESS --- */}
                      <div className={`lg:col-span-5 rounded-[30px] p-6 flex flex-col justify-between ${isDark ? "bg-[#131921] border border-gray-800" : "bg-blue-50/50 border border-blue-100"
                        }`}>
                        <div className="space-y-6">
                          {/* Name & Contact */}
                          <div className="space-y-4">
                            <h3 className={`text-xs font-black uppercase tracking-widest border-b pb-2 flex items-center gap-2 ${isDark ? "border-gray-800 text-blue-400" : "border-blue-200 text-blue-600"}`}>
                              <MdPerson size={18} /> Customer Info
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Full Name</p>
                                <p className={`text-xs font-bold uppercase ${isDark ? "text-gray-200" : "text-gray-900"}`}>{user?.fullName}</p>
                              </div>
                              <div>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Phone Number</p>
                                <p className={`text-xs font-bold uppercase flex items-center gap-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                                  <MdPhone className="text-blue-600" /> {order.addressInfo?.phoneNumber || "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Address Info */}
                          <div className="space-y-3">
                            <h3 className={`text-xs font-black uppercase tracking-widest border-b pb-2 flex items-center gap-2 ${isDark ? "border-gray-800 text-orange-400" : "border-blue-200 text-orange-500"}`}>
                              <MdLocationOn size={18} /> Shipping Address
                            </h3>
                            <div className={`text-xs font-bold uppercase leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              <p className={isDark ? "text-gray-200" : "text-gray-900"}>{order.addressInfo?.address}</p>
                              <p>{order.addressInfo?.pincode}</p>
                            </div>
                          </div>

                          {/* Payment Status */}
                          <div className={`p-4 rounded-2xl border border-dashed flex items-center justify-between ${isDark ? "bg-black/20 border-gray-700" : "bg-white border-blue-300"}`}>
                            <div className="flex items-center gap-3">
                              <MdPayment className="text-blue-600" size={20} />
                              <p className={`text-[10px] font-black uppercase ${isDark ? "text-gray-300" : "text-gray-900"}`}>Payment Method</p>
                            </div>
                            <p className="text-[10px] font-black text-green-600 uppercase">Verified</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-8 grid grid-cols-2 gap-3">
                          <button className={`py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isDark ? "bg-white text-black hover:bg-blue-600 hover:text-white" : "bg-gray-900 text-white hover:bg-blue-600"
                            }`}>
                            <MdLocalShipping size={14} /> Invoice
                          </button>

                          {order.status !== "cancelled" && (
                            <button
                              disabled={cancellingId === order.id}
                              onClick={() => handleCancelOrder(order.id)}
                              className={`py-4 rounded-2xl border-2 border-red-500 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all`}
                            >
                              {cancellingId === order.id ? "Wait..." : "Cancel Order"}
                            </button>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 flex flex-col items-center">
              <FaBoxOpen className="text-7xl text-gray-300 mb-6" />
              <h2 className="text-3xl font-black uppercase italic text-gray-400">Empty History</h2>
              <button onClick={() => navigate("/")} className="mt-8 px-12 py-5 bg-blue-600 text-white rounded-[20px] font-black uppercase text-[12px] tracking-widest">Start Exploring</button>
            </div>
          )}
        </div>
      </div>
      <ScrollToTopButoon />
    </Layout>
  );

}

export default Order;

