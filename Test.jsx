// import "./App.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Navigate,
//   Route,
//   RouterProvider,
  
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
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Allproducts from "./pages/allproducts/Allproducts";

// import MyState from "./context api/MySatate";
// // import Coustom from "./context api/Coustom";


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Home />} />
//       <Route path="/order" element={ <Order />}/>

//       <Route path="/cart" element={<Cart />} />
//       <Route path="/allProducts" element={<Allproducts/>} />
//       {/* <Route path="/addproduct" element={<AddProduct/>} /> */}

//       <Route path="/dashboard" element={<ProtectedRoutesForAdmin>
//         <Dashboard />
//         {/* Only Admin ke liye */}
//       </ProtectedRoutesForAdmin>} />

//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       {/* <Route path="/mystate" element={<MyState/>} /> */}
//       <Route path="/productInfo/:id" element={<ProductInfo />} />

//       <Route path="/addProduct/" element={<ProtectedRoutesForAdmin>
//         <AddProduct />
//        {/* Only Admin hi is me prodcuts use kar sakta hai users nhi admin matlab jis ne website create kiya */}
//       </ProtectedRoutesForAdmin>} />

//       <Route path="/updateProduct/" element={<ProtectedRoutesForAdmin >
//         <UpdateProduct/>
//       </ProtectedRoutesForAdmin>} />
//       <Route path="/*" element={<NoPage />} />
//     </Route>
//   )
// );
// function App() {
//   return (
//     <>
//       {/* <Coustom> */}

//       <MyState>
//         <RouterProvider router={router} />
//         <ToastContainer />
//       </MyState>
//       {/* </Coustom> */}

     
      
       
//     </>
//   );

 

// }

// export default App;


  








  







































































// import React, { useContext, useState } from "react";
// import Layout from "../layout/Layout";
// import Loader from "../loader/Loader";
// import { MyContext } from "../../context api/myContext";
// import { MdPerson } from "react-icons/md";
// import { FiMapPin } from "react-icons/fi";
// import { MdCheckCircle } from "react-icons/md";
// import { FaTrash } from "react-icons/fa"; // Icon for cancellation

// function Order() {
//   const userid = JSON.parse(localStorage.getItem("user"))?.uid; // Use optional chaining
//   const { mode, loading, order, cancelOrder } = useContext(MyContext);
//   const [orders, setOrders] = useState(order); // Local state to manage orders

//   // Function to handle order cancellation
//   const handleCancelOrder = (orderItem) => {
//     // Call the cancelOrder function to handle Firebase logic
//     cancelOrder(orderItem).then(() => {
//       // Update the local orders state to reflect the cancelled order
//       setOrders(prevOrders => prevOrders.filter(item => item.id !== orderItem.id));
//     });
//   };

//   return (
//     <Layout>
//       {loading && <Loader />}
//       {orders.length > 0 ? (
//         <div className="container mx-auto py-10">
//           <h1
//             className="text-4xl font-bold mb-6 text-center"
//             style={{ color: mode === "dark" ? "white" : "black" }}
//           >
//             Your Orders
//           </h1>
//           {orders
//             .filter((obj) => obj.userid === userid)
//             .map((orderItem, index) => (
//               <div
//                 className="bg-white rounded-lg shadow-lg mb-6 p-6 border-t-4 border-b-4 transition-transform transform"
//                 key={index}
//                 style={{
//                   backgroundColor: mode === "dark" ? "#282c34" : "white",
//                   borderColor: mode === "dark" ? "#444" : "#e0e0e0",
//                 }}
//               >
//                 <div className="flex items-center mb-4">
//                   <MdPerson className="text-4xl text-blue-500 mr-2" />
//                   <h2
//                     className="text-lg font-bold"
//                     style={{ color: mode === "dark" ? "white" : "black" }}
//                   >
//                     {JSON.parse(localStorage.getItem("user"))?.fullName}
//                   </h2>
//                 </div>
//                 {orderItem.addressInfo && (
//                   <div className="border-b border-gray-300 pb-4 mb-4">
//                     <h3
//                       className="text-xl font-semibold flex items-center"
//                       style={{ color: mode === "dark" ? "white" : "black" }}
//                     >
//                       <FiMapPin className="mr-2" />
//                       Shipping Address:
//                     </h3>
//                     {Object.entries(orderItem.addressInfo).map(
//                       ([key, value], index) => (
//                         <div
//                           key={index}
//                           className="text-sm"
//                           style={{ color: mode === "dark" ? "white" : "gray" }}
//                         >
//                           <strong>{key}: </strong>
//                           {value}
//                         </div>
//                       )
//                     )}
//                   </div>
//                 )}
//                 <h3
//                   className="text-xl font-semibold mb-2 flex items-center"
//                   style={{ color: mode === "dark" ? "white" : "black" }}
//                 >
//                   <MdCheckCircle className="mr-2" />
//                   Order Items:
//                 </h3>
//                 {orderItem.cartItems.map((item, index) => (
//                   <div
//                     className="flex items-start border-b border-gray-200 py-4"
//                     key={index}
//                   >
//                     <img
//                       src={item.imageUrl}
//                       alt="product-image"
//                       className="w-32 h-32 object-contain rounded-lg mr-4"
//                     />
//                     <div className="flex-1">
//                       <h4
//                         className="text-lg font-bold"
//                         style={{ color: mode === "dark" ? "white" : "black" }}
//                       >
//                         {item.title}
//                       </h4>
//                       <p
//                         className="text-sm mb-1"
//                         style={{ color: mode === "dark" ? "white" : "gray" }}
//                       >
//                         {item.description}
//                       </p>
//                       <p
//                         className="text-lg font-semibold"
//                         style={{ color: mode === "dark" ? "white" : "black" }}
//                       >
//                         ₹{item.price}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   onClick={() => handleCancelOrder(orderItem)}  // Call handleCancelOrder
//                   className="mt-4 text-red-500 flex items-center"
//                 >
//                   <FaTrash className="mr-1" /> Cancel Order
//                 </button>
//               </div>
//             ))}
//         </div>
//       ) : (
//         <h2 className="text-center text-2xl text-white">No Orders Found</h2>
//       )}
//     </Layout>
//   );
// }

