import React, { useState, memo, useMemo, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// ✅ Static data outside (Performance unlock)
const SLIDES_DATA = [
  {
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop",
    title: "PREMIUM TECH",
    highlight: "DEALS",
    desc: "Upgrade your workstation with next-gen electronics. Professional gear for the modern setup.",
    price: "UP TO 60% OFF",
    btnText: "Explore Tech",
    link: "/allproducts",
  },
  {
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    title: "EXCLUSIVE",
    highlight: "COLLECTION",
    desc: "Handpicked premium products across all categories. Only at StoreFusion.",
    price: "FREE SHIPPING ON FIRST ORDER",
    btnText: "Start Shopping",
    link: "/allproducts",
  },
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
    title: "TRENDING",
    highlight: "ESSENTIALS",
    desc: "Redefine your style with our latest lifestyle products. Minimalist design for everyday use.",
    price: "FLAT ₹500 CASHBACK",
    btnText: "View Essentials",
    link: "/allproducts",
  },
];

// ✅ SEPARATE SLIDE CONTENT: To prevent entire Swiper re-render on progress update
const SlideContent = memo(({ item, isDark }) => (
  <div className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] overflow-hidden">
    <img
      src={item.img}
      alt={item.title}
      loading="eager"
      className="w-full h-full object-cover transition-transform duration-[6000ms] scale-105"
    />
    <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-r from-black/80 via-black/40 to-transparent" : "bg-black/40"}`} />
    
    <div className="absolute inset-0 flex items-center px-8 md:px-20">
      <div className="text-white max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-4 w-[2px] bg-orange-500"></span>
          <p className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">Featured Deals 2026</p>
        </div>
        
        <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none uppercase mb-4">
          {item.title} <br />
          <span className="text-orange-500">{item.highlight}</span>
        </h2>
        
        <p className="text-sm md:text-lg text-gray-300 mb-2 max-w-md font-medium">{item.desc}</p>
        <p className="text-xl md:text-3xl font-black italic text-yellow-400 mb-8 uppercase tracking-tighter bg-black/30 inline-block px-2">
          {item.price}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to={item.link}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95">
              {item.btnText}
            </button>
          </Link>
          <Link to="/allproducts">
            <button className="border border-white/30 backdrop-blur-md px-10 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all">
              Shop All
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
));

// ✅ PROGRESS BAR: Atomic component
const ProgressBar = memo(({ active, total }) => {
  const width = `${((active + 1) / total) * 100}%`;
  return (
    <div className="h-[4px] w-full bg-gray-800 rounded-full overflow-hidden mb-3">
      <div
        className="h-full bg-blue-600 transition-all duration-[3200ms] ease-linear shadow-[0_0_10px_rgba(37,99,235,0.8)]"
        style={{ width }}
      />
    </div>
  );
});

const SwiperContainer = memo(({ isDark }) => {
  const [active, setActive] = useState(0);
  const modules = useMemo(() => [Autoplay, Pagination, EffectFade], []);

  const handleSlideChange = useCallback((s) => {
    setActive(s.realIndex);
  }, []);

  return (
    <>
      <ProgressBar active={active} total={SLIDES_DATA.length} />
      <Swiper
        modules={modules}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        loop
        onSlideChange={handleSlideChange}
        className="rounded-[32px] shadow-2xl border border-gray-800/10 overflow-hidden"
      >
        {SLIDES_DATA.map((item) => (
          <SwiperSlide key={item.title}>
            <SlideContent item={item} isDark={isDark} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
});



const HeroSection = memo(({ mode }) => {
  const isDark = mode === "dark";

  return (
    <div className="px-3 md:px-6 pt-20 md:pt-28 pb-10">
      <SwiperContainer isDark={isDark} />
    </div>
  );
});


export default HeroSection;
