import React, { useContext, useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Drawer } from "@mui/material";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// ✅ Internal Dependencies
import { ThemeContext } from "../../context/AllContext";
import { authService } from "../../services/authService";
import { setLoggedInUser } from "../../features/users/userSlice";
import { CATEGORY_NAMES } from "../../constants/categories";

// ✅ Icons
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

// ============================================================
// 🛡️ SUB-COMPONENTS (Atomic Formatting)
// ============================================================

const TopAnnouncement = React.memo(({ isDark }) => {
  return (
    <div
      className={`
        text-center py-1.5 text-xs font-bold 
        ${isDark ? "bg-[#1a1f2e] text-gray-400" : "bg-[#232f3e] text-white"}
      `}
    >
      🚚 Free delivery on ₹300+ | Fast Checkout ⚡
    </div>
  );
});

const NavLinks = React.memo(({ isDark, navItems, user, totalOrders }) => {
  const common = `
    relative pb-1 transition-all duration-300 uppercase 
    after:content-[''] after:absolute after:bottom-0 after:left-0 
    after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300
  `;

  const active = "text-orange-500 after:w-full";
  const inactive = "text-inherit hover:text-orange-500 after:w-0 hover:after:w-full";

  return (
    <div
      className={`
        hidden lg:flex items-center gap-8 font-bold text-[13px] 
        uppercase tracking-wider shrink-0 
        ${isDark ? "text-gray-200" : "text-gray-600"}
      `}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.URL}
          className={({ isActive }) => `
            ${common} 
            ${isActive ? active : inactive}
          `}
        >
          {item.name}
        </NavLink>
      ))}

      {user && (
        <NavLink
          to="/order"
          className={({ isActive }) => `
            flex items-center gap-1 
            ${common} 
            ${isActive ? active : inactive}
          `}
        >
          Orders
          {totalOrders > 0 && (
            <span
              className="
                absolute -top-1 -right-2.5 bg-green-500 text-white 
                text-[10px] w-3.5 h-3.5 rounded-full flex 
                items-center justify-center font-bold shadow-sm
              "
            >
              {totalOrders}
            </span>
          )}
        </NavLink>
      )}

      {user?.role === "admin" && (
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `
            border-l pl-4 border-gray-300 uppercase 
            ${isActive ? "text-orange-500" : "text-orange-500 hover:opacity-80"}
          `}
        >
          Admin
        </NavLink>
      )}
    </div>
  );
});

