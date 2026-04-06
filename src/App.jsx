

import "./App.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThemeState } from "./context api/ThemeState";
import { FilterState } from "./context api/FilterState";
import OrderState from "./context api/OrderState";
import UserState from "./context api/UserState";
import TestimonialState from "./context api/TestimonialState";
import Providers from "./context api/Providers";
import { getUserOrdersFromFirestore } from "./components/order/orderFirestore";

import { useDispatch } from "react-redux";
import { setCart } from "./redux/cartSlice";
import { setOrders, clearOrders } from "./redux/orderSlice";
import Loader from "./components/loader/Loader";
import { loadCart } from "./pages/cart/cartService";

// 🔥 LAZY LOADING
const Home = lazy(() => import("./pages/home/Home"));
const Order = lazy(() => import("./components/order/Order"));
const OrderDetails = lazy(() => import("./components/order/order-details/OrderDetails"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Dashboard = lazy(() => import("./pages/admin/dashboard/DashboardView/Dashboard"));
const NoPage = lazy(() => import("./pages/nopage/NoPage"));
const Signup = lazy(() => import("./pages/registration/Signup"));
const Login = lazy(() => import("./pages/registration/Login"));
const ProductInfo = lazy(() => import("./pages/productInfo/ProductInfo"));
const AddProduct = lazy(() => import("./pages/admin/page-admin/AddProduct"));
const UpdateProduct = lazy(() => import("./pages/admin/page-admin/UpdateProduct"));
const Allproducts = lazy(() => import("./pages/allproducts/Allproducts"));
const Contact = lazy(() => import("./components/contact/Contact"));
const About = lazy(() => import("./components/about/About"));
const AddTestimonial = lazy(() => import("./components/testimonial/AddTestimonial"));
const CategoryProducts = lazy(() => import("./components/navbar/CategoryProducts"));
import { useFetchAppData } from "./useFetchAppData";

function App() {
  const dispatch = useDispatch();

  const [cartLoading, setCartLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  useFetchAppData(setCartLoading, setOrderLoading);

  // // 🔥 CART FIRST LOAD ONLY
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const cartData = await loadCart();
  //       dispatch(setCart(cartData));
  //     } catch (error) {
  //       console.error("Cart load error:", error);
  //     } finally {
  //       setCartLoading(false);
  //     }
  //   };
  //   fetchCart();
  // }, [dispatch]);

  // // 🔥 ORDER REALTIME LISTENER
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const userid = user?.uid;

  //   if (!userid) {
  //     dispatch(clearOrders());
  //     return;
  //   }

  //   setOrderLoading(true);

  //   const unsubscribe = getUserOrdersFromFirestore(userid, (orders) => {
  //     dispatch(setOrders(orders));
  //     setOrderLoading(false);
  //   });

  //   return () => unsubscribe && unsubscribe();
  // }, [dispatch]);

  return (
    <>
      {/* ✅ FULL SCREEN FIRST LOAD ONLY (Commented as requested) */}
      {/* {cartLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-[9999]">
          <Loader type="spinner" fullScreen size={60} />
        </div>
      )} */}
      {/* <h1> {version} </h1> */}

      <BrowserRouter>
        <Providers>
          <Suspense fallback={<Loader type="spinner" fullScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order" element={<Order orderLoading={orderLoading} />} />
              <Route path="/order-details/:id?" element={<OrderDetails orderLoading={orderLoading} />} />
              <Route path="/cart" element={<Cart cartLoading={cartLoading} />} />
              <Route path="/allproducts" element={<Allproducts />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productInfo/:id" element={<ProductInfo />} />

              <Route path="/category/:name" element={<CategoryProducts />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutesForAdmin>
                    <Suspense fallback={<Loader type="admin" />}>
                      <Dashboard />
                    </Suspense>
                  </ProtectedRoutesForAdmin>
                }
              />

              <Route
                path="/addProduct"
                element={
                  <ProtectedRoutesForAdmin>
                    <AddProduct />
                  </ProtectedRoutesForAdmin>
                }
              />

              <Route
                path="/updateProduct"
                element={
                  <ProtectedRoutesForAdmin>
                    <UpdateProduct />
                  </ProtectedRoutesForAdmin>
                }
              />
              <Route
                path="/addtestimonial"
                element={
                  <ProtectedRoutesForAdmin>
                    <AddTestimonial />
                  </ProtectedRoutesForAdmin>
                }
              />

              <Route path="/*" element={<NoPage />} />
            </Routes>
          </Suspense>

          <ToastContainer />
        </Providers>

      </BrowserRouter>
    </>
  );
}

export default App;

// 🔐 USER PROTECTED
export function ProtectedRoutes({ children }) {
  const location = useLocation();

  if (localStorage.getItem("user")) {
    return children;
  } else {
    return (
      <Navigate
        to="/login"
        state={{ PreviousPathname: location.pathname }}
        replace
      />
    );
  }
}

// 🔐 ADMIN PROTECTED
export function ProtectedRoutesForAdmin({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.role === "admin") {
    return children;
  } else {
    return (
      <Navigate
        to="/login"
        state={{ PreviousPathname: location.pathname }}
        replace
      />
    );
  }
}






