import React, { useContext } from "react";
import { UserContext } from "../../context/AllContext";
import LoaderSpinner from "../../components/loader/LoaderSpinner";
import Testimonial from "../../components/testimonial/Testimonial";
import AddTestimonial from "../../components/testimonial/AddTestimonial/AddTestimonial";

import GallerySection from "./components/GallerySection";
import ProductAction from "./components/ProductAction";
import SimilarProduct from "./components/SimilarProduct";
import { useProductInfo } from "./hooks/useProductInfo";

function ProductInfo() {
  const {
    loading,
    currentProduct,
    mainImage,
    setMainImage,
    isHeartFilled,
    setIsHeartFilled,
    expandedId,
    setExpandedId,
    isDark,
    mode,
    params,
    navigate,
    similarProducts,
    isProductInCart,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    handleViewAll,
    productDescription,
    discount,
    finalPrice,
    gallery,
  } = useProductInfo();

  const { loggedInUser } = useContext(UserContext);
  const isAdmin = loggedInUser?.role === "admin";

  if (loading || !currentProduct) return <LoaderSpinner isDark={isDark} label="Loading product..." />;

  return (
    <>
      <div className={`min-h-screen py-6 lg:py-10 pt-28 lg:pt-28 transition-all ${isDark ? "bg-[#1a1f2e] text-white" : "bg-white text-gray-900"}`}>
        <div className="container mx-auto px-4 lg:px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center">

            <GallerySection
              mainImage={mainImage}
              setMainImage={setMainImage}
              gallery={gallery}
              discount={discount}
              isDark={isDark}
            />

            <ProductAction
              currentProduct={currentProduct}
              finalPrice={finalPrice}
              discount={discount}
              isDark={isDark}
              productDescription={productDescription}
              isProductInCart={isProductInCart}
              handleIncrement={handleIncrement}
              handleDecrement={handleDecrement}
              handleAddToCart={handleAddToCart}
              navigate={navigate}
              isHeartFilled={isHeartFilled}
              setIsHeartFilled={setIsHeartFilled}
            />

          </div>

          <SimilarProduct
            similarProducts={similarProducts}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            mode={mode}
            handleViewAll={handleViewAll}
            isDark={isDark}
          />

          <div className="mt-20 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-100 dark:border-gray-800 space-y-8 lg:space-y-12">
            <Testimonial productId={params.id} mode={mode} />
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
