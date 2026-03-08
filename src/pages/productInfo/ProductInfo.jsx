// import React, { useContext, useState, useEffect } from 'react';
// import Layout from '../../components/layout/Layout';
// import { toast } from 'react-toastify';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../redux/cartSlice';
// import { fireDB } from '../../firebase/FirebaseConfig';
// import { useParams, Link  } from 'react-router-dom';
// import { doc, getDoc } from 'firebase/firestore';
// import { MyContext } from '../../context api/myContext';
// import Loader from '../../components/loader/Loader';
// import { FaHeart, FaShoppingCart, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// const StarIcon = ({ filled = true }) => (
//     <svg
//         fill={filled ? "currentColor" : "none"}
//         stroke="currentColor"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         className="w-5 h-5 text-indigo-500"
//         viewBox="0 0 24 24"
//     >
//         <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//     </svg>
// );

// function ProductInfo() {
//     const { loading, setLoading } = useContext(MyContext);
//     const [products, setProducts] = useState('');
//     const [isHeartFilled, setIsHeartFilled] = useState(false);
//     const params = useParams();

//     const getProductData = async () => {
//         setLoading(true);
//         try {
//             const productTemp = await getDoc(doc(fireDB, "products", params.id));
//             setProducts(productTemp.data());
//             setLoading(false);
//         } catch (error) {
//             console.log(error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         getProductData();
//     }, []);

//     const dispatch = useDispatch();
//     const cartItems = useSelector((state) => state.cart);

//     const addCart = (product) => {
//         const isProductInCart = cartItems.some(item => item.id === product.id);
//         if (isProductInCart) {
//             toast.info(`Product is already in your cart!`, {
//                 position: "top-right",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 icon: "🗑️",
//             });
//         } else {
//             const serializedProduct = {
//                 ...product,
//                 quantity: 1,
//                 time: product.time?.seconds ?? Date.now(),
//             };
//             dispatch(addToCart(serializedProduct));
//             toast.success("Product added to cart!", {
//                 position: "top-right",
//                 autoClose: 1000,
//                 hideProgressBar: false,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 icon: "🗑️",
//             });
//         }
//     };

//     // useEffect(() => {
//     //     localStorage.setItem('cart', JSON.stringify(cartItems));
//     //     window.scrollTo(0, 0);
//     // }, [cartItems]);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     },);

//     // Toggle Heart
//     const toggleHeart = () => {
//         setIsHeartFilled(prev => !prev);
//     };

// return(
// <Layout>
//     {loading && <Loader />}
//     <section className="text-gray-700 body-font overflow-hidden">
//         <div className="container px-5 py-24 mx-auto">
//             {products ? (
//             <div className="lg:w-4/5 mx-auto flex flex-wrap gap-y-3"> {/* Added gap here */}
//                     <img
//                         alt="ecommerce"
//                         className="lg:w-1/2 w-full lg:h-[28rem] h-60 object-contain object-center rounded-lg shadow-lg transition-transform duration-300 filter brightness-100 contrast-120 saturate-130 hover:scale-95 overflow-hidden"
//                         src={products.imageUrl}
//                     />
//                     <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0 bg-white rounded-lg shadow-lg p-6">
//                         <h2 className="text-sm title-font text-gray-500 tracking-wide uppercase">Brand Name</h2>
//                         <h1 className="text-gray-900 text-4xl title-font font-bold mb-2">{products.title}</h1>
//                         <div className="flex mb-4">
//                             <span className="flex items-center">
//                                 {[...Array(4)].map((_, i) => (
//                                     <StarIcon key={i} className="text-yellow-500" />
//                                 ))}
//                                 <StarIcon filled={false} className="text-yellow-500" />
//                                 <span className="text-gray-600 ml-3">4 Reviews</span>
//                             </span>
//                             <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-3">
//                                 <Link to="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors">
//                                     <FaShoppingCart className="w-5 h-5" />
//                                 </Link>
//                                 <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
//                                     <FaTwitter className="w-5 h-5" />
//                                 </a>
//                                 <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
//                                     <FaInstagram className="w-5 h-5" />
//                                 </a>
//                                 <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
//                                     <FaYoutube className="w-5 h-5" />
//                                 </a>
//                             </span>
//                         </div>
//                         <p className="leading-relaxed border-b-2 mb-6 pb-6 text-gray-700">{products.description}</p>
//                         <div className="flex items-center justify-between">
//                             <span className="title-font font-bold text-4xl text-gray-900">₹{products.price}</span>
//                             <div className="flex items-center">
//                                 <button onClick={() => addCart(products)} className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 transition-shadow shadow-md rounded-lg">
//                                     Add To Cart
//                                 </button>
//                                 <button
//                                     onClick={toggleHeart}
//                                     className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4 transition-colors ${isHeartFilled ? 'bg-red-600' : 'bg-gray-200'} hover:bg-gray-300`}
//                                 >
//                                     <FaHeart className={`w-6 h-6 ${isHeartFilled ? 'text-white' : 'text-gray-500'}`} />
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 ""
//             )}
//         </div>
//     </section>

