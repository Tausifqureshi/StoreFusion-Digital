import React, { useState, useCallback, useEffect } from "react";

const GallerySection = React.memo(function GallerySection({ mainImage, setMainImage, gallery, discount, isDark }) {
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const [fadeKey, setFadeKey] = useState(0); // Image change pe fade trigger karo

  const handleMouseMove = useCallback((e) => {
    if (window.innerWidth < 1024) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomPos({ x, y, show: true });
  }, []);

  // Jab bhi mainImage badle, fade animation trigger karo
  const handleThumbHover = useCallback((img) => {
    setMainImage(img);
    setFadeKey(prev => prev + 1); // key change se animation restart hogi
  }, [setMainImage]);

  return (
    <div className="w-full lg:w-[48%] flex flex-col md:flex-row gap-4 items-center md:items-start lg:sticky lg:top-32">
      {/* Thumbnails */}
      <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1 w-full md:w-auto justify-center md:justify-start no-scrollbar py-2">
        {gallery.map((img, i) => (
          <div
            key={i}
            onMouseEnter={() => handleThumbHover(img)}
            onClick={() => handleThumbHover(img)}
            className={`w-14 h-14 md:w-20 md:h-20 border-2 rounded-xl cursor-pointer overflow-hidden p-1.5 transition-all flex-shrink-0 bg-transparent
              ${mainImage === img ? "border-blue-600 shadow-md scale-105" : "border-gray-100 opacity-60 hover:opacity-100 hover:border-gray-300 hover:scale-105"}
              ${isDark ? "border-gray-700" : ""}`}
          >
            <img src={img} alt="thumb" loading="lazy" decoding="async" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>

      {/* Main Image with Zoom */}
      <div
        className={`relative flex-1 w-full max-w-[400px] md:max-w-none border rounded-[30px] md:rounded-[40px] overflow-hidden p-4 md:p-8 order-1 md:order-2 flex justify-center items-center cursor-crosshair
          ${isDark ? "border-gray-800 bg-transparent" : "border-gray-50 shadow-xl shadow-gray-100 bg-white"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomPos((prev) => ({ ...prev, show: false }))}
      >
        {discount > 0 && (
          <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-black z-10 shadow-lg">
            {discount}% OFF
          </span>
        )}
        {/* key prop se React image re-mount karta hai → CSS animation se fade in hoti hai */}
        <img
          key={fadeKey}
          src={mainImage}
          alt="product"
          loading="eager"
          fetchpriority="high"
          className="w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-contain animate-fadeIn"
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

export default GallerySection;
