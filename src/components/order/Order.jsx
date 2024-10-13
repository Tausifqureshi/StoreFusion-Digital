// import React, { useContext } from "react";
// import Layout from "../layout/Layout";
// import Loader from "../loader/Loader";
// import { MyContext } from "../../context api/myContext";

// function Order() {
//   const userid = JSON.parse(localStorage.getItem('user')).uid;
//   // console.log(userid);
//   const { mode, loading, order } = useContext(MyContext);
//    console.log(order)
//   return (
//     <Layout>
//       {loading && <Loader />}
//       {order.length > 0 ? (
//         <div className="h-full pt-10">
//           {order.filter(obj => obj.userid === userid).map((orderItem,index) => (
           
//             <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={index}>
//             {/* Cart item firebase se lere hai us me store hai. */}
//             {orderItem.addressInfo ?Object.entries(orderItem.addressInfo).map(([key, value], index) => (
//             <div key={index}>
//             <strong>{key}: </strong>{value}
//             </div>
//             )) : ''    
//             }
//               {orderItem.cartItems.map((item, index) => (
//                 <div className="rounded-lg md:w-2/3" key={index}>
//                   <div
//                     className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
//                     style={{
//                       backgroundColor: mode === 'dark' ? '#282c34' : 'white',
//                       color: mode === 'dark' ? 'white' : 'black',
//                     }}
//                   >
//                     {/* <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" /> */}
//                     <img
//                     src={item.imageUrl}
//                     alt="product-image"
//                     className="w-full h-32 object-contain rounded-lg sm:w-40 sm:h-32" // Set smaller height and object-contain
//                   />
//                     <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
//                       <div className="mt-5 sm:mt-0">
//                         <h2 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                           {item.title}
//                         </h2>
//                         <p className="mt-1 text-xs" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                           {item.description}
//                         </p>
//                         <p className="mt-1 text-xs" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                           {item.price}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h2 className='text-center text-2xl text-white'>No Orders Found</h2>
//       )}
//     </Layout>

    
//   );
// }   

// export default Order;

















































































// import React, { useContext } from "react";
// import Layout from "../layout/Layout";
// import Loader from "../loader/Loader";
// import { MyContext } from "../../context api/myContext";
// import { FaRegUserCircle } from "react-icons/fa";

// function Order() {
//   const userid = JSON.parse(localStorage.getItem('user')).uid;
//   const { mode, loading, order } = useContext(MyContext);
  
//   return (
//     <Layout>
//       {loading && <Loader />}
//       {order.length > 0 ? (
//         <div className="container mx-auto py-10">
//           <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//             Your Orders
//           </h1>
//           {order.filter(obj => obj.userid === userid).map((orderItem, index) => (
//             <div 
//               className="bg-white rounded-lg shadow-lg mb-6 p-6 border-t-4 border-b-4" 
//               key={index} 
//               style={{ backgroundColor: mode === 'dark' ? '#282c34' : 'white', borderColor: mode === 'dark' ? '#444' : '#e0e0e0' }}
//             >
//               <div className="flex items-center mb-4">
//                 <FaRegUserCircle className="text-3xl text-gray-600 mr-2" />
//                 <h2 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                   {JSON.parse(localStorage.getItem('user')).displayName}
//                 </h2>
//               </div>
//               {orderItem.addressInfo && (
//                 <div className="border-b border-gray-300 pb-4 mb-4">
//                   <h3 className="text-xl font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}> {/* White text in dark mode */}
//                     Shipping Address:
//                   </h3>
//                   {Object.entries(orderItem.addressInfo).map(([key, value], index) => (
//                     <div key={index} className="text-sm" style={{ color: mode === 'dark' ? 'white' : 'gray' }}> {/* White text in dark mode */}
//                       <strong>{key}: </strong>{value}
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <h3 className="text-xl font-semibold mb-2" style={{ color: mode === 'dark' ? 'white' : 'black' }}> {/* White text in dark mode */}
//                 Order Items:
//               </h3>
//               {orderItem.cartItems.map((item, index) => (
//                 <div className="flex items-start border-b border-gray-200 py-4" key={index}>
//                   <img
//                     src={item.imageUrl}
//                     alt="product-image"
//                     className="w-32 h-32 object-contain rounded-lg mr-4"
//                   />
//                   <div className="flex-1">
//                     <h4 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                       {item.title}
//                     </h4>
//                     <p className="text-sm mb-1" style={{ color: mode === 'dark' ? 'white' : 'gray' }}> {/* White text in dark mode */}
//                       {item.description}
//                     </p>
//                     <p className="text-lg font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                       ₹{item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h2 className='text-center text-2xl text-white'>No Orders Found</h2>
//       )}
//     </Layout>
//   );
// }

// export default Order;

























// import React, { useContext } from "react";
// import Layout from "../layout/Layout";
// import Loader from "../loader/Loader";
// import { MyContext } from "../../context api/myContext";
// import { MdPerson } from "react-icons/md"; // Modern icon for user
// import { FiMapPin } from "react-icons/fi"; // Modern icon for address
// import { MdCheckCircle } from "react-icons/md"; // Modern icon for order items

// function Order() {
//   const userid = JSON.parse(localStorage.getItem('user')).uid;
//   const { mode, loading, order, cancelOrder } = useContext(MyContext);
  
//   return (
//     <Layout>
//       {loading && <Loader />}
//       {order.length > 0 ? (
//         <div className="container mx-auto py-10">
//           <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//             Your Orders
//           </h1>
//           {order.filter(obj => obj.userid === userid).map((orderItem, index) => (
//             <div 
//               className="bg-white rounded-lg shadow-lg mb-6 p-6 border-t-4 border-b-4 transition-transform transform" 
//               key={index} 
//               style={{ backgroundColor: mode === 'dark' ? '#282c34' : 'white', borderColor: mode === 'dark' ? '#444' : '#e0e0e0' }}
//             >
//               <div className="flex items-center mb-4">
//                 <MdPerson className="text-4xl text-blue-500 mr-2" /> {/* Use modern user icon */}
//                 <h2 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                   {JSON.parse(localStorage.getItem('user')).fullName}
//                 </h2>
//               </div>
//               {orderItem.addressInfo && (
//                 <div className="border-b border-gray-300 pb-4 mb-4">
//                   <h3 className="text-xl font-semibold flex items-center" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                     <FiMapPin className="mr-2" />
//                     Shipping Address:
//                   </h3>
//                   {Object.entries(orderItem.addressInfo).map(([key, value], index) => (
//                     <div key={index} className="text-sm" style={{ color: mode === 'dark' ? 'white' : 'gray' }}>
//                       <strong>{key}: </strong>{value}
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <h3 className="text-xl font-semibold mb-2 flex items-center" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                 <MdCheckCircle className="mr-2" />
//                 Order Items:
//               </h3>
//               {orderItem.cartItems.map((item, index) => (
//                 <div className="flex items-start border-b border-gray-200 py-4" key={index}>
//                   <img
//                     src={item.imageUrl}
//                     alt="product-image"
//                     className="w-32 h-32 object-contain rounded-lg mr-4"
//                   />
//                   <div className="flex-1">
//                     <h4 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                       {item.title}
//                     </h4>
//                     <p className="text-sm mb-1" style={{ color: mode === 'dark' ? 'white' : 'gray' }}>
//                       {item.description}
//                     </p>
//                     <p className="text-lg font-semibold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
//                       ₹{item.price}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <h2 className='text-center text-2xl text-white'>No Orders Found</h2>
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
