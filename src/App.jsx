import "./App.css";
import React, { Suspense, lazy, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Providers from "./context api/Providers";
import Loader from "./components/loader/Loader";
import Layout from "./components/layout/Layout";

// 🔥 LAZY LOADING
const Home = lazy(() => import("./pages/home/Home"));
const Order = lazy(() => import("./components/order/order-components/Order"));
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

// 🔐 USER PROTECTED
export function ProtectedRoutes({ children }) {
  const location = useLocation();
  if (localStorage.getItem("user")) return children;
  return <Navigate to="/login" state={{ PreviousPathname: location.pathname }} replace />;
}

// 🔐 ADMIN PROTECTED
export function ProtectedRoutesForAdmin({ children }) {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.role === "admin") return children;
  return <Navigate to="/login" state={{ PreviousPathname: location.pathname }} replace />;
}

// ✅ ROOT LAYOUT WRAPPER (Handles Data Fetching & Context APIs statically)
function RootLayout() {
  return (
    <Providers>
      <Suspense fallback={<Loader type="spinner" fullScreen />}>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </Providers>
  );
}

// ✅ MAIN UI LAYOUT (Persistent Navbar and Footer without re-mounting)
function MainLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

// ✅ STATIC DATA ROUTER OUTSIDE APP (Zero unnecessary recreations)
// const router = createBrowserRouter([

//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       {
//         element: <MainLayout />, // Routes WITH Navbar and Footer
//         children: [
//           { path: "/", element: <Home /> },
//           { path: "/about", element: <About /> },
//           { path: "/contact", element: <Contact /> },
//           { path: "/order", element: <Order /> },
//           { path: "/order-details/:id?", element: <OrderDetails /> },
//           { path: "/cart", element: <Cart /> },
//           { path: "/allproducts", element: <Allproducts /> },
//           { path: "/productInfo/:id", element: <ProductInfo /> },
//           { path: "/category/:name", element: <CategoryProducts /> },
//           {
//             path: "/dashboard",
//             element: (
//               <ProtectedRoutesForAdmin>
//                 <Suspense fallback={<Loader type="admin" />}>
//                   <Dashboard />
//                 </Suspense>
//               </ProtectedRoutesForAdmin>
//             ),
//           },
//           {
//             path: "/addProduct",
//             element: (
//               <ProtectedRoutesForAdmin>
//                 <AddProduct />
//               </ProtectedRoutesForAdmin>
//             ),
//           },
//           {
//             path: "/updateProduct",
//             element: (
//               <ProtectedRoutesForAdmin>
//                 <UpdateProduct />
//               </ProtectedRoutesForAdmin>
//             ),
//           },
//           {
//             path: "/addtestimonial",
//             element: (
//               <ProtectedRoutesForAdmin>
//                 <AddTestimonial />
//               </ProtectedRoutesForAdmin>
//             ),
//           },
//           { path: "/*", element: <NoPage /> },
//         ],
//       },
//       {
//         // Auth Routes WITHOUT Navbar and Footer
//         children: [
//           { path: "/signup", element: <Signup /> },
//           { path: "/login", element: <Login /> },
//         ],
//       },
//     ],
//   },
// ]);
// ✅ STATIC DATA ROUTER OUTSIDE APP (Fixed Syntax)
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          element: <MainLayout />, // Routes WITH Navbar and Footer
          children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/order", element: <Order /> },
            { path: "/order-details/:id?", element: <OrderDetails /> },
            { path: "/cart", element: <Cart /> },
            { path: "/allproducts", element: <Allproducts /> },
            { path: "/productInfo/:id", element: <ProductInfo /> },
            { path: "/category/:name", element: <CategoryProducts /> },
            {
              path: "/dashboard",
              element: (
                <ProtectedRoutesForAdmin>
                  <Suspense fallback={<Loader type="admin" />}>
                    <Dashboard />
                  </Suspense>
                </ProtectedRoutesForAdmin>
              ),
            },
            {
              path: "/addProduct",
              element: (
                <ProtectedRoutesForAdmin>
                  <AddProduct />
                </ProtectedRoutesForAdmin>
              ),
            },
            {
              path: "/updateProduct",
              element: (
                <ProtectedRoutesForAdmin>
                  <UpdateProduct />
                </ProtectedRoutesForAdmin>
              ),
            },
            {
              path: "/addtestimonial",
              element: (
                <ProtectedRoutesForAdmin>
                  <AddTestimonial />
                </ProtectedRoutesForAdmin>
              ),
            },
            { path: "/*", element: <NoPage /> },
          ],
        },
        {
          // Auth Routes WITHOUT Navbar and Footer
          children: [
            { path: "/signup", element: <Signup /> },
            { path: "/login", element: <Login /> },
          ],
        },
      ],
    },
  ],

);
function App() {
  return <RouterProvider router={router}

  />;
}

export default App;

