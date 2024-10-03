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
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page-admin/AddProduct";
import UpdateProduct from "./pages/admin/page-admin/UpdateProduct";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allproducts from "./pages/allproducts/Allproducts";

import MyState from "./context api/MySatate";
// import Coustom from "./context api/Coustom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/order" element={ <Order />}/>

      <Route path="/cart" element={<Cart />} />
      <Route path="/allProducts" element={<Allproducts/>} />
      {/* <Route path="/addproduct" element={<AddProduct/>} /> */}

      <Route path="/dashboard" element={<ProtectedRoutesForAdmin>
        <Dashboard />
        {/* Only Admin ke liye */}
      </ProtectedRoutesForAdmin>} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/mystate" element={<MyState/>} /> */}
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
      {/* <Coustom> */}

      <MyState>
        <RouterProvider router={router} />
        <ToastContainer />
      </MyState>
      {/* </Coustom> */}

     
      
       
    </>
  );

 

}

export default App;


  








  



