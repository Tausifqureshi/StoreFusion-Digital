import React, { useState, useCallback } from 'react';
import DashboardHeader from './DashboardHeader';
import StatCardsContainer from './StatCardsContainer';
import ChartsContainer from './ChartsContainer';
import TablesContainer from './TablesContainer';
import QuickActions from './QuickActions';
import { useSelector } from 'react-redux';
import { useDashboardData } from '../hooks/useDashboardData';

// ✅ DASHBOARD VIEW: Explicit independent UI shell with its own localized filter states
const DashboardView = React.memo(function DashboardView({ isDark, navigate, children }) {
  // 👉 UI-wide filters colocated for the Dashboard Overview only
  const [selectedRange, setSelectedRange] = useState("All Time");
  const [calendarDate, setCalendarDate] = useState(new Date("2026-03-20"));

  const handleRangeChange = useCallback((r) => setSelectedRange(r), []);
  const handleDateChange = useCallback((d) => setCalendarDate(d), []);

  const allProducts = useSelector((state) => state.products.items);
  const allOrders = useSelector((state) => state.orders.orders);
  const allUsers = useSelector((state) => state.users.items);

  const {
    order, product, user,
    monthlyOrders, monthlyRevenue,
    totalRevenue, newDiscounts
  } = useDashboardData(allProducts, allOrders, allUsers, selectedRange, calendarDate);


  return (
    <div className={`min-h-screen pt-28 pb-16 transition-all duration-300 ${isDark ? "bg-[#111827] text-white" : "bg-gray-50 text-gray-900"} font-sans`}>
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
          product={product}
          order={order}
          user={user}
          totalRevenue={totalRevenue}
          newDiscounts={newDiscounts}
        />

        <ChartsContainer
          isDark={isDark}
          monthlyOrders={monthlyOrders}
          monthlyRevenue={monthlyRevenue}
        />

        <TablesContainer
          isDark={isDark}
          product={product}
          order={order}
        />

        <div className="w-full relative z-10">
          <QuickActions isDark={isDark} navigate={navigate} />
        </div>

        {/* 👉 Management Tabs: ZERO-CONTEXT switcher handles nested tabs */}
        <div className={`mt-10 rounded-3xl border transition-all overflow-hidden flex flex-col relative z-10 ${isDark ? "bg-[#1a1f2e] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"}`}>
          {children}
        </div>

      </div>
    </div>
  );
});

export default React.memo(DashboardView);
