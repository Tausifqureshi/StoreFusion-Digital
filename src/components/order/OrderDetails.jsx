import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../context api/myContext";
import Layout from "../layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import OrderStatusBadge from "./OrderStatusBadge";
import Loader from "../loader/Loader";
import { FaArrowLeft } from "react-icons/fa";
import { FiPackage, FiCalendar, FiHash, FiCheck } from "react-icons/fi";
import { MdPerson, MdPhone, MdLocationOn, MdCheckCircle, MdRadioButtonUnchecked, MdInfoOutline, MdHeadsetMic } from "react-icons/md";
import { toast } from "react-toastify";
import { cancelOrderFromFirestore } from "./orderFirestore";
import { cancelOrder } from "../../redux/orderSlice";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useContext(MyContext);
  const isDark = mode === "dark";

  const user = JSON.parse(localStorage.getItem("user"));
  const { orders } = useSelector((state) => state.orders);
  const [cancellingId, setCancellingId] = useState(null);

  // dynamic order id ko find karne ke liye. useParams use hora hai.
  const order = useMemo(() => {
    return orders?.find((o) => o.id === id || o.paymentId === id);
  }, [id, orders]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!order) {
    return (
      <Layout>
        <div className={`min-h-screen pt-24 pb-12 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-8 flex flex-col gap-2">
              <button onClick={() => navigate("/order")} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 hover:tracking-widest transition-all w-fit">
                <FaArrowLeft /> BACK TO ORDERS
              </button>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mt-2">
                ORDER <span className="text-blue-600">DETAILS</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Loading Details...</p>
            </div>
            <div className="flex justify-center items-center py-20">
              <Loader />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const addressInfo = order.addressInfo;
  const totalPrice = order.cartItems?.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Bhai, kya aap sach mein cancel karna chahte ho?")) return;
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
  }  // Determine current active status
  const currentOrderStatus = (order.status || "placed").toLowerCase();

  // Helper function to map order status strings to a numeric progress level
  const getTimelineProgressIndex = (status) => {
    if (status === "placed") return 0;
    else if (status === "processing") return 1;
    else if (status === "shipped") return 2;
    else if (status === "hub") return 3;
    else if (status === "delivered") return 4;
    else if (status === "returned") return -1;
    else if (status === "refunded") return -1;
    else if (status === "cancelled") return -1;
    else return 0;
  };

  // The active step number (0 to 4), where -1 means greyed out (cancelled/returned)
  const activeStepIndex = getTimelineProgressIndex(currentOrderStatus);

  // Shorten JS locale date string to just Month, Day, Year and Time
  const shortenDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return dateStr;
    try {
      // Remove day of week (e.g. "Saturday, March 28..." -> "March 28...")
      let short = dateStr.includes(",") && dateStr.split(",").length >= 3 
        ? dateStr.split(",").slice(1).join(",").trim() 
        : dateStr;
      
      // Shorten month names
      const months = { "January": "Jan", "February": "Feb", "March": "Mar", "April": "Apr", "August": "Aug", "September": "Sep", "October": "Oct", "November": "Nov", "December": "Dec" };
      for (const [long, shrt] of Object.entries(months)) {
        if (short.includes(long)) { short = short.replace(long, shrt); break; }
      }
      return short;
    } catch (e) { return dateStr; }
  };

  // Tracking Logic - Formats the date to show and hides duplicate times generated during testing
  const formatTrackingDate = (currentStepDateString, previousStepsDatesArray, fallbackMessageText) => {
    if (!currentStepDateString) return fallbackMessageText;
    
    // Filter out any undefined or null dates
    const validPreviousDates = previousStepsDatesArray.filter(Boolean);
    
    // If exact identical timestamp exists in a previous step, hide it to make it look clean
    if (validPreviousDates.includes(currentStepDateString)) return fallbackMessageText; 
    
    return shortenDate(currentStepDateString);
  };

  const placedDateText = shortenDate(order.placedDate || order.date);
  const packedDateText = activeStepIndex >= 1 ? formatTrackingDate(order.processingDate, [placedDateText], "Successfully Packed") : "In Progress";
  const shippedDateText = activeStepIndex >= 2 ? formatTrackingDate(order.shippedDate, [placedDateText, order.processingDate], "In Transit") : "Pending";
  const hubDateText = activeStepIndex >= 3 ? formatTrackingDate(order.hubDate, [placedDateText, order.processingDate, order.shippedDate], "Out for Delivery") : "Pending";
  const deliveredDateText = activeStepIndex >= 4 ? formatTrackingDate(order.deliveredDate, [placedDateText, order.processingDate, order.shippedDate, order.hubDate], "Item Delivered") : "Sunday, 29 March 2026";

  const trackingStepsData = [
    { label: "Ordered", status: "placed", date: placedDateText },
    { label: "Order packed", status: "processing", date: packedDateText },
    { label: "Order left warehouse", status: "shipped", date: shippedDateText },
    { label: "Dispatched from nearest hub", status: "hub", date: hubDateText },
    { label: currentOrderStatus === "delivered" ? "Delivered" : "Delivery ExpectedBy", status: "delivered", date: deliveredDateText },
  ];

  return (
    <Layout>
      <div className={`min-h-screen pt-24 pb-12 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}
          <div className="mb-8 flex flex-col gap-2">
            <button onClick={() => navigate("/order")} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 hover:tracking-widest transition-all w-fit">
              <FaArrowLeft /> BACK TO ORDERS
            </button>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none mt-2">
              ORDER <span className="text-blue-600">DETAILS</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">ORDER ID - {order.id}</p>
          </div>

          <div className={`relative overflow-hidden rounded-[40px] border-2 transition-all duration-500 ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"}`}>

            {/* Header Info Bar */}
            <div className={`px-8 py-5 flex flex-wrap items-center justify-between gap-4 ${isDark ? "bg-[#131921]" : "bg-gray-50/80"}`}>
              <div className="flex flex-wrap gap-8">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-blue-600" />
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase">Booking Date</p>
                    <p className={`text-[11px] font-bold uppercase ${isDark ? "text-gray-200" : "text-gray-900"}`}>{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FiHash className="text-orange-500" />
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase">Order ID</p>
                    <p className={`text-[11px] font-bold uppercase tracking-tight ${isDark ? "text-blue-400" : "text-blue-600"}`}>{order.id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-l pl-8 border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase">Grand Total</p>
                    <p className={`text-[13px] font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>₹ {totalPrice}</p>
                  </div>
                </div>
              </div>
              <OrderStatusBadge status={order.status || "placed"} isDark={isDark} />
            </div>

            <div className="p-6 md:p-10">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12 space-y-8">

                  {/* TRACKING SECTION */}
                  <div className="rounded-[30px] transition-all">
                    <h3 className={`text-[11px] font-black uppercase tracking-widest mb-5 flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}>
                      Order Tracking
                    </h3>

                    {/* MOBILE UI */}
                    <div className="md:hidden space-y-0">
                      {trackingStepsData.map((step, index) => {
                        const isCompleted = index <= activeStepIndex && order.status !== "cancelled";
                        const isLast = index === trackingStepsData.length - 1;
                        return (
                          <div key={index} className="flex gap-4 relative min-h-[80px]">
                            {!isLast && (
                              <div className={`absolute left-[10px] top-6 w-[2px] h-[calc(100%-24px)] ${isCompleted && index < activeStepIndex ? "bg-green-500" : (isDark ? "bg-gray-700" : "bg-gray-200")}`} />
                            )}
                            <div className="relative z-10 pt-1">
                              <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? "bg-green-500 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] scale-110" : (isDark ? "bg-[#1e293b] border-gray-600" : "bg-white border-gray-300")}`}>
                                {isCompleted && <FiCheck className="text-white" size={12} strokeWidth={4} />}
                              </div>
                            </div>
                            <div className="pb-10 last:pb-0">
                              <p className={`text-[11px] font-black uppercase tracking-tight ${isCompleted ? (isDark ? "text-white" : "text-gray-800") : "text-gray-400"}`}>{step.label}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 leading-relaxed">{step.date}</p>
                            </div>
                          </div>
                        );
                      })}

                      <div className={`mt-8 p-6 rounded-[25px] flex items-center justify-between border ${isDark ? "bg-[#131921] border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600"><MdHeadsetMic size={24} /></div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-tight">Request a Callback</p>
                            <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">Expected within 15 mins</p>
                          </div>
                        </div>
                        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Request now</button>
                      </div>
                    </div>

                    {/* DESKTOP UI */}
                    <div className={`hidden md:block py-8 px-6 md:px-10 rounded-[40px] border-2 transition-all ${isDark ? "bg-[#131921] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"}`}>
                      <div className="relative flex justify-between items-start w-full">
                        <div className="absolute top-[11px] left-[10%] right-[10%] flex items-center">
                          <div className={`w-full h-[2px] ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
                            <div className="h-full bg-green-500 transition-all duration-1000 shadow-[0_0_15px_rgba(34,197,94,0.4)]" style={{ width: `${(Math.max(0, activeStepIndex) / (trackingStepsData.length - 1)) * 100}%` }}></div>
                          </div>
                        </div>

                        {trackingStepsData.map((step, index) => {
                          const isCompleted = index <= activeStepIndex && order.status !== "cancelled";
                          return (
                            <div key={index} className="flex flex-col items-center gap-5 relative z-10 flex-1">
                              <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? "bg-green-500 border-green-500 scale-[1.15] shadow-[0_0_15px_rgba(34,197,94,0.5)]" : (isDark ? "bg-[#1e293b] border-gray-600" : "bg-white border-gray-300")}`}>
                                {isCompleted && <FiCheck className="text-white" size={14} strokeWidth={4} />}
                              </div>
                              <div className="text-center">
                                <p className={`text-[10px] font-black uppercase tracking-tight ${isCompleted ? (isDark ? "text-white" : "text-gray-800") : "text-gray-400"}`}>{step.label}</p>
                                <p className={`text-[8px] font-bold uppercase tracking-widest mt-1.5 ${isCompleted ? "text-blue-500" : "text-gray-400"}`}>{step.date}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-10">
                    {/* Items */}
                    <div className="space-y-4">
                      <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                        <FiPackage className="text-blue-600" size={18} /> Package Content
                      </h3>
                      <div className="space-y-4">
                        {order.cartItems?.map((item, i) => (
                          <div key={i} onClick={() => navigate("/productInfo/" + item.id)} className={`flex gap-5 items-center p-5 rounded-[30px] border cursor-pointer transition-all hover:shadow-lg ${isDark ? "bg-[#131921] border-gray-700 hover:border-blue-500/50" : "bg-white border-gray-100 hover:border-blue-200"}`}>
                            <div className="w-20 h-20 bg-white rounded-2xl p-2 shrink-0 flex items-center justify-center border border-gray-100"><img src={item.imageUrl} alt={item.title} className="max-h-full object-contain" /></div>
                            <div className="flex-1">
                              <h4 className={`text-sm font-black uppercase line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h4>
                              <p className={`font-bold mt-1 text-blue-600 text-sm`}>₹ {item.price}</p>
                              <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Quantity: {item.quantity || 1}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className={`rounded-[40px] p-8 md:p-10 border-2 h-full flex flex-col justify-between ${isDark ? "bg-[#131921] border-gray-800" : "bg-gray-50 border-gray-100"}`}>
                        <div className="space-y-10">
                          <div className="space-y-5">
                            <h3 className={`text-[11px] font-black uppercase tracking-widest border-b pb-3 flex items-center gap-2 ${isDark ? "border-gray-800 text-blue-400" : "border-gray-200 text-blue-600"}`}>
                              <MdPerson size={20} /> Customer Details
                            </h3>
                            <div className="grid grid-cols-2 gap-8">
                              <div><p className="text-[9px] font-black text-gray-400 uppercase">Full Name</p><p className={`text-xs font-bold uppercase mt-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}>{user?.fullName}</p></div>
                              <div><p className="text-[9px] font-black text-gray-400 uppercase">Phone</p><p className={`text-xs font-bold uppercase mt-1 flex items-center gap-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}><MdPhone size={14} className="text-blue-600" /> {addressInfo?.phoneNumber || "N/A"}</p></div>
                            </div>
                          </div>
                          <div className="space-y-5">
                            <h3 className={`text-[11px] font-black uppercase tracking-widest border-b pb-3 flex items-center gap-2 ${isDark ? "border-gray-800 text-orange-400" : "border-gray-200 text-orange-500"}`}>
                              <MdLocationOn size={20} /> Shipping Info
                            </h3>
                            <div className={`p-6 rounded-[25px] border ${isDark ? "bg-[#1e293b] border-gray-700" : "bg-white border-gray-200 shadow-sm"}`}>
                              <p className="text-[10px] font-black uppercase text-blue-500 mb-1.5">{addressInfo?.name || "Recipient"}</p>
                              <p className="text-[11px] font-bold uppercase tracking-tight leading-relaxed">{addressInfo?.address}<br />{addressInfo?.pincode}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-12 pt-10 border-t border-gray-700/30 space-y-4">
                          {!["cancelled", "delivered", "returned", "refunded"].includes(order.status?.toLowerCase()) && (
                            <button disabled={cancellingId === order.id} onClick={() => handleCancelOrder(order.id)} className="w-full py-5 rounded-2xl border-2 border-red-500 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95">
                              {cancellingId === order.id ? "Processing..." : "Cancel Order"}
                            </button>
                          )}
                          <button className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95`}>
                            <MdInfoOutline size={18} /> Need Assistant?
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
