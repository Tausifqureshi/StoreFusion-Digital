import React from 'react';
import { FiCheckCircle, FiBox, FiClock, FiAlertCircle, FiTruck, FiMapPin, FiRotateCcw, FiDollarSign } from 'react-icons/fi';

/**
 * OrderStatusBadge Component
 * Premium, memoized badge for displaying order status with consistent branding and subtle animations.
 */
const OrderStatusBadge = React.memo(({ status, isDark }) => {
  const s = status?.toLowerCase() || 'processing';

  // Configuration for styles and icons based on status
  const statusConfig = { 
    delivered: {
      color: isDark ? 'text-green-400' : 'text-green-700',
      bg: isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-100 border-green-200',
      icon: <FiCheckCircle strokeWidth={2.5} size={13} />,
      animate: ""
    },
    completed: {
      color: isDark ? 'text-green-400' : 'text-green-700',
      bg: isDark ? 'bg-green-500/10 border-green-500/20' : 'bg-green-100 border-green-200',
      icon: <FiCheckCircle strokeWidth={2.5} size={13} />,
      animate: ""
    },
    processing: {
      color: isDark ? 'text-orange-400' : 'text-orange-700',
      bg: isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-100 border-orange-200',
      icon: <FiBox strokeWidth={2.5} size={13} />,
      animate: "animate-pulse" // Subtle pulse for active work
    },
    placed: {
      color: isDark ? 'text-orange-400' : 'text-orange-700',
      bg: isDark ? 'bg-orange-500/10 border-orange-500/20' : 'bg-orange-100 border-orange-200',
      icon: <FiBox strokeWidth={2.5} size={13} />,
      animate: ""
    },
    shipped: {
      color: isDark ? 'text-purple-400' : 'text-purple-700',
      bg: isDark ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-100 border-purple-200',
      icon: <FiTruck strokeWidth={2.5} size={13} />,
      animate: "animate-pulse"
    },
    pending: {
      color: isDark ? 'text-yellow-400' : 'text-yellow-700',
      bg: isDark ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-yellow-100 border-yellow-200',
      icon: <FiClock strokeWidth={2.5} size={13} />,
      animate: ""
    },
    hub: {
      color: isDark ? 'text-indigo-400' : 'text-indigo-700',
      bg: isDark ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-indigo-100 border-indigo-200',
      icon: <FiMapPin strokeWidth={2.5} size={13} />,
      animate: ""
    },
    returned: {
      color: isDark ? 'text-gray-400' : 'text-gray-600',
      bg: isDark ? 'bg-gray-500/10 border-gray-500/20' : 'bg-gray-100 border-gray-200',
      icon: <FiRotateCcw strokeWidth={2.5} size={13} />,
      animate: ""
    },
    cancelled: {
      color: isDark ? 'text-red-400' : 'text-red-700',
      bg: isDark ? 'bg-red-500/10 border-red-500/20' : 'bg-red-100 border-red-200',
      icon: <FiAlertCircle strokeWidth={2.5} size={13} />,
      animate: ""
    },
    refunded: {
      color: isDark ? 'text-blue-400' : 'text-blue-700',
      bg: isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-100 border-blue-200',
      icon: <FiDollarSign strokeWidth={2.5} size={13} />,
      animate: ""
    }
  };

  const config = statusConfig[s] || {
    color: isDark ? 'text-gray-400' : 'text-gray-600',
    bg: isDark ? 'bg-gray-500/10 border-gray-500/20' : 'bg-gray-100 border-gray-200',
    icon: null,
    animate: ""
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-tighter flex items-center justify-center gap-1.5 border ${config.color} ${config.bg} ${config.animate} transition-all duration-300 shadow-sm shadow-black/5`}>
      {/* Subtle Dot Indicator */}
      <span className={`w-1.5 h-1.5 rounded-full ${config.color.replace('text-', 'bg-')} opacity-60`}></span>
      
      {config.icon}
      {s}
    </span>
  );
});

OrderStatusBadge.displayName = 'OrderStatusBadge';

export default OrderStatusBadge;
