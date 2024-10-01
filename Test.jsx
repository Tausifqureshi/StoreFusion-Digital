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


  

// Users ke liye.
export function ProtectedRoutes({ children }) {
  if (localStorage.getItem('user')) { // Use 'user' instead of 'users'
    return children;
  } else {
    return <Navigate to='/login' />;
  }


}

//Admin ke liye hai ye function. 
export function ProtectedRoutesForAdmin({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  // Allow access only for admin users
  if (user && user.role === "admin") {
    return children; // Render the protected component for admin
  } else {
    return <Navigate to='/login' />; // Redirect to login if not admin
  }
}
















  // AddProducts Function. My STate File me ka.
  // const addProduct = async () => {
  //   if (products.title.trim() === '' || products.price.trim() === '' || products.imageUrl.trim() === '' || products.category.trim() === '' || products.description.trim() === '') {
  //     return toast.error('Please fill all fields', {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       icon: "🚨", // Modern touch: Adding an icon
  //     });

  //   }
  //   const productRef = collection(fireDB, "products");
   
  //   setLoading(true)
  //   try {
  //     await addDoc(productRef, products) //products ko fireabse me add krne ke liye addDoc kamuse karte hai.
  //     toast.success("Product added successfully!", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       icon: "✅", // Modern success icon
  //     });

  //     if (success) { // Replace with your success condition
  //       navigate('/dashboard'); // Navigate after adding product
  //     }
  //     getProductData()
  //     // closeModal()
  //     setLoading(false)
  //   } catch (error) {
  //     console.log("Error adding product:",error)
  //     toast.error("Error adding product. Please try again.", {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       icon: "⚠️", // Error icon
  //     });
  //     setLoading(false)
  //   }
   
  //  //  form empty ke liye oject ko aise hi empty karte hai 
  //   setProducts({
  //     title: '',
  //     price: '',
  //     imageUrl: '',
  //     category: '',
  //     description: '',
  //     time: Timestamp.now(),
  //     date: new Date().toLocaleString("en-US", {
  //       month: "short",
  //       day: "2-digit",
  //       year: "numeric",
  //     })
  //   });
  // }
