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
// 5500 6700 0000 1002 // payment test card number

function Order() {
   const [mode, setMode] = useState("light");
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user?.uid;

  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  
  const handleOrders = (orders) => {
    dispatch(setOrders(orders));
    setLoading(false); // 👈 yahan loader OFF
  }; 

  // ✅ Realtime fetch orders
  useEffect(() => {
    if (!userid) return; // No user ID, no orders
     setLoading(true); // 👈 yahan loader ON

    // const unsubscribe = getUserOrdersFromFirestore(userid, (orders) => {
    //   dispatch(setOrders(orders));
    //   setLoading(false); // 👈 yahan loader OFF
    // });

    const unsubscribe = getUserOrdersFromFirestore(userid, handleOrders);

    return () => unsubscribe();
  }, [userid]);


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
              {/* {order.status === "placed" && (
                <button
                  onClick={() => handleCancelOrder(order)}
                  className="text-red-600 flex items-center mt-3"
                >
                  <FaTrash className="mr-1" /> Cancel Order
                </button>
              )}  */}
              <button
                  onClick={() => handleCancelOrder(order)}
                  className="text-red-600 flex items-center mt-3"
                >
                  <FaTrash className="mr-1" /> Cancel Order
                </button>

               {/* {order.status === "cancelled" && (
                <span className="text-red-500">Cancelled</span>
                )} */}

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







