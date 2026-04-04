import React, { useState, useMemo } from 'react';
import { FaSync, FaDownload } from 'react-icons/fa';

import OrderSummaryCards from './OrderSummaryCards';
import OrderFilters from './OrderFilters';
import OrderList from './OrderList';
import OrderPagination from './OrderPagination';

const OrderManagementTab = ({ isDark, order = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // 👉 Filters ke liye state
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortOrder, setSortOrder] = useState("Newest First");

  // 👉 Pagination ke liye state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 👉 Unique status nikal rahe hain dynamic dropdown ke liye
  const uniqueStatuses = useMemo(() => {
    return ["All Status", ...new Set(order.map(o => o.status).filter(Boolean))];
  }, [order]);

  // 👉 Filtering aur Sorting dono ek sath handle kar rahe hain
  const filteredAndSortedOrders = useMemo(() => {
    return order
      .filter((o) => {
        const matchesSearch = o.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.paymentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.id?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === "All Status" || (o.status || 'processing').toLowerCase() === filterStatus.toLowerCase();

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || 0).getTime();
        const dateB = new Date(b.date || b.createdAt || 0).getTime();

        if (sortOrder === "Newest First") return dateB - dateA;
        if (sortOrder === "Oldest First") return dateA - dateB;
        if (sortOrder === "Amount High to Low") return Number(b.grandTotal || b.price || 0) - Number(a.grandTotal || a.price || 0);
        return 0;
      });
  }, [order, searchQuery, filterStatus, sortOrder]);

  // 👉 Current page ke hisaab se orders ko array me se kaat (slice) rahe hain
  const totalPages = Math.ceil(filteredAndSortedOrders.length / itemsPerPage);
  const ordersOnCurrentPage = filteredAndSortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 👉 Filter ya sort change hone par page ko wapas 1 par reset kar do
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, sortOrder]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* 👉 HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Orders Management
          </h1>
          <p className={`text-sm font-bold mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Track and manage all customer orders in one place
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-3">
          <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-purple-500/20 transition-all active:scale-95">
            <FaDownload size={12} /> Export Orders
          </button>
        </div>
      </div>

      {/* 👉 SUMMARY CARDS */}
      <OrderSummaryCards
        isDark={isDark}
        order={order}
      />

      {/* 👉 SEARCH & FILTERS */}
      <OrderFilters
        isDark={isDark}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        uniqueStatuses={uniqueStatuses}
      />

      {/* 👉 ORDERS LIST VIEW */}
      <div className={`rounded-3xl p-6 md:p-8 transition-all duration-300 mb-8 overflow-visible ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
        <h2 className={`text-xl font-black tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Orders ({filteredAndSortedOrders.length})
        </h2>

        <OrderList
          isDark={isDark}
          ordersOnCurrentPage={ordersOnCurrentPage}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
      </div>

      {/* 👉 PAGINATION */}
      <OrderPagination
        isDark={isDark}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={filteredAndSortedOrders.length}
      />

    </div>
  );
};

export default React.memo(OrderManagementTab);
