// import React, { Fragment, useContext, useState } from "react";
// import { BsFillCloudSunFill } from "react-icons/bs";
// import { FiSun } from "react-icons/fi";
// import { RxCross2 } from "react-icons/rx";
// import { Dialog, Transition } from "@headlessui/react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { MyContext } from "../../context api/myContext";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../redux/cartSlice";
// import { getCartFromFirestore } from "../../pages/cart/cartFirestore";
// import { setCart } from "../../redux/cartSlice";
// import { useEffect } from "react";
// import {clearOrders } from "../../redux/orderSlice";


// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { mode, toggleMode, cartItem, updateCartItems } = useContext(MyContext); // Add cartItems and updateCartItems
//   const errorValue = useContext(MyContext); // Add cartItems and updateCartItems
//   // console.log(errorValue);

//   const navigate = useNavigate();
//   const location = useLocation();
//   // console.log("Navbar Location", location);
//   // console.log("Login location.state:", location);
//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("user"));
//   //   const uid = user?.uid;

//   //   useEffect(() => {
//   //   const load = async () => {
//   //     const cart = await getCartFromFirestore(uid);
//   //     dispatch(setCart(cart));
//   //   };
//   //   load();
//   // }, []);

//   // function handleLogout(e) {
//   //   // e.preventDefualt();
//   //   e.preventDefault();
//   //   localStorage.removeItem("user"); // Remove specific user item
//   //   // ✅ Redux cart clear
//   //   dispatch(clearCart());

//   //   // navigate(`/login`);
//   //   navigate(`/login?redirect=${location.pathname}`); // useSearchParams, tu aisa

//   //   // navigate("/login", {state: { PreviousPathname: location.pathname },}); //useLocation use to aisa
//   // }
//   const orders = useSelector((state) => state.orders.orders);
//   const totalOrders = orders?.length || 0; //normal count show karne ke liey ye.

// // const totalOrders = orders.filter(
// //   // (order) => order.status === "placed").length; // sirf placed orders count karne ke liey ye.
// //   (order)=>{ return order.status === "placed"}
// //   ) .length;


//   function handleLogout(e) {
//     e.preventDefault();
//     localStorage.removeItem("user");
//     dispatch(clearCart());
//     dispatch(clearOrders());
//     // navigate("/login");
//     navigate(`/login?redirect=${location.pathname}`);
//   }

//   const cartItems = useSelector((state) => state.cart);
//   const totalQuantity = cartItems.reduce((accumulator, currentValue) => {
//     return accumulator + currentValue.quantity; // quanty bade gi utne hi itme show hoge. agr only products dhekna hai tu cart.length kar sakta hai but amzone me quantity jaisa hi use hai.
//   }, 0);

//   return (
//     <div className="sticky top-0 z-50">
//       {/* Mobile Drawer */}
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/40" />
//           </Transition.Child>

//           <div className="fixed inset-0 flex z-50">
//             <Transition.Child
//               as={Fragment}
//               enter="transition ease-in-out duration-300 transform"
//               enterFrom="-translate-x-full"
//               enterTo="translate-x-0"
//               leave="transition ease-in-out duration-300 transform"
//               leaveFrom="translate-x-0"
//               leaveTo="-translate-x-full"
//             >
//               <Dialog.Panel
//                 className="relative w-4/5 sm:w-1/3 h-full overflow-y-auto shadow-xl"
//                 style={{
//                   backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
//                   color: mode === "dark" ? "#fff" : "#212529",
//                 }}
//               >
//                 <div
//                   className="flex items-center justify-between px-4 py-4 sticky top-0 z-10 border-b"
//                   style={{
//                     backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
//                     borderColor: mode === "dark" ? "#333" : "#ddd",
//                   }}
//                 >
//                   <h2 className="text-lg font-semibold">Menu</h2>
//                   <button
//                     onClick={() => setOpen(false)}
//                     className="p-2 rounded-md hover:bg-gray-100"
//                   >
//                     <RxCross2 className="w-6 h-6" />
//                   </button>
//                 </div>

//                 <div className="px-4 py-6 space-y-4">
//                   <Link
//                     to="/allproducts"
//                     className="block text-base hover:text-blue-600"
//                     style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                   >
//                     All Products
//                   </Link>
//                   <Link
//                     to="/about"
//                     className="block text-base hover:text-blue-600"
//                     style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                   >
//                     About
//                   </Link>
//                   <Link
//                     to="/contact"
//                     className="block text-base hover:text-blue-600"
//                     style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                   >
//                     Contact
//                   </Link>
//                   {user && (
//                     <Link
//                       to="/order"
//                       className="relative block text-base hover:text-blue-600"
//                       style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                     >
//                       Order
//                       {totalOrders > 0 && (
//                         <span className="ml-2 px-2 py-0.5 text-xs bg-green-600 text-white rounded-full">
//                           {totalOrders}
//                         </span>
//                       )}
//                     </Link>
//                   )}

