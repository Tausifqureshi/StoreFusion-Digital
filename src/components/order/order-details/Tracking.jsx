import React, { useMemo } from 'react';
import { FiCheck } from 'react-icons/fi';
import { MdHeadsetMic } from 'react-icons/md';

function Tracking({ order, isDark }) {
  const currentStatus = (order?.status || "placed").toLowerCase();

  // ✅ simple + stable switch logic
  const getStepIndex = (status) => {
    switch (status) {
      case "placed": return 0;
      case "processing": return 1;
      case "shipped": return 2;
      case "hub": return 3;
      case "delivered": return 4;
      default: return -1;
    }
  };

  const activeStepIndex = getStepIndex(currentStatus);

  // ✅ safe date formatter (converts "Monday, 12 January" to "12 Jan")
  const shortenDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return dateStr;
    try {
      let short = dateStr.includes(",")
        ? dateStr.split(",").slice(1).join(",").trim()
        : dateStr;

      const months = {
        January: "Jan", February: "Feb", March: "Mar", April: "Apr",
        May: "May", June: "Jun", July: "Jul", August: "Aug",
        September: "Sep", October: "Oct", November: "Nov", December: "Dec"
      };

      Object.keys(months).forEach((m) => {
        if (short.includes(m)) short = short.replace(m, months[m]);
      });
      return short;
    } catch {
      return dateStr;
    }
  };

  const getDate = (date, fallback) => {
    return date ? shortenDate(date) : fallback;
  };

  // ✅ Memoized tracking steps for high performance
  const trackingStepsData = useMemo(() => {
    return [
      {
        label: "Ordered",
        date: getDate(order?.placedDate || order?.date, "Order Placed")
      },
      {
        label: "Order packed",
        date: activeStepIndex >= 1
          ? getDate(order?.processingDate, "Packed")
          : "In Progress"
      },
      {
        label: "Order left warehouse",
        date: activeStepIndex >= 2
          ? getDate(order?.shippedDate, "In Transit")
          : "Pending"
      },
      {
        label: "Dispatched from hub",
        date: activeStepIndex >= 3
          ? getDate(order?.hubDate, "Out for Delivery")
          : "Pending"
      },
      {
        label: currentStatus === "delivered" ? "Delivered" : "Expected",
        date: activeStepIndex >= 4
          ? getDate(order?.deliveredDate, "Delivered")
          : "Coming Soon"
      }
    ];
  }, [order, activeStepIndex, currentStatus]);

  return (
    <div className="rounded-[30px] transition-all">
      <h3 className={`text-[11px] font-black uppercase tracking-widest mb-5 ${isDark ? "text-gray-300" : "text-gray-800"}`}>
        Order Tracking
      </h3>

      {/* MOBILE VIEW */}
      <div className="md:hidden">
        {trackingStepsData.map((step, index) => {
          const isDone = index <= activeStepIndex && currentStatus !== "cancelled";
          const isLast = index === trackingStepsData.length - 1;
          return (
            <div key={index} className="flex gap-4 relative min-h-[80px]">
              {!isLast && (
                <div className={`absolute left-[10px] top-6 w-[2px] h-[calc(100%-24px)] ${isDone && index < activeStepIndex ? "bg-green-500" : "bg-gray-300"}`} />
              )}
              <div className="pt-1">
                <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 ${isDone ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                  {isDone && <FiCheck size={12} className="text-white" strokeWidth={4} />}
                </div>
              </div>
              <div className="pb-10 last:pb-0">
                <p className={`text-[11px] font-black uppercase tracking-tight ${isDone ? (isDark ? "text-white" : "text-gray-800") : "text-gray-400"}`}>{step.label}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{step.date}</p>
              </div>
            </div>
          );
        })}
        
        {/* Support Card */}
        <div className={`mt-6 p-5 border rounded-2xl flex items-center gap-4 ${isDark ? "bg-[#1a1f2e] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
          <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
            <MdHeadsetMic size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-tight">Request Callback</p>
            <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">Within 15 mins</p>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className={`hidden md:block mt-6 p-8 border rounded-[30px] ${isDark ? "bg-[#1a1f2e] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"}`}>
        <div className="flex justify-between items-start">
          {trackingStepsData.map((step, index) => {
            const isDone = index <= activeStepIndex && currentStatus !== "cancelled";
            return (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${isDone ? "bg-green-500 border-green-500 shadow-lg shadow-green-500/20" : "border-gray-300"}`}>
                  {isDone && <FiCheck size={14} className="text-white" strokeWidth={4} />}
                </div>
                <div className="text-center mt-3">
                  <p className={`text-[10px] font-black uppercase tracking-tight ${isDone ? (isDark ? "text-white" : "text-gray-800") : "text-gray-400"}`}>{step.label}</p>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Tracking.displayName = 'Tracking';

export default React.memo(Tracking, (prev, next) => {
  return (
    prev.isDark === next.isDark &&
    prev.order?.id === next.order?.id &&
    prev.order?.status === next.order?.status
  );
});