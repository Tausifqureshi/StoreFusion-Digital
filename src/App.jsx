// import "./App.css";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   // useLocation,
// } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Order from "./components/order/Order";
// import Cart from "./pages/cart/Cart";
// import Dashboard from "./pages/admin/dashboard/Dashboard";
// import NoPage from "./pages/nopage/NoPage";
// import Signup from "./pages/registration/Signup";
// import Login from "./pages/registration/Login";
// import ProductInfo from "./pages/productInfo/ProductInfo";
// import AddProduct from "./pages/admin/page-admin/AddProduct";
// import UpdateProduct from "./pages/admin/page-admin/UpdateProduct";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Allproducts from "./pages/allproducts/Allproducts";
// import MyState from "./context api/MySatate";
// // import Razorpay from "./context api/Coustom";
// // import Razorpay from "./pages/cart/Razorpay";
// import Contact from "./components/contact/Contact";
// import About from "./components/about/About";
// import { getCartFromFirestore,getGuestCartFromFirestore } from "./pages/cart/cartFirestore";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { setCart } from "./redux/cartSlice";
// import { getUserOrdersFromFirestore } from "./components/order/orderFirestore";
// import { setOrders, clearOrders } from "./redux/orderSlice";

// function App() {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   // const location = useLocation();

// useEffect(() => { // yaha logic hai ke jab app load ho to firebase se cart ko load kar le or redux me set kar de ui me dikhane ke liye.
// const loadCart = async() =>{
//   try {
// //     if (location.pathname === "/cart") {
// //   setLoading(true);
// // }

//     setLoading(true);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const cartData = user?.uid
//     ? await getCartFromFirestore(user.uid) //// User logged in hai to user ka cart load karenge
//     : await getGuestCartFromFirestore();
//     dispatch(setCart(cartData)); // Guest user hai to guest cart load karenge
//   } catch (error) {
//     console.error("Failed to load cart:", error);
//     setLoading(false);
//   } finally {
//     setLoading(false);
//   }
// };
// loadCart();

// }, [dispatch]);

// // order ke liye bhi useEffect hai. goblaly order ko manage karne ke liye.
// useEffect(() => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userid = user?.uid;

//   if (!userid) {
//     dispatch(clearOrders());
//     return;
//   }

//   const unsubscribe = getUserOrdersFromFirestore(userid, (orders) => {
//     dispatch(setOrders(orders));
//   });

//   return () => unsubscribe();
// }, [dispatch]);

//   return (
//     <>
//     {loading && <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
//       <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
//     </div>
//     }
//     <BrowserRouter
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true, //
//       }}
//     >
//       <MyState>
//         {/* <h1 className="text-4xl font-extrabold text-center mb-10 bg-green-600 text-red-900">Tausif</h1> */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/order" element={<Order />} />
//           {/* <Route path="/cart" element={<Cart />} /> */}
//           <Route
//             path="/cart"
//             element={
//               // <ProtectedRoutes>
//                 <Cart />
//               // </ProtectedRoutes>
//             }
//           />
//           <Route path="/allproducts" element={<Allproducts />} />
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoutesForAdmin>
//                 <Dashboard />
//               </ProtectedRoutesForAdmin>
//             }
//           />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/productInfo/:id" element={<ProductInfo />} />
//           <Route
//             path="/addProduct/"
//             element={
//               <ProtectedRoutesForAdmin>
//                 <AddProduct />
//               </ProtectedRoutesForAdmin>
//             }
//           />
//           <Route
//             path="/updateProduct/"
//             element={
//               <ProtectedRoutesForAdmin>
//                 <UpdateProduct />
//               </ProtectedRoutesForAdmin>
//             }
//           />
//           <Route path="/*" element={<NoPage />} />
//         </Routes>
//         {/* <Razorpay /> */}
//         <ToastContainer />
//       </MyState>
//       {/* MyState se Wrap q ke MyState ek provider hai context api ka use hora hai appcompoents ki MyState se Wrap kar re hai iska matlab ab app componets me jitne componets use hoge us me dircte value pass kar skate hai context api ka use kar ke q ke app componets prants hai ab sub ka. */}
//     </BrowserRouter>
//     </>

//   );
// }

// export default App;