//                   {user && user.role === "admin" && (
//                     <Link
//                       to="/dashboard"
//                       className="block text-base hover:text-blue-600"
//                       style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                     >
//                       Admin
//                     </Link>
//                   )}

//                   {user && (
//                     <div
//                       className="flex items-center gap-3 pt-5 border-t"
//                       style={{ borderColor: mode === "dark" ? "#333" : "#ddd" }}
//                     >
//                       <img
//                         src="https://i.pravatar.cc/300"
//                         alt="Profile"
//                         className="w-10 h-10 rounded-full"
//                       />
//                       {/* <span className="text-sm font-medium">{user.fullName || "User"}</span> */}
//                     </div>
//                   )}

//                   <div
//                     className="pt-5 border-t"
//                     style={{ borderColor: mode === "dark" ? "#333" : "#ddd" }}
//                   >
//                     {user ? (
//                       <button
//                         onClick={handleLogout}
//                         className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                       >
//                         Logout
//                       </button>
//                     ) : (
//                       <Link
//                         to="/login"
//                         className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                       >
//                         Sign In
//                       </Link>
//                     )}
//                   </div>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </Dialog>
//       </Transition.Root>

//       {/* Desktop Navbar */}
//       <header>
//         <p
//           className="flex h-10 items-center justify-center px-4 text-xs sm:text-sm md:text-base font-medium text-white"
//           style={{ backgroundColor: mode === "dark" ? "#333" : "#007bff" }}
//         >
//           🚚 Free shipping on orders ₹300+! Don’t miss out – shop today!
//         </p>

//         <nav
//           className="shadow-md transition-colors duration-300"
//           style={{
//             backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
//             color: mode === "dark" ? "#fff" : "#212529",
//           }}
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
//             <button
//               onClick={() => setOpen(true)}
//               className="lg:hidden p-2 rounded-md hover:bg-gray-100"
//             >
//               <span className="sr-only">Open menu</span>
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>

//             <Link to="/" className="flex items-center">
//               <h1
//                 className="text-2xl md:text-3xl font-extrabold px-4 py-2 rounded-lg"
//                 style={{
//                   color: mode === "dark" ? "#fff" : "#003366",
//                   background:
//                     mode === "dark"
//                       ? "rgba(0,0,0,0.2)"
//                       : "rgba(255,255,255,0.8)",
//                 }}
//               >
//                 <span className="italic">S</span>toreFusion
//               </h1>
//             </Link> 

//             <div className="hidden lg:flex lg:items-center lg:space-x-6">
//               <Link to="/allproducts" className="hover:text-blue-600">
//                 All Products
//               </Link>
//               <Link to="/about" className="hover:text-blue-600">
//                 About
//               </Link>
//               <Link to="/contact" className="hover:text-blue-600">
//                 Contact
//               </Link>
//               {user && (
//                 <Link to="/order" className="relative hover:text-blue-600">
//                   Order
//                   {totalOrders > 0 && (
//                     <span className="absolute -top-2 -right-4 w-5 h-5 flex items-center justify-center text-xs bg-green-600 text-white rounded-full">
//                       {totalOrders}
//                     </span>
//                   )}
//                 </Link>
//               )}

//               {user && user.role === "admin" && (
//                 <Link to="/dashboard" className="hover:text-blue-600">
//                   Admin
//                 </Link>
//               )}
//               {user ? (
//                 <button onClick={handleLogout} className="hover:text-red-500">
//                   Logout
//                 </button>
//               ) : (
//                 <Link to="/login" className="hover:text-blue-600">
//                   Sign In
//                 </Link>
//               )}
//               {user && (
//                 <div className="flex items-center gap-3">
//                   <img
//                     src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
//                     alt="India"
//                     className="w-6 h-4"
//                   />
//                   <img
//                     src="https://i.pravatar.cc/300"
//                     alt="Profile"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center gap-4">
//               <button onClick={toggleMode}>
//                 {mode === "light" ? (
//                   <FiSun size={24} />
//                 ) : (
//                   <BsFillCloudSunFill size={24} />
//                 )}
//               </button>
//               <Link to="/cart" className="relative hover:text-red-600">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13h10M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
//                   />
//                 </svg>
//                 {totalQuantity > 0 && (
//                   <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs bg-red-600 text-white rounded-full">
//                     {totalQuantity}
//                   </span>
//                 )}
//               </Link>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default Navbar;







