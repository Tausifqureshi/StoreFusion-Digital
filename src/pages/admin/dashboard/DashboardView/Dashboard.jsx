import React, { useContext } from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaTags } from 'react-icons/fa';
import { MyContext } from '../../../../context api/myContext';
import Layout from '../../../../components/layout/Layout';
import DashboardTab from '../DashboardTabView/DashboardTab';
import ScrollToTopButton from '../../../../components/Scroll top/ScrollToTopButoon';
import { useNavigate } from 'react-router-dom';

import StatCard from './components/StatCard';
import QuickActions from './components/QuickActions';
import OrdersTrend from './components/OrdersTrend';
import ProductCategories from './components/ProductCategories';
import RecentOrders from './components/RecentOrders';
import MonthlyProductSales from './components/MonthlyProductSales';
import RevenueTrend from './components/RevenueTrend';
import DashboardHeader from './components/DashboardHeader';
import { useDashboardData } from './hooks/useDashboardData';

function Dashboard() {
  const { mode, product: allProducts, order: allOrders, user: allUsers } = useContext(MyContext);
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  // 👉 All extremely heavy logic, filtering, state management, and the user's explicit useEffect block
  // are beautifully extracted and memoized inside this high-performance custom hook
  const {
    selectedRange, setSelectedRange,
    selectedDate, setSelectedDate,
    order, product, user,
    monthlyOrders, monthlyRevenue,
    totalRevenue, newDiscounts
  } = useDashboardData(allProducts, allOrders, allUsers);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <span className="font-black text-xl">₹</span>,
      iconBg: "bg-green-100 dark:bg-green-500/20",
      iconColor: "text-green-600 dark:text-green-400",
      trend: "up",
      trendValue: "+12.5%"
    },
    {
      title: "New Discounts",
      value: newDiscounts,
      icon: <FaTags className="text-xl" />,
      iconBg: "bg-pink-100 dark:bg-pink-500/20",
      iconColor: "text-pink-600 dark:text-pink-400",
      trend: "up",
      trendValue: "+4.1%"
    },
    {
      title: "Products",
      value: product?.length || 0,
      icon: <FaBox className="text-xl" />,
      iconBg: "bg-orange-100 dark:bg-orange-500/20",
      iconColor: "text-orange-600 dark:text-orange-400",
      trend: "up",
      trendValue: "+8.2%"
    },
    {
      title: "Orders",
      value: order?.length || 0,
      icon: <FaShoppingCart className="text-xl" />,
      iconBg: "bg-purple-100 dark:bg-purple-500/20",
      iconColor: "text-purple-600 dark:text-purple-400",
      trend: "up",
      trendValue: "+23.1%"
    },
    {
      title: "Users",
      value: user?.length || 0,
      icon: <FaUsers className="text-xl" />,
      iconBg: "bg-blue-100 dark:bg-blue-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      trend: "down",
      trendValue: "-2.4%"
    },
  ];

  return (
    <Layout>
      <div className={`min-h-screen pt-28 pb-16 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"} font-sans`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">

          <DashboardHeader
            isDark={isDark}
            selectedRange={selectedRange}
            setSelectedRange={setSelectedRange}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 relative z-10">
            {stats.map((item, index) => (
              <StatCard key={index} {...item} isDark={isDark} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10">
            <MonthlyProductSales isDark={isDark} data={monthlyOrders} />
            <RevenueTrend isDark={isDark} data={monthlyRevenue} />
          </div>

          <div className="w-full relative z-10">
            <OrdersTrend isDark={isDark} data={monthlyOrders} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            <div className="lg:col-span-1">
              <ProductCategories isDark={isDark} products={product} />
            </div>
            <div className="lg:col-span-2">
              <RecentOrders isDark={isDark} orders={order} />
            </div>
          </div>

          <div className="w-full relative z-10">
            <QuickActions isDark={isDark} navigate={navigate} />
          </div>

          <div className={`mt-10 rounded-3xl border transition-all overflow-hidden flex flex-col relative z-10 ${isDark ? "bg-[#1e293b] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"}`}>
            <DashboardTab />
          </div>

        </div>
      </div>
      <ScrollToTopButton />
    </Layout>
  );
}

export default Dashboard;
