import React, { Fragment, useContext, useState, useEffect, useMemo, useRef, useCallback } from "react";
import throttle from "lodash/throttle";
import { Drawer } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ThemeContext, ProductContext, UserContext } from "../../context api/AllContext";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { clearOrders } from "../../redux/orderSlice";
import {
  FiSun,
  FiMenu,
  FiShoppingCart,
  FiChevronRight,
  FiArrowLeft,
  FiUser,
  FiPackage,
  FiShield,
} from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const { mode, toggleMode } = useContext(ThemeContext);
  const { product } = useContext(ProductContext);

  const [open, setOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const [mega, setMega] = useState(false);
  const [query, setQuery] = useState(""); // 👈 Ye line add karo

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loggedInUser: user } = useContext(UserContext);

  const totalOrders = useSelector((state) =>
    state.orders.orders.filter(order => order.status?.toLowerCase() !== "delivered").length
  );
  const totalQuantity = useSelector((state) =>
    state.cart.reduce((acc, item) => acc + item.quantity, 0),
  );

  // ✅ Smooth Close Function: Ye pehle animation chalayega phir navigate karega
  const handleMobileClick = (url) => {
    setOpen(false); // Pehle drawer band karo (Animation start)
    setTimeout(() => {
      navigate(url); // 300ms baad navigate karo
    }, 300);
  };

  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth < 1024) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = currentScrollY;
    }, 200),
    []
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);



  const navItems = useMemo(() => [
    { name: "Home", URL: "/" },
    { name: "All Products", URL: "/allproducts" },
    { name: "About", URL: "/about" },
    { name: "Contact", URL: "/contact" },
  ], []);

  const categories = useMemo(() => [...new Set(product.map((p) => p.category))], [product]);
  const isDark = mode === "dark";

  function handleLogout() {
    localStorage.removeItem("user");
    dispatch(clearCart());
    dispatch(clearOrders());
    navigate(`/login?redirect=${location.pathname}`);
  }

  return (
    <div className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      {/* TOP ANNOUNCEMENT */}
      <div className={`text-center py-1.5 text-xs font-bold ${isDark ? "bg-[#131921] text-gray-400" : "bg-[#232f3e] text-white"}`}>
        🚚 Free delivery on ₹300+ | Fast Checkout ⚡
      </div>

      {/* MAIN NAV (with prominent drop shadow to distinctly separate from hero section) */}
      <nav className={`transition-all duration-300 relative z-50 ${isDark ? "border-b border-gray-800 bg-[#232f3e] shadow-lg shadow-black/50" : "border-b border-gray-200 bg-white shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)]"} ${isScrolled ? "bg-opacity-95 backdrop-blur-xl" : ""}`}>

        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

          <div className="flex items-center gap-4">
            <button onClick={() => { setOpen(true); setShowSubMenu(false); }} className={`lg:hidden p-1 ${isDark ? "text-white" : "text-gray-800"}`}>
              <FiMenu size={26} />
            </button>
            <Link to="/" className={`text-2xl font-black italic tracking-tighter ${isDark ? "text-white" : "text-blue-600"}`}>
              STORE<span className="text-orange-500">FUSION</span>
            </Link>
          </div>

          <div className={`hidden lg:flex items-center gap-8 font-bold text-[13px] uppercase tracking-wider ${isDark ? "text-gray-200" : "text-gray-600"}`}>
            <div onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)} className="relative py-5 cursor-pointer">
              <span className="flex items-center gap-1 hover:text-orange-500 transition-all">Categories <FiChevronRight className="rotate-90" /></span>
              {/* {mega && (
                <div className={`absolute top-full left-0 w-64 shadow-2xl rounded-b-xl border-t-2 border-orange-500 p-4 ${isDark ? "bg-[#232f3e] text-white" : "bg-white text-gray-800"}`}>
                  {categories.map((cat) => (
                    <div key={cat} onClick={() => navigate(`/category/${cat}`)} className="p-2.5 hover:pl-4 transition-all hover:text-orange-500 cursor-pointer border-b border-gray-100 last:border-0 text-[11px]">{cat.toUpperCase()}</div>
                  ))}
                </div>
              )} */}
              {mega && (
                <div className={`absolute top-full left-0 w-[550px] shadow-2xl rounded-b-2xl border-t-4 border-orange-500 p-4 transition-all duration-300 z-[100] ${isDark ? "bg-[#232f3e] text-white" : "bg-white text-gray-800"}`}>

                  <h3 className="px-3 mb-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Explore Categories</h3>

                  {/* Grid with Max Height & Scroll */}
                  <div className="grid grid-cols-3 gap-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                    {categories.map((cat) => (
                      <div
                        key={cat}
                        onClick={() => { navigate(`/category/${cat}`); setMega(false); }}
                        className={`p-3 rounded-xl transition-all hover:text-orange-500 cursor-pointer text-[11px] font-bold uppercase truncate border border-transparent
            ${isDark ? "hover:bg-gray-800" : "hover:bg-orange-50 hover:border-orange-100 text-gray-700"}`}
                      >
                        {cat}
                      </div>
                    ))}
                  </div>

                  {categories.length > 15 && (
                    <div className="mt-3 text-center text-[9px] text-gray-400 italic border-t border-gray-100 dark:border-gray-700 pt-2">
                      Scroll down to see all {categories.length} categories
                    </div>
                  )}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link key={item.name} to={item.URL} className="hover:text-orange-500 transition-colors">{item.name}</Link>
            ))}
            {user && <Link to="/order" className="relative hover:text-orange-500 transition-colors">Orders {totalOrders > 0 && <span className="absolute -top-3 -right-4 bg-green-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{totalOrders}</span>}</Link>}
            {user?.role === "admin" && <Link to="/dashboard" className="text-orange-500 border-l pl-4 border-gray-300">Admin</Link>}
          </div>

          <div className="flex items-center gap-5">
            <button onClick={toggleMode} className="transition-transform hover:scale-110">
              {mode === "light" ? <BsMoonStars size={20} className="text-gray-600" /> : <FiSun size={20} className="text-yellow-400" />}
            </button>
            <Link to="/cart" className="relative">
              <FiShoppingCart size={24} className={isDark ? "text-white" : "text-gray-700"} />
              {totalQuantity > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{totalQuantity}</span>}
            </Link>
            {user ? (
              <div className="hidden sm:flex items-center gap-3 border-l pl-4 border-gray-300 dark:border-gray-700">
                <div className="flex flex-col items-start leading-tight pr-1">
                  <span className={`text-[10px] font-bold ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Hello, {user.fullName?.split(" ")[0] || "User"}
                  </span>
                  <span className={`text-[11px] font-black uppercase tracking-widest ${isDark ? "text-white" : "text-gray-800"}`}>
                    Account
                  </span>
                </div>
                <img src={user.profilePic || "https://i.pravatar.cc/100"} className="w-8 h-8 rounded-full border-2 border-orange-500 shadow-sm" alt="p" />
                <button onClick={handleLogout} className="text-[9px] font-black text-white bg-red-500 px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors shadow-sm ml-1 tracking-widest">
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link to="/login" className={`hidden sm:block px-5 py-1.5 rounded text-xs font-bold ${isDark ? "bg-white text-black" : "bg-blue-600 text-white"}`}>SIGN IN</Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        className="lg:hidden z-50"
        sx={{
          '& .MuiDrawer-paper': {
            width: '20rem',
            backgroundColor: isDark ? "#232f3e" : "white",
            color: isDark ? "white" : "inherit"
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(4px)',
          }
        }}
      >
        <div className={`relative w-full h-full flex flex-col overflow-hidden ${isDark ? "bg-[#232f3e] text-white" : "bg-white text-gray-900"}`}>
          <div className={`p-6 flex items-center gap-4 shrink-0 ${isDark ? "bg-[#131921]" : "bg-blue-600 text-white"}`}>
            <div className="bg-white/20 p-2 rounded-full"><FiUser size={24} /></div>
            <h2 className="text-lg font-bold italic flex-1">Hello, {user ? user.fullName?.split(" ")[0] : "Sign In"}</h2>
            <button onClick={() => setOpen(false)}><RxCross2 size={24} /></button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            {/* MAIN MENU LAYER */}
            <div className={`absolute inset-0 p-4 space-y-1 overflow-y-auto transition-transform duration-300 ${showSubMenu ? "-translate-x-full" : "translate-x-0"}`}>
              <h3 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">Top Categories</h3>
              <button onClick={() => setShowSubMenu(true)} className={`w-full flex items-center justify-between p-3 rounded-lg font-medium ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-50"}`}>
                Shop by Category <FiChevronRight />
              </button>

              <div className="my-4 border-t border-gray-100 dark:border-gray-700" />
              <h3 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">Programs & Features</h3>

              {/* ✅ Smooth Navigation for Nav Items (Brand Colors) */}
              {navItems.map((item) => (
                <button key={item.name} onClick={() => handleMobileClick(item.URL)} className={`w-full text-left block p-3 font-medium rounded-lg transition-all ${isDark ? "hover:bg-[#131921] active:bg-gray-800" : "hover:bg-blue-50 active:bg-blue-100 text-gray-800"}`}>
                  {item.name}
                </button>
              ))}

              {/* ✅ Smooth Navigation for Orders (Brand Colors) */}
              {user && (
                <button onClick={() => handleMobileClick("/order")} className={`w-full text-left flex items-center justify-between p-3 font-medium rounded-lg transition-all ${isDark ? "hover:bg-[#131921] active:bg-gray-800" : "hover:bg-blue-50 active:bg-blue-100 text-gray-800"}`}>
                  <span className="flex items-center gap-3"><FiPackage className="text-blue-500" /> My Orders</span>
                  {totalOrders > 0 && <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">{totalOrders}</span>}
                </button>
              )}

              {/* ✅ Smooth Navigation for Admin (Brand Colors) */}
              {user?.role === "admin" && (
                <button onClick={() => handleMobileClick("/dashboard")} className={`w-full text-left flex items-center gap-2 p-3 font-medium text-orange-500 rounded-lg transition-all ${isDark ? "hover:bg-[#131921] active:bg-gray-800" : "hover:bg-orange-50 active:bg-orange-100"}`}>
                  <FiShield /> Admin Panel
                </button>
              )}

              <div className="mt-auto pt-10 pb-10">
                {user ? (
                  <button onClick={handleLogout} className="w-full p-3 text-red-500 font-bold border-2 border-red-500 rounded-xl hover:bg-red-50 transition-all">Sign Out</button>
                ) : (
                  <button onClick={() => handleMobileClick("/login")} className="block w-full p-3 bg-blue-600 text-white text-center rounded-xl font-bold shadow-lg">Sign In</button>
                )}
              </div>
            </div>

            {/* SUB-MENU LAYER */}
            {/* <div className={`absolute inset-0 p-4 space-y-1 transition-transform duration-300 bg-inherit overflow-y-auto ${showSubMenu ? "translate-x-0" : "translate-x-full"}`}>
                    <button onClick={() => setShowSubMenu(false)} className="flex items-center gap-2 p-3 font-bold text-blue-500 mb-4 border-b w-full"><FiArrowLeft /> MAIN MENU</button>
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => { setOpen(false); setTimeout(() => navigate(`/category/${cat}`), 300); }} className=" w-full text-left p-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg uppercase text-sm">
                        {cat}
                      </button>
                    ))}
                  </div> */}

            {/* SUB-MENU LAYER (Full Screen Overlay Style) */}
            {/* SUB-MENU LAYER (Real Professional UX) */}
            <div className={`absolute inset-0 z-50 flex flex-col transition-transform duration-300 bg-inherit ${showSubMenu ? "translate-x-0" : "translate-x-full"}`}>

              {/* 1. Header with Back Button */}
              <div className={`p-4 border-b sticky top-0 z-20 ${isDark ? "bg-[#232f3e] border-gray-800" : "bg-blue-600 text-white"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <button onClick={() => { setShowSubMenu(false); setQuery("") }} className="p-1"><FiArrowLeft size={22} /></button>
                  <h2 className="text-sm font-black uppercase tracking-tighter italic">Shop by <span className="text-orange-400">Category</span></h2>
                </div>

                {/* 2. REAL SEARCH: 200 Categories mein dhundne ke liye */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for categories"
                    value={query} // 👈 State se connect karo
                    onChange={(e) => setQuery(e.target.value)} //
                    className={`w-full p-3 pl-10 rounded-xl text-xs font-bold outline-none transition-all
          ${isDark ? "bg-[#131921] text-white focus:ring-1 ring-orange-500" : "bg-white text-gray-800 shadow-inner"}`}
                  />
                  <FiMenu className="absolute left-3 top-3.5 opacity-30" size={16} />
                </div>
              </div>

              {/* 3. Grid Layout (2 items per row) - Visual Experience */}
              <div className="flex-1 overflow-y-auto p-4 pb-24 bg-inherit custom-scrollbar">
                <div className="grid grid-cols-2 gap-3">
                  {categories
                    .filter(cat => cat.toLowerCase().includes(query.toLowerCase())) // Search filter
                    .map((cat) => (
                      <button
                        key={cat}
                        onClick={() => { setOpen(false); setTimeout(() => navigate(`/category/${cat}`), 300); }}
                        className={`flex flex-col items-center justify-center p-5 rounded-2xl border transition-all active:scale-95
              ${isDark ? "bg-[#1e293b] border-gray-800 text-gray-200" : "bg-gray-50 border-gray-200 text-gray-700 shadow-sm"}`}
                      >
                        {/* Category ka pehla akshar icon ki jagah (Placeholder icon) */}
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-2 font-black text-lg
              ${isDark ? "bg-orange-500/20 text-orange-500" : "bg-blue-100 text-blue-600"}`}>
                          {cat[0].toUpperCase()}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-center truncate w-full">
                          {cat}
                        </span>
                      </button>
                    ))}
                </div>

                {/* 4. Empty State agar search match na ho */}
                {categories.filter(cat => cat.toLowerCase().includes(query.toLowerCase())).length === 0 && (
                  <div className="text-center py-20 opacity-30 font-black uppercase text-xs tracking-[0.3em]">
                    No Category Found
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default React.memo(Navbar);