import React, { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MyContext } from "../../context api/myContext";
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
  const { mode, toggleMode, product } = useContext(MyContext);

  const [open, setOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mega, setMega] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const totalOrders = useSelector((state) => state.orders.orders.length);
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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (window.innerWidth < 1024) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: "Home", URL: "/" },
    { name: "All Products", URL: "/allproducts" },
    { name: "About", URL: "/about" },
    { name: "Contact", URL: "/contact" },
  ];

  const categories = [...new Set(product.map((p) => p.category))];
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

      {/* MAIN NAV */}
      <nav className={`transition-all duration-300 ${isScrolled ? (isDark ? "bg-[#232f3e]/95 backdrop-blur-md shadow-xl" : "bg-white/95 backdrop-blur-md shadow-md") : (isDark ? "bg-[#232f3e]" : "bg-white shadow-md")}`}>
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
              {mega && (
                <div className={`absolute top-full left-0 w-64 shadow-2xl rounded-b-xl border-t-2 border-orange-500 p-4 ${isDark ? "bg-[#232f3e] text-white" : "bg-white text-gray-800"}`}>
                  {categories.map((cat) => (
                    <div key={cat} onClick={() => navigate(`/category/${cat}`)} className="p-2.5 hover:pl-4 transition-all hover:text-orange-500 cursor-pointer border-b border-gray-100 last:border-0 text-[11px]">{cat.toUpperCase()}</div>
                  ))}
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
              <div className="hidden sm:flex items-center gap-3 border-l pl-4 border-gray-300">
                <img src={user.profilePic || "https://i.pravatar.cc/100"} className="w-8 h-8 rounded-full border-2 border-orange-500" alt="p" />
                <button onClick={handleLogout} className="text-[11px] font-black text-red-500 hover:underline">LOGOUT</button>
              </div>
            ) : (
              <Link to="/login" className={`hidden sm:block px-5 py-1.5 rounded text-xs font-bold ${isDark ? "bg-white text-black" : "bg-blue-600 text-white"}`}>SIGN IN</Link>
            )}
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className={`relative w-80 h-full flex flex-col shadow-2xl overflow-hidden ${isDark ? "bg-[#232f3e] text-white" : "bg-white text-gray-900"}`}>
                <div className={`p-6 flex items-center gap-4 shrink-0 ${isDark ? "bg-[#131921]" : "bg-blue-600 text-white"}`}>
                  <div className="bg-white/20 p-2 rounded-full"><FiUser size={24} /></div>
                  <h2 className="text-lg font-bold italic flex-1">Hello, {user ? user.name?.split(" ")[0] : "Sign In"}</h2>
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
                    
                    {/* ✅ Smooth Navigation for Nav Items */}
                    {navItems.map((item) => (
                      <button key={item.name} onClick={() => handleMobileClick(item.URL)} className="w-full text-left block p-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        {item.name}
                      </button>
                    ))}

                    {/* ✅ Smooth Navigation for Orders */}
                    {user && (
                      <button onClick={() => handleMobileClick("/order")} className="w-full text-left flex items-center justify-between p-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                        <span className="flex items-center gap-3"><FiPackage className="text-blue-500" /> My Orders</span>
                        {totalOrders > 0 && <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">{totalOrders}</span>}
                      </button>
                    )}

                    {/* ✅ Smooth Navigation for Admin */}
                    {user?.role === "admin" && (
                      <button onClick={() => handleMobileClick("/dashboard")} className="w-full text-left flex items-center gap-2 p-3 font-medium text-orange-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
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
                  <div className={`absolute inset-0 p-4 space-y-1 transition-transform duration-300 bg-inherit ${showSubMenu ? "translate-x-0" : "translate-x-full"}`}>
                    <button onClick={() => setShowSubMenu(false)} className="flex items-center gap-2 p-3 font-bold text-blue-500 mb-4 border-b w-full"><FiArrowLeft /> MAIN MENU</button>
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => { setOpen(false); setTimeout(() => navigate(`/category/${cat}`), 300); }} className="w-full text-left p-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg uppercase text-sm">
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default React.memo(Navbar);






// import React, { Fragment, useContext, useState, useEffect } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { MyContext } from "../../context api/myContext";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../redux/cartSlice";
// import { clearOrders } from "../../redux/orderSlice";
// import { FiSun, FiMenu, FiShoppingCart, FiChevronRight, FiArrowLeft, FiUser, FiPackage, FiShield } from "react-icons/fi";
// import { BsMoonStars } from "react-icons/bs";
// import { RxCross2 } from "react-icons/rx";

// function Navbar() {
//   const { mode, toggleMode, product } = useContext(MyContext);
  
//   const [open, setOpen] = useState(false);
//   const [showSubMenu, setShowSubMenu] = useState(false); 
//   const [isVisible, setIsVisible] = useState(true);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [mega, setMega] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = JSON.parse(localStorage.getItem("user"));

//   // Redux Data
//   const cartItems = useSelector((state) => state.cart);
//   const orderItems = useSelector((state) => state.orders.orders) || [];

//   const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   const totalOrders = orderItems.length;

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
      
//       // ✅ MOBILE FIXED LOGIC: Agar mobile screen hai toh hamesha visible rakho
//       if (window.innerWidth < 1024) {
//         setIsVisible(true);
//       } else {
//         // Desktop par scroll down -> hide, scroll up -> show
//         if (currentScrollY > lastScrollY && currentScrollY > 100) {
//           setIsVisible(false); 
//         } else {
//           setIsVisible(true);
//         }
//       }

//       setIsScrolled(currentScrollY > 20);
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY]);

