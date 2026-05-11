import "./App.css";
import React, { Suspense, lazy, memo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation,
  Outlet
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

import Providers from "./context/Providers";
import Loader from "./components/loader/Loader";
import Layout from "./components/layout/Layout";

// 🔥 LAZY LOADING COMPONENTS
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
const AddTestimonial = lazy(() => import("./components/testimonial/AddTestimonial/AddTestimonial"));
const CategoryProducts = lazy(() => import("./components/navbar/CategoryProducts"));
const AllTestimonials = lazy(() => import("./components/testimonial/AllTestimonials/AllTestimonials"));

/**
 * 🔐 Protected Route for standard users.
 */
export const ProtectedRoutes = memo(({ children }) => {
  const location = useLocation();
  const { loggedInUser, isAuthInitialized } = useSelector((state) => state.users);

  if (!isAuthInitialized) return <Loader type="spinner" fullScreen />;
  if (loggedInUser?.uid && loggedInUser?.email) return children;

  return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
});

/**
 * 🔐 Protected Route for Admins only.
 */
export const ProtectedRoutesForAdmin = memo(({ children }) => {
  const location = useLocation();
  const { loggedInUser, isAuthInitialized } = useSelector((state) => state.users);

  if (!isAuthInitialized) return <Loader type="spinner" fullScreen />;
  if (loggedInUser?.uid && loggedInUser?.role === "admin") return children;

  return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
});

/**
 * Root Layout for structural wrapper.
 */
const RootLayout = memo(() => {
  return (
    <>
      <Suspense fallback={<Loader type="spinner" fullScreen />}>
        <Outlet />
      </Suspense>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />
    </>
  );
});

/**
 * Main Layout with persistent Header/Footer.
 */
const MainLayout = memo(() => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
});

/**
 * Router Configuration.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/about", element: <About /> },
          { path: "/contact", element: <Contact /> },
          { path: "/order", element: <ProtectedRoutes><Order /></ProtectedRoutes> },
          { path: "/order-details/:id?", element: <ProtectedRoutes><OrderDetails /></ProtectedRoutes> },
          { path: "/cart", element: <Cart /> },
          { path: "/allproducts", element: <Allproducts /> },
          { path: "/productInfo/:id", element: <ProductInfo /> },
          { path: "/category/:name", element: <CategoryProducts /> },
          { path: "/all-testimonials", element: <AllTestimonials /> },
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
          { path: "/*", element: <NoPage /> },
        ],
      },
      {
        // Auth & Admin Action Routes
        children: [
          { path: "/signup", element: <Signup /> },
          { path: "/login", element: <Login /> },
          {
            path: "/addProduct",
            element: <ProtectedRoutesForAdmin><AddProduct /></ProtectedRoutesForAdmin>,
          },
          {
            path: "/updateProduct",
            element: <ProtectedRoutesForAdmin><UpdateProduct /></ProtectedRoutesForAdmin>,
          },
          {
            path: "/addtestimonial",
            element: (
              <ProtectedRoutesForAdmin>
                <AddTestimonial />
              </ProtectedRoutesForAdmin>
            ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
