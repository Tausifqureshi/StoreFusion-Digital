
// import React, { useContext, useState } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import { MyContext } from '../../../context api/myContext';
// import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
// import { FaUser, FaCartPlus } from 'react-icons/fa';
// import { AiFillShopping, AiFillPlusCircle, AiFillDelete ,AiFillEdit} from 'react-icons/ai';
// import { useSpring, animated } from 'react-spring';
// import { Link, useNavigate } from 'react-router-dom'; 
 
// function DashboardTab() {
//   const { mode, product, edithandle, deleteProduct, order, user  } = useContext(MyContext);
 
  
//   const [index, setIndex] = useState(0); // Track the current tab index
//   const navigate = useNavigate(); // useNavigate hook

//   const add = () => {
//     navigate('/addproduct'); // Navigate to '/addproduct'
//   }; 

//   // Animation for tab panel
//   const animationProps = useSpring({
//     opacity: 1,
//     transform: `translateY(0)`,
//     from: { opacity: 0, transform: `translateY(20px)` },
//     reset: true,
//   });

//   return (
//     <div className="container mx-auto py-8 px-4">
//       <Tabs selectedIndex={index} onSelect={(newIndex) => setIndex(newIndex)} className="space-y-8">

//         {/* Tab List with modern design */}
//         <TabList className="flex justify-center space-x-10 mb-10">
//           {[
//             { icon: <MdOutlineProductionQuantityLimits size={32} />, label: 'Products', color: 'text-indigo-600', hoverColor: 'hover:text-indigo-800' },
//             { icon: <AiFillShopping size={32} />, label: 'Orders', color: 'text-blue-600', hoverColor: 'hover:text-blue-800' },
//             { icon: <FaUser size={32} />, label: 'Users', color: 'text-green-600', hoverColor: 'hover:text-green-800' },
//           ].map((tab, index) => (
//             <Tab key={index} className={`cursor-pointer text-lg font-semibold ${tab.color} ${tab.hoverColor} transition-all`}>
//               <div className="flex items-center space-x-3">
//                 {tab.icon}
//                 <span>{tab.label}</span>
//               </div>
//             </Tab>
//           ))}
//         </TabList>

//         {/* Product Tab */}
//         <TabPanel>
//           <animated.div style={animationProps} className="mb-12">
//             <h1 className={`text-center text-4xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>Product Details
//             </h1>
//             <div className="flex justify-end my-6">
//               <button
//                 type="button"
//                 className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105 duration-200 ease-in-out ${mode === 'dark' ? 'bg-gray-800' : ''}`}
//                 onClick={add}
//               >
//                 Add Product <FaCartPlus size={24} />
//               </button>
//             </div>
            
//             <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
//               <table className="w-full text-sm text-left font-semibold">
//                 <thead className={`text-xs uppercase bg-gray-50 ${mode === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}>
//                   <tr>
//                     {['S.No', 'Image', 'Title', 'Price', 'Category', 'Date', 'Action'].map((header, index) => (
//                       <th key={index} className="px-6 py-4">{header}</th>
//                     ))}
//                   </tr>
//                 </thead>

                 
//                 {product.map((item, index) => {
//                   const { title, price, imageUrl, category, date } = item;
//                   return (
//                     <tbody key={index}>
//                       <tr className={`border-b ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} hover:bg-gray-100`}>
//                         <td className="px-6 py-4">{index + 1}</td>
//                         <td className="px-6 py-4">
//                           <img className="w-16 rounded-lg" src={imageUrl} alt="img" />
//                         </td>
//                         <td className="px-6 py-4">{title}</td>
//                         <td className="px-6 py-4">₹{price}</td>
//                         <td className="px-6 py-4">{category}</td>
//                         <td className="px-6 py-4">{date}</td>
//                         <td className="px-6 py-4 flex space-x-4">
//                           <Link to="/updateProduct" onClick={() => edithandle(item)}>
//                             <AiFillEdit className="text-blue-600 cursor-pointer" size={28} />
//                           </Link>
//                           <AiFillDelete className="text-red-600 cursor-pointer hover:text-red-800 transition duration-150" size={28} onClick={() => deleteProduct(item)} />
//                         </td>
//                       </tr>
//                     </tbody>
//                   );
//                 })}
//               </table>
//             </div>
//           </animated.div>
//         </TabPanel>

