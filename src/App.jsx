
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./components/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page-admin/AddProduct";
import UpdateProduct from "./pages/admin/page-admin/UpdateProduct";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from "./pages/allproducts/Allproducts";
import MyState from "./context api/MySatate";
// import Razorpay from "./context api/Coustom";
// import Razorpay from "./pages/cart/Razorpay";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";

function App() {

  return (
     
    <BrowserRouter> 
      <MyState> 
      {/* <h1 className="text-4xl font-extrabold text-center mb-10 bg-green-600 text-red-900">Tausif</h1> */}
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/aout" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/dashboard" element={<ProtectedRoutesForAdmin><Dashboard /></ProtectedRoutesForAdmin>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/addProduct/" element={<ProtectedRoutesForAdmin><AddProduct /></ProtectedRoutesForAdmin>} />
          <Route path="/updateProduct/" element={<ProtectedRoutesForAdmin><UpdateProduct /></ProtectedRoutesForAdmin>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
       {/* <Razorpay /> */}
        <ToastContainer /> 
      </MyState> 
      {/* MyState se Wrap q ke MyState ek provider hai context api ka use hora hai appcompoents ki MyState se Wrap kar re hai iska matlab ab app componets me jitne componets use hoge us me dircte value pass kar skate hai context api ka use kar ke q ke app componets prants hai ab sub ka. */}
    </BrowserRouter>
  );
}

export default App;

// Users ke liye.
export function ProtectedRoutes({ children }) {
  const location = useLocation();
  if (localStorage.getItem('user')) {
    return children;
  } else {
    return <Navigate to='/login' state={{ PreviousPathname: location.pathname, }} replace/>;

  }
}

// Admin ke liye hai ye function.
export function ProtectedRoutesForAdmin({ children }) {
  const location = useLocation();
  console.log("App location", location);
  const user = JSON.parse(localStorage.getItem('user'));

  // Allow access only for admin users
  if (user && user.role === "admin") { 
    return children; // Render the protected component for admin
  } else {
    return <Navigate to='/login' state={{ PreviousPathname: location.pathname,}} replace/>; // Redirect to login if not admin
  }
}


