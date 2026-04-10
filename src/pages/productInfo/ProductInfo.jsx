import React, { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } from "../../redux/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ProductAdminContext, ProductContext, ThemeContext } from '../../context api/AllContext';
import LoaderSpinner from "../../components/loader/LoaderSpinner";
import { saveCart } from "../../pages/cart/cartService";
import { store } from "../../redux/store";
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
import SingleProductCard from "../../components/productCard/SingleProductCard";

// ✅ GALLERY SECTION: Memoized to prevent re-renders when other sections change
const GallerySection = React.memo(function GallerySection({ mainImage, setMainImage, gallery, discount, isDark }) {
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 1024) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y, show: true });
  }, []);

  return (
    <div className="w-full lg:w-[48%] flex flex-col md:flex-row gap-4 items-center md:items-start lg:sticky lg:top-32">
      <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1 w-full md:w-auto justify-center md:justify-start no-scrollbar py-2">
        {gallery.map((img, i) => (
          <div
            key={i}
            onMouseEnter={() => setMainImage(img)}
            onClick={() => setMainImage(img)}
            className={`w-14 h-14 md:w-20 md:h-20 border-2 rounded-xl cursor-pointer overflow-hidden p-1.5 transition-all bg-white flex-shrink-0 ${mainImage === img ? "border-blue-600 shadow-md scale-105" : "border-gray-100 opacity-60 hover:opacity-100"}`}
          >
            <img src={img} alt="thumb" loading="lazy" decoding="async" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>

      <div
        className={`relative flex-1 w-full max-w-[400px] md:max-w-none border rounded-[30px] md:rounded-[40px] overflow-hidden bg-white p-4 md:p-8 order-1 md:order-2 flex justify-center items-center cursor-crosshair ${isDark ? "border-gray-800" : "border-gray-50 shadow-xl shadow-gray-100"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomPos(prev => ({ ...prev, show: false }))}
      >
        {discount > 0 && (
          <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black z-10 shadow-lg">
            {discount}% OFF
          </span>
        )}
        <img
          src={mainImage}
          alt="product"
          loading="eager"
          fetchpriority="high"
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
  );
});

// ✅ PRODUCT ACCORDION: Self-contained state prevents whole-page re-renders on toggle
const ProductAccordion = React.memo(function ProductAccordion({ accordionData, isDark }) {
  const [openIndex, setOpenIndex] = useState(0);
  const handleToggle = useCallback((index) => {
    setOpenIndex(prev => prev === index ? null : index);
  }, []);

  return (
    <div className="space-y-3 px-1 md:px-0">
      {accordionData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.id} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isDark ? "border-gray-800 bg-[#1e293b]" : "border-gray-50 bg-gray-50 shadow-sm"}`}>
            <button onClick={() => handleToggle(index)} className="w-full flex justify-between items-center p-4 text-left outline-none">
              <h3 className={`font-black text-[10px] md:text-[11px] uppercase tracking-widest ${isOpen && !isDark ? "text-blue-600" : ""}`}>{item.title}</h3>
              <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>{item.icon}</span>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-60 opacity-100 px-4 pb-4" : "max-h-0 opacity-0"}`}>
              <div className="text-xs md:text-sm leading-relaxed opacity-70 text-left">{item.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

// ✅ SIMILAR PRODUCTS: Memoized to avoid re-renders on every scroll/image change
const SimilarProductsSection = React.memo(function SimilarProductsSection({ similarProducts, expandedId, setExpandedId, mode, handleViewAll, isDark }) {
  return (
    <section className="mt-12 lg:mt-24 border-t border-gray-100 dark:border-gray-800 pt-8 px-2 md:px-0">
      <div className="flex items-center justify-between mb-6 lg:mb-10">
        <div className="flex flex-col">
          <h2 className={`text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tighter italic ${isDark ? "text-white" : "text-gray-900"}`}>
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
      <div className="flex flex-wrap -m-4">
        {similarProducts.map((item, index) => (
          <SingleProductCard
            key={item.id || index}
            item={item}
            isExpanded={expandedId === (item.id || item.title)}
            setExpandedId={setExpandedId}
            mode={mode}
          />
        ))}
      </div>
    </section>
  );
});

function ProductInfo() {
  const { product } = useContext(ProductContext);
  const { loading } = useContext(ProductAdminContext);
  const { mode } = useContext(ThemeContext);

  const [mainImage, setMainImage] = useState("");
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const isDark = mode === "dark";

  const currentProduct = useMemo(() => product?.find((item) => item.id === params.id), [product, params.id]);

  const similarProducts = useMemo(() => {
    if (!currentProduct || !product) return [];
    return product
      .filter((item) => item.category === currentProduct.category && item.id !== currentProduct.id)
      .slice(0, 4);
  }, [product, currentProduct]);

  useEffect(() => {
    if (currentProduct) {
      setMainImage(currentProduct.imageUrl);
      window.scrollTo(0, 0);
    }
  }, [currentProduct, params.id]);

  // ✅ Handlers moved to sub-components where possible for better isolation

  const isProductInCart = useMemo(() => cartItems.find((cartItem) => cartItem?.id === currentProduct?.id), [cartItems, currentProduct]);

  const handleIncrement = useCallback(async () => {
    if (isProductInCart && isProductInCart.quantity >= Number(currentProduct.stock || Infinity)) {
      toast.error(`Only ${currentProduct.stock} left in stock!`, { position: "top-right", autoClose: 1000 });
      return;
    }
    dispatch(incrementQuantity(currentProduct.id));
    await saveCart(store.getState().cart);
  }, [dispatch, isProductInCart, currentProduct]);

  const handleDecrement = useCallback(async () => {
    if (isProductInCart?.quantity === 1) {
      dispatch(deleteFromCart(currentProduct.id));
      toast.info("Product removed from cart!", { icon: "🗑️", autoClose: 1000, position: "top-right" });
    } else {
      dispatch(decrementQuantity(currentProduct.id));
    }
    await saveCart(store.getState().cart);
  }, [dispatch, isProductInCart, currentProduct]);

  const handleAddToCart = useCallback(async () => {
    if (Number(currentProduct.stock || 0) === 0) {
      toast.error("Product is out of stock!", { position: "top-right", autoClose: 1000 });
      return;
    }
    const serializedProduct = { ...currentProduct, quantity: 1, time: currentProduct.time?.seconds ?? Date.now() };
    dispatch(addToCart(serializedProduct));
    await saveCart(store.getState().cart);
    toast.success("Product added to cart!", { position: "top-right", autoClose: 1000 });
  }, [dispatch, currentProduct]);

  const handleViewAll = useCallback(() => {
    navigate(`/allproducts`);
  }, [navigate]);

  const accordionData = useMemo(() => {
    if (!currentProduct) return [];
    return [
      { id: 1, title: "Specifications", text: currentProduct.description || "No description available", icon: <FaChevronDown size={14} /> },
      {
        id: 2, title: "Available Coupons", text: (
          <div className="p-3 border border-dashed border-orange-300 rounded-xl bg-orange-50 text-[9px] font-bold text-orange-800 uppercase">
            CODE: FUSION20 | Flat 20% Off on your first order
          </div>
        ), icon: <FaTag size={14} className="text-orange-500" />
      },
    ];
  }, [currentProduct]);

  if (loading || !currentProduct) return <LoaderSpinner isDark={isDark} label="Loading product..." />;

  const discount = currentProduct?.discount || 0;
  const finalPrice = Math.round(currentProduct.price - (currentProduct.price * discount) / 100);
  const gallery = [currentProduct.imageUrl, currentProduct.imageUrl2 || currentProduct.imageUrl, currentProduct.imageUrl3 || currentProduct.imageUrl];

  return (
    <>
      <div className={`min-h-screen py-6 lg:py-10 pt-24 lg:pt-32 transition-all ${isDark ? "bg-[#131921] text-white" : "bg-white text-gray-900"}`}>
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">

            <GallerySection
              mainImage={mainImage}
              setMainImage={setMainImage}
              gallery={gallery}
              discount={discount}
              isDark={isDark}
            />

            <div className="w-full lg:w-[50%] flex flex-col space-y-6 text-center lg:text-left">
              <div>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight mb-3">
                  {currentProduct.title}
                </h1>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">{currentProduct.category}</span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 uppercase tracking-widest border-l pl-3 border-gray-300"><FaCheckCircle /> Verified Quality</span>
                </div>
              </div>

              <div className="py-2 md:py-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
                  <span className={`text-3xl md:text-4xl font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>₹ {finalPrice}</span>
                  {discount > 0 && <span className="text-lg md:text-xl line-through text-gray-400 mb-1">₹ {currentProduct.price}</span>}
                </div>
                <div className="flex flex-col gap-1 mt-2 mb-1 text-center lg:text-left">
                  {Number(currentProduct.stock || 0) > 0 ? (
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-orange-500">Stock Available: {currentProduct.stock}</span>
                  ) : (
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] text-red-500">Out of Stock</span>
                  )}
                  <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] mt-1 opacity-80">Shipping calculated at checkout</p>
                </div>
              </div>

              <ProductAccordion
                accordionData={accordionData}
                isDark={isDark}
              />

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 dark:border-gray-800">
                <div className="text-center space-y-1">
                  <FaTruck className="mx-auto text-blue-600" size={18} />
                  <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">Express Ship</p>
                </div>
                <div className="text-center space-y-1">
                  <FaSyncAlt className="mx-auto text-orange-500" size={18} />
                  <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">Easy Returns</p>
                </div>
                <div className="text-center space-y-1">
                  <FaShieldAlt className="mx-auto text-green-600" size={18} />
                  <p className="text-[8px] md:text-[10px] font-black uppercase opacity-60">SSL Secure</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {Number(currentProduct?.stock || 0) === 0 ? (
                  <button disabled className="flex-[3] py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] cursor-not-allowed">Out Of Stock</button>
                ) : (
                  <>
                    {isProductInCart ? (
                      <div className="flex-[2] flex justify-between items-center bg-blue-600 text-white rounded-2xl overflow-hidden shadow-xl shadow-blue-500/20">
                        <button onClick={handleDecrement} className="py-4 px-6 sm:px-8 hover:bg-blue-700 font-bold transition-colors text-xl active:scale-90">-</button>
                        <span className="text-sm md:text-base font-black pointer-events-none flex-1 text-center border-x border-blue-500/30 flex items-center justify-center">{isProductInCart.quantity}</span>
                        <button onClick={handleIncrement} className="py-4 px-6 sm:px-8 hover:bg-blue-700 font-bold transition-colors text-xl active:scale-90">+</button>
                      </div>
                    ) : (
                      <button onClick={handleAddToCart} className="flex-[2] py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex justify-center items-center gap-2">Add To Shopping Bag</button>
                    )}
                    <button onClick={() => navigate('/cart')} className="flex-1 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-xl shadow-orange-500/20 transition-all active:scale-95">Go To Bag</button>
                  </>
                )}
                <button onClick={() => setIsHeartFilled(!isHeartFilled)} className={`p-4 md:p-5 rounded-2xl border flex items-center justify-center transition-all ${isHeartFilled ? "bg-red-500 border-red-500 text-white" : "border-gray-200 text-gray-400"}`}><FaHeart size={18} /></button>
              </div>
            </div>
          </div>

          <SimilarProductsSection
            similarProducts={similarProducts}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            mode={mode}
            handleViewAll={handleViewAll}
            isDark={isDark}
          />

          <div className="mt-20 lg:mt-12 pt-12 lg:pt-10 border-t border-gray-100 dark:border-gray-800 space-y-16 lg:space-y-24">
            <section className="w-full mx-auto">
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-center mb-10 italic">
                Community <span className="text-orange-500">Feedback</span>
              </h2>
              <Testimonial productId={params.id} mode={mode} />
            </section>
            <section className="w-full max-w-2xl mx-auto pb-10 px-2">
              <AddTestimonial productId={params.id} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(ProductInfo);
