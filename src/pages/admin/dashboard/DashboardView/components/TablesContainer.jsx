import React, { useContext } from 'react';
import { ProductContext, OrderContext, UserContext } from '../../../../../context api/AllContext';
import { useDashboardData } from '../hooks/useDashboardData';
import ProductCategories from './ProductCategories';
import RecentOrders from './RecentOrders';

const TablesContainer = React.memo(({ isDark, selectedRange, selectedDate }) => {
  const { product: allProducts } = useContext(ProductContext);
  const { order: allOrders } = useContext(OrderContext);
  const { user: allUsers } = useContext(UserContext);

  const {
    order, product
  } = useDashboardData(allProducts, allOrders, allUsers);

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
}, (prev, next) => {
  return (
    prev.isDark === next.isDark &&
    prev.selectedRange === next.selectedRange &&
    prev.selectedDate?.getTime() === next.selectedDate?.getTime()
  );
});

export default TablesContainer;