//   const navItems = [
//     { name: "Home", URL: "/" },
//     { name: "All Products", URL: "/allproducts" },
//     { name: "About", URL: "/about" },
//     { name: "Contact", URL: "/contact" },
//   ];

//   const categories = [...new Set(product.map((p) => p.category))];
//   const isDark = mode === "dark";

//   function handleLogout() {
//     localStorage.removeItem("user");
//     dispatch(clearCart());
//     dispatch(clearOrders());
//     navigate(`/login?redirect=${location.pathname}`);
//   }

//   return (
//     <div className={`fixed top-0 w-full z-50 transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      
//       {/* TOP BAR */}
//       <div className={`text-center py-1.5 text-[10px] sm:text-xs font-bold ${isDark ? "bg-[#131921] text-gray-400" : "bg-[#232f3e] text-white"}`}>
//         🚚 Free delivery on ₹300+ | Fast Checkout ⚡
//       </div>

//       {/* MAIN NAV */}
//       <nav className={`transition-all duration-300 ${
//         isScrolled 
//           ? (isDark ? "bg-[#232f3e]/95 backdrop-blur-md shadow-xl" : "bg-white/95 backdrop-blur-md shadow-md")
//           : (isDark ? "bg-[#232f3e]" : "bg-white")
//       }`}>
//         <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
//           <div className="flex items-center gap-4">
//             <button onClick={() => { setOpen(true); setShowSubMenu(false); }} className={`lg:hidden p-1 ${isDark ? "text-white" : "text-gray-800"}`}>
//               <FiMenu size={28} />
//             </button>
//             <Link to="/" className={`text-2xl font-black italic tracking-tighter ${isDark ? "text-white" : "text-blue-600"}`}>
//               STORE<span className="text-orange-500">FUSION</span>
//             </Link>
//           </div>

//           {/* DESKTOP MENU */}
//           <div className={`hidden lg:flex items-center gap-8 font-bold text-[12px] uppercase tracking-wider ${isDark ? "text-gray-200" : "text-gray-600"}`}>
//             <div onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)} className="relative py-5 cursor-pointer">
//               <span className="flex items-center gap-1 hover:text-orange-500 transition-all">Categories <FiChevronRight className="rotate-90" /></span>
//               {mega && (
//                 <div className={`absolute top-full left-0 w-64 shadow-2xl rounded-b-xl border-t-2 border-orange-500 p-4 ${isDark ? "bg-[#232f3e] text-white" : "bg-white text-gray-800"}`}>
//                   {categories.map((cat) => (
//                     <div key={cat} onClick={() => navigate(`/category/${cat}`)} className="p-2.5 hover:pl-4 transition-all hover:text-orange-500 cursor-pointer border-b border-gray-100 last:border-0 text-[11px]">
//                       {cat.toUpperCase()}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {navItems.map((item) => (
//               <Link key={item.name} to={item.URL} className="hover:text-orange-500 transition-colors">{item.name}</Link>
//             ))}

//             {/* ✅ DESKTOP ORDERS WITH COUNT */}
//             {user && (
//               <Link to="/order" className="relative hover:text-orange-500 transition-colors">
//                 Orders
//                 {totalOrders > 0 && (
//                   <span className="absolute -top-3 -right-4 bg-green-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                     {totalOrders}
//                   </span>
//                 )}
//               </Link>
//             )}

//             {user?.role === "admin" && <Link to="/dashboard" className="text-orange-500 border-l pl-4 border-gray-400">Admin</Link>}
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="flex items-center gap-5">
//             <button onClick={toggleMode}>
//               {mode === "light" ? <BsMoonStars size={20} className="text-gray-600" /> : <FiSun size={20} className="text-yellow-400" />}
//             </button>

