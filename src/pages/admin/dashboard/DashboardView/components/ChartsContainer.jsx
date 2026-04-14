import React, { useMemo } from 'react';
import MonthlyProductSales from './MonthlyProductSales';
import RevenueTrend from './RevenueTrend';
import OrdersTrend from './OrdersTrend';

const ChartsContainer = React.memo(function ChartsContainer({ isDark, monthlyOrders, monthlyRevenue }) {

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
});

export default ChartsContainer;
