import React, { useContext, useMemo } from 'react';
import { ProductContext, OrderContext, UserContext } from '../../../../../context api/AllContext';
import { useDashboardData } from '../hooks/useDashboardData';
import MonthlyProductSales from './MonthlyProductSales';
import RevenueTrend from './RevenueTrend';
import OrdersTrend from './OrdersTrend';

const ChartsContainer = React.memo(({ isDark, selectedRange, selectedDate }) => {
  const { product: allProducts } = useContext(ProductContext);
  const { order: allOrders } = useContext(OrderContext);
  const { user: allUsers } = useContext(UserContext);

  const {
    monthlyOrders, monthlyRevenue
  } = useDashboardData(allProducts, allOrders, allUsers);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 relative z-10">
        <MonthlyProductSales isDark={isDark} data={monthlyOrders} />
        <RevenueTrend isDark={isDark} data={monthlyRevenue} />
      </div>
      <div className="w-full relative z-10">
        <OrdersTrend isDark={isDark} data={monthlyOrders} />
      </div>
    </>
  );
}, (prev, next) => {
  return (
    prev.isDark === next.isDark &&
    prev.selectedRange === next.selectedRange &&
    prev.selectedDate?.getTime() === next.selectedDate?.getTime()
  );
});

export default ChartsContainer;
