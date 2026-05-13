
import { ThemeContext } from '../../../context/AllContext';
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { orderService } from "../../../services/orderService";

import OrderView from "./OrderView";

function Order() {
  const { mode } = useContext(ThemeContext);
  const user = useSelector((state) => state.users.loggedInUser);
  const { items: orders, loading: orderLoading } = useSelector((state) => state.orders);


  const navigate = useNavigate();
  const isDark = mode === "dark";

  const handleDeleteAllOrders = async () => {
    if (!window.confirm("Bhai, kya aap sach mein saare orders delete karna chahte ho?")) return;
    try {
      await orderService.clearUserOrderHistory(user?.uid);
      toast.success("Order history cleared successfully! 🗑️");
    } catch (err) {
      toast.error("Failed to clear history. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <OrderView
        isDark={isDark}
        orders={orders}
        orderLoading={orderLoading}
        user={user}
        handleDeleteAllOrders={handleDeleteAllOrders}
        navigate={navigate}
      />
    </>
  );
}

export default React.memo(Order);
