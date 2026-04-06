import { ThemeContext, UserContext } from '../../context api/AllContext';
import React, { useContext, useState, useMemo, useEffect } from "react";
import Layout from "../layout/Layout";
import LoaderSpinner from "../loader/LoaderSpinner";
import { MdInfoOutline } from "react-icons/md";
import { FaTrash, FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import OrderStatusUpdater from "./status/OrderStatusUpdater";
import UserOrderItem from "./UserOrderItem";
import { toast } from "react-toastify";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserOrdersFromFirestore } from "./orderFirestore";

// ✅ ORDER VIEW: Saare orders list aur tabs yahan locked hain
const OrderView = React.memo(({
  isDark, orders, orderLoading, user,
  activeTab, setActiveTab, handleDeleteAllOrders,
  navigate, updatingOrderId, setUpdatingOrderId
}) => {
  const activeOrders = useMemo(() => {
    // 1. Pehle Delivered orders ko bahar nikaalo
    const nonDelivered = orders.filter(order => order.status?.toLowerCase() !== "delivered");

    if (activeTab === 'Returns') {
      // 2. Returns tab: Sirf refunded/returned
      return nonDelivered.filter(order =>
        ['refunded', 'returned'].includes(order.status?.toLowerCase())
      );
    }

    // 3. All Orders tab: Na delivered ho, na refunded, na returned
    return nonDelivered.filter(order =>
      !['refunded', 'returned'].includes(order.status?.toLowerCase())
    );
  }, [orders, activeTab]);

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 border-b border-gray-200 dark:border-gray-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 hover:tracking-widest transition-all w-fit">
              <FaArrowLeft /> Back to Shop
            </button>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">
              My <span className="text-blue-600">Orders</span>
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manage your purchases</p>
          </div>

          <div className="flex items-center gap-3">
            {activeOrders.length > 0 && (
              <button onClick={handleDeleteAllOrders} title="Clear All" className={`flex px-4 py-1.5 rounded-full border text-[10px] font-black uppercase items-center justify-center gap-1.5 text-red-500 transition-all ${isDark ? "border-red-500/30 hover:bg-red-500/10" : "border-red-200 bg-white shadow-sm hover:bg-red-50"}`}>
                <FaTrash size={12} /> <span>Clear All</span>
              </button>
            )}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"}`}>
              {user?.fullName?.charAt(0) || "U"}
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          {['All Orders', 'Returns'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === tab ? "bg-blue-600 text-white shadow-lg" : isDark ? "bg-[#1e293b] text-gray-400 border border-gray-800" : "bg-white text-gray-500 border border-gray-100 shadow-sm"}`}>
              {tab}
            </button>
          ))}
        </div>

        {orderLoading ? (
          <LoaderSpinner isDark={isDark} label="Loading orders..." />
        ) : activeOrders.length > 0 ? (
          <div className="space-y-6">
            {activeOrders.map((order) => (
              <div key={order.id}>
                <UserOrderItem
                  order={order}
                  isDark={isDark}
                  navigate={navigate}
                  setUpdatingOrderId={setUpdatingOrderId}
                />
                {updatingOrderId === order.id && (
                  <div className="mt-6 flex justify-end">
                    <OrderStatusUpdater
                      orderId={order.id}
                      currentStatus={order.status || 'placed'}
                      isDark={isDark}
                      onClose={() => setUpdatingOrderId(null)}
                    />
                  </div>
                )}
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
  );
});

/*
// export default React.memo(OrderView, (prev, next) => {
//   return (
//     prev.isDark === next.isDark &&
//     prev.orderLoading === next.orderLoading &&
//     prev.activeTab === next.activeTab &&
//     prev.updatingOrderId === next.updatingOrderId &&
//     prev.orders.length === next.orders.length
//   );
// });
*/

function Order({ orderLoading }) {
  const { mode } = useContext(ThemeContext);
  const { loggedInUser: user } = useContext(UserContext);
  const { orders } = useSelector((state) => state.orders);

  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [activeTab, setActiveTab] = useState('All Orders');
  const navigate = useNavigate();
  const isDark = mode === "dark";

  const handleDeleteAllOrders = async () => {
    if (!window.confirm("Bhai, kya aap sach mein saare orders delete karna chahte ho?")) return;
    try {
      await deleteUserOrdersFromFirestore(user?.uid);
      toast.info("Order history cleared!");
    } catch (err) {
      toast.error("Failed to clear history");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <OrderView
        isDark={isDark}
        orders={orders}
        orderLoading={orderLoading}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleDeleteAllOrders={handleDeleteAllOrders}
        navigate={navigate}
        updatingOrderId={updatingOrderId}
        setUpdatingOrderId={setUpdatingOrderId}
      />
      <ScrollToTopButoon mode={mode} />
    </Layout>
  );
}

export default React.memo(Order);

// export default React.memo(Order);
