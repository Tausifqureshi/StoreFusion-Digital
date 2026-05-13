import React, { useContext, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from '../../../../context/AllContext';
import DashboardTab from '../DashboardTabView/DashboardTab';
import { useNavigate } from 'react-router-dom';
import DashboardView from './components/DashboardView';
import { orderService } from '../../../../services/orderService';
import { authService } from '../../../../services/authService';
import { setOrders, setOrdersLoading } from '../../../../features/orders/orderSlice';
import { setUsers, setUsersLoading } from '../../../../features/users/userSlice';

function Dashboard() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🚀 ADMIN DATA STREAMS: Sirf tabhi chalenge jab admin dashboard par hoga
  useEffect(() => {
    dispatch(setOrdersLoading(true));
    dispatch(setUsersLoading(true));

    // 1. Monitor All Orders
    const unsubscribeOrders = orderService.getAllOrders((orders) => {
      dispatch(setOrders(orders));
      dispatch(setOrdersLoading(false));
    });

    // 2. Monitor All Users
    const unsubscribeUsers = authService.userListAdmin(
      (users) => {
        dispatch(setUsers(users));
        dispatch(setUsersLoading(false));
      },
      (error) => {
        console.error("❌ Admin Users List Error:", error);
        dispatch(setUsersLoading(false));
      }
    );

    return () => {
      if (unsubscribeOrders) unsubscribeOrders();
      if (unsubscribeUsers) unsubscribeUsers();
      orderService.stopLiveUpdates();
    };
  }, [dispatch]);

  // 👉 TAB UNIFIED INSTANCE: Locked to prevent reconciliation
  const memoTabs = useMemo(() => <DashboardTab />, []);

  return (
    <>
      <DashboardView
        isDark={isDark}
        navigate={navigate}
      >
        {memoTabs}
      </DashboardView>
    </>
  );
}

export default React.memo(Dashboard);

