












import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <MyState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/allProducts" element={<Allproducts />} />
          <Route path="/dashboard" element={<ProtectedRoutesForAdmin><Dashboard /></ProtectedRoutesForAdmin>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/addProduct/" element={<ProtectedRoutesForAdmin><AddProduct /></ProtectedRoutesForAdmin>} />
          <Route path="/updateProduct/" element={<ProtectedRoutesForAdmin><UpdateProduct /></ProtectedRoutesForAdmin>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </MyState>
    </BrowserRouter>
  );
}

export default App;

// Users ke liye.
export function ProtectedRoutes({ children }) {
  if (localStorage.getItem('user')) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

// Admin ke liye hai ye function.
export function ProtectedRoutesForAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  // Allow access only for admin users
  if (user && user.role === "admin") {
    return children; // Render the protected component for admin
  } else {
    return <Navigate to='/login' />; // Redirect to login if not admin
  }
}
