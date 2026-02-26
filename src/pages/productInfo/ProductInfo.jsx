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

//     <section className="mt-8 p-6 max-w-md mx-auto bg-gray-50 rounded shadow-lg">
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
// </section>
// </Layout>

// )

// }

// export default ProductInfo;






// import React, { useContext, useState, useEffect } from "react";
// import Layout from "../../components/layout/Layout";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cartSlice";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { useParams, Link } from "react-router-dom";
// import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
// import { MyContext } from "../../context api/myContext";
// import Loader from "../../components/loader/Loader";
// import { FaHeart, FaShoppingCart, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
// import Testimonial from "../../components/testimonial/Testimonial";
// import AddTestimonial from "../../components/testimonial/AddTestimonial";

// const StarIcon = ({ filled = true }) => (
//   <svg
//     fill={filled ? "currentColor" : "none"}
//     stroke="currentColor"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     strokeWidth={2}
//     className="w-5 h-5 text-indigo-500"
//     viewBox="0 0 24 24"
//   >
//     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//   </svg>
// );

// function ProductInfo() {
//   const {
//     loading,
//     setLoading,
//     testimonial,
//     testimonialForm,
//     setTestimonialForm,
//     addTestimonial,
//   } = useContext(MyContext);

//   const [product, setProduct] = useState(null);
//   const [isHeartFilled, setIsHeartFilled] = useState(false);
//   const [similarProducts, setSimilarProducts] = useState([]);
//   const params = useParams();
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart);

//   // Fetch product details
//   const getProductData = async () => {
//     setLoading(true);
//     try {
//       const productTemp = await getDoc(doc(fireDB, "products", params.id));
//       if (productTemp.exists()) {
//         const data = productTemp.data();
//         setProduct(data);
//         getSimilarProducts(data.category);
//       } else {
//         toast.error("Product not found");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Product not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch similar products
//   const getSimilarProducts = async (category) => {
//     try {
//       const q = query(collection(fireDB, "products"), where("category", "==", category));
//       const querySnapshot = await getDocs(q);
//       const products = [];
//       querySnapshot.forEach((doc) => {
//         if (doc.id !== params.id) {
//           products.push({ id: doc.id, ...doc.data() });
//         }
//       });
//       setSimilarProducts(products);
//     } catch (error) {
//       console.log("Error fetching similar products:", error);
//     }
//   };

//   useEffect(() => {
//     getProductData();
//     window.scrollTo(0, 0);
//   }, [params.id]);

//   // Add to Cart
//   const addCart = (product) => {
//     const isProductInCart = cartItems.some((item) => item.id === product.id);
//     if (isProductInCart) {
//       toast.info(`Product is already in your cart!`, { icon: "🗑️" });
//     } else {
//       const serializedProduct = {
//         ...product,
//         quantity: 1,
//         time: product.time?.seconds ?? Date.now(),
//       };
//       dispatch(addToCart(serializedProduct));
//       toast.success("Product added to cart!", { icon: "🗑️" });
//     }
//   };

//   // Toggle wishlist heart
//   const toggleHeart = () => setIsHeartFilled((prev) => !prev);