// // Users ke liye.
// export function ProtectedRoutes({ children }) {
//   const location = useLocation();
//   if (localStorage.getItem("user")) {
//     return children;
//   } else {
//     return (
//       <Navigate
//         to="/login"
//         state={{ PreviousPathname: location.pathname }}
//         replace
//       />
//     );
//   }
// }

// // Admin ke liye hai ye function.
// export function ProtectedRoutesForAdmin({ children }) {
//   const location = useLocation();
//   console.log("App location", location);
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Allow access only for admin users
//   if (user && user.role === "admin") {
//     return children; // Render the protected component for admin
//   } else {
//     return (
//       <Navigate
//         to="/login"
//         state={{ PreviousPathname: location.pathname }}
//         replace
//       />
//     ); // Redirect to login if not admin
//   }
// }

import "./App.css";
import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyState from "./context api/MySatate";
// import {
//   getCartFromFirestore,
//   getGuestCartFromFirestore,
// } from "./pages/cart/cartFirestore";
import { getUserOrdersFromFirestore } from "./components/order/orderFirestore";

import { useDispatch } from "react-redux";
import { setCart } from "./redux/cartSlice";
import { setOrders, clearOrders } from "./redux/orderSlice";
import Loader from "./components/loader/Loader";
import { loadCart } from "./pages/cart/cartService";


// 🔥 LAZY LOADING (Performance Boost)
const Home = lazy(() => import("./pages/home/Home"));
const Order = lazy(() => import("./components/order/Order"));
const Cart = lazy(() => import("./pages/cart/Cart"));
const Dashboard = lazy(() => import("./pages/admin/dashboard/Dashboard"));
const NoPage = lazy(() => import("./pages/nopage/NoPage"));
const Signup = lazy(() => import("./pages/registration/Signup"));
const Login = lazy(() => import("./pages/registration/Login"));
const ProductInfo = lazy(() => import("./pages/productInfo/ProductInfo"));
const AddProduct = lazy(() => import("./pages/admin/page-admin/AddProduct"));
const UpdateProduct = lazy(
  () => import("./pages/admin/page-admin/UpdateProduct"),
);
const Allproducts = lazy(() => import("./pages/allproducts/Allproducts"));
const Contact = lazy(() => import("./components/contact/Contact"));
const About = lazy(() => import("./components/about/About"));

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);


  // 🔥 Load Cart Once
  // useEffect(() => {
  //   const loadCart = async () => {
  //     try {
  //       setLoading(true);
  //       const user = JSON.parse(localStorage.getItem("user"));

  //       const cartData = user?.uid
  //         ? await getCartFromFirestore(user.uid)
  //         : await getGuestCartFromFirestore();

  //       dispatch(setCart(cartData));
  //     } catch (error) {
  //       console.error("Failed to load cart:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadCart();
  // }, [dispatch]);

  useEffect(() => {
  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await loadCart();
      dispatch(setCart(cartData));
    } catch (error) {
      console.error("Cart load error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, [dispatch]);




  // 🔥 Load Orders
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const userid = user?.uid;

  //   if (!userid) {
  //     dispatch(clearOrders());
  //     return;
  //   }

  //   const unsubscribe = getUserOrdersFromFirestore(userid, (orders) => {
  //     dispatch(setOrders(orders));
  //   });

  //   return () => unsubscribe && unsubscribe();
  // }, [dispatch]);
  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user?.uid;

  if (!userid) {
    dispatch(clearOrders());
    return;
  }

  setOrderLoading(true); // 🔥 loader ON

  const unsubscribe = getUserOrdersFromFirestore(userid, (orders) => {
    dispatch(setOrders(orders));
    setOrderLoading(false); // 🔥 loader OFF
  });

  return () => unsubscribe && unsubscribe();
}, [dispatch]);


  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
          <Loader fullScreen={true} size={60} />
        </div>
      )   }

      <BrowserRouter>
        <MyState>
          {/* 🔥 Suspense Added */}
          <Suspense
            fallback={<Loader />}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order" element={<Order  orderLoading={orderLoading}/>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/allproducts" element={<Allproducts />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/productInfo/:id" element={<ProductInfo />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoutesForAdmin>
                    <Dashboard />
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

              <Route path="/*" element={<NoPage />} />
            </Routes>
          </Suspense>

          <ToastContainer />
        </MyState>
      </BrowserRouter>
    </>
  );
}

export default App;

// 🔐 User Protected Route
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

// 🔐 Admin Protected Route
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