//             <Link to="/cart" className="relative">
//               <FiShoppingCart size={26} className={isDark ? "text-white" : "text-gray-700"} />
//               {totalQuantity > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                   {totalQuantity}
//                 </span>
//               )}
//             </Link>

//             {user ? (
//               <div className="hidden sm:flex items-center gap-3 border-l pl-4 border-gray-300">
//                 <img src={user.profilePic || "https://i.pravatar.cc/100"} className="w-8 h-8 rounded-full border-2 border-orange-500" alt="p" />
//                 <button onClick={handleLogout} className="text-[11px] font-black text-red-500 hover:underline">LOGOUT</button>
//               </div>
//             ) : (
//               <Link to="/login" className={`hidden sm:block px-5 py-1.5 rounded text-xs font-bold ${isDark ? "bg-white text-black" : "bg-blue-600 text-white"}`}>SIGN IN</Link>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE DRAWER */}
//       {/* MOBILE DRAWER (Fixed Scroll & Items) */}

//       <Transition.Root show={open} as={Fragment}>
//   <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
//     <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
//       <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
//     </Transition.Child>

//     <div className="fixed inset-0 flex">
//       <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
//         <Dialog.Panel className={`relative w-80 h-full flex flex-col shadow-2xl ${isDark ? "bg-[#232f3e] text-white" : "bg-white text-gray-900"}`}>
          
//           {/* 1. Header (Sticky) */}
//           <div className={`p-6 flex items-center gap-4 shrink-0 ${isDark ? "bg-[#131921]" : "bg-blue-600 text-white"}`}>
//             <div className="bg-white/20 p-2 rounded-full"><FiUser size={24} /></div>
//             <h2 className="text-lg font-bold italic flex-1 truncate">Hello, {user ? user.name?.split(' ')[0] : 'Sign In'}</h2>
//             <button onClick={() => setOpen(false)}><RxCross2 size={24} /></button>
//           </div>

//           {/* 2. Scrollable Content Container */}
//           <div className="relative flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
            
//             {/* MAIN MENU LAYER */}
//             <div className={`p-4 space-y-1 transition-transform duration-300 ${showSubMenu ? "-translate-x-full opacity-0 pointer-events-none" : "translate-x-0 opacity-100"}`}>
//               <h3 className="px-3 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">Shop by Category</h3>
//               <button onClick={() => setShowSubMenu(true)} className={`w-full flex items-center justify-between p-3 rounded-lg font-bold text-sm ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}>
//                 View All Categories <FiChevronRight />
//               </button>

//               <div className="my-4 border-t border-gray-100 dark:border-gray-700" />
              
//               <h3 className="px-3 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">Account & Settings</h3>
              
//               {navItems.map((item) => (
//                 <Link key={item.name} to={item.URL} onClick={() => setOpen(false)} className="flex items-center justify-between p-3 text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
//                   {item.name} <FiChevronRight className="text-gray-300" />
//                 </Link>
//               ))}

//               {/* ✅ ORDERS WITH COUNT (Visible on Scroll) */}
//               {user && (
//                 <Link to="/order" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 text-sm font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
//                   <span className="flex items-center gap-3"><FiPackage className="text-blue-500" /> My Orders</span>
//                   {totalOrders > 0 && <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full">{totalOrders}</span>}
//                 </Link>
//               )}

//               {/* ✅ ADMIN PANEL (Visible on Scroll) */}
//               {user?.role === "admin" && (
//                 <Link to="/dashboard" onClick={() => setOpen(false)} className="flex items-center justify-between p-3 text-sm font-bold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-lg border border-orange-500/20 mt-2">
//                   <span className="flex items-center gap-3"><FiShield /> Admin Dashboard</span>
//                   <FiChevronRight />
//                 </Link>
//               )}
              
//               {/* Logout / Sign In at the bottom of the scroll list */}
//               <div className="pt-6 pb-10">
//                  {user ? (
//                    <button onClick={handleLogout} className="w-full p-3 text-red-500 font-black border-2 border-red-500 rounded-xl hover:bg-red-50 transition-all">Sign Out</button>
//                  ) : (
//                    <Link to="/login" onClick={() => setOpen(false)} className="block w-full p-3 bg-blue-600 text-white text-center rounded-xl font-black shadow-lg">Sign In</Link>
//                  )}
//               </div>
//             </div>

