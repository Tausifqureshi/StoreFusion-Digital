import React from 'react';
import ProductCategories from './ProductCategories';
import RecentOrders from './RecentOrders';

const TablesContainer = React.memo(function TablesContainer({ isDark, product, order }) {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
      <div className="lg:col-span-1">
        <ProductCategories isDark={isDark} products={product} />
      </div>
      <div className="lg:col-span-2">
        <RecentOrders isDark={isDark} orders={order} />
      </div>
    </div>
  );
});

export default TablesContainer;
