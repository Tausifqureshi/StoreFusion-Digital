import { ThemeContext, UserContext } from '../../../context/AllContext';
import React, { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppLoading } from "../../../context/LoadingState";
import { useSelector, useDispatch } from "react-redux";
import LoaderSpinner from "../../loader/LoaderSpinner";
import { toast } from "react-toastify";
import { cancelOrderFromFirestore } from "../orderFirestore";
import { cancelOrder } from "../../../redux/orderSlice";

import Tracking from "./Tracking";
import OrderDetailHeader from "./components/OrderDetailHeader";
import OrderInfoBar from "./components/OrderInfoBar";
import OrderItemsList from "./components/OrderItemsList";
import OrderCustomerInfo from "./components/OrderCustomerInfo";

function OrderDetails() {
  const { orderLoading } = useAppLoading();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  const { loggedInUser: user } = useContext(UserContext);
  const { orders } = useSelector((state) => state.orders);
  const [cancellingId, setCancellingId] = useState(null);

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
      <div className={`min-h-screen pt-28 pb-12 transition-all duration-300 ${isDark ? "bg-[#1a1f2e] text-white" : "bg-[#f8fafc] text-gray-900"}`}>
        <div className="max-w-6xl mx-auto px-4">
          {orderLoading ? (
            <div className="flex justify-center items-center py-20">
              <LoaderSpinner isDark={isDark} label="Loading order..." />
            </div>
          ) : order ? (
            <>
              {/* Header */}
              <OrderDetailHeader navigate={navigate} isDark={isDark} />

              {/* COMPONENT: TRACKING SECTION - Moved to very Top */}
              <div className="mb-10">
                <Tracking order={order} isDark={isDark} />
              </div>

              <div className={`relative overflow-hidden rounded-[40px] border-2 transition-all duration-500 ${isDark ? "bg-[#1a1f2e] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"}`}>

                {/* Header Info Bar */}
                <OrderInfoBar order={order} totalPrice={totalPrice} isDark={isDark} />

                <div className="p-6 md:p-10">
                  <div className="grid lg:grid-cols-2 gap-10">
                    {/* Items */}
                    <OrderItemsList order={order} isDark={isDark} navigate={navigate} />

                    {/* Customer Details & Shipping */}
                    <OrderCustomerInfo
                      user={user}
                      addressInfo={addressInfo}
                      order={order}
                      isDark={isDark}
                      cancellingId={cancellingId}
                      handleCancelOrder={handleCancelOrder}
                    />
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
