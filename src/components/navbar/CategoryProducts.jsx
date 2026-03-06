// import React from 'react'

// function CategoryProducts() {
//   return (
//     <div>CategoryProducts</div>
//   )
// }

// export default CategoryProducts

// // 1 wala
// import React, { useContext, useMemo, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Layout from "../../components/layout/Layout";
// import { MyContext } from "../../context api/myContext";
// import { FaCheckCircle, FaArrowLeft, FaShoppingBag } from "react-icons/fa";

// function CategoryProducts() {
//   const { name } = useParams();
//   // Hum product ko context se utha rahe hain (No Firebase Call)
//   const { product, mode } = useContext(MyContext);
//   const navigate = useNavigate();
//   const isDark = mode === "dark";

//   // ⭐ Scroll to top (User experience ke liye)
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [name]);

//   // ⭐ Category Filter (Performance Optimized)
//   const filteredProducts = useMemo(() => {
//     return product.filter(
//       (item) => item.category?.toLowerCase() === name.toLowerCase()
//     );
//   }, [product, name]);

//   return (
//     <Layout>
//       <div className={`min-h-screen pt-24 pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}>
//         <div className="max-w-7xl mx-auto px-4">

//           {/* Header Section (Amazon Style) */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
//             <div>
//                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 mb-3">
//                 <FaArrowLeft /> Back to Shopping
//               </button>
//               <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
//                 {name} <span className="text-blue-600">Collection</span>
//               </h1>
//               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
//                 Showing {filteredProducts.length} Premium Results
//               </p>
//             </div>
//           </div>

//           {/* Grid Logic */}
//           {filteredProducts.length === 0 ? (
//             <div className="text-center py-20 opacity-50 font-black uppercase tracking-widest">
//               No Products Found in this Category
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//               {filteredProducts.map((item) => {
//                 const finalPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);

//                 return (
//                   <div
//                     key={item.id}
//                     onClick={() => navigate(`/productInfo/${item.id}`)}
//                     className={`group cursor-pointer p-4 border flex flex-col h-full transition-all duration-300
//                       ${isDark ? "bg-[#1e293b] border-gray-800 hover:border-blue-600 shadow-xl" : "bg-white border-gray-100 hover:shadow-2xl shadow-gray-200/50"}`}
//                   >
//                     {/* Image Area */}
//                     <div className="aspect-square w-full mb-4 flex items-center justify-center p-4 bg-white overflow-hidden rounded-xl">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.title}
//                         className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
//                       />
//                     </div>

//                     {/* Details */}
//                     <div className="flex-1 flex flex-col">
//                       <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest mb-1">{item.category}</p>
//                       <h3 className={`font-bold text-xs md:text-sm uppercase tracking-tight line-clamp-2 mb-3 leading-tight ${isDark ? "text-gray-100" : "text-gray-800"}`}>
//                         {item.title}
//                       </h3>

//                       <div className="mt-auto">
//                         <div className="flex items-center gap-2 mb-4">
//                           <span className="text-blue-600 font-black text-lg md:text-xl italic">₹{finalPrice}</span>
//                           {item.discount > 0 && (
//                             <span className="line-through text-gray-400 text-[10px] font-bold">₹{item.price}</span>
//                           )}
//                         </div>

//                         <button className="w-full py-2.5 bg-gray-900 dark:bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest hover:bg-orange-500 transition-colors flex items-center justify-center gap-2">
//                           <FaShoppingBag size={10} /> View Details
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default CategoryProducts;

