import React, { useContext, useMemo } from 'react';
import { ProductContext, OrderContext, UserContext } from '../../../../../context api/AllContext';
import { useDashboardData } from '../hooks/useDashboardData';
import StatCard from './StatCard';
import { FaBox, FaShoppingCart, FaUsers, FaTags } from 'react-icons/fa';

const StatCardsContainer = React.memo(({ isDark, selectedRange, selectedDate }) => {
  const { product: allProducts } = useContext(ProductContext);
  const { order: allOrders } = useContext(OrderContext);
  const { user: allUsers } = useContext(UserContext);

  const {
    order, product, user,
    totalRevenue, newDiscounts
  } = useDashboardData(allProducts, allOrders, allUsers);

  // 👉 stats calculation is now isolated here
  const stats = useMemo(() => [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <span className="font-black text-xl">₹</span>,
      bgClass: "bg-green-500 hover:bg-green-600",
      shadowClass: "shadow-green-500/40",
      trend: "up",
      trendValue: "+12.5%"
    },
    {
      title: "New Discounts",
      value: newDiscounts,
      icon: <FaTags className="text-xl" />,
      bgClass: "bg-pink-500 hover:bg-pink-600",
      shadowClass: "shadow-pink-500/40",
      trend: "up",
      trendValue: "+4.1%"
    },
    {
      title: "Products",
      value: product?.length || 0,
      icon: <FaBox className="text-xl" />,
      bgClass: "bg-orange-500 hover:bg-orange-600",
      shadowClass: "shadow-orange-500/40",
      trend: "up",
      trendValue: "+8.2%"
    },
    {
      title: "Orders",
      value: order?.length || 0,
      icon: <FaShoppingCart className="text-xl" />,
      bgClass: "bg-purple-500 hover:bg-purple-600",
      shadowClass: "shadow-purple-500/40",
      trend: "up",
      trendValue: "+23.1%"
    },
    {
      title: "Users",
      value: user?.length || 0,
      icon: <FaUsers className="text-xl" />,
      bgClass: "bg-blue-500 hover:bg-blue-600",
      shadowClass: "shadow-blue-500/40",
      trend: "down",
      trendValue: "-2.4%"
    },
  ], [totalRevenue, newDiscounts, product?.length, order?.length, user?.length]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 relative z-10">
      {stats.map((item, index) => (
        <StatCard key={index} {...item} isDark={isDark} />
      ))}
    </div>
  );
}, (prev, next) => {
  return (
    prev.isDark === next.isDark &&
    prev.selectedRange === next.selectedRange &&
    prev.selectedDate?.getTime() === next.selectedDate?.getTime()
  );
});

export default StatCardsContainer;