//     {/* <section className="mt-8 p-6 max-w-md mx-auto bg-gray-50 rounded shadow-lg">
//   <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
//   <input
//     placeholder="Name"
//     className="border p-2 w-full mb-3"
//     value={testimonialForm.name}
//     onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
//   />
//   <textarea
//     placeholder="Your Feedback"
//     className="border p-2 w-full mb-3"
//     value={testimonialForm.text}
//     onChange={e => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
//   />
//   <input
//     placeholder="Image URL (optional)"
//     className="border p-2 w-full mb-3"
//     value={testimonialForm.img}
//     onChange={e => setTestimonialForm({ ...testimonialForm, img: e.target.value })}
//   />
//   <button
//     onClick={() => {
//       setTestimonialForm(prev => ({ ...prev, productId: params.id }));
//       addTestimonial();
//     }}
//     className="bg-indigo-600 text-white px-4 py-2 rounded w-full"
//   >
//     Submit Review
//   </button>
// </section> */}

// </Layout>

// )

// }

// export default ProductInfo;

// new 1
// import React, { useContext, useState, useEffect } from "react";
// import Layout from "../../components/layout/Layout";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cartSlice";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   doc,
//   getDoc,
//   collection,
//   query,
//   where,
//   getDocs,
// } from "firebase/firestore";
// import { MyContext } from "../../context api/myContext";
// import Loader from "../../components/loader/Loader";
// import {
//   FaHeart,
//   FaTruck,
//   FaShieldAlt,
//   FaSyncAlt,
//   FaChevronDown,
//   FaTag,
//   FaCheckCircle,
// } from "react-icons/fa";
// import Testimonial from "../../components/testimonial/Testimonial";
// import AddTestimonial from "../../components/testimonial/AddTestimonial";

// function ProductInfo() {
//   const { loading, setLoading, testimonial, mode } = useContext(MyContext);
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
//   const [isHeartFilled, setIsHeartFilled] = useState(false);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const [openTab, setOpenTab] = useState("desc");

//   const params = useParams();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);
//   const navigate = useNavigate();
//   const isDark = mode === "dark";

