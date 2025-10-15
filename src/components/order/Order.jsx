import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MdPerson } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon"; 
import { useDispatch, useSelector } from "react-redux";
import { setOrders, cancelOrder } from "../../redux/orderSlice";

function Order() { 
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user?.uid;  
 
  const { orders } = useSelector((state) => state.orders);95597560
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false); 
  const [mode, setMode] = useState("light");

  // 🔹 Fetch Orders (Realtime listener from Firestore)  
  useEffect(() => {
    if (!userid) return;

    const q = query(
      collection(fireDB, "orders"),
      where("userid", "==", userid)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ka unique id
          ...doc.data(), // us order ka pura data (jisne order kiya uska userid + addressInfo + cartItems etc.)
        })); 
        dispatch(setOrders(fetchedOrders)); // Redux me set karna
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    return () => unsubscribe();
  }, [userid, dispatch]);              

  // 🔹 Cancel Order
  const handleCancelOrder = async (orderItem) => {
    if (!orderItem?.id) {
      toast.error("Invalid order ID");
      return;
    }

    setLoading(true);
    try {  
      await deleteDoc(doc(fireDB, "orders", orderItem.id));
 
      // Redux se remove kar turant UI update ke liye
      dispatch(cancelOrder({ id: orderItem.id }));

      toast.success("Order cancelled successfully", {   
        position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order. Try again.", {   
        position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });


    } finally {
      setLoading(false);
    }
  }; 
  
  return (
    <Layout>
      {loading && <Loader />}

      {orders.length > 0 ? (
        <div className="container mx-auto py-10">
          <h1
            className="text-4xl font-bold mb-6 text-center"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Your Orders
          </h1>

          {orders.map((orderItem, index) => (
            <div
              className="bg-white rounded-lg shadow-lg mb-6 p-6 border-t-4 border-b-4 transition-transform transform"
              key={index}
              style={{
                backgroundColor: mode === "dark" ? "#282c34" : "white",
                borderColor: mode === "dark" ? "#444" : "#e0e0e0",
              }}
            >
              {/* User */}
              <div className="flex items-center mb-4">
                <MdPerson className="text-4xl text-blue-500 mr-2" />
                <h2
                  className="text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  {user?.fullName}
                </h2>
              </div>

              {/* Address */}
              {orderItem.addressInfo && (
                <div className="border-b border-gray-300 pb-4 mb-4">
                  <h3
                    className="text-xl font-semibold flex items-center"
                    style={{ color: mode === "dark" ? "white" : "black" }}
                  >
                    <FiMapPin className="mr-2" />
                    Shipping Address:
                  </h3>
                  {Object.entries(orderItem.addressInfo).map(
                    ([key, value], idx) => (
                      <div
                        key={idx}
                        className="text-sm"
                        style={{ color: mode === "dark" ? "white" : "gray" }}
                      >
                        <strong>{key}: </strong>
                        {value}
                      </div>
                    )
                  )}
                </div>
              )}

              {/* Cart Items */}
              <h3
                className="text-xl font-semibold mb-2 flex items-center"
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                <MdCheckCircle className="mr-2" />
                Order Items:
              </h3>
              {orderItem.cartItems.map((item, idx) => (
                <div
                  className="flex items-start border-b border-gray-200 py-4"
                  key={idx}
                >
                  <img
                    src={item.imageUrl}
                    alt="product"
                    className="w-32 h-32 object-contain rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <h4
                      className="text-lg font-bold"
                      style={{ color: mode === "dark" ? "white" : "black" }}
                    >
                      {item.title}
                    </h4>
                    <p
                      className="text-sm mb-1"
                      style={{ color: mode === "dark" ? "white" : "gray" }}
                    >
                      {item.description}
                    </p>
                    <p
                      className="text-lg font-semibold"
                      style={{ color: mode === "dark" ? "white" : "black" }}
                    >
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}

              {/* Cancel Order */}
              <button
                onClick={() => handleCancelOrder(orderItem)}
                className="mt-4 text-red-500 flex items-center"
              >
                <FaTrash className="mr-1" /> Cancel Order
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}

      <ScrollToTopButoon />
    </Layout>
  );
}

export default Order;   