//         {/* Order Tab */}
//         <TabPanel>
//           <div className="relative overflow-x-auto mb-16">
//             <h1 className="text-center mb-5 text-3xl font-semibold underline" style={{ color: mode === 'dark' ? 'white' : '' }}>
//               Order Details
//             </h1>
//             <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
//               <thead className="text-xs text-black uppercase bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
//                 <tr>
//                   {['S.No.', 'Payment Id', 'Image', 'Title', 'Price', 'Category', 'Name', 'Address', 'Pincode', 'Phone Number', 'Email', 'Date'].map((header, index) => (
//                     <th key={index} className="px-6 py-3">{header}</th>
//                   ))}
//                 </tr>
//               </thead>
              
//               {order.map((allorder, index) => (
//                 <tbody key={index}>
//                   {/* order ke ander hai cartitems us ko mal */}
//                   {allorder.cartItems.map((item, cartIndex) => {
//                     {/* console.log(allorder) */}
//                     const { title, category, imageUrl, price } = item;
//                     return (
//                       <tr key={cartIndex} className="bg-gray-50 border-b dark:border-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
//                         <td className="px-6 py-4">{cartIndex + 1}.</td>
//                         <td className="px-6 py-4">{allorder.paymentId}</td>
//                         <td className="px-6 py-4">
//                           <img className="w-16" src={imageUrl} alt="img" />
//                         </td>
//                         <td className="px-6 py-4">{title}</td>
//                         <td className="px-6 py-4">₹{price}</td>
//                         <td className="px-6 py-4">{category}</td>
//                         <td className="px-6 py-4">{allorder.addressInfo.name}</td>
//                         <td className="px-6 py-4">{allorder.addressInfo.address}</td>
//                         <td className="px-6 py-4">{allorder.addressInfo.pincode}</td>
//                         <td className="px-6 py-4">{allorder.addressInfo.phoneNumber}</td>
//                         <td className="px-6 py-4">{allorder.email}</td>
//                         <td className="px-6 py-4">{allorder.date}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               ))}
//             </table>
//           </div>
//         </TabPanel> 

//         {/* User Tab */}
//         <TabPanel>
//           <animated.div style={animationProps} className="mb-12">
//             <h1 className={`text-center text-4xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>User Details
//             </h1>
//             <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
//               <table className="w-full text-sm text-left font-semibold">
//                 <thead className={`text-xs uppercase bg-gray-50 ${mode === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}>
//                   <tr>
//                     {['S.No', 'Name', 'ID', 'Pincode', 'Phone', 'Email', 'Date'].map((header, index) => (
//                       <th key={index} className="px-6 py-4">{header}</th>
//                     ))}
//                   </tr>
//                 </thead>

//                 {user.map((value, index) => {
//                   const userOrder = order.find((ord) => ord.email === value.email);
//                   const pincode = userOrder ? userOrder.addressInfo.pincode : 'N/A';
//                   const phoneNumber = userOrder ? userOrder.addressInfo.phoneNumber : 'N/A';
//                   const date = userOrder ? userOrder.date : 'N/A';

//                   const { name, uid, email} = value;
//                   return (
//                     <tbody key={index}>
//                       <tr className={`border-b ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} hover:bg-gray-100`}>
//                         <td className="px-6 py-4">{index + 1}.</td>
//                         <td className="px-6 py-4">{name}</td>
//                         <td className="px-6 py-4">{uid}</td>
//                         <td className="px-6 py-4">{pincode}</td>
//                         <td className="px-6 py-4">{phoneNumber}</td>
//                         <td className="px-6 py-4">{email}</td>
//                         <td className="px-6 py-4">{date}</td>
//                       </tr>
//                     </tbody>
//                   );
//                 })}
//               </table>
//             </div>
//           </animated.div>
//         </TabPanel>

//       </Tabs>
//     </div>
//   );
// }

// export default DashboardTab;




