import "./App.css";
import React, { Suspense, lazy, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Providers from "./context api/Providers";
import Loader from "./components/loader/Loader";
import { useFetchAppData } from "./useFetchAppData";

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

// ✅ ROOT LAYOUT WRAPPER: Injects Providers into the Data Router context perfectly
function RootLayout({ cartLoading, orderLoading }) {
  return (
    <Providers>
      <Suspense fallback={<Loader type="spinner" fullScreen />}>
        <Outlet context={{ cartLoading, orderLoading }} />
      </Suspense>
      <ToastContainer />
    </Providers>
  );
}

function App() {
  const [cartLoading, setCartLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  useFetchAppData(setCartLoading, setOrderLoading);

  // ✅ DATA ROUTER DEFINITION
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout cartLoading={cartLoading} orderLoading={orderLoading} />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/order", element: <Order orderLoading={orderLoading} /> },
        { path: "/order-details/:id?", element: <OrderDetails orderLoading={orderLoading} /> },
        { path: "/cart", element: <Cart cartLoading={cartLoading} /> },
        { path: "/allproducts", element: <Allproducts /> },
        { path: "/signup", element: <Signup /> },
        { path: "/login", element: <Login /> },
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