//   return (
//     <Layout>
//       {loading && <Loader />}
//       {product && (
//         <>
//           {/* Product Details */}
//           <section className="text-gray-700 body-font overflow-hidden">
//             <div className="container px-5 py-24 mx-auto">
//               <div className="lg:w-4/5 mx-auto flex flex-wrap gap-y-3">
//                 <img
//                   alt={product.title}
//                   className="lg:w-1/2 w-full lg:h-[28rem] h-60 object-contain object-center rounded-lg shadow-lg transition-transform duration-300 filter brightness-100 contrast-120 saturate-130 hover:scale-95 overflow-hidden"
//                   src={product.imageUrl}
//                 />
//                 <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0 bg-white rounded-lg shadow-lg p-6">
//                   <h2 className="text-sm title-font text-gray-500 tracking-wide uppercase">
//                     {product.brand || "Brand Name"}
//                   </h2>
//                   <h1 className="text-gray-900 text-4xl title-font font-bold mb-2">
//                     {product.title}
//                   </h1>
//                   <div className="flex mb-4">
//                     <span className="flex items-center">
//                       {[...Array(4)].map((_, i) => (
//                         <StarIcon key={i} className="text-yellow-500" />
//                       ))}
//                       <StarIcon filled={false} className="text-yellow-500" />
//                       <span className="text-gray-600 ml-3">4 Reviews</span>
//                     </span>
//                     <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-3">
//                       <Link
//                         to="/cart"
//                         className="text-gray-600 hover:text-indigo-600 transition-colors"
//                       >
//                         <FaShoppingCart className="w-5 h-5" />
//                       </Link>
//                       <a
//                         href="https://twitter.com"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-600 hover:text-indigo-600 transition-colors"
//                       >
//                         <FaTwitter className="w-5 h-5" />
//                       </a>
//                       <a
//                         href="https://instagram.com"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-600 hover:text-indigo-600 transition-colors"
//                       >
//                         <FaInstagram className="w-5 h-5" />
//                       </a>
//                       <a
//                         href="https://youtube.com"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-gray-600 hover:text-indigo-600 transition-colors"
//                       >
//                         <FaYoutube className="w-5 h-5" />
//                       </a>
//                     </span>
//                   </div>
//                   <p className="leading-relaxed border-b-2 mb-6 pb-6 text-gray-700">
//                     {product.description}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <span className="title-font font-bold text-4xl text-gray-900">
//                       ₹{product.price}
//                     </span>
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => addCart(product)}
//                         className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 transition-shadow shadow-md rounded-lg"
//                       >
//                         Add To Cart
//                       </button>
//                       <button
//                         onClick={toggleHeart}
//                         className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4 transition-colors ${
//                           isHeartFilled ? "bg-red-600" : "bg-gray-200"
//                         } hover:bg-gray-300`}
//                       >
//                         <FaHeart
//                           className={`w-6 h-6 ${
//                             isHeartFilled ? "text-white" : "text-gray-500"
//                           }`}
//                         />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Similar Products Section (ABOVE Reviews) */}
//           {similarProducts.length > 0 && (
//             <section className="text-gray-700 body-font py-12">
//               <div className="container px-5 mx-auto">
//                 <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
//                 <div className="flex flex-wrap -m-4">
//                   {similarProducts.map((item) => (
//                     <div key={item.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
//                       <div className="block relative h-48 rounded overflow-hidden shadow-lg">
//                         <img
//                           alt={item.title}
//                           className="object-cover object-center w-full h-full block"
//                           src={item.imageUrl}
//                         />
//                       </div>
//                       <div className="mt-4">
//                         <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
//                           {item.category}
//                         </h3>
//                         <h2 className="text-gray-900 title-font text-lg font-medium">
//                           {item.title}
//                         </h2>
//                         <p className="mt-1">₹{item.price}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Reviews Section */}
//           <Testimonial
//             reviews={testimonial.filter((item) => item.productId === params.id)}
//           />

//           {/* Add Testimonial Form */}
//           <AddTestimonial productId={params.id} />
//         </>
//       )}
//     </Layout>
//   );
  
// }

// export default ProductInfo;