//   const getProductData = async () => {
//     setLoading(true);
//     try {
//       const productTemp = await getDoc(doc(fireDB, "products", params.id));
//       if (productTemp.exists()) {
//         const data = { id: productTemp.id, ...productTemp.data() };
//         setProduct(data);
//         setMainImage(data.imageUrl);
//         getSimilarProducts(data.category, data.id);
//       }
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getSimilarProducts = async (category, productId) => {
//     try {
//       const q = query(
//         collection(fireDB, "products"),
//         where("category", "==", category),
//       );
//       const querySnapshot = await getDocs(q);
//       const products = [];
//       querySnapshot.forEach((doc) => {
//         if (doc.id !== productId) products.push({ id: doc.id, ...doc.data() });
//       });
//       setSimilarProducts(products.slice(0, 4));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getProductData();
//     window.scrollTo(0, 0);
//   }, [params.id]);

//   // ✅ Amazon Style Zoom Logic
//   const handleMouseMove = (e) => {
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();
//     const x = ((e.pageX - left - window.scrollX) / width) * 100;
//     const y = ((e.pageY - top - window.scrollY) / height) * 100;
//     setZoomPos({ x, y, show: true });
//   };
// const addToCart = (product) => {
//   const isProductInCart = cartItems.some((item) => item.id === product.id);
//   if (isProductInCart) {
//     toast.info(`Product is already in your cart!`, { icon: "🗑️" });
//   } else {
//     const serializedProduct = {
//       ...product,
//       quantity: 1,
//       time: product.time?.seconds ?? Date.now(),
//     };
//     dispatch(addToCart(serializedProduct));
//     toast.success("Product added to cart!", { icon: "🗑️" });
//   }
// };
//   if (loading || !product) return <Loader />;

//   const discount = product?.discount || 0;
//   const finalPrice = Math.round(
//     product.price - (product.price * discount) / 100,
//   );
//   const gallery = [
//     product.imageUrl,
//     product.imageUrl2 || product.imageUrl,
//     product.imageUrl3 || product.imageUrl,
//   ];

//   return (
//     <Layout>
//       <div
//         className={`min-h-screen py-10 pt-32 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-white text-gray-900"}`}
//       >
//         <div className="container mx-auto px-4 lg:px-20">
//           {/* --- MAIN PRODUCT GRID --- */}
//           <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center">
//             {/* --- LEFT: VERTICAL GALLERY & MAIN IMAGE (RESIZED) --- */}
//             <div className="lg:w-[50%] flex flex-col md:flex-row gap-6 items-start sticky top-32">
//               {/* Vertical Thumbnails Sidebar */}
//               <div className="flex md:flex-col gap-3 order-2 md:order-1 w-full md:w-auto overflow-x-auto md:overflow-visible pb-2 md:pb-0">
//                 {gallery.map((img, i) => (
//                   <div
//                     key={i}
//                     onMouseEnter={() => setMainImage(img)}
//                     className={`min-w-[70px] w-20 h-20 border-2 rounded-2xl cursor-pointer overflow-hidden p-2 transition-all bg-white flex-shrink-0 ${mainImage === img ? "border-blue-600 shadow-md scale-105" : "border-gray-100 opacity-60 hover:opacity-100"}`}
//                   >
//                     <img
//                       src={img}
//                       alt="thumb"
//                       className="w-full h-full object-contain"
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Main Image Box with Pro Zoom (Fixed Size) */}
//               <div
//                 className={`relative flex-1 w-full border rounded-[40px] overflow-hidden bg-white p-6 md:p-10 order-1 md:order-2 flex justify-center items-center cursor-crosshair ${isDark ? "border-gray-800" : "border-gray-50 shadow-2xl shadow-gray-100"}`}
//                 onMouseMove={handleMouseMove}
//                 onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
//               >
//                 {discount > 0 && (
//                   <span className="absolute top-6 left-6 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black z-10 shadow-lg">
//                     {discount}% OFF
//                   </span>
//                 )}
//                 <img
//                   src={mainImage}
//                   alt="product"
//                   className="w-full h-[320px] md:h-[380px] object-contain transition-transform duration-500"
//                 />

//                 {zoomPos.show && (
//                   <div
//                     className="absolute inset-0 pointer-events-none hidden md:block rounded-[40px]"
//                     style={{
//                       backgroundImage: `url(${mainImage})`,
//                       backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
//                       backgroundSize: "250%",
//                       backgroundRepeat: "no-repeat",
//                       backgroundColor: "white",
//                     }}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* --- RIGHT: PRODUCT DETAILS & ACCORDION --- */}
//             <div className="lg:w-[50%] flex flex-col space-y-8">
//               <div>
//                 <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-[1] mb-3">
//                   {product.title}
//                 </h1>
//                 <div className="flex items-center gap-3">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
//                     {product.category}
//                   </span>
//                   <span className="flex items-center gap-1 text-xs font-bold text-green-600 uppercase tracking-widest border-l pl-3 border-gray-300">
//                     <FaCheckCircle /> Verified Quality
//                   </span>
//                 </div>
//               </div>

//               <div className="py-4 border-b border-gray-100 dark:border-gray-800">
//                 <div className="flex items-end gap-3 mb-1">
//                   <span className="text-4xl font-black text-blue-600 tracking-tighter">
//                     ₹{finalPrice}
//                   </span>
//                   {discount > 0 && (
//                     <span className="text-xl line-through text-gray-400 font-bold mb-1">
//                       ₹{product.price}
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">
//                   Shipping calculated at checkout
//                 </p>
//               </div>

