import React, { useState, useCallback } from 'react';
import DashboardHeader from './DashboardHeader';
import StatCardsContainer from './StatCardsContainer';
import ChartsContainer from './ChartsContainer';
import TablesContainer from './TablesContainer';
import QuickActions from './QuickActions';

// ✅ DASHBOARD VIEW: Explicit independent UI shell with its own localized filter states
const DashboardView = React.memo(({ isDark, navigate, children }) => {
  // 👉 UI-wide filters colocated for the Dashboard Overview only
  const [selectedRange, setSelectedRange] = useState("All Time");
  const [calendarDate, setCalendarDate] = useState(new Date("2026-03-20"));

  const handleRangeChange = useCallback((r) => setSelectedRange(r), []);
  const handleDateChange = useCallback((d) => setCalendarDate(d), []);

  return (
    <div className={`min-h-screen pt-28 pb-16 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"} font-sans`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">

        <DashboardHeader
          isDark={isDark}
          selectedRange={selectedRange}
          setSelectedRange={handleRangeChange}
          selectedDate={calendarDate}
          setSelectedDate={handleDateChange}
        />

        <StatCardsContainer
          isDark={isDark}
          selectedRange={selectedRange}
          selectedDate={calendarDate}
        />

        <ChartsContainer
          isDark={isDark}
          selectedRange={selectedRange}
          selectedDate={calendarDate}
        />

        <TablesContainer
          isDark={isDark}
          selectedRange={selectedRange}
          selectedDate={calendarDate}
        />

        <div className="w-full relative z-10">
          <QuickActions isDark={isDark} navigate={navigate} />
        </div>

        {/* 👉 Management Tabs: ZERO-CONTEXT switcher handles nested tabs */}
        <div className={`mt-10 rounded-3xl border transition-all overflow-hidden flex flex-col relative z-10 ${isDark ? "bg-[#1e293b] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"}`}>
          {children}
        </div>

      </div>
    </div>
  );
});

DashboardView.displayName = 'DashboardView';
export default React.memo(DashboardView, (prev, next) => {
  return prev.isDark === next.isDark && prev.children === next.children;
});
