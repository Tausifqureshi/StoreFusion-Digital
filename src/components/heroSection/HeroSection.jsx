import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";

// Import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function HeroSection() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]} // Include the required modules
      spaceBetween={30} // Space between slides
      pagination={{ clickable: true }} // Enable pagination
      navigation // Enable navigation buttons
      autoplay={{ delay: 4000, disableOnInteraction: false }} // Autoplay with a delay of 3 seconds
    >
      <SwiperSlide>
        <img
          src="https://static.vecteezy.com/system/resources/previews/011/871/820/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
          alt="Online Shopping 1"
          style={{ width: "100%", height: "auto" }} // Responsive image styling
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://static.vecteezy.com/system/resources/previews/011/871/813/non_2x/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
          alt="Online Shopping 2"
          style={{ width: "100%", height: "auto" }} // Responsive image styling
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/004/858/012/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg"
          alt="Online Shopping 2"
          style={{ width: "100%", height: "auto" }} // Responsive image styling
        />
      </SwiperSlide>
    </Swiper>
  );
}

export default HeroSection;
