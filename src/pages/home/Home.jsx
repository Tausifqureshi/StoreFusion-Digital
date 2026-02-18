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
        <div className="flex justify-center -mt-10 mb-4">
              <Link to={'/allproducts'}>
             <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
              See more
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