//             {/* CATEGORY SUB-MENU LAYER */}
//             {showSubMenu && (
//               <div className="absolute inset-0 p-4 space-y-1 bg-inherit z-10 overflow-y-auto">
//                 <button onClick={() => setShowSubMenu(false)} className="flex items-center gap-2 p-3 font-black text-blue-600 mb-4 border-b w-full uppercase text-xs sticky top-0 bg-inherit">
//                   <FiArrowLeft size={18} /> Back to Main Menu
//                 </button>
//                 {categories.map((cat) => (
//                   <button key={cat} onClick={() => { navigate(`/category/${cat}`); setOpen(false); }} className="w-full text-left p-4 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg uppercase text-xs tracking-widest border-b border-gray-50 dark:border-gray-800">
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </Dialog.Panel>
//       </Transition.Child>
//     </div>
//   </Dialog>
// </Transition.Root>


     

      
//     </div>
//   );
// }

// export default React.memo(Navbar);







// import React, { Fragment, useContext, useState } from "react";
// import { BsFillCloudSunFill } from "react-icons/bs";
// import { FiSun } from "react-icons/fi";
// import { RxCross2 } from "react-icons/rx";
// import { Dialog, Transition } from "@headlessui/react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { MyContext } from "../../context api/myContext";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../redux/cartSlice";
// import { clearOrders } from "../../redux/orderSlice";

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { mode, toggleMode } = useContext(MyContext);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const user = JSON.parse(localStorage.getItem("user"));

//   // ✅ Direct count selector (no full array variable)
//   const totalOrders = useSelector(
//     (state) => state.orders.orders.length
//   );

//   const totalQuantity = useSelector((state) =>
//     state.cart.reduce((acc, item) => acc + item.quantity, 0)
//   );

//   function handleLogout(e) {
//     e.preventDefault();
//     localStorage.removeItem("user");
//     dispatch(clearCart());
//     dispatch(clearOrders());
//     navigate(`/login?redirect=${location.pathname}`);
//   }

//   // return (
//   //   <div className="sticky top-0 z-50">
//   //     {/* Mobile Drawer */}
//   //     <Transition.Root show={open} as={Fragment}>
//   //       <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
//   //         <Transition.Child
//   //           as={Fragment}
//   //           enter="transition-opacity duration-300"
//   //           enterFrom="opacity-0"
//   //           enterTo="opacity-100"
//   //           leave="transition-opacity duration-300"
//   //           leaveFrom="opacity-100"
//   //           leaveTo="opacity-0"
//   //         >
//   //           <div className="fixed inset-0 bg-black/40" />
//   //         </Transition.Child>

//   //         <div className="fixed inset-0 flex z-50">
//   //           <Transition.Child
//   //             as={Fragment}
//   //             enter="transition duration-300 transform"
//   //             enterFrom="-translate-x-full"
//   //             enterTo="translate-x-0"
//   //             leave="transition duration-300 transform"
//   //             leaveFrom="translate-x-0"
//   //             leaveTo="-translate-x-full"
//   //           >
//   //             <Dialog.Panel
//   //               className={`relative w-4/5 sm:w-1/3 h-full overflow-y-auto shadow-xl ${
//   //                 mode === "dark"
//   //                   ? "bg-gray-900 text-white"
//   //                   : "bg-gray-50 text-black"
//   //               }`}
//   //             >
//   //               <div className="flex items-center justify-between px-4 py-4 border-b">
//   //                 <h2 className="text-lg font-semibold">Menu</h2>
//   //                 <button onClick={() => setOpen(false)}>
//   //                   <RxCross2 className="w-6 h-6" />
//   //                 </button>
//   //               </div>

//   //               <div className="px-4 py-6 space-y-4">
//   //                 <Link to="/allproducts">All Products</Link>
//   //                 <Link to="/about">About</Link>
//   //                 <Link to="/contact">Contact</Link>

//   //                 {user && (
//   //                   <Link to="/order" className="relative">
//   //                     Order
//   //                     {totalOrders > 0 && (
//   //                       <span className="ml-2 px-2 py-0.5 text-xs bg-green-600 text-white rounded-full">
//   //                         {totalOrders}
//   //                       </span>
//   //                     )}
//   //                   </Link>
//   //                 )}

//   //                 {user && user.role === "admin" && (
//   //                   <Link to="/dashboard">Admin</Link>
//   //                 )}

//   //                 {user ? (
//   //                   <button
//   //                     onClick={handleLogout}
//   //                     className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
//   //                   >
//   //                     Logout
//   //                   </button>
//   //                 ) : (
//   //                   <Link
//   //                     to="/login"
//   //                     className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded-md"
//   //                   >
//   //                     Sign In
//   //                   </Link>
//   //                 )}
//   //               </div>
//   //             </Dialog.Panel>
//   //           </Transition.Child>
//   //         </div>
//   //       </Dialog>
//   //     </Transition.Root>

//   //     {/* Desktop Navbar */}
//   //     <header>
//   //       <p className="flex h-10 items-center justify-center text-sm font-medium text-white bg-blue-600">
//   //         🚚 Free shipping on orders ₹300+!
//   //       </p>

