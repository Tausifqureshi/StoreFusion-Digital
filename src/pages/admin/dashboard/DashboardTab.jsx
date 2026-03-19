import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MyContext } from "../../../context api/myContext";
import {
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FaUser, FaCartPlus, FaSearch } from "react-icons/fa";
import {
  AiFillShopping,
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
} from "react-icons/ai";
import { useSpring, animated } from "react-spring";
import { Link, useNavigate } from "react-router-dom";
import Testimonial from "../../../components/testimonial/Testimonial";


function DashboardTab() {
  const { mode, product, edithandle, deleteProduct, order, user, testimonial, editTestimonial, deleteTestimonial, getAvatar } =
    useContext(MyContext);

  const isDark = mode === 'dark';
  const [index, setIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const animationProps = useSpring({
    opacity: 1,
    transform: `translateY(0px)`,
    from: { opacity: 0, transform: `translateY(20px)` },
    reset: true,
  });

  const filteredProducts = product.filter((p) => p.title?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredOrders = order.filter((o) => o.email?.toLowerCase().includes(searchQuery.toLowerCase()) || o.paymentId?.toLowerCase().includes(searchQuery.toLowerCase()) || o.id?.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredUsers = user.filter((u) => u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs selectedIndex={index} onSelect={(i) => { setIndex(i); setSearchQuery(""); }} className="w-full relative">

        {/* ⭐ Premium Colorful Tab List */}
        <div className="mb-8 w-full border-b border-gray-200 dark:border-gray-800 pb-2">
          <TabList className="flex overflow-x-auto custom-scrollbar gap-4 sm:gap-6">
            {[
              { icon: <MdOutlineProductionQuantityLimits size={20} />, label: "Inventory", colorClass: "text-purple-600 bg-purple-100 dark:bg-purple-500/20 dark:text-purple-400" },
              { icon: <AiFillShopping size={20} />, label: "Orders", colorClass: "text-blue-600 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400" },
              { icon: <FaUser size={20} />, label: "Customers", colorClass: "text-green-600 bg-green-100 dark:bg-green-500/20 dark:text-green-400" },
              { icon: <AiFillStar size={20} />, label: "Reviews", colorClass: "text-yellow-600 bg-yellow-100 dark:bg-yellow-500/20 dark:text-yellow-400" },
            ].map((tab, i) => {
              const isSelected = index === i;
              return (
                <Tab
                  key={i}
                  className={`cursor-pointer shrink-0 outline-none flex items-center gap-3 px-4 py-3 rounded-t-xl transition-all duration-300 border-b-[3px] ${isSelected
                      ? "border-pink-500 text-pink-500 bg-gray-50 dark:bg-[#1e293b]"
                      : "border-transparent text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-[#1e293b]/50"
                    }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300 ${tab.colorClass} ${isSelected ? 'scale-110 shadow-sm' : ''}`}>
                    {tab.icon}
                  </div>
                  <span className={`text-[15px] font-bold tracking-wide ${isSelected ? (isDark ? 'text-white' : 'text-gray-900') : ''}`}>
                    {tab.label}
                  </span>
                </Tab>
              );
            })}
          </TabList>
        </div>

        {/* ================= PRODUCT TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  Store <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Inventory</span>
                </h1>
                <p className={`text-xs font-semibold uppercase tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {product.length} Items Listed
                </p>
              </div>

              <div className="flex flex-col sm:flex-row w-full md:w-auto items-stretch sm:items-center gap-3">
                <div className="relative w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <div className={`p-1.5 rounded-lg ${isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"}`}>
                      <FaSearch size={12} />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-12 pr-3 py-2.5 text-sm rounded-xl outline-none transition-all duration-300 border shadow-sm ${isDark
                        ? "bg-[#131921] text-white border-gray-700 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                        : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                      }`}
                  />
                </div>
                <button
                  onClick={() => navigate("/addproduct")}
                  className="shrink-0 flex justify-center gap-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2.5 rounded-xl text-sm font-extrabold shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <FaCartPlus size={16} /> Add Product
                </button>
              </div>
            </div>

            {/* --- DESKTOP TABLE VIEW --- */}
            <div className={`hidden md:block rounded-2xl border transition-all overflow-hidden ${isDark ? "bg-[#1e293b] border-gray-800 shadow-lg" : "bg-white border-gray-200 shadow-sm hover:shadow-md"}`}>
              <div className="overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
                <table className="w-full text-sm text-left relative">
                  <thead className={`sticky top-0 z-10 text-xs font-bold uppercase tracking-widest ${isDark ? "text-gray-400 bg-[#131921] border-b border-gray-800" : "text-gray-500 bg-gray-50 border-b border-gray-200"}`}>
                    <tr>
                      {["Image", "Title", "Price", "Action"].map((h, i) => (
                        <th key={i} className="px-6 py-4 bg-inherit">{h}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className={`${isDark ? "divide-y divide-gray-800" : "divide-y divide-gray-100"}`}>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((item, i) => (
                        <tr key={i} className={`transition-colors ${isDark ? "hover:bg-[#131921]/50" : "hover:bg-gray-50/50"}`}>
                          <td className="px-6 py-4">
                            <div className={`p-2 rounded-xl border w-14 h-14 flex items-center justify-center shrink-0 ${isDark ? "bg-[#131921] border-gray-700" : "bg-white border-gray-100"}`}>
                              <img src={item.imageUrl} alt={item.title} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-lg" />
                            </div>
                          </td>
                          <td className={`px-6 py-4 text-[15px] font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{item.title}</td>
                          <td className={`px-6 py-4 text-[16px] font-extrabold text-green-500`}>₹{item.price}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <Link to="/updateProduct" onClick={() => edithandle(item)} className={`p-2 rounded-lg transition-all ${isDark ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}>
                                <AiFillEdit size={20} />
                              </Link>
                              <button onClick={() => deleteProduct(item)} className={`p-2 rounded-lg transition-all ${isDark ? "bg-red-500/10 text-red-400 hover:bg-red-500/20" : "bg-red-50 text-red-600 hover:bg-red-100"}`}>
                                <AiFillDelete size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className={`px-6 py-10 text-center text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- MOBILE CARD VIEW --- */}
            <div className="md:hidden flex flex-col gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, i) => (
                  <div key={i} className={`p-4 rounded-3xl border transition-all ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-[0_5px_15px_rgba(0,0,0,0.05)]"}`}>
                    <div className="flex gap-4">
                      <div className={`w-28 h-32 rounded-2xl p-2 flex shrink-0 items-center justify-center border ${isDark ? "bg-[#131921] border-gray-700" : "bg-gray-50 border-gray-100 text-center"}`}>
                        <img src={item.imageUrl} alt={item.title} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h2 className={`text-sm font-black uppercase tracking-tight leading-tight line-clamp-2 ${isDark ? "text-white" : "text-gray-900"}`}>{item.title}</h2>
                          <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mt-1 truncate">{item.category}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-xl font-black text-blue-600 tracking-tighter">₹{item.price}</span>
                          <div className="flex items-center gap-2">
                            <Link to="/updateProduct" onClick={() => edithandle(item)} className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${isDark ? "border-gray-700 bg-[#131921] text-blue-400 hover:border-blue-500" : "border-gray-200 bg-gray-50 text-blue-600 hover:border-blue-300"}`}>
                              <AiFillEdit size={16} />
                            </Link>
                            <button onClick={() => deleteProduct(item)} className={`p-2.5 rounded-xl border flex items-center justify-center transition-all ${isDark ? "border-gray-700 bg-[#131921] text-red-400 hover:border-red-500" : "border-gray-200 bg-gray-50 text-red-600 hover:border-red-300"}`}>
                              <AiFillDelete size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`py-10 text-center text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                  No products found.
                </div>
              )}
            </div>
          </animated.div>
        </TabPanel>

        {/* ================= ORDER TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Orders</span>
                </h1>
                <p className={`text-xs font-semibold uppercase tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {order.length} Total Logs
                </p>
              </div>
              <div className="relative w-full md:w-64 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className={`p-1.5 rounded-lg ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                    <FaSearch size={12} />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-3 py-2.5 text-sm rounded-xl outline-none transition-all duration-300 border shadow-sm ${isDark
                      ? "bg-[#131921] text-white border-gray-700 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                      : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                    }`}
                />
              </div>
            </div>
            <div className={`overflow-hidden rounded-2xl border ${isDark ? "bg-[#1e293b] border-gray-800 shadow-lg" : "bg-white border-gray-200 shadow-sm hover:shadow-md"}`}>
              <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                <ul className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-100"}`}>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((o, i) => (
                      <li key={i} className={`p-4 sm:px-6 transition-colors ${isDark ? "hover:bg-[#131921]/50" : "hover:bg-gray-50/50"}`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col gap-1">
                            <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                               <div className={`p-1 rounded ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}><AiFillShopping size={12}/></div> 
                               Payment ID: <span className="text-blue-500  font-medium">{o.paymentId || "N/A"}</span>
                            </span>
                            <span className={`text-[15px] font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{o.email}</span>
                          </div>
                          <div className={`self-start sm:self-auto text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border ${isDark ? "bg-[#131921] text-gray-300 border-gray-700" : "bg-white text-gray-600 border-gray-200 shadow-sm"}`}>
                            Order #{String(o.id).slice(0, 6).toUpperCase() || i}
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className={`p-10 text-center text-xs font-bold uppercase tracking-widest flex flex-col items-center gap-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <div className={`p-4 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                        <AiFillShopping size={32} className="opacity-50" />
                      </div>
                      No orders found.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </animated.div>
        </TabPanel>

        {/* ================= USER TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
              <div>
                <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                  Customers <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Directory</span>
                </h1>
                <p className={`text-xs font-semibold uppercase tracking-widest mt-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {user.length} Registered
                </p>
              </div>
              <div className="relative w-full md:w-64 shrink-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className={`p-1.5 rounded-lg ${isDark ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-600"}`}>
                    <FaSearch size={12} />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-3 py-2.5 text-sm rounded-xl outline-none transition-all duration-300 border shadow-sm ${isDark
                      ? "bg-[#131921] text-white border-gray-700 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                      : "bg-gray-50 text-gray-900 border-gray-200 placeholder-gray-500 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                    }`}
                />
              </div>
            </div>
            <div className={`overflow-hidden rounded-2xl border ${isDark ? "bg-[#1e293b] border-gray-800 shadow-lg" : "bg-white border-gray-200 shadow-sm hover:shadow-md"}`}>
              <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                <ul className={`divide-y ${isDark ? "divide-gray-800" : "divide-gray-200"}`}>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u, i) => (
                      <li key={i} className={`p-4 sm:px-6 flex items-center justify-between transition-colors ${isDark ? "hover:bg-[#131921]/50" : "hover:bg-gray-50"}`}>
                        <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-[18px] font-extrabold text-white bg-gradient-to-r from-pink-500 to-purple-500 shadow-md`}>
                            {u.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div className="flex flex-col">
                            <span className={`text-[15px] font-bold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{u.name}</span>
                            <span className={`text-xs font-bold uppercase tracking-widest mt-0.5 ${isDark ? "text-gray-400" : "text-gray-500"}`}>{u.email}</span>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className={`p-10 text-center text-xs font-bold uppercase tracking-widest flex flex-col items-center gap-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      <div className={`p-4 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
                         <FaUser size={32} className="opacity-50" />
                      </div>
                      No users found.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </animated.div>
        </TabPanel>

        {/* ================= TESTIMONIAL TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
              <h1 className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Feedback</span>
              </h1>
            </div>
            <div className={`p-6 rounded-2xl border transition-all overflow-hidden ${isDark ? "bg-[#1e293b] border-gray-800 shadow-lg" : "bg-white border-gray-200 shadow-sm hover:shadow-md"}`}>
              <Testimonial isAdmin={true} />
            </div>
          </animated.div>
        </TabPanel>






      </Tabs>
    </div>
  );
}

export default DashboardTab;

