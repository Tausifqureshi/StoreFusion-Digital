import React, { Fragment, useContext, useState } from "react";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MyContext } from "../../context api/myContext";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode, cartItem, updateCartItems } = useContext(MyContext); // Add cartItems and updateCartItems
  const errorValue = useContext(MyContext); // Add cartItems and updateCartItems
  // console.log(errorValue);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("Navbar Location", location);
  console.log("Login location.state:", location);
  const dispatch = useDispatch();

  function handleLogout(e) {
    // e.preventDefualt();
    e.preventDefault();
    localStorage.removeItem("user"); // Remove specific user item
    // ✅ Redux cart clear
    dispatch(clearCart());

    // navigate(`/login`);
    navigate(`/login?redirect=${location.pathname}`); // useSearchParams, tu aisa

    // navigate("/login", {state: { PreviousPathname: location.pathname },}); //useLocation use to aisa
  }

  const cartItems = useSelector((state) => state.cart);
  const totalQuantity = cartItems.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity; // quanty bade gi utne hi itme show hoge. agr only products dhekna hai tu cart.length kar sakta hai but amzone me quantity jaisa hi use hai.
  }, 0);

  return (
    <div className="sticky top-0 z-50">
      {/* Mobile Drawer */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 flex z-50">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative w-4/5 sm:w-1/3 h-full overflow-y-auto shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
                  color: mode === "dark" ? "#fff" : "#212529",
                }}
              >
                <div
                  className="flex items-center justify-between px-4 py-4 sticky top-0 z-10 border-b"
                  style={{
                    backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
                    borderColor: mode === "dark" ? "#333" : "#ddd",
                  }}
                >
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <RxCross2 className="w-6 h-6" />
                  </button>
                </div>

                <div className="px-4 py-6 space-y-4">
                  <Link
                    to="/allproducts"
                    className="block text-base hover:text-blue-600"
                    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                  >
                    All Products
                  </Link>
                  <Link
                    to="/about"
                    className="block text-base hover:text-blue-600"
                    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-base hover:text-blue-600"
                    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                  >
                    Contact
                  </Link>
                  {user && (
                    <Link
                      to="/order"
                      className="block text-base hover:text-blue-600"
                      style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                    >
                      Order
                    </Link>
                  )}
                  {user && user.role === "admin" && (
                    <Link
                      to="/dashboard"
                      className="block text-base hover:text-blue-600"
                      style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                    >
                      Admin
                    </Link>
                  )}

                  {user && (
                    <div
                      className="flex items-center gap-3 pt-5 border-t"
                      style={{ borderColor: mode === "dark" ? "#333" : "#ddd" }}
                    >
                      <img
                        src="https://i.pravatar.cc/300"
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                      {/* <span className="text-sm font-medium">{user.fullName || "User"}</span> */}
                    </div>
                  )}

                  <div
                    className="pt-5 border-t"
                    style={{ borderColor: mode === "dark" ? "#333" : "#ddd" }}
                  >
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="block w-full px-4 py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Navbar */}
      <header>
        <p
          className="flex h-10 items-center justify-center px-4 text-xs sm:text-sm md:text-base font-medium text-white"
          style={{ backgroundColor: mode === "dark" ? "#333" : "#007bff" }}
        >
          🚚 Free shipping on orders ₹300+! Don’t miss out – shop today!
        </p>

        <nav
          className="shadow-md transition-colors duration-300"
          style={{
            backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
            color: mode === "dark" ? "#fff" : "#212529",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <Link to="/" className="flex items-center">
              <h1
                className="text-2xl md:text-3xl font-extrabold px-4 py-2 rounded-lg"
                style={{
                  color: mode === "dark" ? "#fff" : "#003366",
                  background:
                    mode === "dark"
                      ? "rgba(0,0,0,0.2)"
                      : "rgba(255,255,255,0.8)",
                }}
              >
                <span className="italic">S</span>toreFusion
              </h1>
            </Link>

            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <Link to="/allproducts" className="hover:text-blue-600">
                All Products
              </Link>
              <Link to="/about" className="hover:text-blue-600">
                About
              </Link>
              <Link to="/contact" className="hover:text-blue-600">
                Contact
              </Link>
              {user && (
                <Link to="/order" className="hover:text-blue-600">
                  Order
                </Link>
              )}
              {user && user.role === "admin" && (
                <Link to="/dashboard" className="hover:text-blue-600">
                  Admin
                </Link>
              )}
              {user ? (
                <button onClick={handleLogout} className="hover:text-red-500">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="hover:text-blue-600">
                  Sign In
                </Link>
              )}
              {user && (
                <div className="flex items-center gap-3">
                  <img
                    src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                    alt="India"
                    className="w-6 h-4"
                  />
                  <img
                    src="https://i.pravatar.cc/300"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={toggleMode}>
                {mode === "light" ? (
                  <FiSun size={24} />
                ) : (
                  <BsFillCloudSunFill size={24} />
                )}
              </button>
              <Link to="/cart" className="relative hover:text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13M7 13h10M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"
                  />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs bg-red-600 text-white rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
