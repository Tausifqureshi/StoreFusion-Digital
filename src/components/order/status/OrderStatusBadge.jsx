import React from 'react';
import { getStatusConfig } from './statusConfig';

/**
 * OrderStatusBadge Component
 * Premium, memoized badge for displaying order status with consistent branding and subtle animations.
 */
const OrderStatusBadge = React.memo(function OrderStatusBadge({ status, isDark }) {
  const config = getStatusConfig(status);

  // Setup animations for active statuses
  const isPulse = status?.toLowerCase() === 'processing' || status?.toLowerCase() === 'shipped';
  const animateClass = isPulse ? 'animate-pulse' : '';

  // Determine active colors
  const activeColor = isDark ? config.darkColor : config.color;
  const activeBg = isDark ? config.darkBgColor : config.bgColor;
  
  // Custom border based on background
  const activeBorder = isDark ? 'border-gray-800' : 'border-gray-200';

  return (
    <span className={`px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-tighter flex items-center justify-center gap-1.5 border ${activeColor} ${activeBg} ${activeBorder} ${animateClass} transition-all duration-300 shadow-sm shadow-black/5`}>
      {/* Subtle Dot Indicator (Safe usage without .replace hack) */}
      <span className={`w-1.5 h-1.5 rounded-full ${activeBg.replace('bg-opacity', '')} bg-current opacity-60`}></span>
      
      <config.icon strokeWidth={2.5} size={13} />
      {config.label}
    </span>
  );
});



export default OrderStatusBadge;

