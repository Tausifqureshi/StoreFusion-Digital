import React, { useState, useMemo, useEffect, useContext } from 'react';
import { FaSearch, FaUserAltSlash, FaEnvelope, FaPhone, FaEllipsisH, FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../../../../../context/AllContext';

import LoaderSpinner from '../../../../../components/loader/LoaderSpinner';

function CustomerManagementTab() {
  const { mode } = useContext(ThemeContext);
  const { items: user, loading: userLoading } = useSelector(state => state.users);
  
  const isDark = mode === 'dark';


  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All Roles");
  const [sortOrder, setSortOrder] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 👉 filter ki hui user list nikal rahe hain (search aur dropdowns ke hisab se)
  const filteredUsers = useMemo(() => {
    if (!user) return [];
    return user
      .filter((u) => {
        if (!u.name && !u.email && !u.phone) return false;
        if (searchQuery) {
          const s = searchQuery.toLowerCase();
          const matchesSearch = u.name?.toLowerCase().includes(s) || u.email?.toLowerCase().includes(s) || u.phone?.includes(s);
          if (!matchesSearch) return false;
        }
        if (filterRole !== "All Roles") {
          const roleName = u.role || (u.email?.includes('admin') ? 'Admin' : 'User');
          if (roleName.toLowerCase() !== filterRole.toLowerCase()) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = a.time?.seconds ? a.time.seconds * 1000 : new Date(a.createdAt || a.date || 0).getTime();
        const dateB = b.time?.seconds ? b.time.seconds * 1000 : new Date(b.createdAt || b.date || 0).getTime();
        if (sortOrder === "Newest First") return dateB - dateA;
        if (sortOrder === "Oldest First") return dateA - dateB;
        return 0;
      });
  }, [user, searchQuery, filterRole, sortOrder]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const usersOnCurrentPage = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterRole, sortOrder]);

  if (userLoading) return <LoaderSpinner isDark={isDark} label="Loading customers..." />;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredUsers.length);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-[1200px] mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>
            User Management
          </h1>
          <p className={`text-sm mt-1 font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your users and their permissions
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-md transition-all active:scale-95">
          <FaPlus size={14} /> Add User
        </button>
      </div>

      {/* SEARCH & FILTERS */}
      <div className={`p-4 rounded-3xl mb-8 flex flex-col md:flex-row items-center justify-start gap-4 transition-all ${isDark ? 'bg-[#1a1f2e] border border-gray-800 shadow-lg' : 'bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
        <div className="relative w-full md:max-w-md flex items-center shrink-0">
          <FaSearch className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} size={14} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm font-semibold outline-none transition-all ${isDark
              ? 'bg-[#1a1f2e] border border-gray-700 text-white placeholder-gray-500 focus:border-blue-500/50 focus:bg-[#1a222d]'
              : 'bg-gray-50/50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400/50 focus:bg-white'
              }`}
          />
        </div>

        <div className="relative w-full md:w-auto shrink-0">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={`w-full md:w-auto appearance-none pl-4 pr-10 py-3 rounded-xl text-sm font-bold outline-none cursor-pointer transition-all ${isDark
              ? 'bg-[#1a1f2e] border-gray-700 text-gray-300 hover:border-gray-600 focus:border-blue-500/50'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 focus:border-blue-400/50'
              }`}
          >
            <option value="All Roles">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            ▼
          </div>
        </div>

        <div className="relative w-full md:w-auto shrink-0">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={`w-full md:w-auto appearance-none pl-4 pr-10 py-3 rounded-xl text-sm font-bold outline-none cursor-pointer transition-all ${isDark
              ? 'bg-[#1a1f2e] border-gray-700 text-gray-300 hover:border-gray-600 focus:border-blue-500/50'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300 focus:border-blue-400/50'
              }`}
          >
            <option value="Newest First">Newest First</option>
            <option value="Oldest First">Oldest First</option>
          </select>
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            ▼
          </div>
        </div>
      </div>

      {/* LIST VIEW */}
      <div className={`w-full rounded-2xl p-6 transition-all duration-300 mb-8 ${isDark ? 'bg-[#1a1f2e] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
        <h2 className={`text-lg font-bold tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          All Users ({filteredUsers.length})
        </h2>

        <div className="flex flex-col gap-3">
          {usersOnCurrentPage.length > 0 ? (
            usersOnCurrentPage.map((u, i) => {
              const itemBorder = isDark ? 'bg-[#1a1f2e] border-gray-600 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-gray-500 hover:-translate-y-1' : 'bg-white border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1';
              const roleName = u.role || (u.email?.includes('admin') ? 'Admin' : 'User');
              const roleBg = roleName.toLowerCase() === 'admin' ? '#8b5cf6' : '#3b82f6';
              const initial = u.name ? u.name.charAt(0).toUpperCase() : (u.email ? u.email.charAt(0).toUpperCase() : "");
              const displayDate = u.date || (u.time ? new Date(u.time.seconds * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "");
              const statusText = u.status || "Active";

              return (
                <div key={u.id || i} className={`relative p-4 md:p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border transition-all duration-300 ${itemBorder}`}>
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex shrink-0 items-center justify-center text-lg font-bold border ${isDark ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-gray-100 text-gray-600 border-transparent'}`}>
                      {initial}
                    </div>
                    <div>
                      <h3 className={`text-[15px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {u.name}
                      </h3>
                      <div className={`flex flex-wrap items-center gap-3 text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {u.email && <span className="flex items-center gap-1.5"><FaEnvelope size={10} className="opacity-70" /> {u.email}</span>}
                        {u.phone && <span className="flex items-center gap-1.5 ml-2"><FaPhone size={10} className="opacity-70" /> {u.phone}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:w-auto shrink-0 justify-end">
                    <span
                      style={{ backgroundColor: roleBg }}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold w-16 text-center tracking-wide text-white shadow-sm"
                    >
                      {roleName}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold w-16 text-center ${isDark ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-[#e6fcf5] text-[#047857]'}`}>
                      {statusText}
                    </span>
                    <span className={`text-[13px] font-medium hidden sm:block ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {displayDate}
                    </span>
                    <button className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all ${isDark ? 'border-gray-700 text-gray-400 hover:bg-gray-800' : 'border-gray-200 text-gray-500 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]'}`}>
                      <FaEllipsisH size={14} />
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center opacity-50">
              <FaUserAltSlash size={40} className="mb-3 text-gray-400" />
              <p className={`text-sm font-semibold uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>No users match your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 mt-8 transition-all duration-300 mb-8`}>
          <span className={`text-sm font-medium text-center md:text-left ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Showing <span className="font-semibold">{startItem}</span> to <span className="font-semibold">{endItem}</span> of <span className="font-semibold">{filteredUsers.length}</span> users
          </span>
          <div className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 sm:rounded-2xl rounded-xl transition-all border ${isDark ? 'bg-[#1a1f2e] border-gray-600 shadow-lg shadow-black/20' : 'bg-white border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)]'}`}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border border-transparent ${currentPage === 1
                ? isDark ? 'text-gray-600 cursor-not-allowed bg-transparent' : 'text-gray-300 cursor-not-allowed bg-transparent'
                : isDark ? 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/60' : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
                }`}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => {
              const isSelected = currentPage === i + 1;
              return (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`min-w-[40px] px-3 py-2 rounded-xl text-sm font-bold transition-all duration-300 border ${isSelected
                    ? isDark ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40' : 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                    : isDark ? 'bg-transparent text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-800/60' : 'bg-transparent text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-100/60'
                    }`}
                >
                  {i + 1}
                </button>
              )
            })}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border border-transparent ${currentPage === totalPages
                ? isDark ? 'text-gray-600 cursor-not-allowed bg-transparent' : 'text-gray-300 cursor-not-allowed bg-transparent'
                : isDark ? 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/60' : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

CustomerManagementTab.displayName = 'CustomerManagementTab';
export default React.memo(CustomerManagementTab);
