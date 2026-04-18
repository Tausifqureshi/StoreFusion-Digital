import {
  FiClock,
  FiRefreshCw,
  FiTruck,
  FiCheckCircle,
  FiXCircle,
  FiBox,
} from 'react-icons/fi';

// ✅ ORDER STATUS OPTIONS (For UI Dropdowns/Updaters)
export const statusOptions = [
  { label: 'placed', icon: FiBox, color: 'bg-orange-500 hover:bg-orange-600' },
  { label: 'pending', icon: FiClock, color: 'bg-yellow-500 hover:bg-yellow-600' },
  { label: 'processing', icon: FiRefreshCw, color: 'bg-blue-500 hover:bg-blue-600' },
  { label: 'shipped', icon: FiTruck, color: 'bg-purple-500 hover:bg-purple-600' },
  { label: 'hub', icon: FiBox, color: 'bg-indigo-500 hover:bg-indigo-600' },
  { label: 'delivered', icon: FiCheckCircle, color: 'bg-green-500 hover:bg-green-600' },
  { label: 'returned', icon: FiRefreshCw, color: 'bg-gray-500 hover:bg-gray-600' },
  { label: 'refunded', icon: FiRefreshCw, color: 'bg-blue-400 hover:bg-blue-500' },
  { label: 'cancelled', icon: FiXCircle, color: 'bg-red-500 hover:bg-red-600' },
];

// ✅ CENTRALIZED STATUS CONFIG: Eliminates string-matching hacks in components
const statusConfig = {
  placed: {
    label: 'Order Placed',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    darkBgColor: 'bg-orange-500/20',
    darkColor: 'text-orange-400',
    icon: FiBox,
  },
  pending: {
    label: 'Pending',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    darkBgColor: 'bg-yellow-500/20',
    darkColor: 'text-yellow-400',
    icon: FiClock,
  },
  processing: {
    label: 'Processing',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    darkBgColor: 'bg-blue-500/20',
    darkColor: 'text-blue-400',
    icon: FiRefreshCw,
  },
  shipped: {
    label: 'Shipped',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    darkBgColor: 'bg-purple-500/20',
    darkColor: 'text-purple-400',
    icon: FiTruck,
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    darkBgColor: 'bg-green-500/20',
    darkColor: 'text-green-400',
    icon: FiCheckCircle,
  },
  returned: {
    label: 'Returned',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    darkBgColor: 'bg-gray-500/20',
    darkColor: 'text-gray-400',
    icon: FiRefreshCw,
  },
  refunded: {
    label: 'Refunded',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    darkBgColor: 'bg-indigo-500/20',
    darkColor: 'text-indigo-400',
    icon: FiRefreshCw,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    darkBgColor: 'bg-red-500/20',
    darkColor: 'text-red-400',
    icon: FiXCircle,
  },
  default: {
    label: 'Unknown',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    darkBgColor: 'bg-gray-500/20',
    darkColor: 'text-gray-400',
    icon: FiBox,
  },
};

export const getStatusConfig = (statusString) => {
  if (!statusString) return statusConfig.default;
  const normalized = statusString.toString().toLowerCase().trim();
  return statusConfig[normalized] || statusConfig.default;
};