//               {/* --- MODERN ACCORDION SECTION --- */}
//               <div className="space-y-4">
//                 <div
//                   className={`border rounded-2xl overflow-hidden transition-all ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-50 bg-gray-50 shadow-sm"}`}
//                 >
//                   <button
//                     onClick={() => setOpenTab(openTab === "desc" ? "" : "desc")}
//                     className="w-full flex justify-between items-center p-4 font-black text-[11px] uppercase tracking-widest"
//                   >
//                     Product Specification{" "}
//                     <FaChevronDown
//                       className={`transition-transform ${openTab === "desc" ? "rotate-180" : ""}`}
//                     />
//                   </button>
//                   <div
//                     className={`px-4 pb-4 text-sm leading-relaxed opacity-70 ${openTab === "desc" ? "block" : "hidden"}`}
//                   >
//                     {product.description}
//                   </div>
//                 </div>

//                 <div
//                   className={`border rounded-2xl overflow-hidden transition-all ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-100 bg-gray-50"}`}
//                 >
//                   <button
//                     onClick={() =>
//                       setOpenTab(openTab === "offers" ? "" : "offers")
//                     }
//                     className="w-full flex justify-between items-center p-4 font-black text-[11px] uppercase tracking-widest text-orange-500"
//                   >
//                     Exclusive Offers <FaTag />
//                   </button>
//                   <div
//                     className={`px-4 pb-4 space-y-2 ${openTab === "offers" ? "block" : "hidden"}`}
//                   >
//                     <div className="flex items-center gap-2 p-2 border border-dashed border-orange-300 rounded-xl bg-orange-50 text-[10px] font-bold text-orange-800">
//                       <span>CODE: FUSION20</span> | 20% Cashback on first order
//                     </div>
//                     <div className="flex items-center gap-2 p-2 border border-dashed border-blue-300 rounded-xl bg-blue-50 text-[10px] font-bold text-blue-800">
//                       <span>CODE: FREESHIP</span> | Free delivery for orders
//                       above ₹300
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 gap-3 py-6">
//                 <div className="text-center space-y-1">
//                   <FaTruck className="mx-auto text-blue-600" size={18} />
//                   <p className="text-[9px] font-black uppercase opacity-60">
//                     Express Ship
//                   </p>
//                 </div>
//                 <div className="text-center space-y-1">
//                   <FaSyncAlt className="mx-auto text-orange-500" size={18} />
//                   <p className="text-[9px] font-black uppercase opacity-60">
//                     Easy Returns
//                   </p>
//                 </div>
//                 <div className="text-center space-y-1">
//                   <FaShieldAlt className="mx-auto text-green-600" size={18} />
//                   <p className="text-[9px] font-black uppercase opacity-60">
//                     SSL Secure
//                   </p>
//                 </div>
//               </div>

//               {/* Action Buttons (StoreFusion UI) */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button
//                   onClick={addToCart}
//                   className="flex-1 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[11px] shadow-lg shadow-blue-500/30 transition-all active:scale-95"
//                 >
//                   Add To Cart
//                 </button>
//                 <button className="flex-1 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[11px] shadow-lg shadow-orange-500/30 transition-all active:scale-95">
//                   Buy Now
//                 </button>
//                 <button
//                   onClick={() => setIsHeartFilled(!isHeartFilled)}
//                   className={`p-4 rounded-2xl border transition-all ${isHeartFilled ? "bg-red-500 border-red-500 text-white" : "border-gray-200 text-gray-400"}`}
//                 >
//                   <FaHeart />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* --- SECTIONS STACKED BELOW (FULL WIDTH) --- */}

//           {/* 1. SIMILAR PRODUCTS (PREMIUM STYLE) */}
//           {similarProducts.length > 0 && (
//             <section className="mt-32">
//               <div className="flex items-center gap-4 mb-12">
//                 <h2 className="text-3xl font-black uppercase tracking-tighter whitespace-nowrap italic">
//                   Related <span className="text-blue-600">Picks</span>
//                 </h2>
//                 <div className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-800"></div>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
//                 {similarProducts.map((item) => (
//                   <div
//                     key={item.id}
//                     onClick={() => navigate(`/productinfo/${item.id}`)}
//                     className={`group cursor-pointer rounded-[40px] border p-6 transition-all hover:shadow-2xl ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-50 shadow-sm"}`}
//                   >
//                     <div className="aspect-square bg-white rounded-3xl flex items-center justify-center p-6 mb-4 overflow-hidden">
//                       <img
//                         src={item.imageUrl}
//                         alt={item.title}
//                         className="max-h-full object-contain transition-transform duration-500 group-hover:scale-110"
//                       />
//                     </div>
//                     <h3 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">
//                       {item.category}
//                     </h3>
//                     <h2 className="font-bold text-sm truncate uppercase tracking-tighter">
//                       {item.title}
//                     </h2>
//                     <p className="text-blue-600 font-black mt-2 tracking-tighter italic">
//                       ₹{item.price}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           )}

