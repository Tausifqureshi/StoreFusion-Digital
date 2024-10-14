import React, { useContext } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MyContext } from "../../context api/myContext";
import { MdPerson } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from 'react-toastify';
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user"))?.uid; // Use optional chaining
  const { mode, loading, order, setOrder, setLoading } = useContext(MyContext);

  const cancelOrder = async (orderItem) => {
    setLoading(true);
    try {
      // Check if userid is defined
      if (!userid) {
        throw new Error('User ID is undefined');
      }

      // Query to find the order by userId
      const q = query(
        collection(fireDB, "orders"),
        where("userid", "==", userid)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.warning('No order found to cancel.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return; // Exit if no orders found
      }

      // Loop through the orders and delete the one that matches the orderItem
      let orderFound = false; // Flag to check if order was found
      for (const doc of querySnapshot.docs) {
        if (doc.data().userId === orderItem.userId) {
          await deleteDoc(doc.ref);
          toast.success('Order cancelled successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          // Remove the canceled order from state
          setOrder((prevOrders) => prevOrders.filter((item) => item.userId !== orderItem.userId));
          orderFound = true; // Set flag if order was found and deleted
          break; // Exit after cancelling the matched order
        }
      }

      // If order was not found, show warning
      if (!orderFound) {
        toast.warning('Order not found.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

    } catch (error) {
      console.log('Error cancelling order:', error);
      toast.error('Order cancellation failed. Please try again.', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="container mx-auto py-10">
          <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: mode === "dark" ? "white" : "black" }}>
            Your Orders
          </h1>
          {order
            .filter((obj) => obj.userid === userid)
            .map((orderItem, index) => (
              <div
                className="bg-white rounded-lg shadow-lg mb-6 p-6 border-t-4 border-b-4 transition-transform transform"
                key={index}
                style={{
                  backgroundColor: mode === "dark" ? "#282c34" : "white",
                  borderColor: mode === "dark" ? "#444" : "#e0e0e0",
                }}
              >
                <div className="flex items-center mb-4">
                  <MdPerson className="text-4xl text-blue-500 mr-2" />
                  <h2 className="text-lg font-bold" style={{ color: mode === "dark" ? "white" : "black" }}>
                    {JSON.parse(localStorage.getItem("user"))?.fullName}
                  </h2>
                </div>
                {orderItem.addressInfo && (
                  <div className="border-b border-gray-300 pb-4 mb-4">
                    <h3 className="text-xl font-semibold flex items-center" style={{ color: mode === "dark" ? "white" : "black" }}>
                      <FiMapPin className="mr-2" />
                      Shipping Address:
                    </h3>
                    {Object.entries(orderItem.addressInfo).map(([key, value], index) => (
                      <div key={index} className="text-sm" style={{ color: mode === "dark" ? "white" : "gray" }}>
                        <strong>{key}: </strong>
                        {value}
                      </div>
                    ))}
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2 flex items-center" style={{ color: mode === "dark" ? "white" : "black" }}>
                  <MdCheckCircle className="mr-2" />
                  Order Items:
                </h3>
                {orderItem.cartItems.map((item, index) => (
                  <div className="flex items-start border-b border-gray-200 py-4" key={index}>
                    <img src={item.imageUrl} alt="product-image" className="w-32 h-32 object-contain rounded-lg mr-4" />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold" style={{ color: mode === "dark" ? "white" : "black" }}>
                        {item.title}
                      </h4>
                      <p className="text-sm mb-1" style={{ color: mode === "dark" ? "white" : "gray" }}>
                        {item.description}
                      </p>
                      <p className="text-lg font-semibold" style={{ color: mode === "dark" ? "white" : "black" }}>
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => cancelOrder(orderItem)} // Call cancelOrder with the selected orderItem
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






