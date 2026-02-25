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




import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useState } from "react";

function HeroSection() {
  const [active, setActive] = useState(0);

  const slides = [
    {
      img: "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
      title: "Mega Shopping Sale",
      desc: "Flat 50% OFF on trending products",
    },
    {
      img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      title: "Premium Smart Gadgets",
      desc: "Upgrade your lifestyle with next-gen tech",
    },
    {
      img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      title: "Trending Fashion 2026",
      desc: "Discover outfits made for modern you",
    },
  ];

  return (
    <div className="px-3 md:px-6 mt-3">
      {/* progress */}
      <div className="h-1 w-full bg-gray-200 rounded overflow-hidden mb-2">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-orange-500 transition-all duration-[3200ms]"
          style={{ width: `${(active + 1) * 33.33}%` }}
        />
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3200, disableOnInteraction: false }}
        loop
        onSlideChange={(s) => setActive(s.realIndex)}
        className="rounded-3xl overflow-hidden shadow-xl"
      >
        {slides.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="group relative w-full h-[240px] sm:h-[320px] md:h-[440px] lg:h-[520px] overflow-hidden">
              
              {/* IMAGE */}
              <img
                src={`${item.img}?q=80&w=2070&auto=format&fit=crop`}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

              {/* content */}
              <div className="absolute inset-0 flex items-center px-6 md:px-14">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-6 md:p-8 rounded-2xl max-w-md text-white shadow-xl">
                  
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 leading-tight">
                    {item.title}
                  </h2>

                  <p className="text-sm md:text-base text-gray-200 mb-5">
                    {item.desc}
                  </p>

                  <Link to="/allproducts">
                    <button className="bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-2.5 rounded-lg font-semibold shadow hover:scale-105 transition">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* categories */}
      {/* <div className="flex gap-3 mt-4 overflow-x-auto pb-1 scrollbar-hide">
        {["Fashion", "Shoes", "Electronics", "Accessories"].map((c, i) => (
          <Link
            key={i}
            to="/allproducts"
            className="px-5 py-2 bg-white shadow-md hover:shadow-lg transition rounded-full text-sm whitespace-nowrap"
          >
            {c}
          </Link>
        ))}
      </div> */}
    </div>
  );
}

export default HeroSection;


// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";

// import { Autoplay, Pagination } from "swiper/modules";
// import { Link } from "react-router-dom";

// function HeroSection() {
//   const slides = [
//     {
//       img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2070&auto=format&fit=crop",
//       title: "Premium Smart Gadgets",
//       desc: "Upgrade your lifestyle with next-gen tech",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
//       title: "Fashion That Speaks",
//       desc: "Trending outfits curated for modern you",
//     },
//     {
//       img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=2070&auto=format&fit=crop",
//       title: "Mega Sale is Live",
//       desc: "Save big with exclusive limited deals",
//     },
//   ];

//   return (
//     <div className="px-3 md:px-6 mt-3">
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3200, disableOnInteraction: false }}
//         loop
//         className="rounded-3xl overflow-hidden shadow-xl"
//       >
//         {slides.map((item, i) => (
//           <SwiperSlide key={i}>
//             <div className="relative w-full h-[240px] sm:h-[320px] md:h-[440px] lg:h-[540px]">

//               {/* Image */}
//               <img
//                 src={item.img}
//                 alt={item.title}
//                 className="w-full h-full object-cover scale-105 hover:scale-110 transition duration-700"
//                 loading="lazy"
//               />

//               {/* Deep overlay */}
//               <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

//               {/* Glass content */}
//               <div className="absolute inset-0 flex items-center px-6 md:px-14">
//                 <div className="backdrop-blur-md bg-white/10 border border-white/20 p-5 md:p-8 rounded-2xl max-w-md text-white shadow-lg">

//                   <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
//                     {item.title}
//                   </h2>

//                   <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4">
//                     {item.desc}
//                   </p>

//                   <Link to="/allproducts">
//                     <button className="bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-105 transition px-5 py-2 rounded-lg text-sm md:text-base font-semibold shadow-lg">
//                       Explore Now
//                     </button>
//                   </Link>

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