import React, { useContext, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { MyContext } from "../../context api/myContext";
import {
  FaCheckCircle,
  FaArrowLeft,
  FaShoppingBag,
  FaQuoteLeft,
} from "react-icons/fa";
import Testimonial from "../../components/testimonial/Testimonial";

function CategoryProducts() {
  const { name } = useParams();
  const { product, testimonial, mode } = useContext(MyContext);
  const navigate = useNavigate();
  const isDark = mode === "dark";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  // ⭐ 1. Category Products Filter (Optimized)
  const filteredProducts = useMemo(() => {
    return product.filter(
      (item) => item.category?.toLowerCase() === name.toLowerCase(),
    );
  }, [product, name]);



  return (
    <Layout>
      <div
        className={`min-h-screen pt-24 pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 mb-3"
              >
                <FaArrowLeft /> Back to Shopping
              </button>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">
                {name} <span className="text-blue-600">Collection</span>
              </h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">
                Showing {filteredProducts.length} Premium Results
              </p>
            </div>
          </div>

          {/* Grid Logic */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 opacity-50 font-black uppercase tracking-widest">
              No Products Found in this Category
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((item) => {
                const discount = item.discount || 0;
                const finalPrice = Math.round(
                  item.price - (item.price * discount) / 100,
                );
                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/productInfo/${item.id}`)}
                    className={`group cursor-pointer p-4 border flex flex-col h-full transition-all duration-300 rounded-3xl
                      ${isDark ? "bg-[#1e293b] border-gray-800 hover:border-blue-600 shadow-xl" : "bg-white border-gray-100 hover:shadow-2xl shadow-gray-200/50"}`}
                  >
                    <div className="relative aspect-square w-full mb-4 flex items-center justify-center p-4 bg-white overflow-hidden rounded-xl">
                      {discount > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
                          {discount}% OFF
                        </span>
                      )}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest mb-1">
                        {item.category}
                      </p>
                      <h3
                        className={`font-bold text-xs md:text-sm uppercase tracking-tight line-clamp-2 mb-3 leading-tight ${isDark ? "text-gray-100" : "text-gray-800"}`}
                      >
                        {item.title}
                      </h3>

                      <div className="mt-auto">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-blue-600 font-black text-lg md:text-xl italic">
                            ₹{finalPrice}
                          </span>
                          {item.discount > 0 && (
                            <span className="line-through text-gray-400 text-[10px] font-bold">
                              ₹{item.price}
                            </span>
                          )}
                        </div>

                        <button className="w-full py-2.5 bg-gray-900 dark:bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest hover:bg-orange-500 transition-colors flex items-center justify-center gap-2 rounded-xl">
                          <FaShoppingBag size={10} /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ⭐ 3. TESTIMONIAL SECTION (Category Specific) */}
        {/* ⭐ TESTIMONIAL SECTION */}
<section className="mt-24 pt-16 border-t border-gray-200 dark:border-gray-800">
    <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-black uppercase italic">
            Category <span className="text-blue-600">Feedback</span>
        </h2>
    </div>

    {/* Bas component call karo aur name pass kar do, filter andar apne aap ho jayega */}
    <div className="max-w-5xl mx-auto px-2">
        <Testimonial categoryName={name} />
    </div>
</section>

        </div>
      </div>
    </Layout>
  );
}

export default CategoryProducts;

// import React, { useContext, useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Layout from "../../components/layout/Layout";
// import { MyContext } from "../../context api/myContext";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import Loader from "../../components/loader/Loader";
// import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

// function CategoryProducts() {
//   const { name } = useParams(); // URL se Name le rahe hain (e.g. /category/electronics)
//   const { mode } = useContext(MyContext);
//   const [products, setProducts] = useState([]);
//   const [catLoading, setCatLoading] = useState(true);
//   const navigate = useNavigate();
//   const isDark = mode === "dark";

//   const getProductsByCategory = async () => {
//     setCatLoading(true);
//     try {
//       // ⭐ Professional Query: Database se wahi products fetch karo jinka category name match ho
//       const q = query(
//         collection(fireDB, "products"),
//         where("category", "==", name) // 'name' hamare useParams se aa raha hai
//       );

//       const querySnapshot = await getDocs(q);
//       const data = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setProducts(data);
//     } catch (error) {
//       console.log("Error fetching products:", error);
//     } finally {
//       setCatLoading(false);
//     }
//   };

//   useEffect(() => {
//     getProductsByCategory();
//     window.scrollTo(0, 0);
//   }, [name]); // Jab bhi category change hogi, naya data aayega

//   if (catLoading) return <Loader />;

//   return (
//     <Layout>
//       <div className={`min-h-screen pt-24 pb-12 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-gray-50 text-gray-900"}`}>
//         <div className="max-w-7xl mx-auto px-4">

//           {/* ⭐ Top Navigation & Title */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
//             <div>
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 hover:gap-3 transition-all"
//               >
//                 <FaArrowLeft /> Back
//               </button>
//               <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
//                 {name} <span className="text-blue-600 text-xl md:text-3xl block md:inline md:ml-2">Store</span>
//               </h1>
//               <div className="w-20 h-2 bg-orange-500 mt-3 rounded-full"></div>
//             </div>
//             <p className="text-[11px] font-bold opacity-50 uppercase tracking-[0.2em]">
//               Found {products.length} Products
//             </p>
//           </div>

