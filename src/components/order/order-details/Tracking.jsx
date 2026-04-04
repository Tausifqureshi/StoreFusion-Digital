import React, { useMemo } from 'react';
import { FiCheck } from 'react-icons/fi';
import { MdHeadsetMic } from 'react-icons/md';

const Tracking = ({ order, isDark }) => {

  const currentOrderStatus = (order?.status || "placed").toLowerCase();

  const getTimelineProgressIndex = (status) => {
    if (status === "placed") return 0;
    else if (status === "processing") return 1;
    else if (status === "shipped") return 2;
    else if (status === "hub") return 3;
    else if (status === "delivered") return 4;
    else if (status === "returned") return -1;
    else if (status === "refunded") return -1;
    else if (status === "cancelled") return -1;
    else return 0;
  };

  const activeStepIndex = getTimelineProgressIndex(currentOrderStatus);

  const shortenDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return dateStr;
    try {
      let short = dateStr.includes(",") && dateStr.split(",").length >= 3
        ? dateStr.split(",").slice(1).join(",").trim()
        : dateStr;

      const months = { "January": "Jan", "February": "Feb", "March": "Mar", "April": "Apr", "August": "Aug", "September": "Sep", "October": "Oct", "November": "Nov", "December": "Dec" };
      for (const [long, shrt] of Object.entries(months)) {
        if (short.includes(long)) { short = short.replace(long, shrt); break; }
      }
      return short;
    } catch (e) { return dateStr; }
  };

  const formatTrackingDate = (currentStepDateString, previousStepsDatesArray, fallbackMessageText) => {
    if (!currentStepDateString) return fallbackMessageText;
    const validPreviousDates = previousStepsDatesArray.filter(Boolean);
    if (validPreviousDates.includes(currentStepDateString)) return fallbackMessageText;
    return shortenDate(currentStepDateString);
  };

  const trackingStepsData = useMemo(() => {
    const placedDateText = shortenDate(order?.placedDate || order?.date);
    const packedDateText = activeStepIndex >= 1 ? formatTrackingDate(order?.processingDate, [placedDateText], "Successfully Packed") : "In Progress";
    const shippedDateText = activeStepIndex >= 2 ? formatTrackingDate(order?.shippedDate, [placedDateText, order?.processingDate], "In Transit") : "Pending";
    const hubDateText = activeStepIndex >= 3 ? formatTrackingDate(order?.hubDate, [placedDateText, order?.processingDate, order?.shippedDate], "Out for Delivery") : "Pending";
    const deliveredDateText = activeStepIndex >= 4 ? formatTrackingDate(order?.deliveredDate, [placedDateText, order?.processingDate, order?.shippedDate, order?.hubDate], "Item Delivered") : "Sunday, 29 March 2026";

    return [
      { label: "Ordered", status: "placed", date: placedDateText },
      { label: "Order packed", status: "processing", date: packedDateText },
      { label: "Order left warehouse", status: "shipped", date: shippedDateText },
      { label: "Dispatched from nearest hub", status: "hub", date: hubDateText },
      { label: currentOrderStatus === "delivered" ? "Delivered" : "Delivery ExpectedBy", status: "delivered", date: deliveredDateText },
    ];
  }, [order, activeStepIndex, currentOrderStatus]);

  return (
    <div className="rounded-[30px] transition-all">
      <h3 className={`text-[11px] font-black uppercase tracking-widest mb-5 flex items-center gap-2 ${isDark ? "text-gray-300" : "text-gray-800"}`}>
        Order Tracking
      </h3>

      {/* MOBILE UI */}
      <div className="md:hidden space-y-0">
        {trackingStepsData.map((step, index) => {
          const isCompleted = index <= activeStepIndex && order?.status !== "cancelled";
          const isLast = index === trackingStepsData.length - 1;
          return (
            <div key={index} className="flex gap-4 relative min-h-[80px]">
              {!isLast && (
                <div className={`absolute left-[10px] top-6 w-[2px] h-[calc(100%-24px)] ${isCompleted && index < activeStepIndex ? "bg-green-500" : (isDark ? "bg-gray-700" : "bg-gray-200")}`} />
              )}
              <div className="relative z-10 pt-1">
                <div className={`w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? "bg-green-500 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] scale-110" : (isDark ? "bg-[#1e293b] border-gray-600" : "bg-white border-gray-300")}`}>
                  {isCompleted && <FiCheck className="text-white" size={12} strokeWidth={4} />}
                </div>
              </div>
              <div className="pb-10 last:pb-0">
                <p className={`text-[11px] font-black uppercase tracking-tight ${isCompleted ? (isDark ? "text-white" : "text-gray-800") : "text-gray-400"}`}>{step.label}</p>
                <p className="text-[9px] font-bold text-gray-400 uppercase mt-1 leading-relaxed">{step.date}</p>
              </div>
            </div>
          );
        })}

        {/* REQUEST CALLBACK - MOBILE */}
        <div className={`mt-8 p-6 rounded-[25px] flex flex-col items-start gap-4 border ${isDark ? "bg-[#131921] border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
              <MdHeadsetMic size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-tight">Request a Callback</p>
              <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">Expected within 15 mins</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white w-full px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Request now</button>
        </div>
      </div>

      {/* DESKTOP UI */}
      <div className={`hidden md:block py-8 px-6 md:px-10 rounded-[40px] border-2 transition-all ${isDark ? "bg-[#131921] border-gray-800" : "bg-white border-gray-100 shadow-xl shadow-blue-500/5"}`}>
        <div className="relative flex justify-between items-start w-full">
          <div className="absolute top-[11px] left-[10%] right-[10%] flex items-center">
            <div className={`w-full h-[2px] ${isDark ? "bg-gray-700" : "bg-gray-200"}`}>
              <div className="h-full bg-green-500 transition-all duration-1000 shadow-[0_0_15px_rgba(34,197,94,0.4)]" style={{ width: `${(Math.max(0, activeStepIndex) / (trackingStepsData.length - 1)) * 100}%` }}></div>
            </div>
          </div>

          {trackingStepsData.map((step, index) => {
            const isCompleted = index <= activeStepIndex && order?.status !== "cancelled";
            return (
              <div key={index} className="flex flex-col items-center gap-5 relative z-10 flex-1">
                <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? "bg-green-500 border-green-500 scale-[1.15] shadow-[0_0_15px_rgba(34,197,94,0.5)]" : (isDark ? "bg-[#1e293b] border-gray-600" : "bg-white border-gray-300")}`}>
                  {isCompleted && <FiCheck className="text-white" size={14} strokeWidth={4} />}
                </div>
                <div className="text-center">
                  <p className={`text-[10px] font-black uppercase tracking-tight ${isCompleted ? (isDark ? "text-white" : "text-gray-800") : "text-gray-400"}`}>{step.label}</p>
                  <p className={`text-[8px] font-bold uppercase tracking-widest mt-1.5 ${isCompleted ? "text-blue-500" : "text-gray-400"}`}>{step.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
          
      {/* REQUEST CALLBACK - DESKTOP (Already embedded in mobile above, but keeping desktop version separated if needed or unified below) */}
      <div className={`hidden md:flex mt-8 p-6 md:p-8 rounded-[25px] flex-row items-center justify-between gap-6 border ${isDark ? "bg-[#131921] border-gray-800" : "bg-gray-50 border-gray-200 shadow-sm"}`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
            <MdHeadsetMic size={24} />
          </div>
          <div>
            <p className="text-[14px] font-black uppercase tracking-tight">Request a Callback</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">Expected within 15 mins</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white shrink-0 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all w-auto">
          Request now
        </button>
      </div>
    </div>
  );
};

export default React.memo(Tracking, (prevProps, nextProps) => {
  if (prevProps.isDark !== nextProps.isDark) return false;
  if (prevProps.order.id !== nextProps.order.id) return false;
  if (prevProps.order.status !== nextProps.order.status) return false;
  return true;
});
