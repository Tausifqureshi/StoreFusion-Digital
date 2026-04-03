// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// // import "swiper/css/navigation";

// // Import required modules
// import { Autoplay, Pagination, Navigation } from "swiper/modules";

// function HeroSection() {
//   return (
//     <Swiper
//       modules={[Autoplay, Pagination, Navigation]} // Include the required modules
//       spaceBetween={30} // Space between slides
//       pagination={{ clickable: true }} // Enable pagination
//       navigation // Enable navigation buttons
//       autoplay={{ delay: 4000, disableOnInteraction: false }} // Autoplay with a delay of 3 seconds
//       loop={true}
//     > 
//       <SwiperSlide>
//         <img
//           src="https://static.vecteezy.com/system/resources/previews/011/871/820/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
//           alt="Online Shopping 1"
//           loading="lazy" 
//           style={{ width: "100%", height: "auto" }} // Responsive image styling
//         />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img
//           src="https://static.vecteezy.com/system/resources/previews/011/871/813/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
//           alt="Online Shopping 2"
//           loading="lazy" 
//           style={{ width: "100%", height: "auto" }} // Responsive image styling
//         />
//       </SwiperSlide> 
//       <SwiperSlide>
//         <img
//           src="https://static.vecteezy.com/system/resources/thumbnails/004/858/012/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
//           alt="Online Shopping 2"
//           loading="lazy" 
//           style={{ width: "100%", height: "auto" }} // Responsive image styling
//         />
//       </SwiperSlide>
//     </Swiper>
//   );
// }

// export default HeroSection;



import React, { useState, memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// 1. Data ko component se bahar rakho (Performance Boost)
const SLIDES_DATA = [
  {
    img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop",
    title: "PREMIUM TECH",
    highlight: "DEALS",
    desc: "Upgrade your workstation with next-gen electronics. Professional gear for the modern setup.",
    price: "UP TO 60% OFF",
    btnText: "Explore Tech",
    link: "/allproducts"
  },
  {
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    title: "EXCLUSIVE",
    highlight: "COLLECTION",
    desc: "Handpicked premium products across all categories. Only at StoreFusion.",
    price: "FREE SHIPPING ON FIRST ORDER",
    btnText: "Start Shopping",
    link: "/allproducts"
  },
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
    title: "TRENDING",
    highlight: "ESSENTIALS",
    desc: "Redefine your style with our latest lifestyle products. Minimalist design for everyday use.",
    price: "FLAT ₹500 INSTANT CASHBACK",
    btnText: "View Essentials",
    link: "/allproducts"
  },
];

