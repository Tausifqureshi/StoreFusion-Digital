
import { ThemeContext, UserContext } from '../../../context/AllContext';
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppLoading } from "../../../context/LoadingState";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { deleteUserOrdersFromFirestore } from "../orderFirestore";
import OrderView from "./OrderView";

function Order() {
  const { orderLoading } = useAppLoading();
  const { mode } = useContext(ThemeContext);
  const { loggedInUser: user } = useContext(UserContext);
  const { orders } = useSelector((state) => state.orders);

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
