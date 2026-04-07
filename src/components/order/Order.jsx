
import { ThemeContext, UserContext } from '../../context api/AllContext';
import React, { useContext, useEffect } from "react";
import Layout from "../layout/Layout";
import { toast } from "react-toastify";
import ScrollToTopButoon from "../Scroll top/ScrollToTopButoon";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserOrdersFromFirestore } from "./orderFirestore";
import OrderView from "./components/OrderView";

function Order({ orderLoading }) {
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
    <Layout>
      <OrderView
        isDark={isDark}
        orders={orders}
        orderLoading={orderLoading}
        user={user}
        handleDeleteAllOrders={handleDeleteAllOrders}
        navigate={navigate}
      />
      <ScrollToTopButoon mode={mode} />
    </Layout>
  );
}

const MemoizedOrder = React.memo(Order);
MemoizedOrder.displayName = 'Order';
export default MemoizedOrder;
