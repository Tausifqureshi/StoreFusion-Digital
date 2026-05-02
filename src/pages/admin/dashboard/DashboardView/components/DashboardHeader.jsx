import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaCalendarAlt, FaDownload, FaChevronDown } from 'react-icons/fa';
import { CustomCalendar } from './CustomCalendar';

const DashboardHeader = ({
  isDark,
  selectedRange,
  setSelectedRange,
  selectedDate,
  setSelectedDate
}) => {
  const [isRangeOpen, setIsRangeOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const ranges = ["All Time", "Today", "Last 7 days", "Last 30 days", "Last 90 days", "Last year"];

  const rangeRef = useRef(null);
  const dateRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // Yahan check ho raha hai ke user ne in boxes ke BAHAR toh click nahi kiya?
      if (rangeRef.current && !rangeRef.current.contains(event.target)) setIsRangeOpen(false);
      if (dateRef.current && !dateRef.current.contains(event.target)) setIsDateOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateChange = useCallback((d) => {
    setSelectedDate(d);
    setIsDateOpen(false);
  }, [setSelectedDate]);

  const handleRangeChange = useCallback((r) => {
    setSelectedRange(r);
    setIsRangeOpen(false);
  }, [setSelectedRange]);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

      <div>
        <h1 className={`text-4xl lg:text-5xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
          Dashboard <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Overview</span>
        </h1>

        <p className={`text-sm lg:text-base font-bold mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Monitor your business performance and analytics in real-time
        </p>

        {/* Branding & Live Indicator Finishing */}
        <div className="flex items-center gap-4 mt-4">
          <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-orange-500" : "text-orange-600"}`}>
            STOREFUSION <span className="font-light text-gray-500">ADMIN</span>
          </p>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${isDark ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-green-50 border-green-200 text-green-600"}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            System Live
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-4 relative z-20">

        {/* RANGE */}
        <div className="relative" ref={rangeRef}>
          <button
            onClick={() => setIsRangeOpen(!isRangeOpen)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-black ${isDark
              ? "bg-[#1a1f2e] text-gray-300 border-2 border-gray-700 hover:bg-gray-800"
              : "bg-white text-gray-700 border-2 border-gray-100 hover:bg-gray-50"
              }`}
          >
            {selectedRange}
            <FaChevronDown size={12} />
          </button>

          {isRangeOpen && (
            <div className={`absolute top-full left-0 mt-2 w-48 rounded-2xl shadow-xl ${isDark ? "bg-[#1a1f2e]" : "bg-white"
              }`}>
              {ranges.map(r => (
                <button
                  key={r}
                  // onClick={() => { setSelectedRange(r); setIsRangeOpen(false); }}
                  onClick={() => handleRangeChange(r)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold ${selectedRange === r
                    ? "bg-orange-500/20 text-orange-400"
                    : "hover:bg-gray-100"
                    }`}
                >
                  {selectedRange === r && "✓ "}
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DATE */}
        <div className="relative hidden sm:block" ref={dateRef}>
          <button
            onClick={() => setIsDateOpen(!isDateOpen)}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-black ${isDark
              ? "bg-[#1a1f2e] text-gray-300 border-2 border-gray-700"
              : "bg-white text-gray-700 border-2 border-gray-100"
              }`}
          >
            <FaCalendarAlt />
            {selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </button>

          {isDateOpen && (
            <div className="absolute top-full right-0 mt-2">
              <CustomCalendar
                isDark={isDark}
                selectedDate={selectedDate}
                // onChange={(d) => { setSelectedDate(d); setIsDateOpen(false); }} 
                onChange={handleDateChange}
              />
            </div>
          )}
        </div>

        {/* EXPORT */}
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-black text-white bg-orange-500 hover:bg-orange-600">
          <FaDownload size={14} /> Export
        </button>

      </div>
    </div>
  );
};

DashboardHeader.displayName = 'DashboardHeader';
export default React.memo(DashboardHeader);