//           {/* ⭐ The Grid - Sharp & Professional */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
//             {products.map((item) => {
//               const finalPrice = Math.round(item.price - (item.price * (item.discount || 0)) / 100);

//               return (
//                 <div
//                   key={item.id}
//                   onClick={() => navigate(`/productInfo/${item.id}`)}
//                   className={`group cursor-pointer p-4 border flex flex-col h-full transition-all duration-300
//                     ${isDark ? "bg-[#1e293b] border-gray-800 hover:border-blue-600 shadow-xl" : "bg-white border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50"}`}
//                 >
//                   {/* Image Section */}
//                   <div className="aspect-square w-full mb-4 flex items-center justify-center p-4 bg-white overflow-hidden">
//                     <img
//                       src={item.imageUrl}
//                       alt={item.title}
//                       className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
//                     />
//                   </div>

//                   {/* Text Section */}
//                   <div className="flex-1 flex flex-col">
//                     <h3 className={`font-bold text-xs md:text-sm uppercase tracking-tight line-clamp-2 mb-3 leading-tight ${isDark ? "text-gray-100" : "text-gray-800"}`}>
//                       {item.title}
//                     </h3>

//                     <div className="mt-auto">
//                       <div className="flex items-center gap-2 mb-3">
//                         <span className="text-blue-600 font-black text-lg md:text-xl italic">₹{finalPrice}</span>
//                         {item.discount > 0 && (
//                           <span className="line-through text-gray-400 text-[10px] font-bold">₹{item.price}</span>
//                         )}
//                       </div>

//                       <button className="w-full py-2 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default CategoryProducts;

// import React, { useContext, useMemo } from "react";
// import { useParams, Link } from "react-router-dom";
// import Layout from "../../components/layout/Layout";
// import { MyContext } from "../../context api/myContext";

// function CategoryProducts() {
//   const { name } = useParams();
//   const { product, mode } = useContext(MyContext);

//   // ⭐ category filter
//   const filteredProducts = useMemo(() => {
//     return product.filter(
//       (item) => item.category?.toLowerCase() === name.toLowerCase(),
//     );
//   }, [product, name]);

//   return (
//     <Layout>
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         {/* ⭐ heading */}
//         <h1 className="text-2xl md:text-3xl font-bold mb-8 capitalize">
//           {name} Products
//         </h1>

//         {/* ⭐ empty */}
//         {filteredProducts.length === 0 && (
//           <p className="text-center text-gray-500">No product found</p>
//         )}

//         {/* ⭐ grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.map((item) => {
//             const itemPrice = Number(item.price) || 0;
//   const itemDiscount = Number(item.discount) || 0;
//   const finalPrice = Math.round(
//     itemPrice - (itemPrice * itemDiscount) / 100
//   );

//             return (
//               <Link
//                 key={item.id}
//                 to={`/productInfo/${item.id}`}
//                 className={`rounded-xl overflow-hidden shadow hover:shadow-lg transition ${
//                   mode === "dark" ? "bg-gray-800" : "bg-white"
//                 }`}
//               >
//                 {/* image */}
//                 <div className="relative">
//                   <img
//                     src={item.imageUrl}
//                     alt=""
//                     className="h-48 w-full object-cover"
//                   />

//                   {/* discount badge */}
//                   {item.discount > 0 && (
//                     <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
//                       {itemDiscount}% OFF
//                     </span>
//                   )}
//                 </div>

//                 {/* info */}
//                 <div className="p-3">
//                   <h2 className="font-semibold line-clamp-1">{item.title}</h2>

//                   <div className="flex items-center gap-2 mt-1">
//                     <span className="font-bold text-green-600">
//                       ₹{finalPrice}
//                     </span>
//                     {item.discount > 0 && (
//                       <>
//                         <span className="line-through text-gray-400">
//                           ₹ {itemPrice}
//                         </span>
//                         <span className="text-red-500 text-sm font-semibold">
//                           {itemDiscount}% OFF
//                         </span>
//                       </>
//                     )}
//                   </div>

//                 </div>

//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default CategoryProducts;