//   //       <nav
//   //         className={`shadow-md ${
//   //           mode === "dark"
//   //             ? "bg-gray-900 text-white"
//   //             : "bg-gray-50 text-black"
//   //         }`}
//   //       >
//   //         <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
//   //           <Link to="/" className="text-2xl font-extrabold">
//   //             StoreFusion
//   //           </Link>

//   //           <div className="hidden lg:flex items-center space-x-6">
//   //             <Link to="/allproducts">All Products</Link>
//   //             <Link to="/about">About</Link>
//   //             <Link to="/contact">Contact</Link>

//   //             {user && (
//   //               <Link to="/order" className="relative">
//   //                 Order
//   //                 {totalOrders > 0 && (
//   //                   <span className="absolute -top-2 -right-4 w-5 h-5 flex items-center justify-center text-xs bg-green-600 text-white rounded-full">
//   //                     {totalOrders}
//   //                   </span>
//   //                 )}
//   //               </Link>
//   //             )}

//   //             {user && user.role === "admin" && (
//   //               <Link to="/dashboard">Admin</Link>
//   //             )}

//   //             {user ? (
//   //               <button onClick={handleLogout}>Logout</button>
//   //             ) : (
//   //               <Link to="/login">Sign In</Link>
//   //             )}

//   //             {user && (
//   //               <img
//   //                 src="https://i.pravatar.cc/300"
//   //                 alt="Profile"
//   //                 loading="lazy"
//   //                 className="w-8 h-8 rounded-full"
//   //               />
//   //             )}
//   //           </div>

//   //           <div className="flex items-center gap-4">
//   //             <button onClick={toggleMode}>
//   //               {mode === "light" ? (
//   //                 <FiSun size={22} />
//   //               ) : (
//   //                 <BsFillCloudSunFill size={22} />
//   //               )}
//   //             </button>

//   //             <Link to="/cart" className="relative">
//   //               <svg
//   //                 xmlns="http://www.w3.org/2000/svg"
//   //                 className="w-6 h-6"
//   //                 fill="none"
//   //                 viewBox="0 0 24 24"
//   //                 stroke="currentColor"
//   //               >
//   //                 <path
//   //                   strokeLinecap="round"
//   //                   strokeLinejoin="round"
//   //                   strokeWidth="2"
//   //                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13"
//   //                 />
//   //               </svg>

//   //               {totalQuantity > 0 && (
//   //                 <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs bg-red-600 text-white rounded-full">
//   //                   {totalQuantity}
//   //                 </span>
//   //               )}
//   //             </Link>
//   //           </div>
//   //         </div>
//   //       </nav>
//   //     </header>
//   //   </div>
//   // );

// return (
//   <div className="sticky top-0 z-50">
//     {/* Mobile Drawer */}
//     <Transition.Root show={open} as={Fragment}>
//       <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
//         <Transition.Child
//           as={Fragment}
//           enter="transition-opacity ease-linear duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="transition-opacity ease-linear duration-300"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black/40" />
//         </Transition.Child>

//         <div className="fixed inset-0 flex z-50">
//           <Transition.Child
//             as={Fragment}
//             enter="transition ease-in-out duration-300 transform"
//             enterFrom="-translate-x-full"
//             enterTo="translate-x-0"
//             leave="transition ease-in-out duration-300 transform"
//             leaveFrom="translate-x-0"
//             leaveTo="-translate-x-full"
//           >
//             <Dialog.Panel
//               className={`relative w-4/5 sm:w-1/3 h-full overflow-y-auto shadow-xl`}
//               style={{
//                 backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
//                 color: mode === "dark" ? "#fff" : "#212529",
//               }}
//             >
//               <div
//                 className="flex items-center justify-between px-4 py-4 sticky top-0 z-10 border-b"
//                 style={{
//                   backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
//                   borderColor: mode === "dark" ? "#333" : "#ddd",
//                 }}
//               >
//                 <h2 className="text-lg font-semibold">Menu</h2>
//                 <button
//                   onClick={() => setOpen(false)}
//                   className="p-2 rounded-md hover:bg-gray-100"
//                 >
//                   <RxCross2 className="w-6 h-6" />
//                 </button>
//               </div>

//               <div className="px-4 py-6 space-y-4">
//                 <Link
//                   to="/allproducts"
//                   className="block text-base hover:text-blue-600"
//                   style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                 >
//                   All Products
//                 </Link>
//                 <Link
//                   to="/about"
//                   className="block text-base hover:text-blue-600"
//                   style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                 >
//                   About
//                 </Link>
//                 <Link
//                   to="/contact"
//                   className="block text-base hover:text-blue-600"
//                   style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                 >
//                   Contact
//                 </Link>

