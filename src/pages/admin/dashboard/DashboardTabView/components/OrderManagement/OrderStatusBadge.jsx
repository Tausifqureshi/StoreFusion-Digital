import React from 'react';
import { FiCheckCircle, FiBox, FiClock, FiAlertCircle, FiTruck } from 'react-icons/fi';

const OrderStatusBadge = ({ status, isDark }) => {
  let colorClass = "";
  let bgClass = "";
  
  const s = status?.toLowerCase() || 'processing';
  
  if (s === 'delivered' || s === 'completed') {
    colorClass = isDark ? 'text-green-400' : 'text-green-700';
    bgClass = isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-100 border border-green-200';
  } else if (s === 'processing' || s === 'placed') {
    // Matching summary card's orange color for processing
    colorClass = isDark ? 'text-orange-400' : 'text-orange-700';
    bgClass = isDark ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-orange-100 border border-orange-200';
  } else if (s === 'shipped') {
    colorClass = isDark ? 'text-purple-400' : 'text-purple-700';
    bgClass = isDark ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-100 border border-purple-200';
  } else if (s === 'pending') {
    colorClass = isDark ? 'text-yellow-400' : 'text-yellow-700';
    bgClass = isDark ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-100 border border-yellow-200';
  } else if (s === 'cancelled') {
    colorClass = isDark ? 'text-red-400' : 'text-red-700';
    bgClass = isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-100 border border-red-200';
  } else {
    colorClass = isDark ? 'text-gray-400' : 'text-gray-600';
    bgClass = isDark ? 'bg-gray-500/10 border border-gray-500/20' : 'bg-gray-100 border border-gray-200';
  }

  // 👉 'placed' status ko UI par 'processing' dikhane ke liye alias bana rahe hain
  const displayText = s === 'placed' ? 'processing' : s;

  return (
    <span className={`px-2.5 py-1 rounded-full text-[12px] font-medium flex items-center justify-center gap-1.5 ${colorClass} ${bgClass}`}>
      {(s === 'delivered' || s === 'completed') && <FiCheckCircle strokeWidth={2.5} size={13} />}
      {(s === 'processing' || s === 'placed') && <FiBox strokeWidth={2.5} size={13} />}
      {s === 'shipped' && <FiTruck strokeWidth={2.5} size={13} />}
      {s === 'pending' && <FiClock strokeWidth={2.5} size={13} />}
      {s === 'cancelled' && <FiAlertCircle strokeWidth={2.5} size={13} />}
      {displayText}
    </span>
  );
};

export default OrderStatusBadge;
