import { ThemeContext } from '../../context/AllContext';
import React, { useContext } from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Link } from "react-router-dom";
function Home() {
  const { mode } = useContext(ThemeContext);

  return (
    <>
      <HeroSection mode={mode} />
      <ProductCard />


      <Track mode={mode} />
      
      {/* Containerized Testimonial Section for Home Page */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-5">
          <Testimonial mode={mode} homePage={true} />
        </div>
      </section>
    </>
  );
}

export default React.memo(Home);