//                 {user && (
//                   <Link
//                     to="/order"
//                     className="relative block text-base hover:text-blue-600"
//                     style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                   >
//                     Order
//                     {totalOrders > 0 && (
//                       <span className="ml-2 px-2 py-0.5 text-xs bg-green-600 text-white rounded-full">
//                         {totalOrders}
//                       </span>
//                     )}
//                   </Link>
//                 )}

//                 {user && user.role === "admin" && (
//                   <Link
//                     to="/dashboard"
//                     className="block text-base hover:text-blue-600"
//                     style={{ color: mode === "dark" ? "#fff" : "#212529" }}
//                   >
//                     Admin
//                   </Link>
//                 )}

//                 {user && (
//                   <div
//                     className="flex items-center gap-3 pt-5 border-t"
//                     style={{ borderColor: mode === "dark" ? "#333" : "#ddd" }}
//                   >
//                     <img
//                       src="https://i.pravatar.cc/300"
//                       alt="Profile"
//                       className="w-10 h-10 rounded-full"
//                     />
//                   </div>
//                 )}

//                 <div
//                   className="pt-5 border-t"
//                   style={{ borderColor: mode === "dark" ? "#333" : "#ddd" }}
//                 >
//                   {user ? (
//                     <button
//                       onClick={handleLogout}
//                       className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     >
//                       Logout
//                     </button>
//                   ) : (
//                     <Link
//                       to="/login"
//                       className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                     >
//                       Sign In
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </Dialog.Panel>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition.Root>

//     {/* Desktop Navbar */}
//     <header>
//       <p
//         className="flex h-10 items-center justify-center px-4 text-xs sm:text-sm md:text-base font-medium text-white"
//         style={{ backgroundColor: mode === "dark" ? "#333" : "#007bff" }}
//       >
//         🚚 Free shipping on orders ₹300+! Don’t miss out – shop today!
//       </p>

//       <nav
//         className="shadow-md transition-colors duration-300"
//         style={{
//           backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
//           color: mode === "dark" ? "#fff" : "#212529",
//         }}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
//           <button
//             onClick={() => setOpen(true)}
//             className="lg:hidden p-2 rounded-md hover:bg-gray-100"
//           >
//             <span className="sr-only">Open menu</span>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>

//           <Link to="/" className="flex items-center">
//             <h1
//               className="text-2xl md:text-3xl font-extrabold px-4 py-2 rounded-lg"
//               style={{
//                 color: mode === "dark" ? "#fff" : "#003366",
//                 background:
//                   mode === "dark" ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.8)",
//               }}
//             >
//               <span className="italic">S</span>toreFusion
//             </h1>
//           </Link>

//           <div className="hidden lg:flex lg:items-center lg:space-x-6">
//             <Link to="/allproducts" className="hover:text-blue-600">
//               All Products
//             </Link>
//             <Link to="/about" className="hover:text-blue-600">
//               About
//             </Link>
//             <Link to="/contact" className="hover:text-blue-600">
//               Contact
//             </Link>
//             {user && (
//               <Link to="/order" className="relative hover:text-blue-600">
//                 Order
//                 {totalOrders > 0 && (
//                   <span className="absolute -top-2 -right-4 w-5 h-5 flex items-center justify-center text-xs bg-green-600 text-white rounded-full">
//                     {totalOrders}
//                   </span>
//                 )}
//               </Link>
//             )}
//             {user && user.role === "admin" && (
//               <Link to="/dashboard" className="hover:text-blue-600">
//                 Admin
//               </Link>
//             )}
//             {user ? (
//               <button onClick={handleLogout} className="hover:text-red-500">
//                 Logout
//               </button>
//             ) : (
//               <Link to="/login" className="hover:text-blue-600">
//                 Sign In
//               </Link>
//             )}
//             {user && (
//               <div className="flex items-center gap-3">
//                 <img
//                   src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
//                   alt="India"
//                   className="w-6 h-4"
//                 />
//                 <img
//                   src="https://i.pravatar.cc/300"
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full"
//                 />
//               </div>
//             )}
//           </div>

//           <div className="flex items-center gap-4">
//             <button onClick={toggleMode}>
//               {mode === "light" ? <FiSun size={24} /> : <BsFillCloudSunFill size={24} />}
//             </button>
//             <Link to="/cart" className="relative hover:text-red-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="w-6 h-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13h10M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
//                 />
//               </svg>
//               {totalQuantity > 0 && (
//                 <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs bg-red-600 text-white rounded-full">
//                   {totalQuantity}
//                 </span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </header>
//   </div>
// );
// }

// export default React.memo(Navbar);



