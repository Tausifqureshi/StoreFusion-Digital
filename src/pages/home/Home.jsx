import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import { MyContext } from "../../context api/myContext";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import MyState from "../../context api/MySatate";
import { Link } from "react-router-dom";
import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";


function Home() {
  return ( 
    <div>
      <Layout>
        <HeroSection />
        <Filter />
        <ProductCard />

        {/* <div className="flex justify-center -mt-10 mb-4">
              <Link to={'/allproducts'}>
             <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
              See more
            </button>
          </Link>
        </div> */}

         <div className="flex justify-center mt-12 mb-16">
            <Link to={'/allproducts'}>
              <button className="group relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[11px] md:text-xs px-8 md:px-12 py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 overflow-hidden">
                <span className="relative z-10">See All Products</span>
                {/* Arrow animation on hover */}
                <svg 
                  className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {/* Hover light effect */}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </Link>
          </div>

        <Track />
        <Testimonial />
        {/* <Loader /> */}
        <ScrollToTopButoon />
      </Layout>
    </div>
  );
}

export default Home;