// 2. Component ko memoize kiya (Faltu renders stop karne ke liye)
const HeroSection = memo(({ mode }) => {
  const [active, setActive] = useState(0);
  const isDark = mode === "dark";

  // 3. Progress bar width ko memoize karo
  const progressWidth = useMemo(() => {
    return `${((active + 1) / SLIDES_DATA.length) * 100}%`;
  }, [active]);

  return (
    <div className="px-3 md:px-6 pt-20 md:pt-28 transition-all duration-300">

      {/* --- TOP PROGRESS BAR --- */}
      <div className={`h-[4px] w-full rounded-full overflow-hidden mb-3 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div
          className="h-full bg-blue-600 transition-all duration-[3200ms] ease-linear shadow-[0_0_8px_rgba(37,99,235,0.6)]"
          style={{ width: progressWidth }}
        />
      </div>

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        pagination={{ clickable: true }}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        loop
        onSlideChange={(s) => setActive(s.realIndex)}
        className="rounded-[24px] md:rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800"
      >
        {SLIDES_DATA.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="relative w-full h-[450px] sm:h-[480px] md:h-[580px] lg:h-[640px] overflow-hidden bg-black">

              {/* --- IMAGE (With Lazy Loading Optimization) --- */}
              <img
                src={item.img}
                alt={item.title}
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-[6000ms] scale-100"
              />

              {/* --- OVERLAY --- */}
              <div className={`absolute inset-0 bg-gradient-to-r ${isDark
                  ? "from-[#0f172a] via-[#0f172a]/70 to-transparent"
                  : "from-black/70 via-black/20 to-transparent"
                }`} />

              {/* --- CONTENT --- */}
              <div className="absolute inset-0 flex items-center px-8 md:px-20">
                <div className="max-w-2xl text-white">

                  {/* Floating Label */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-4 w-[2px] bg-orange-500"></span>
                    <p className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
                      Featured Deals 2026
                    </p>
                  </div>

                  {/* Title */}
                  <h2 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] uppercase mb-4">
                    {item.title} <br />
                    <span className="text-orange-500">{item.highlight}</span>
                  </h2>

                  {/* Desc */}
                  <p className="text-sm md:text-lg text-gray-300 mb-2 max-w-md font-medium leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Price Tag */}
                  <p className="text-xl md:text-3xl font-black italic text-yellow-400 mb-8 uppercase tracking-tighter bg-black/30 inline-block px-2">
                    {item.price}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
                    <Link to={item.link} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-12 py-3.5 md:py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95">
                        {item.btnText}
                      </button>
                    </Link>

                    <Link to="/allproducts" className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 md:px-12 py-3.5 md:py-4 rounded-2xl border border-white/30 backdrop-blur-md hover:bg-white hover:text-black transition-all text-white active:scale-95">
                      <span className="font-black text-[11px] uppercase tracking-widest">Shop All</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="absolute bottom-10 right-10 hidden lg:block">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-[20px] shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Authentic Gear</p>
                  <p className="text-sm font-black italic text-white">STOREFUSION VERIFIED</p>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default HeroSection;

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";
// import { Autoplay, Pagination, EffectFade } from "swiper/modules";
// import { Link } from "react-router-dom";
// import { useState, useContext } from "react";
// import { MyContext } from "../../context api/myContext";

// function HeroSection({ mode }) {
//   const [active, setActive] = useState(0);
//   // const { mode } = useContext(MyContext);
//   const isDark = mode === "dark";

//   const slides = [
//     {
//       // 1. REAL TECH FEEL
//       img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop",
//       title: "PREMIUM TECH",
//       highlight: "DEALS",
//       desc: "Upgrade your workstation with next-gen electronics. Professional gear for the modern setup.",
//       price: "UP TO 60% OFF",
//       btnText: "Explore Tech",
//       link: "/allproducts"
//     },
//     {
//       // 2. REAL STORE FEEL
//       img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
//       title: "EXCLUSIVE",
//       highlight: "COLLECTION",
//       desc: "Handpicked premium products across all categories. Only at StoreFusion.",
//       price: "FREE SHIPPING ON FIRST ORDER",
//       btnText: "Start Shopping",
//       link: "/allproducts"
//     },
//     {
//       // 3. REAL LIFESTYLE
//       img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
//       title: "TRENDING",
//       highlight: "ESSENTIALS",
//       desc: "Redefine your style with our latest lifestyle products. Minimalist design for everyday use.",
//       price: "FLAT ₹500 INSTANT CASHBACK",
//       btnText: "View Essentials",
//       link: "/allproducts"
//     },
//   ];

//   return (
//     /* Navbar height ke hisaab se padding-top (pt) adjust kiya hai */
//     <div className={`px-3 md:px-6 pt-20 md:pt-28 transition-all duration-300`}>

//       {/* --- TOP PROGRESS BAR (Navbar ke thik niche dikhega) --- */}
//       <div className={`h-[4px] w-full rounded-full overflow-hidden mb-3 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
//         <div
//           className="h-full bg-blue-600 transition-all duration-[3200ms] ease-linear shadow-[0_0_8px_rgba(37,99,235,0.6)]"
//           style={{ width: `${((active + 1) / slides.length) * 100}%` }}
//         />
//       </div>

//       <Swiper
//         modules={[Autoplay, Pagination, EffectFade]}
//         effect="fade"
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3200, disableOnInteraction: false }}
//         loop
//         onSlideChange={(s) => setActive(s.realIndex)}
//         className="rounded-[24px] md:rounded-[40px] shadow-2xl border border-gray-100 dark:border-gray-800"
//       >
//         {slides.map((item, i) => (
//           <SwiperSlide key={i}>
//             <div className="relative w-full h-[450px] sm:h-[480px] md:h-[580px] lg:h-[640px] overflow-hidden bg-black">

//               {/* --- IMAGE --- */}
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 loading={i === 0 ? "eager" : "lazy"}
//                 className="w-full h-full object-cover transition-transform duration-[6000ms] scale-100"
//               />

//               {/* --- OVERLAY --- */}
//               <div className={`absolute inset-0 bg-gradient-to-r ${isDark
//                 ? "from-[#0f172a] via-[#0f172a]/70 to-transparent"
//                 : "from-black/70 via-black/20 to-transparent"
//                 }`} />

//               {/* --- CONTENT --- */}
//               <div className="absolute inset-0 flex items-center px-8 md:px-20">
//                 <div className="max-w-2xl text-white">

//                   {/* Floating Label */}
//                   <div className="flex items-center gap-3 mb-5">
//                     <span className="h-4 w-[2px] bg-orange-500"></span>
//                     <p className="text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
//                       Featured Deals 2026
//                     </p>
//                   </div>

//                   {/* Title */}
//                   <h2 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.85] uppercase mb-4">
//                     {item.title} <br />
//                     <span className="text-orange-500">{item.highlight}</span>
//                   </h2>

//                   {/* Desc */}
//                   <p className="text-sm md:text-lg text-gray-300 mb-2 max-w-md font-medium leading-relaxed">
//                     {item.desc}
//                   </p>

//                   {/* Price Tag */}
//                   <p className="text-xl md:text-3xl font-black italic text-yellow-400 mb-8 uppercase tracking-tighter bg-black/30 inline-block px-2">
//                     {item.price}
//                   </p>

//                   {/* Action Buttons */}
//                   <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
//                     <Link to={item.link} className="w-full sm:w-auto">
//                       <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-12 py-3.5 md:py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl transition-all active:scale-95">
//                         {item.btnText}
//                       </button>
//                     </Link>

//                     <Link to="/allproducts" className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 md:px-12 py-3.5 md:py-4 rounded-2xl border border-white/30 backdrop-blur-md hover:bg-white hover:text-black transition-all text-white active:scale-95">
//                       <span className="font-black text-[11px] uppercase tracking-widest">Shop All</span>
//                       <span className="group-hover:translate-x-1 transition-transform">→</span>
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               {/* Trust Badge */}
//               <div className="absolute bottom-10 right-10 hidden lg:block">
//                 <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-[20px] shadow-2xl">
//                   <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Authentic Gear</p>
//                   <p className="text-sm font-black italic text-white">STOREFUSION VERIFIED</p>
//                 </div>
//               </div>

//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default HeroSection;


