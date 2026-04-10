import { ThemeContext, UserContext } from '../../../context api/AllContext';
import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppLoading } from "../../../context api/LoadingState";
;
import { useSelector, useDispatch } from "react-redux";
import OrderStatusBadge from "../OrderStatusBadge";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { FaArrowLeft } from "react-icons/fa";
import { FiPackage, FiCalendar, FiHash } from "react-icons/fi";
import { MdPerson, MdPhone, MdLocationOn, MdInfoOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { cancelOrderFromFirestore } from "../orderFirestore";
import { cancelOrder } from "../../../redux/orderSlice";
import Tracking from "./Tracking";

function OrderDetails() { 
  const { orderLoading } = useAppLoading();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useContext(ThemeContext);;
  const isDark = mode === "dark";

  const { loggedInUser: user } = useContext(UserContext);
  const { orders } = useSelector((state) => state.orders);
  const [cancellingId, setCancellingId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2);

  const handleSeeMore = useCallback(() => setVisibleCount((prev) => prev + 2), []);
  const handleSeeLess = useCallback(() => setVisibleCount(2), []);

  // yah id se ham dynamic order ko find kar rahe hain
  const order = useMemo(() => {
    return orders?.find((o) => o.id === id || o.paymentId === id);
  }, [id, orders]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const addressInfo = order?.addressInfo;

  const totalPrice = useMemo(() => {
    return order?.cartItems?.reduce(
      (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
      0
    );
  }, [order?.cartItems]);

  const handleCancelOrder = useCallback(async (orderId) => {
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
  }, [dispatch]);



  return (
    <>
      <div className={`min-h-screen pt-28 pb-12 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
        <div className="max-w-6xl mx-auto px-4">

          {orderLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoaderSpinner isDark={isDark} label="Loading order..." />
            </div>
          ) : order ? (
            <>
              {/* Header */}
              <div className={`mb-10 border-b pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                <div className="flex flex-col gap-2">
                  <button onClick={() => navigate("/order")} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 hover:tracking-widest transition-all w-fit">
                    <FaArrowLeft /> BACK TO ORDERS
                  </button>
                  <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                    ORDER <span className="text-blue-600">DETAILS</span>
                  </h1>
                </div>
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
                    <div className="flex items-center gap-2 border-l pl-8 border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-[8px] font-black text-gray-400 uppercase">Payment Status</p>
                        {order.paymentId === "COD" ? (
                          <p className={`text-[11px] font-bold uppercase tracking-tight ${isDark ? "text-orange-400" : "text-orange-600"}`}>Cash on Delivery</p>
                        ) : (
                          <p className="text-[11px] font-bold uppercase tracking-tight text-green-500 flex items-center gap-1">Verified <span className="text-xs">✅</span></p>
                        )}
                      </div>
                    </div>
                  </div>
                  <OrderStatusBadge status={order.status || "placed"} isDark={isDark} />
                </div>

                <div className="p-6 md:p-10">
                  <div className="grid lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-12 space-y-8">

                      {/* COMPONENT: TRACKING SECTION */}
                      <Tracking
                        order={order}
                        isDark={isDark}
                      />

                      <div className="grid lg:grid-cols-2 gap-10">
                        {/* Items */}
                        <div className="space-y-4">
                          <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                            <FiPackage className="text-blue-600" size={18} /> Package Content
                          </h3>
                          <div className="space-y-4">
                            {order.cartItems?.slice(0, visibleCount).map((item, i) => (
                              <div key={i} onClick={() => navigate("/productInfo/" + item.id)} className={`flex gap-5 items-center p-5 rounded-[30px] border cursor-pointer transition-all hover:shadow-lg ${isDark ? "bg-[#131921] border-gray-700 hover:border-blue-500/50" : "bg-white border-gray-100 hover:border-blue-200"}`}>
                                <div className="w-20 h-20 bg-white rounded-2xl p-2 shrink-0 flex items-center justify-center border border-gray-100"><img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async" className="max-h-full object-contain" /></div>
                                <div className="flex-1">
                                  <h4 className={`text-sm font-black uppercase line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h4>
                                  <p className={`font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"} text-sm`}>₹ {item.price}</p>
                                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Quantity: {item.quantity || 1}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {order.cartItems?.length > 2 && (
                            <div className="flex gap-4 mt-6">
                              {visibleCount < order.cartItems.length && (
                                <button
                                  onClick={handleSeeMore}
                                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-[#1e293b] text-white hover:bg-gray-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}`}
                                >
                                  See More
                                </button>
                              )}
                              {visibleCount > 2 && (
                                <button
                                  onClick={handleSeeLess}
                                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-[#131921] border border-gray-700 text-gray-400 hover:text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}
                                >
                                  See Less
                                </button>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Customer Details & Shipping */}
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
                            <div className="mt-6 pt-6 border-t border-gray-700/30 flex flex-row justify-between gap-4">
                              {!["cancelled", "delivered", "returned", "refunded"].includes(order.status?.toLowerCase()) && (
                                <button
                                  disabled={cancellingId === order.id}
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="flex-1 py-3 px-4 rounded-xl border-2 border-red-500 text-red-500 text-[10px] md:text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg active:scale-95 flex items-center justify-center"
                                >
                                  {cancellingId === order.id ? "Processing..." : "Cancel Order"}
                                </button>
                              )}

                              <button className="flex-1 py-3 px-4 rounded-xl text-[10px] md:text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                                <MdInfoOutline size={16} /> Need Help?
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-2 opacity-20">Order Not Found</h2>
              <button onClick={() => navigate("/")} className="mt-6 px-10 py-4 md:px-12 md:py-5 bg-blue-600 text-white text-[10px] md:text-[12px] font-black uppercase tracking-widest rounded-[20px] shadow-lg">Continue Shopping</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default React.memo(OrderDetails);