const ActionIcons = React.memo(({ isDark, mode, toggleMode, user, handleLogout, navigate }) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const isAuthInitialized = useSelector((state) => state.users.isAuthInitialized);

  return (
    <div className="flex items-center gap-5 shrink-0">
      <button
        onClick={toggleMode}
        className="hover:scale-110 transition-transform"
      >
        {mode === "light" ? (
          <BsMoonStars
            size={20}
            className="text-gray-600"
          />
        ) : (
          <FiSun
            size={20}
            className="text-yellow-400"
          />
        )}
      </button>

      <div className="relative">
        <NavLink to="/cart">
          <FiShoppingCart
            size={22}
            className={isDark ? "text-white" : "text-gray-700"}
          />
        </NavLink>

        {totalQuantity > 0 && (
          <span
            className="
              absolute -top-1.5 -right-1.5 bg-orange-500 text-white 
              text-[10px] w-4 h-4 rounded-full flex items-center 
              justify-center font-bold shadow-sm
            "
          >
            {totalQuantity}
          </span>
        )}
      </div>

      {isAuthInitialized && (
        user ? (
          <div className="hidden sm:flex items-center gap-3 border-l pl-4 border-gray-300 dark:border-gray-700">
            <div className="hidden lg:flex flex-col leading-tight">
              <span
                className={`
                  text-[10px] font-bold 
                  ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
              >
                Hello, {user.fullName?.split(" ")[0]}
              </span>
              <span
                className={`
                  text-[11px] font-black uppercase tracking-widest 
                  ${isDark ? "text-white" : "text-gray-800"}
                `}
              >
                Account
              </span>
            </div>
            <img
              src={user.profilePic || "https://i.pravatar.cc/100"}
              className="w-8 h-8 rounded-full border-2 border-orange-500 object-cover"
              alt="u"
            />
            <button
              onClick={handleLogout}
              className="
                text-[9px] font-black text-white bg-red-500 
                px-3 py-1.5 rounded-lg hover:bg-red-600 
                shadow-sm tracking-widest
              "
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className={`
              hidden sm:block px-5 py-1.5 rounded text-xs font-bold 
              ${isDark ? "bg-white text-black" : "bg-blue-600 text-white"}
            `}
          >
            SIGN IN
          </button>
        )
      )}
    </div>
  );
});

const NavScrollShield = React.memo(({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let timeoutId = null;
    const onScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        const current = window.scrollY;
        if (window.innerWidth >= 1024) {
          setIsVisible(!(current > lastScrollY.current && current > 50));
        }
        setIsScrolled(current > 50);
        lastScrollY.current = current;
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return children(isVisible, isScrolled);
});

// ============================================================
// 🚀 MAIN NAVBAR COMPONENT
// ============================================================

function Navbar({ isDark }) {
  const { mode, toggleMode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 🏪 Component State
  const [open, setOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const [query, setQuery] = useState("");

  // 👤 Store Selectors
  const user = useSelector((state) => state.users.loggedInUser);
  const totalOrders = useSelector((state) => state.orders.orderCount);

  // 🛠️ Logic: Navigation Items
  const navItems = useMemo(
    () => [
      { name: "Home",         URL: "/" },
      { name: "All Products", URL: "/allproducts" },
      { name: "About",        URL: "/about" },
      { name: "Contact",      URL: "/contact" },
    ],
    []
  );

  // 🛠️ Logic: Categories (From Centralized Constant)
  const categories = useMemo(() => CATEGORY_NAMES, []);

  // 🛠️ Handlers
  const handleLogout = useCallback(async () => {
    dispatch(setLoggedInUser(null));
    await authService.logoutUser();
    window.location.replace(`/login?redirect=${location.pathname}`);
  }, [dispatch, location.pathname]);

  const handleMobileClick = (url) => {
    setOpen(false);
    setTimeout(() => {
      navigate(url);
    }, 300);
  };

  return (
    <NavScrollShield>
      {(isVisible, isScrolled) => (
        <div
          className={`
            fixed top-0 w-full z-50 transition-transform duration-300 
            ${isVisible ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <TopAnnouncement isDark={isDark} />

          <nav
            className={`
              transition-all duration-300 relative z-50 
              ${isDark ? "border-b border-gray-800 bg-[#1a1f2e] shadow-lg shadow-black/50" : "border-b border-gray-200 bg-white shadow-xl shadow-black/5"} 
              ${isScrolled ? "bg-opacity-95 backdrop-blur-xl" : ""}
            `}
          >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
              
              {/* Left Section: Menu & Logo */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setOpen(true);
                    setShowSubMenu(false);
                  }}
                  className="lg:hidden p-1 dark:text-white"
                >
                  <FiMenu size={26} />
                </button>
                <Link
                  to="/"
                  className={`
                    text-2xl font-black italic tracking-tighter 
                    ${isDark ? "text-white" : "text-blue-600"}
                  `}
                >
                  STORE
                  <span className="text-orange-500">
                    FUSION
                  </span>
                </Link>
              </div>

              {/* Center Section: Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                <div
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                  className="relative py-5 cursor-pointer"
                >
                  <span
                    className={`
                      flex items-center gap-1 font-bold text-[13px] 
                      uppercase tracking-wider hover:text-orange-500 transition-all 
                      ${isDark ? "text-gray-200" : "text-gray-600"}
                    `}
                  >
                    Categories 
                    <FiChevronRight className="rotate-90" />
                  </span>
                  
                  {mega && (
                    <div
                      className={`
                        absolute top-full left-0 w-[550px] shadow-2xl 
                        rounded-b-2xl border-t-4 border-orange-500 p-4 z-[100] 
                        ${isDark ? "bg-[#1a1f2e] text-white" : "bg-white text-gray-800"}
                      `}
                    >
                      <h3
                        className="
                          px-3 mb-3 text-[10px] font-black 
                          text-gray-400 uppercase tracking-[0.2em]
                        "
                      >
                        Explore Categories
                      </h3>
                      <div className="grid grid-cols-3 gap-2 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                        {(categories || []).map((cat) => {
                          const active = location.pathname === `/category/${cat.toLowerCase()}`;
                          return (
                            <div
                              key={cat}
                              onClick={() => {
                                navigate(`/category/${cat.toLowerCase()}`);
                                setMega(false);
                              }}
                              className={`
                                p-3 rounded-xl transition-all cursor-pointer text-[11px] 
                                font-bold uppercase truncate border 
                                ${active
                                  ? (isDark ? "bg-orange-500/20 border-orange-500 text-orange-500" : "bg-orange-50 border-orange-200 text-orange-600")
                                  : (isDark ? "border-transparent hover:bg-gray-800 text-gray-200 hover:text-orange-500" : "border-transparent hover:bg-orange-50 text-gray-700 hover:text-orange-500")
                                }
                              `}
                            >
                              {cat}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <NavLinks
                  isDark={isDark}
                  navItems={navItems}
                  user={user}
                  totalOrders={totalOrders}
                />
              </div>

              {/* Right Section: Actions */}
              <ActionIcons
                isDark={isDark}
                mode={mode}
                toggleMode={toggleMode}
                user={user}
                handleLogout={handleLogout}
                navigate={navigate}
              />
            </div>
          </nav>

          {/* 📱 MOBILE DRAWER */}
          <Drawer
            anchor="left"
            open={open}
            onClose={() => setOpen(false)}
            sx={{
              "& .MuiDrawer-paper": {
                width: "20rem",
                backgroundColor: isDark ? "#1a1f2e" : "white",
              },
              "& .MuiBackdrop-root": {
                backdropFilter: "blur(4px)",
              },
            }}
          >
            <div
              className={`
                w-full h-full flex flex-col overflow-hidden 
                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >
              <div
                className={`
                  p-6 flex items-center gap-4 
                  ${isDark ? "bg-gray-800/40" : "bg-blue-600 text-white"}
                `}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    className="w-11 h-11 rounded-full border-2 border-orange-400 object-cover"
                    alt="p"
                  />
                ) : (
                  <div className="bg-white/20 p-2 rounded-full">
                    <FiUser size={24} />
                  </div>
                )}

                <h2 className="text-lg font-bold italic flex-1 truncate">
                  {user ? `Hello, ${user.fullName?.split(" ")[0]}` : "Store Fusion"}
                </h2>

                <button onClick={() => setOpen(false)}>
                  <RxCross2 size={24} />
                </button>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <div
                  className={`
                    absolute inset-0 p-4 space-y-1 overflow-y-auto 
                    transition-transform duration-300 
                    ${showSubMenu ? "-translate-x-full" : "translate-x-0"}
                  `}
                >
                  <h3 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">
                    Top Categories
                  </h3>
                  
                  <button
                    onClick={() => setShowSubMenu(true)}
                    className="
                      w-full flex items-center justify-between p-3 
                      rounded-lg font-medium hover:bg-gray-100 
                      dark:hover:bg-gray-800
                    "
                  >
                    Shop by Category 
                    <FiChevronRight />
                  </button>

                  <div className="my-4 border-t dark:border-gray-700" />

                  {navItems.map((item) => {
                    const active = location.pathname === item.URL;
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleMobileClick(item.URL)}
                        className={`
                          w-full text-left p-3 font-medium rounded-lg 
                          ${active
                            ? (isDark ? "bg-orange-500/20 text-orange-500 font-bold" : "bg-blue-50 text-blue-600")
                            : (isDark ? "text-gray-400 hover:bg-gray-800" : "text-gray-800 hover:bg-gray-50")
                          }
                        `}
                      >
                        {item.name}
                      </button>
                    );
                  })}

                  {user && (
                    <button
                      onClick={() => handleMobileClick("/order")}
                      className={`
                        w-full text-left flex items-center justify-between p-3 
                        font-medium rounded-lg 
                        ${location.pathname === "/order" ? "text-orange-500 bg-orange-500/10" : "text-gray-800 dark:text-gray-400"}
                      `}
                    >
                      <span className="flex items-center gap-3">
                        <FiPackage /> 
                        My Orders
                      </span>
                      
                      {totalOrders > 0 && (
                        <span
                          className="
                            bg-green-600 text-white text-[10px] 
                            px-2 py-0.5 rounded-full
                          "
                        >
                          {totalOrders}
                        </span>
                      )}
                    </button>
                  )}

                  {user?.role === "admin" && (
                    <button
                      onClick={() => handleMobileClick("/dashboard")}
                      className="
                        w-full text-left flex items-center 
                        gap-2 p-3 font-medium text-orange-500
                      "
                    >
                      <FiShield /> 
                      Admin Panel
                    </button>
                  )}

                  <div className="mt-10">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="
                          w-full p-3 text-red-500 font-bold 
                          border-2 border-red-500 rounded-xl
                        "
                      >
                        Sign Out
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMobileClick("/login")}
                        className="
                          w-full p-3 bg-blue-600 text-white 
                          rounded-xl font-bold shadow-lg
                        "
                      >
                        Sign In
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub Menu Layer */}
                <div
                  className={`
                    absolute inset-0 flex flex-col transition-transform duration-300 
                    bg-inherit ${showSubMenu ? "translate-x-0" : "translate-x-full"}
                  `}
                >
                  <div
                    className={`
                      p-4 border-b 
                      ${isDark ? "bg-[#232f3e]" : "bg-blue-600 text-white"}
                    `}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <button onClick={() => setShowSubMenu(false)}>
                        <FiArrowLeft size={22} />
                      </button>
                      <h2 className="text-sm font-black uppercase italic">
                        Shop by 
                        <span className="text-orange-400 ml-1">
                          Category
                        </span>
                      </h2>
                    </div>
                    
                    <input
                      type="text"
                      placeholder="Search categories"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className={`
                        w-full p-3 rounded-xl text-xs outline-none 
                        ${isDark ? "bg-[#1a1f2e] text-white" : "bg-white text-gray-800"}
                      `}
                    />
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-3">
                      {(categories || [])
                        .filter((cat) => cat.toLowerCase().includes(query.toLowerCase()))
                        .map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setOpen(false);
                              navigate(`/category/${cat.toLowerCase()}`);
                            }}
                            className={`
                              flex flex-col items-center p-5 rounded-2xl border 
                              ${isDark ? "bg-[#1a1f2e] border-gray-800 text-gray-200" : "bg-gray-50 border-gray-200"}
                            `}
                          >
                            <div
                              className={`
                                w-10 h-10 flex items-center justify-center rounded-full 
                                mb-2 font-black 
                                ${isDark ? "bg-orange-500/20 text-orange-500" : "bg-blue-100 text-blue-600"}
                              `}
                            >
                              {cat[0]}
                            </div>
                            <span className="text-[10px] font-black uppercase truncate w-full">
                              {cat}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      )}
    </NavScrollShield>
  );
}

export default React.memo(Navbar);
      