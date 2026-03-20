import React, { useState } from 'react';
import { FaSearch, FaUser, FaUserShield, FaUserPlus, FaUserCheck, FaEllipsisH, FaEnvelope, FaBan, FaTrash } from 'react-icons/fa';

const CustomerManagementTab = ({ isDark, user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  // New States for Filters
  const [filterRole, setFilterRole] = useState("All Roles");
  const [sortOrder, setSortOrder] = useState("Newest First");

  // Dynamically extract unique roles if they exist
  const uniqueRoles = ["All Roles", ...new Set(user.map(u => (u.role === 'admin' || u.email?.includes('admin') ? 'admin' : 'user')))];

  const filteredUsers = user
    .filter((u) => {
      const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            u.email?.toLowerCase().includes(searchQuery.toLowerCase());
                            
      const userRole = u.role === 'admin' || u.email?.includes('admin') ? 'admin' : 'user';
      const matchesRole = filterRole === "All Roles" || userRole === filterRole.toLowerCase();
      
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date || 0).getTime();
      const dateB = new Date(b.createdAt || b.date || 0).getTime();
      
      if (sortOrder === "Newest First") return dateB - dateA;
      if (sortOrder === "Oldest First") return dateA - dateB;
      if (sortOrder === "Name A-Z") return a.name?.localeCompare(b.name);
      return 0;
    });

  const totalUsers = user.length;
  const adminUsers = user.filter(u => u.role === 'admin').length || 1; // mock 1 admin if none explicitly
  const activeUsers = Math.max(0, totalUsers - 2); // mock actively logged in
  const newUsers = Math.min(5, totalUsers);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Customer Directory
          </h1>
          <p className={`text-sm font-bold mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Manage your registered users and their account information
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-green-500/20 transition-all active:scale-95">
          <FaUserPlus size={14} /> Add Customer
        </button>
      </div>

      {/* --- SUMMARY CARDS ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#eff6ff] text-[#1e40af]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Total Users</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-blue-900'}`}>{totalUsers}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-blue-500 text-white shadow-lg shadow-blue-500/30 shrink-0">
            <FaUser />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#ecfdf5] text-[#047857]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>Active Users</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-green-900'}`}>{activeUsers}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-green-500 text-white shadow-lg shadow-green-500/30 shrink-0">
            <FaUserCheck />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#faf5ff] text-[#6d28d9]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>New (30d)</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-purple-900'}`}>{newUsers}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-purple-500 text-white shadow-lg shadow-purple-500/30 shrink-0">
            <FaUserPlus />
          </div>
        </div>

        <div className={`p-6 rounded-3xl flex items-center justify-between transition-all ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-[#fff7ed] text-[#c2410c]'}`}>
          <div>
            <h3 className={`text-sm font-bold mb-1 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Admins</h3>
            <p className={`text-4xl font-black tracking-tight ${isDark ? 'text-white' : 'text-orange-900'}`}>{adminUsers}</p>
          </div>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 shrink-0">
            <FaUserShield />
          </div>
        </div>
      </div>

      {/* --- SEARCH & FILTER ROW --- */}
      <div className={`p-4 rounded-full flex flex-col md:flex-row items-center justify-between gap-4 mb-8 transition-all ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
        <div className="relative w-full md:w-1/2 flex items-center">
          <FaSearch className={`absolute left-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            placeholder="Search customers by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 rounded-full text-sm font-bold outline-none transition-all ${
              isDark 
                ? 'bg-[#131921] text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50' 
                : 'bg-gray-50 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20'
            }`}
          />
        </div>
        
        <div className="flex w-full md:w-auto overflow-x-auto custom-scrollbar gap-3 hide-scrollbar">
          
          {/* Role Dropdown */}
          <div className="relative shrink-0">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer flex items-center gap-2 ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-green-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-green-500/20'}`}
            >
              <option value="All Roles">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
            <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
          </div>

          {/* Sorting Dropdown */}
          <div className="relative shrink-0">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`appearance-none px-6 py-3 pr-10 rounded-full text-sm font-bold transition-all outline-none cursor-pointer flex items-center gap-2 ${isDark ? 'bg-[#131921] text-gray-300 hover:bg-gray-800 focus:ring-2 focus:ring-green-500/50' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-2 focus:ring-green-500/20'}`}
            >
              <option value="Newest First">Newest First</option>
              <option value="Oldest First">Oldest First</option>
              <option value="Name A-Z">Name A-Z</option>
            </select>
            <div className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] opacity-60 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>▼</div>
          </div>

        </div>
      </div>

      {/* --- CUSTOMERS LIST VIEW --- */}
      <div className={`rounded-3xl p-6 md:p-8 transition-all duration-300 ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
        <h2 className={`text-xl font-black tracking-tight mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Customers ({filteredUsers.length})</h2>
        
        <div className="flex flex-col gap-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u, i) => {
              const isAdmin = u.role === 'admin' || u.email?.includes('admin');
              return (
              <div key={i} className={`group relative rounded-2xl p-4 sm:p-6 transition-all duration-300 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border ${isDark ? 'bg-[#131921]/50 border-gray-800 hover:bg-[#131921]' : 'bg-gray-50 border-gray-100/50 hover:bg-white hover:shadow-lg hover:border-gray-200'}`}>
                
                {/* Left: Avatar & Main Info */}
                <div className="flex items-center gap-4 min-w-[300px]">
                  <div className="w-14 h-14 rounded-full flex shrink-0 items-center justify-center text-xl font-extrabold text-white bg-gradient-to-br from-indigo-500 to-blue-500 shadow-md">
                    {u.name?.charAt(0).toUpperCase() || "C"}
                  </div>
                  <div>
                    <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>{u.name || "Customer User"}</h3>
                    <p className={`text-sm font-semibold mt-0.5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{u.email}</p>
                  </div>
                </div>

                {/* Middle Grid: Stats */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 items-center">
                  
                  <div className="flex flex-col items-start">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Role</span>
                    {isAdmin ? (
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${isDark ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-orange-50 text-orange-600'}`}>
                        <FaUserShield size={10} /> Admin
                      </span>
                    ) : (
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${isDark ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600'}`}>
                        <FaUser size={10} /> Customer
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Total Spent</span>
                    <span className={`text-lg font-black tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      ${Math.floor(Math.random() * 5000) + 120} {/* Mock Data */}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Joined</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '2024-01-15'}
                    </span>
                  </div>

                </div>

                {/* Right: Actions */}
                <div className="relative shrink-0 flex items-center justify-end">
                  <button 
                    onClick={() => setActiveDropdown(activeDropdown === i ? null : i)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
                  >
                    <FaEllipsisH />
                  </button>
                  
                  {activeDropdown === i && (
                    <div className={`absolute top-full right-0 mt-2 w-48 rounded-2xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-white border border-gray-100'}`}>
                       <button className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'}`}>
                         <FaEnvelope size={14} /> Send Email
                       </button>
                       <button className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-orange-400 hover:bg-gray-800' : 'text-orange-500 hover:bg-orange-50'}`}>
                         <FaBan size={14} /> Suspend Account
                       </button>
                       <button className={`w-full px-4 py-3 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-red-400 hover:bg-gray-800' : 'text-red-500 hover:bg-red-50'}`}>
                         <FaTrash size={14} /> Delete User
                       </button>
                    </div>
                  )}
                </div>

              </div>
            )})
          ) : (
            <div className="py-20 text-center border-2 border-dashed rounded-3xl border-gray-200 dark:border-gray-800">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <FaUser className={`text-3xl ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
              </div>
              <p className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>No customers found.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default CustomerManagementTab;
