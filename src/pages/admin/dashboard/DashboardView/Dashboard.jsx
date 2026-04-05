import { ThemeContext } from '../../../../context api/AllContext';
import React, { useContext, useState, useCallback, useMemo } from 'react';
import Layout from '../../../../components/layout/Layout';
import DashboardTab from '../DashboardTabView/DashboardTab';
import ScrollToTopButton from '../../../../components/Scroll top/ScrollToTopButoon';
import { useNavigate } from 'react-router-dom';

// 👉 Performance Containers
import StatCardsContainer from './components/StatCardsContainer';
import ChartsContainer from './components/ChartsContainer';
import TablesContainer from './components/TablesContainer';
import DashboardHeader from './components/DashboardHeader';
import QuickActions from './components/QuickActions';

// ✅ DASHBOARD VIEW: Ye component ab sirf ek "UI Shell" hai
// Iske children (StatCards, Charts, Tables) apna data khud independently fetch karte hain
const DashboardView = React.memo(({ isDark, navigate, selectedRange, setSelectedRange, calendarDate, setCalendarDate, children }) => {
  return (
    <div className={`min-h-screen pt-28 pb-16 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"} font-sans`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative">

        {/* 👉 Header: Controls the overview filters */}
        <DashboardHeader
          isDark={isDark}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          selectedDate={calendarDate}
          setSelectedDate={setCalendarDate}
        />

        {/* 👉 Stat Cards: Independent Data Consumption */}
        <StatCardsContainer
          isDark={isDark}
          selectedRange={selectedRange}
          selectedDate={calendarDate}
        />

        {/* 👉 Charts Section: Independent Data Consumption */}
        <ChartsContainer
          isDark={isDark}
          selectedRange={selectedRange}
          selectedDate={calendarDate}
        />

        {/* 👉 Tables Section: Independent Data Consumption */}
        <TablesContainer
          isDark={isDark}
          selectedRange={selectedRange}
          selectedDate={calendarDate}
        />

        {/* 👉 Quick Actions */}
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
}, (prev, next) => {
  // 🚀 Shell logic: Only re-render if fundamental UI state changes
  return (
    prev.isDark === next.isDark &&
    prev.selectedRange === next.selectedRange &&
    prev.calendarDate?.getTime() === next.calendarDate?.getTime()
  );
});

function Dashboard() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';
  const navigate = useNavigate();

  // 👉 UI-wide filters for the Dashboard Overview only
  const [selectedRange, setSelectedRange] = useState("All Time");
  const [calendarDate, setCalendarDate] = useState(new Date("2026-03-20"));

  // 👉 Memoized state setters
  const handleRangeChange = useCallback((r) => setSelectedRange(r), []);
  const handleDateChange = useCallback((d) => setCalendarDate(d), []);

  // 👉 TAB UNIFIED INSTANCE: Locked to prevent reconciliation when Overview filters change
  const memoTabs = useMemo(() => <DashboardTab />, []);

  return (
    <Layout>
      <DashboardView
        isDark={isDark}
        navigate={navigate}
        selectedRange={selectedRange}
        setSelectedRange={handleRangeChange}
        calendarDate={calendarDate}
        setCalendarDate={handleDateChange}
      >
        {memoTabs}
      </DashboardView>
      <ScrollToTopButton />
    </Layout>
  );
}

export default React.memo(Dashboard);
