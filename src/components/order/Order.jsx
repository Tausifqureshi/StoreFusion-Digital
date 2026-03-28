import React, { useContext, useState, useMemo } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MdPerson, MdPhone, MdLocationOn, MdPayment, MdInfoOutline } from "react-icons/md";
import { FiPackage, FiCalendar, FiHash, FiEdit } from "react-icons/fi";
import { FaTrash, FaArrowLeft, FaBoxOpen, FaEdit } from "react-icons/fa";
import OrderStatusUpdater from "./OrderStatusUpdater";
import OrderStatusBadge from "./OrderStatusBadge";
import { toast } from "react-toastify";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../../redux/orderSlice";
import { MyContext } from "../../context api/myContext";
import { useNavigate } from "react-router-dom";
import { cancelOrderFromFirestore, deleteUserOrdersFromFirestore } from "./orderFirestore";

function Order({ orderLoading }) {
  const { mode } = useContext(MyContext);
  const isDark = mode === "dark";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const { orders } = useSelector((state) => state.orders);
  const [cancellingId, setCancellingId] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [activeTab, setActiveTab] = useState('All Orders');

  const activeOrders = useMemo(() => {
    // sabse pehle delivered orders hatao
    let filtered = orders.filter(order => order.status?.toLowerCase() !== "delivered");

    // agar Returns tab selected hai, to sirf refunded/returned orders dikhao
    if (activeTab === 'Returns') {
      return filtered.filter(order => order.status?.toLowerCase() === 'refunded' || order.status?.toLowerCase() === 'returned');
    }
    // Default (All Orders tab): "refunded" aur "returned" bhi hata do
    return filtered.filter(order => order.status?.toLowerCase() !== 'refunded' && order.status?.toLowerCase() !== 'returned');
  }, [orders, activeTab]);

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

  const handleDeleteAllOrders = async () => {
    if (!window.confirm("Bhai, kya aap sach mein saare orders delete karna chahte ho?")) return;
    try {
      await deleteUserOrdersFromFirestore(user?.uid);
      toast.info("Order history cleared!");
    } catch (err) {
      toast.error("Failed to clear history");
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen pt-24 pb-12 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">

            {/* Left: Back + Title + Subtitle */}
            <div className="flex flex-col gap-2">
              <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 hover:tracking-widest transition-all w-fit">
                <FaArrowLeft /> Back to Shop
              </button>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                My <span className="text-blue-600">Orders</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manage your purchases</p>
            </div>

            {/* Right: Help + Avatar only */}
            <div className="flex items-center gap-3">
              <button className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase flex items-center gap-2 ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-600 shadow-sm"}`}>
                <MdInfoOutline size={14} /> Help
              </button>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
                {user?.fullName?.charAt(0) || "U"}
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex gap-4 justify-center md:justify-start">
              {['All Orders', 'Returns'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? "bg-blue-600 text-white shadow-lg" : isDark ? "bg-[#1e293b] text-gray-400 border border-gray-800" : "bg-white text-gray-500 border border-gray-100 shadow-sm"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {orderLoading ? (<Loader />) : activeOrders.length > 0 ? (
            <div className="space-y-10">
              {activeOrders.map((order) => (
                <div key={order.id} className={`relative overflow-hidden rounded-[40px] border-2 transition-all duration-500 ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"}`}>
                  <div className={`px-8 py-5 flex flex-wrap items-center justify-between gap-4 ${isDark ? "bg-[#131921]" : "bg-gray-50/80"}`}>
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-blue-600" />
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase">Date</p>
                          <p className={`text-[11px] font-bold uppercase ${isDark ? "text-gray-200" : "text-gray-900"}`}>{order.date || new Date().toLocaleDateString('en-GB')}</p>
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
                          <p className={`text-[13px] font-black uppercase tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                            ₹ {order.cartItems?.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div><OrderStatusBadge status={order.status || "placed"} isDark={isDark} /></div>
                  </div>

                  <div className="p-6">
                    <div className="grid lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-7 space-y-2 overflow-hidden">
                        <div className="flex items-center justify-between pr-6">
                          <h3 className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}><FiPackage className="text-blue-600" size={18} /> Package Items</h3>
                          {activeOrders.length > 0 && (
                            <button onClick={handleDeleteAllOrders} className="text-[10px] font-black uppercase text-red-500 hover:text-red-600 flex items-center gap-1 border-b border-red-500/30 hover:border-red-600 transition-all">
                              <FaTrash size={10} /> Clear All
                            </button>
                          )}
                        </div>
                        <div className="space-y-4">
                          {order.cartItems.map((item, i) => (
                            <div key={i} onClick={() => navigate("/productInfo/" + item.id)} className={`flex gap-5 items-center p-4 rounded-[25px] border cursor-pointer ${isDark ? "bg-[#131921] border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                              <div className="w-24 h-24 bg-white rounded-2xl p-2 shrink-0 flex items-center justify-center border border-gray-100"><img src={item.imageUrl} alt={item.title} className="max-h-full object-contain" /></div>
                              <div className="flex-1">
                                <h4 className={`text-sm font-black uppercase line-clamp-1 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h4>
                                <p className={`font-bold mt-1 ${isDark ? "text-white" : "text-gray-900"}`}>₹ {item.price}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Qty: {item.quantity || 1} | Color: Default</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`lg:col-span-5 rounded-[30px] p-6 flex flex-col justify-between ${isDark ? "bg-[#1e293b] border-2 border-gray-800" : "bg-white border-2 border-gray-100 shadow-xl shadow-blue-500/5"}`}>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <h3 className={`text-xs font-black uppercase tracking-widest border-b pb-2 flex items-center gap-2 ${isDark ? "border-gray-800 text-blue-400" : "border-blue-200 text-blue-600"}`}><MdPerson size={18} /> Customer Info</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div><p className="text-[9px] font-black text-gray-400 uppercase">Full Name</p><p className={`text-xs font-bold uppercase ${isDark ? "text-gray-200" : "text-gray-900"}`}>{user?.fullName}</p></div>
                              <div><p className="text-[9px] font-black text-gray-400 uppercase">Phone</p><p className={`text-xs font-bold uppercase flex items-center gap-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}><MdPhone size={14} className="text-blue-600" /> {order.addressInfo?.phoneNumber || "N/A"}</p></div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h3 className={`text-xs font-black uppercase tracking-widest border-b pb-2 flex items-center gap-2 ${isDark ? "border-gray-800 text-orange-400" : "border-blue-200 text-orange-500"}`}><MdLocationOn size={18} /> Delivery Address</h3>
                            <div className={`p-4 rounded-xl border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"}`}>
                              <p className="text-[10px] font-black uppercase text-blue-500 mb-1">{order.addressInfo?.name || "Recipient"}</p>
                              <p className="text-[11px] font-bold uppercase tracking-tight leading-relaxed">{order.addressInfo?.address}<br />{order.addressInfo?.pincode}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-8 space-y-3">
                          <button onClick={() => navigate(`/order-details/${order.id}`)} className={`w-full py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 ${isDark ? "bg-white text-black hover:bg-blue-600 hover:text-white" : "bg-gray-900 text-white hover:bg-blue-600"}`}><MdInfoOutline size={14} /> View Details</button>
                          {order.status !== "cancelled" && order.status !== "delivered" && (
                            <button disabled={cancellingId === order.id} onClick={() => handleCancelOrder(order.id)} className="w-full py-4 rounded-2xl border-2 border-red-500 text-red-500 text-[9px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">{cancellingId === order.id ? "Wait..." : "Cancel Order"}</button>
                          )}
                          {order.status !== "cancelled" && (
                            <button onClick={() => setUpdatingOrderId(updatingOrderId === order.id ? null : order.id)} className="w-full py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2"><FaEdit size={14} /> Update status</button>
                          )}
                          {updatingOrderId === order.id && (<div className="mt-2 flex justify-center"><OrderStatusUpdater orderId={order.id} currentStatus={order.status || 'placed'} isDark={isDark} onClose={() => setUpdatingOrderId(null)} /></div>)}
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
              <h2 className="text-3xl font-black uppercase text-gray-400">Empty History</h2>
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
