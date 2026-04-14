import React from 'react';
import OrderItem from './OrderItem';
import { FaShoppingCart } from 'react-icons/fa';

function OrderTable({ isDark, ordersOnCurrentPage, activeDropdown, setActiveDropdown }) {
  return (
    <div className="flex flex-col gap-4">
      {ordersOnCurrentPage.length > 0 ? (
        ordersOnCurrentPage.map((o, i) => {
          // ✅ Unique key guaranteed
          const uniqueKey = o.id || o.paymentId || `order-${i}`;
          return (
            <OrderItem
              key={uniqueKey}
              isDark={isDark}
              o={o}
              i={i}
              uniqueKey={uniqueKey}
              isActive={activeDropdown === uniqueKey}
              setActiveDropdown={setActiveDropdown}
            />
          );
        })
      ) : (
        <div className="py-20 text-center border-2 border-dashed rounded-3xl border-gray-200 dark:border-gray-800">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <FaShoppingCart className={`text-3xl ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
          </div>
          <p className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No orders found.</p>
        </div>
      )}
    </div>
  );
};

// 👉 React.memo: Absolute performance lock for order list Without Risky hacks
OrderTable.displayName = 'OrderTable';
export default React.memo(OrderTable);