import React, { useContext, useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { MyContext } from "../../context api/myContext";
import Loader from "../../components/loader/Loader";
import { FaHeart, FaShoppingCart, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Testimonial from "../../components/testimonial/Testimonial";
import AddTestimonial from "../../components/testimonial/AddTestimonial";

// Star Component
const StarIcon = ({ filled = true }) => (
  <svg
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="w-5 h-5 text-yellow-400"
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function ProductInfo() {
  const { loading, setLoading, testimonial } = useContext(MyContext);
  const [product, setProduct] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
//   const discount = product.discount || 0;
// const finalPrice = product.price - (product.price * discount) / 100;




  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      if (productTemp.exists()) {
        const data = { id: productTemp.id, ...productTemp.data() };
        setProduct(data);
        getSimilarProducts(data.category, data.id);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const getSimilarProducts = async (category, productId) => {
    try {
      const q = query(collection(fireDB, "products"), where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const products = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== productId) products.push({ id: doc.id, ...doc.data() });
      });
      setSimilarProducts(products.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
    window.scrollTo(0, 0);
  }, [params.id]);

  const addCart = (product) => {
    if (cartItems.some((item) => item.id === product.id)) {
      toast.info("Already in cart!");
    } else {
      dispatch(addToCart({ ...product, quantity: 1, time: product.time?.seconds ?? Date.now() }));
      toast.success("Added to cart!");
    }
  };

  const toggleHeart = () => setIsHeartFilled((prev) => !prev);

  if (loading || !product) return <Loader />;
    const discount = product?.discount || 0;
  // const finalPrice = product ? product.price - (product.price * discount) / 100 : 0;
  const finalPrice = Math.round(
  product.price - (product.price * discount) / 100
);

  return (
    <Layout>
      {/* Product Hero */}
      <section className="container mx-auto px-5 py-12 flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        {/* <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-xl flex justify-center items-center hover:shadow-2xl transition-shadow">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="rounded-xl lg:h-[32rem] h-64 object-contain w-full transition-transform hover:scale-105"
          />
        </div> */}
        <div className="lg:w-1/2 bg-white p-6 rounded-2xl shadow-xl flex justify-center items-center hover:shadow-2xl transition-shadow relative">

  {/* 🔥 Discount badge */}
  {discount > 0 && (
    <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm z-10">
      {discount}% OFF
    </span>
  )}

  <img
    src={product.imageUrl}
    alt={product.title}
    className="rounded-xl lg:h-[32rem] h-64 object-contain w-full transition-transform hover:scale-105"
  />
</div>

        {/* Product Info */}
        <div className="lg:w-1/2 flex flex-col justify-between bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div>
            <h2 className="text-sm text-gray-500 uppercase tracking-wide">{product.brand || "Brand Name"}</h2>
            <h1 className="text-4xl font-bold mt-1">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center mt-4 mb-4 space-x-2">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < 4} />
              ))}
              <span className="ml-3 text-gray-600">4 Reviews</span>
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Price & Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">

            {/* <span className="text-3xl font-bold text-gray-900">₹{product.price}</span> */}
            <div className="flex items-center gap-3">
  <span className="text-3xl font-bold text-green-600">
    ₹{finalPrice}
  </span>

  {discount > 0 && (
    <>
      <span className="line-through text-gray-400 text-lg">
        ₹{product.price}
      </span>

      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
        {discount}% OFF
      </span>
    </>
  )}
</div>

            <div className="flex gap-3">
              <button
                onClick={() => addCart(product)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all"
              >
                Add to Cart
              </button>
              <button
                onClick={toggleHeart}
                className={`p-3 rounded-full transition-all ${
                  isHeartFilled ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"
                } hover:bg-gray-300`}
              >
                <FaHeart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
              <FaTwitter size={22} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pink-500 transition-colors">
              <FaInstagram size={22} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-red-500 transition-colors">
              <FaYoutube size={22} />
            </a>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-5">
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => {
  const itemDiscount = item?.discount || 0;
  // const itemFinalPrice =
  //   item.price - (item.price * itemDiscount) / 100;
  const  itemFinalPrice = Math.round(
  product.price - (product.price * itemDiscount) / 100
);

  return (
    <div
      key={item.id}
      onClick={() => navigate(`/productinfo/${item.id}`)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow transform hover:scale-105"
    >
      {/* image */}
      <div className="relative">
        {itemDiscount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
            {itemDiscount}% OFF
          </span>
        )}

        <img
          className="w-full h-48 object-contain p-4"
          src={item.imageUrl}
          alt={item.title}
        />
      </div>

      <div className="p-4">
        <h3 className="text-xs text-gray-500 mb-1">{item.category}</h3>
        <h2 className="text-lg font-medium text-gray-900">{item.title}</h2>

        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-green-600">
            ₹{Math.round(itemFinalPrice)}
          </span>

          {itemDiscount > 0 && (
            <span className="line-through text-gray-400 text-sm">
              ₹{item.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
})}
              
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="container mx-auto px-5 py-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <Testimonial reviews={testimonial.filter((item) => item.productId === params.id)} />
        {/* <Testimonial productId={params.id} /> */}
      </section>

      {/* Add Review Form */}
      <section className="container mx-auto px-5 pb-12">
        <AddTestimonial productId={params.id} />
      </section>
    </Layout>
  );
}

export default ProductInfo;