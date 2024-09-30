import React, { Fragment, useContext, useState } from "react";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../context api/myContext";


function Navbar() {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode, cartItems, updateCartItems } = useContext(MyContext); // Add cartItems and updateCartItems
  const errorValue = useContext (MyContext); // Add cartItems and updateCartItems
console.log(errorValue);
  

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("user"); // Remove specific user item
    navigate("/login"); // Redirect to login page after logout
  }

  return (
    <div className="bg-white sticky top-0 z-50  ">

      {/* Mobaile Ke Liye Desgin */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
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
                className="relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl"
                style={{
                  backgroundColor:
                    mode === "dark" ? "rgb(40, 44, 52)" : "white",
                  color: mode === "dark" ? "white" : "black",
                }}
              >
                <div className="flex items-center justify-between px-4 pb-2 pt-28">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only"> Close menu </span>
                    <RxCross2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {/* Allproducts-Page */}
                  <Link
                    to="/allproducts"
                    className="block text-sm font-medium"
                    style={{ color: mode === "dark" ? "white" : "black" }}
                  >
                    All Products
                  </Link>

                  {/* Order-page */}
                  {user?  <div className="flow-root">
                    <Link
                      to="/order"
                      className="block p-2 font-medium"
                      style={{ color: mode === "dark" ? "white" : "black" }}
                    >
                      Order
                    </Link>
                  </div>: ""}
                 

                  {/* Admin-Page */}
                   {user && user.role === "admin"?   <div className="flow-root">
                      <Link
                        to="/dashboard"
                        className="block p-2 font-medium"
                        style={{ color: mode === "dark" ? "white" : "black" }}
                      >
                        Admin
                      </Link>
                    </div>
                  : ""}

                  
                  
                 

                  {/* Logout And Signin */}
                  <div className="flex justify-start space-x-4">
                    {user ? (
                      <button
                        className="px-4 py-2 font-medium text-sm bg-blue-500 text-white rounded-md cursor-pointer transition-all duration-300 transform hover:bg-blue-600 hover:scale-105"
                        onClick={handleLogout}
                        style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                      >
                        Logout
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="px-4 py-2 font-medium text-sm bg-blue-500 text-white rounded-md transition-all duration-300 transform hover:bg-blue-600 hover:scale-105"
                        style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                      >
                        Sign-in
                      </Link>
                    )}
                  </div>

                  
                  <div className="flow-root">
                    <Link to="/">
                      <img
                        className="w-10 h-10 rounded-full"
                        src="https://i.pravatar.cc/300"
                        alt="Profile Picture"
                      />
                    </Link>
                  </div>


                </div>

               {/* {user ? : ""} */}
                <div className="border-t border-gray-200 px-4 py-6">
                  <div className="flex items-center">
                    <Link to="/">
                      <img
                        src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                        alt="India Flag"
                        className="block h-auto w-5"
                      />
                    </Link>
                    <span
                      className="ml-3 block text-base font-medium"
                      style={{ color: mode === "dark" ? "white" : "black" }}
                    >
                      INDIA
                    </span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>


      {/* desktop  this create Desgin*/}
      <header className="relative bg-white">
        <p
          className="flex h-12 items-center justify-center px-4 text-xs sm:text-sm md:text-base lg:text-lg font-medium text-white sm:px-6 lg:px-8"
          style={{
            backgroundColor: mode === "dark" ? "#333" : "#007bff",
            transition: "background-color 0.3s ease",
          }}
        >
          🚚 Free shipping on orders ₹300+! Don’t miss out – shop today!
        </p>

        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-md transition-colors duration-300"
          style={{
            backgroundColor: mode === "dark" ? "#1c1c1c" : "#f8f9fa",
            color: mode === "dark" ? "#fff" : "#212529",
          }}
        >
          <div className="flex h-16 items-center justify-between">
            {/* mobile menu ko toggle */}
            <button
              type="button"
              className="rounded-md p-2 text-gray-400 lg:hidden hover:text-gray-800 transition-colors duration-300"
              onClick={() => setOpen(true)}
              style={{
                backgroundColor: mode === "dark" ? "#333" : "#fff",
                color: mode === "dark" ? "#fff" : "#000",
              }}
            >
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />{" "}
              </svg>{" "}
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to="/" className="flex items-center">
                <h1
                  className="text-3xl font-extrabold px-4 py-3 rounded-lg transition-all duration-300 hover:text-gray-700 hover:scale-105 hover:shadow-lg"
                  style={{
                    color: mode === "dark" ? "#fff" : "#003366", // Dark Blue
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                    background:
                      mode === "dark"
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <span className="italic">S</span>toreFusion
                </h1>
              </Link>
            </div>

            <div className="ml-auto flex items-center space-x-6">
              {/* Pages */}
              <div className="hidden lg:flex lg:space-x-6">
                <Link
                  to="/allproducts"
                  className="text-sm font-medium transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 px-2 py-1 rounded"
                  style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                >
                  All Products
                </Link>
                 
                 {/* Products */}
                {user ?  <Link
                  to="/order"
                  className="text-sm font-medium transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 px-2 py-1 rounded"
                  style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                >
                  Order
                </Link> : ""}

                {/*Admin  */}
                {/* {user ? (
                  <Link
                    to="/dashboard"
                    className="text-sm font-medium transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 px-2 py-1 rounded"
                    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                  >
                    Admin
                  </Link>
                ) : (
                  ""
                )} */}




                {user && user.role === "admin" ? ( 
  <Link
    to="/dashboard"
    className="text-sm font-medium transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 px-2 py-1 rounded"
    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
  >
    Admin
  </Link>
) : null}


                {/* SignUp-and Logout */}
                {user ? (
                  // Show Logout button if the user is logged in
                  <a
                    onClick={handleLogout}
                    className="text-sm font-medium cursor-pointer transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 px-2 py-1 rounded"
                    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                  >
                    Logout
                  </a>
                ) : (
                  // Show Sign-in link if no user is logged in
                  <Link
                    to="/login"
                    className="text-sm font-medium transition-all duration-300 transform hover:bg-indigo-600 hover:text-white hover:scale-105 px-2 py-1 rounded"
                    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                  >
                    Sign-in
                  </Link>
                )}
              </div>

                 {/* Flags */}
                 {user? <div className="hidden lg:flex items-center space-x-4">
                <a
                  href="#"
                  className="flex items-center text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                    alt="Indian Flag"
                    className="block h-auto w-6"
                  />
                  <span
                    className="ml-3 text-sm font-medium"
                    style={{ color: mode === "dark" ? "#fff" : "#212529" }}
                  >
                    INDIA
                  </span>
                </a>

                <a
                  href="#"
                  className="flex items-center transition-all duration-300 transform hover:scale-105"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://i.pravatar.cc/300"
                    alt="Profile Picture"
                  />
                </a>
              </div>: ""}
              

              {/* Search */}
              <button
                className="transition-all duration-300 transform hover:scale-110 hover:text-indigo-600"
                onClick={toggleMode}
              >
                {mode === "light" ? (
                  <FiSun size={30} />
                ) : (
                  <BsFillCloudSunFill size={30} />
                )}
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="flex items-center p-2 transition-all duration-300 hover:text-red-600 hover:scale-110 relative"
                style={{ color: mode === "dark" ? "#fff" : "#212529" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>

                {/* Cart Item Count */}
                {cartItems.length > 0 && (
                  <span className="ml-2 text-sm font-medium flex items-center justify-center w-6 h-6 bg-red-600 text-white rounded-full absolute -top-1 -right-2">
                    {cartItems.length}
                  </span>
                )}
                <span className="sr-only">items in cart, view bag</span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      
    </div>
  );
}

export default Navbar;