// export default Order;





























import React, { useContext } from "react";
import Layout from "../layout/Layout";
import Loader from "../loader/Loader";
import { MyContext } from "../../context api/myContext";
import { MdPerson } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { MdCheckCircle } from "react-icons/md";
import { FaTrash } from "react-icons/fa"; // Icon for cancellation

function Order() {
  const userid = JSON.parse(localStorage.getItem("user"))?.uid; // Use optional chaining
  const { mode, loading, order, cancelOrder } = useContext(MyContext);
  console.log(order)
  console.log(userid)

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="container mx-auto py-10">
          <h1
            className="text-4xl font-bold mb-6 text-center"
            style={{ color: mode === "dark" ? "white" : "black" }}
          >
            Your Orders
          </h1>
          {order
            .filter((obj) => obj.userid === userid)
            .map((orderItem, index) => (
              <div
                className="bg-white rounded-lg shadow-lg mb-6 p-6 border-t-4 border-b-4 transition-transform transform"
                key={index}
                style={{
                  backgroundColor: mode === "dark" ? "#282c34" : "white",
                  borderColor: mode === "dark" ? "#444" : "#e0e0e0",
                }}
              >
                <div className="flex items-center mb-4">
                  <MdPerson className="text-4xl text-blue-500 mr-2" />
                  <h2
                    className="text-lg font-bold"
                    style={{ color: mode === "dark" ? "white" : "black" }}
                  >
                    {JSON.parse(localStorage.getItem("user"))?.fullName}
                  </h2>
                </div>
                {orderItem.addressInfo && (
                  <div className="border-b border-gray-300 pb-4 mb-4">
                    <h3
                      className="text-xl font-semibold flex items-center"
                      style={{ color: mode === "dark" ? "white" : "black" }}
                    >
                      <FiMapPin className="mr-2" />
                      Shipping Address:
                    </h3>
                    {Object.entries(orderItem.addressInfo).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="text-sm"
                          style={{ color: mode === "dark" ? "white" : "gray" }}
                        >
                          <strong>{key}: </strong>
                          {value}
                        </div>
                      )
                    )}
                  </div>
                )}
                <h3
                  className="text-xl font-semibold mb-2 flex items-center"
                  style={{ color: mode === "dark" ? "white" : "black" }}
                >
                  <MdCheckCircle className="mr-2" />
                  Order Items:
                </h3>
                {orderItem.cartItems.map((item, index) => (
                  <div
                    className="flex items-start border-b border-gray-200 py-4"
                    key={index}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product-image"
                      className="w-32 h-32 object-contain rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h4
                        className="text-lg font-bold"
                        style={{ color: mode === "dark" ? "white" : "black" }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-sm mb-1"
                        style={{ color: mode === "dark" ? "white" : "gray" }}
                      >
                        {item.description}
                      </p>
                      <p
                        className="text-lg font-semibold"
                        style={{ color: mode === "dark" ? "white" : "black" }}
                      >
                        ₹{item.price}
                      </p>
                    </div>
                  </div>
                ))}
                <button
                 onClick={() => cancelOrder(orderItem)}  // Call cancelOrder with order ID
                  className="mt-4 text-red-500 flex items-center"
                >
                  <FaTrash className="mr-1" /> Cancel Order
                </button>
              </div>
            ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl text-white">No Orders Found</h2>
      )}
    </Layout>
  );
}

export default Order;
