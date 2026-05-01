import React, { useMemo } from "react";
import { FaHeart, FaTruck, FaShieldAlt, FaSyncAlt, FaCheckCircle, FaChevronDown, FaTag } from "react-icons/fa";
import ProductAccordion from "./ProductAccordion";

const ProductAction = React.memo(function ProductAction({
  currentProduct,
  finalPrice,
  discount,
  isDark,
  productDescription,
  isProductInCart,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
  navigate,
  isHeartFilled,
  setIsHeartFilled,
}) {
  // JSX wala accordion data yahan banta hai (hooks mein JSX nahi chalti .js file me)
  const accordionData = useMemo(() => [
    {
      id: 1,
      title: "Specifications",
      text: productDescription,
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
  ], [productDescription]);

  return (
    <div className="w-full lg:w-[50%] flex flex-col space-y-6 text-center lg:text-left">
      {/* Title & Category */}
      <div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight mb-3">
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

      {/* Price & Stock */}
      <div className="py-2 md:py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-1">
          <span className={`text-3xl md:text-4xl font-medium ${isDark ? "text-white" : "text-gray-900"}`}>
            ₹ {finalPrice}
          </span>
          {discount > 0 && (
            <span className="text-lg md:text-xl line-through text-gray-400 mb-1">₹ {currentProduct.price}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-2 mb-1 text-center lg:text-left">
          {Number(currentProduct.stock || 0) > 0 ? (
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-orange-500">
              Stock Available: {currentProduct.stock}
            </span>
          ) : (
            <span className="text-[10px] font-black uppercase tracking-[0.1em] text-red-500">Out of Stock</span>
          )}
          <p className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] mt-1 opacity-80">
            Shipping calculated at checkout
          </p>
        </div>
      </div>

      {/* Accordion: Specifications & Coupons */}
      <ProductAccordion accordionData={accordionData} isDark={isDark} />

      {/* Trust Badges */}
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

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        {Number(currentProduct?.stock || 0) === 0 ? (
          <button
            disabled
            className="flex-[3] py-4 rounded-2xl bg-red-600 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] cursor-not-allowed"
          >
            Out Of Stock
          </button>
        ) : (
          <>
            {isProductInCart ? (
              <div className="flex-[2] flex justify-between items-center bg-blue-600 text-white rounded-2xl overflow-hidden shadow-xl shadow-blue-500/20">
                <button onClick={handleDecrement} className="py-4 px-6 sm:px-8 hover:bg-blue-700 font-bold transition-colors text-xl active:scale-90">
                  -
                </button>
                <span className="text-sm md:text-base font-black pointer-events-none flex-1 text-center border-x border-blue-500/30 flex items-center justify-center">
                  {isProductInCart.quantity}
                </span>
                <button onClick={handleIncrement} className="py-4 px-6 sm:px-8 hover:bg-blue-700 font-bold transition-colors text-xl active:scale-90">
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex-[2] py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                Add To Shopping Bag
              </button>
            )}
            <button
              onClick={() => navigate("/cart")}
              className="flex-1 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-xl shadow-orange-500/20 transition-all active:scale-95"
            >
              Go To Bag
            </button>
          </>
        )}
        <button
          onClick={() => setIsHeartFilled(!isHeartFilled)}
          className={`p-4 md:p-5 rounded-2xl border flex items-center justify-center transition-all ${
            isHeartFilled ? "bg-red-500 border-red-500 text-white" : "border-gray-200 text-gray-400"
          }`}
        >
          <FaHeart size={18} />
        </button>
      </div>
    </div>
  );
});

export default ProductAction;
