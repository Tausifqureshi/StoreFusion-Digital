import { ThemeContext } from '../../context api/AllContext';
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
      <Testimonial mode={mode} />
    </>
  );
}

export default React.memo(Home);