//           {/* 2. REVIEWS & ADD REVIEW (ONE BELOW ANOTHER) */}
//           <div className="mt-32 pt-20 border-t border-gray-100 dark:border-gray-800 space-y-24">
//             <section className="max-w-4xl mx-auto">
//               <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-16 italic">
//                 What Customers <span className="text-orange-500">Think</span>
//               </h2>
//               <Testimonial
//                 reviews={testimonial.filter(
//                   (item) => item.productId === params.id,
//                 )}
//               />
//             </section>

//             <section className="max-w-2xl mx-auto pb-10">
//               <AddTestimonial productId={params.id} />
//             </section>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );

// }

// export default ProductInfo;




import React, { useContext, useState, useEffect, useMemo } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { MyContext } from "../../context api/myContext";
import Loader from "../../components/loader/Loader";
import {
  FaHeart,
  FaTruck,
  FaShieldAlt,
  FaSyncAlt,
  FaChevronDown,
  FaTag,
  FaCheckCircle,
} from "react-icons/fa";
import Testimonial from "../../components/testimonial/Testimonial";
import AddTestimonial from "../../components/testimonial/AddTestimonial";

function ProductInfo() {
  const { product, loading, mode } = useContext(MyContext);
  const [mainImage, setMainImage] = useState("");
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  // const [openTab, setOpenTab] = useState("desc");

  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const isDark = mode === "dark";
  // ⭐ 1. Accordion Open/Close State
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ⭐ 1. Current Product filter from MyState
  const currentProduct = useMemo(() => {
    return product ? product.find((item) => item.id === params.id) : null;
  }, [product, params.id]);

  // ⭐ 2. Similar Products filter from MyState
  const similarProducts = useMemo(() => {
    if (!currentProduct || !product) return [];
    return product
      .filter(
        (item) =>
          item.category === currentProduct.category &&
          item.id !== currentProduct.id,
      )
      .slice(0, 4);
  }, [product, currentProduct]);

  useEffect(() => {
    if (currentProduct) {
      setMainImage(currentProduct.imageUrl);
      window.scrollTo(0, 0);
    }
  }, [currentProduct, params.id]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  const handleAddToCart = () => {
    const isProductInCart = cartItems.some(
      (item) => item.id === currentProduct.id,
    );
    if (isProductInCart) {
      toast.info(`Already in your cart!`, { icon: "🛒" });
    } else {
      dispatch(addToCart({ ...currentProduct, quantity: 1, time: Date.now() }));
      toast.success("Added to cart!", { icon: "🛒" });
    }
  };

  const handleViewAll = () => {
    navigate(`/category/${currentProduct.category}`);
  };

  // ⭐ 2. Accordion Data Logic (useMemo safe check ke liye)
  const accordionData = useMemo(() => {
    if (!currentProduct) return [];
    return [
      {
        id: 1,
        title: "Specifications",
        text: currentProduct.description || "No description available",
        icon: <FaChevronDown size={14} />,
      },
      {
        id: 2,
        title: "Available Coupons",
        text: (
          <div className="p-3 border border-dashed border-orange-300 rounded-xl bg-orange-50 text-[9px] font-bold text-orange-800 uppercase">
            CODE: FUSION20 | Flat 20% Off on your first order
          </div>
        ),
        icon: <FaTag size={14} className="text-orange-500" />,
      },
    ];
  }, [currentProduct]);

  // ✅ Important: Show loader if data is not yet available
  if (loading || !currentProduct) return <Loader />;

  const discount = currentProduct?.discount || 0;
  const finalPrice = Math.round(
    currentProduct.price - (currentProduct.price * discount) / 100,
  );
  const gallery = [
    currentProduct.imageUrl,
    currentProduct.imageUrl2 || currentProduct.imageUrl,
    currentProduct.imageUrl3 || currentProduct.imageUrl,
  ];

  return (
    <Layout>
      <div
        className={`min-h-screen py-6 lg:py-10 pt-24 lg:pt-32 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-white text-gray-900"}`}
      >
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">
            {/* --- LEFT: GALLERY & IMAGE --- */}
            <div className="w-full lg:w-[48%] flex flex-col md:flex-row gap-4 items-center md:items-start lg:sticky lg:top-32">
              <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1 w-full md:w-auto justify-center md:justify-start no-scrollbar py-2">
                {gallery.map((img, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setMainImage(img)}
                    onClick={() => setMainImage(img)}
                    className={`w-14 h-14 md:w-20 md:h-20 border-2 rounded-xl cursor-pointer overflow-hidden p-1.5 transition-all bg-white flex-shrink-0 ${mainImage === img ? "border-blue-600 shadow-md scale-105" : "border-gray-100 opacity-60"}`}
                  >
                    <img
                      src={img}
                      alt="thumb"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div
                className={`relative flex-1 w-full max-w-[400px] md:max-w-none border rounded-[30px] md:rounded-[40px] overflow-hidden bg-white p-4 md:p-8 order-1 md:order-2 flex justify-center items-center ${isDark ? "border-gray-800" : "border-gray-50 shadow-xl shadow-gray-100"}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
              >
                {discount > 0 && (
                  <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black z-10 shadow-lg">
                    {discount}% OFF
                  </span>
                )}
                <img
                  src={mainImage}
                  alt="product"
                  className="w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-contain transition-transform duration-500"
                />

                {zoomPos.show && (
                  <div
                    className="absolute inset-0 pointer-events-none hidden lg:block"
                    style={{
                      backgroundImage: `url(${mainImage})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: "250%",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "white",
                    }}
                  />
                )}
              </div>
            </div>

            {/* --- RIGHT: PRODUCT INFO --- */}
            <div className="w-full lg:w-[50%] flex flex-col space-y-6 text-center lg:text-left">
              <div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight mb-3 px-2 md:px-0">
                  {currentProduct.title}
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    {currentProduct.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-widest border-l pl-3 border-gray-300">
                    <FaCheckCircle /> Verified Quality
                  </span>
                </div>
              </div>

              <div className="py-2 md:py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-end justify-center lg:justify-start gap-3 mb-1">
                  <span className="text-3xl md:text-4xl font-black text-blue-600 italic">
                    ₹{finalPrice}
                  </span>
                  {discount > 0 && (
                    <span className="text-lg md:text-xl line-through text-gray-400 font-bold mb-1">
                      ₹{currentProduct.price}
                    </span>
                  )}
                </div>
                <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em]">
                  Shipping calculated at checkout
                </p>
              </div>

              {/* Accordions */}
              {/* <div className="space-y-3 px-1 md:px-0">
                <div className={`border rounded-2xl overflow-hidden ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-50 bg-gray-50 shadow-sm"}`}>
                  <button onClick={() => setOpenTab(openTab === 'desc' ? '' : 'desc')} className="w-full flex justify-between items-center p-4 font-black text-[10px] md:text-[11px] uppercase tracking-widest">
                    Specifications <FaChevronDown className={`transition-transform ${openTab === 'desc' ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`px-4 pb-4 text-xs md:text-sm leading-relaxed opacity-70 text-left ${openTab === 'desc' ? 'block' : 'hidden'}`}>
                    {currentProduct.description}
                  </div>
                </div>

                <div className={`border rounded-2xl overflow-hidden ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-50 bg-gray-50 shadow-sm"}`}>
                  <button onClick={() => setOpenTab(openTab === 'offers' ? '' : 'offers')} className="w-full flex justify-between items-center p-4 font-black text-[10px] md:text-[11px] uppercase tracking-widest text-orange-500">
                    Available Coupons <FaTag />
                  </button>
                  <div className={`px-4 pb-4 space-y-3 ${openTab === 'offers' ? 'block' : 'hidden'}`}>
                    <div className="p-3 border border-dashed border-orange-300 rounded-xl bg-orange-50 text-[9px] font-bold text-orange-800 uppercase">
                      CODE: FUSION20 | Flat 20% Off
                    </div>
                  </div>
                </div>
              </div> */}
              
              {/* Accordions */}
              <div className="space-y-3 px-1 md:px-0">
                {accordionData.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={item.id}
                      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                        isDark
                          ? "border-gray-800 bg-[#1e293b]"
                          : "border-gray-50 bg-gray-50 shadow-sm"
                      }`}
                    >
                      {/* Header */}
                      <button
                        onClick={() => handleToggle(index)}
                        className="w-full flex justify-between items-center p-4 text-left outline-none"
                      >
                        <h3
                          className={`font-black text-[10px] md:text-[11px] uppercase tracking-widest ${isOpen && !isDark ? "text-blue-600" : ""}`}
                        >
                          {item.title}
                        </h3>
                        <span
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                        >
                          {item.icon}
                        </span>
                      </button>

                      {/* Body (Smooth Animation) */}
                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          isOpen
                            ? "max-h-60 opacity-100 px-4 pb-4"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="text-xs md:text-sm leading-relaxed opacity-70 text-left">
                          {item.text}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 dark:border-gray-800">
                <div className="text-center space-y-1">
                  <FaTruck className="mx-auto text-blue-600" size={18} />
                  <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">
                    Express Ship
                  </p>
                </div>
                <div className="text-center space-y-1">
                  <FaSyncAlt className="mx-auto text-orange-500" size={18} />
                  <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">
                    Easy Returns
                  </p>
                </div>
                <div className="text-center space-y-1">
                  <FaShieldAlt className="mx-auto text-green-600" size={18} />
                  <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">
                    SSL Secure
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-[2] py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-xl shadow-blue-500/20 transition-all active:scale-95"
                >
                  Add To Shopping Bag
                </button>
                <button className="flex-1 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-xl shadow-orange-500/20 transition-all active:scale-95">
                  Buy Now
                </button>
                <button
                  onClick={() => setIsHeartFilled(!isHeartFilled)}
                  className={`p-4 md:p-5 rounded-2xl border flex items-center justify-center transition-all ${isHeartFilled ? "bg-red-500 border-red-500 text-white" : "border-gray-200 text-gray-400"}`}
                >
                  <FaHeart size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* --- SIMILAR PRODUCTS SECTION --- */}
          {similarProducts.length > 0 && (
            <section className="mt-12 lg:mt-24 border-t border-gray-100 dark:border-gray-800 pt-8 px-2 md:px-0">
              <div className="flex items-center justify-between mb-6 lg:mb-10">
                <div className="flex flex-col">
                  <h2
                    className={`text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tighter italic ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    Similar <span className="text-blue-600">Products</span>
                  </h2>
                  <div className="w-10 md:w-16 h-1 bg-orange-500 mt-1"></div>
                </div>
                <button
                  onClick={handleViewAll}
                  className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-blue-600 pb-0.5 hover:text-orange-500 hover:border-orange-500 transition-all"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6">
                {similarProducts.map((item) => {
                  const discount = item.discount || 0;
                  const finalPrice = Math.round(
                    item.price - (item.price * discount) / 100,
                  );
                  return (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/productinfo/${item.id}`)}
                      className={`group cursor-pointer p-3 md:p-4 border transition-all duration-300 relative flex flex-col h-full ${isDark ? "bg-[#131921] border-gray-800 hover:border-blue-600" : "bg-white border-gray-100 hover:shadow-xl hover:shadow-gray-200/50"}`}
                    >
                      <div className="aspect-square w-full mb-3 flex items-center justify-center p-2 overflow-hidden bg-white rounded-lg">
                        {discount > 0 && (
                          <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black z-10 shadow-lg">
                            {discount}% OFF
                          </span>
                        )}
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[7px] md:text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1">
                            {item.category}
                          </p>
                          <h3
                            className={`font-bold text-[10px] md:text-xs lg:text-sm uppercase tracking-tight line-clamp-2 leading-tight mb-2 ${isDark ? "text-gray-200" : "text-gray-800"}`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-auto">
                          {/* <span className="text-blue-600 font-black text-xs md:text-base lg:text-lg italic">₹{item.price}</span> */}
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

                          <div className="flex items-center gap-1">
                            <span className="hidden sm:inline-block text-[7px] font-black bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded uppercase border border-blue-100">
                              Premium
                            </span>
                            <FaCheckCircle
                              className="text-blue-600 shrink-0"
                              size={12}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* REVIEWS STACK */}
          <div className="mt-20 lg:mt-12 pt-12 lg:pt-10 border-t border-gray-100 dark:border-gray-800 space-y-16 lg:space-y-24">
            <section className="w-full mx-auto">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-center mb-10 italic">
                Community <span className="text-orange-500">Feedback</span>
              </h2>
              <Testimonial productId={params.id} />
            </section>
            <section className="w-full max-w-2xl mx-auto pb-10 px-2">
              <AddTestimonial productId={params.id} />
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductInfo;
