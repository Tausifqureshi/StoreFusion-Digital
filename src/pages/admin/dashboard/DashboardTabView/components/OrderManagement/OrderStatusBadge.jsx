import React from 'react';
import { FiCheckCircle, FiBox, FiClock, FiAlertCircle, FiTruck } from 'react-icons/fi';

const OrderStatusBadge = ({ status, isDark }) => {
  let colorClass = "";
  let bgClass = "";
  
  const s = status?.toLowerCase() || 'processing';
  
  if (s === 'delivered' || s === 'completed') {
    colorClass = isDark ? 'text-green-400' : 'text-[#16a34a]';
    bgClass = isDark ? 'bg-green-500/10' : 'bg-[#dcfce7]';
  } else if (s === 'processing' || s === 'placed') {
    colorClass = isDark ? 'text-blue-400' : 'text-[#2563eb]';
    bgClass = isDark ? 'bg-blue-500/10' : 'bg-[#dbeafe]';
  } else if (s === 'shipped') {
    colorClass = isDark ? 'text-purple-400' : 'text-[#9333ea]';
    bgClass = isDark ? 'bg-purple-500/10' : 'bg-[#f3e8ff]';
  } else if (s === 'pending') {
    colorClass = isDark ? 'text-yellow-400' : 'text-[#d97706]';
    bgClass = isDark ? 'bg-yellow-500/10' : 'bg-[#fef3c7]';
  } else if (s === 'cancelled') {
    colorClass = isDark ? 'text-red-400' : 'text-[#dc2626]';
    bgClass = isDark ? 'bg-red-500/10' : 'bg-[#fee2e2]';
  } else {
    colorClass = isDark ? 'text-gray-400' : 'text-[#4b5563]';
    bgClass = isDark ? 'bg-gray-500/10' : 'bg-[#f3f4f6]';
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