import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MyContext } from "../../../context api/myContext";
import {
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import {
  AiFillShopping,
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
} from "react-icons/ai";
import { useSpring, animated } from "react-spring";
import { Link, useNavigate } from "react-router-dom";

function DashboardTab() {
  const { mode, product, edithandle, deleteProduct, order, user, testimonial, editTestimonial, deleteTestimonial,getAvatar } =
    useContext(MyContext);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const animationProps = useSpring({
    opacity: 1,
    transform: `translateY(0px)`,
    from: { opacity: 0, transform: `translateY(30px)` },
    reset: true,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs selectedIndex={index} onSelect={(i) => setIndex(i)}>

        {/* ⭐ Modern Tab List */}
        <TabList className="flex justify-center gap-10 mb-10 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
          {[
            { icon: <MdOutlineProductionQuantityLimits size={28} />, label: "Products" },
            { icon: <AiFillShopping size={28} />, label: "Orders" },
            { icon: <FaUser size={28} />, label: "Users" },
            { icon: <AiFillStar size={28} />, label: "Testimonials" },
          ].map((tab, i) => (
            <Tab key={i} className="cursor-pointer px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition">
              <div className="flex gap-2 items-center font-semibold">
                {tab.icon}
                {tab.label}
              </div>
            </Tab>
          ))}
        </TabList>

        {/* ================= PRODUCT TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Products</h1>
              <button
                onClick={() => navigate("/addproduct")}
                className="flex gap-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:scale-105 transition"
              >
                Add Product <FaCartPlus />
              </button>
            </div>

            <div className="overflow-x-auto glass rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    {["Image", "Title", "Price", "Action"].map((h, i) => (
                      <th key={i} className="p-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {product.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <img src={item.imageUrl} className="w-14 rounded" />
                      </td>
                      <td>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td className="flex gap-3 p-3">
                        <Link to="/updateProduct" onClick={() => edithandle(item)}>
                          <AiFillEdit size={22} className="text-blue-500 cursor-pointer" />
                        </Link>
                        <AiFillDelete
                          size={22}
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteProduct(item)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </animated.div>
        </TabPanel>

        {/* ================= ORDER TAB ================= */}
        <TabPanel>
          <h1 className="text-3xl font-bold mb-5 text-center">Orders</h1>
          <div className="overflow-x-auto glass rounded-xl p-4">
            {order.map((o, i) => (
              <div key={i} className="border-b py-3">
                <p className="font-semibold">Payment: {o.paymentId}</p>
                <p>Email: {o.email}</p>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* ================= USER TAB ================= */}
        <TabPanel>
          <h1 className="text-3xl font-bold mb-5 text-center">Users</h1>
          <div className="glass p-4 rounded-xl">
            {user.map((u, i) => (
              <div key={i} className="border-b py-2">
                {u.name} — {u.email}
              </div>
            ))}
          </div>
        </TabPanel>

        {/* ================= TESTIMONIAL TAB ================= */}
        {/* <TabPanel>
          <animated.div style={animationProps} className="text-center">
            <h1 className="text-3xl font-bold mb-6">Testimonials</h1>

            <Link to="/addtestimonial">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:scale-105 transition">
                Add Testimonial
              </button>
            </Link>

            <p className="mt-4 text-gray-500">
              Manage and add customer testimonials from here
            </p>
          </animated.div>
        </TabPanel> */}
        
      <TabPanel>
      <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>

    {/* <Link to="/addtestimonial">
      <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:scale-105 transition">
        Add Testimonial
      </button>
    </Link> */}

    <p className="mt-4 text-gray-500">
      Admin can add, edit or delete testimonials here.
    </p>

    {/* List of testimonials */}
    <div className="mt-6 grid lg:grid-cols-3 gap-4">
      {testimonial.map(item => (
        <div key={item.id} className="p-4 bg-gray-100 rounded shadow flex flex-col items-center">
          <img 
          // src={item.img || "https://i.pravatar.cc/300"}
          src={getAvatar(item)}
           className="w-20 h-20 rounded-full mb-2" />
          <p className="mb-2 text-center">{item.text}</p>
          <h2 className="font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.role}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => editTestimonial(item)} className="text-blue-500">Edit</button>
            <button onClick={() => deleteTestimonial(item.id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}

      
    </div>
  </div>
      </TabPanel>


      </Tabs>
    </div>
  );
}

export default DashboardTab;