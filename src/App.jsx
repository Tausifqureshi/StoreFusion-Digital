import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./components/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context api/myState";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page-admin/AddProduct";
import UpdateProduct from "./pages/admin/page-admin/UpdateProduct";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={ <Order />}/>

      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<ProtectedRoutesForAdmin>
        <Dashboard />
        {/* Only Admin ke liye */}
      </ProtectedRoutesForAdmin>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productInfo/:id" element={<ProductInfo />} />
      <Route path="/addProduct/" element={<ProtectedRoutesForAdmin>
        <AddProduct />
       {/* Only Admin hi is me prodcuts use kar sakta hai users nhi admin matlab jis ne website create kiya */}
      </ProtectedRoutesForAdmin>} />
      <Route path="/updateProduct/" element={<ProtectedRoutesForAdmin >
        <UpdateProduct/>
      </ProtectedRoutesForAdmin>} />
      <Route path="/*" element={<NoPage />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <MyState>
        <RouterProvider router={router} />
        <ToastContainer />
      </MyState>
    </>
  );
}

export default App;




// Users ke liye.
export function ProtectedRoutes({ children }) {
  if (localStorage.getItem('user')) { // Use 'user' instead of 'users'
    return children;
  } else {
    return <Navigate to='/login' />;
  }

}
// Admin jab tak ye hi email id se se nhi aye ga tak admin show nhi hoga
//Password = Tausif1520.
export function ProtectedRoutesForAdmin({ children }) {
  const admin = JSON.parse(localStorage.getItem('user'));
  
  // Check if the admin is defined and has the correct email
  if (admin?.email === "tauifqureshi780@gmail.com") {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

