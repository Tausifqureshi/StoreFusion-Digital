import React, { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { updateOrderStatus } from '../orderFirestore';
import { statusOptions } from './statusConfig';

 

function OrderStatusUpdater({ orderId, currentStatus, isDark, onClose }) {
  const [loading, setLoading] = useState(null);

  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === currentStatus) return;
    setLoading(newStatus);
    try {
      await updateOrderStatus(orderId, newStatus, currentStatus);
      onClose?.();
    } catch (err) {
      console.error('Status update failed:', err);
    } finally {
      setLoading(null);
    }
  };



  return (
    <div className={`rounded-2xl p-4 border shadow-xl w-64 ${isDark ? 'bg-[#1a1f2e] border-gray-700' : 'bg-white border-gray-200'}`}>
      <p className={`text-xs font-bold mb-3 uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Update Order Status
      </p>

      <div className="flex flex-col gap-2">
        {statusOptions.map(({ label, icon: Icon, color }) => {
          const isActive = currentStatus?.toLowerCase() === label;
          const isLoading = loading === label;

          return (
            <button
              key={label}
              onClick={() => handleStatusUpdate(label)}
              disabled={isLoading || isActive}
              className={`
                flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold text-white
                transition-all duration-200 active:scale-95
                ${isActive ? 'opacity-50 cursor-not-allowed ' + color : color}
              `}
            >
              {isLoading ? <FiRefreshCw size={14} className="animate-spin" /> : <Icon size={14} />}
              {label.charAt(0).toUpperCase() + label.slice(1)}
              {isActive && (
                <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                  Current
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

OrderStatusUpdater.displayName = 'OrderStatusUpdater';
export default React.memo(OrderStatusUpdater);

// export default React.memo(OrderStatusUpdater, (prevProps, nextProps) => {
//   if (prevProps.orderId !== nextProps.orderId) return false;
//   if (prevProps.currentStatus !== nextProps.currentStatus) return false;
//   if (prevProps.isDark !== nextProps.isDark) return false;
//   return true;
// });


