import { ThemeContext } from '../../context api/AllContext';
import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import { Link } from "react-router-dom";
import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";

// ✅ HOME VIEW: Saare components ko yahan isolation mein lock kiya hai
const HomeView = React.memo(({ mode }) => {
  return (
    <>
      <HeroSection mode={mode} />
      <Filter mode={mode} />
      <ProductCard />

      <div className="flex justify-center md:mb-4 mb-12">
        <Link to={'/allproducts'}>
          <button className="group relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] text-[11px] md:text-xs px-8 md:px-12 py-4 rounded-2xl shadow-xl shadow-blue-500/20 transition-all active:scale-95 overflow-hidden">
            <span className="relative z-10">See All Products</span>
            <svg
              className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </Link>
      </div>

      <Track mode={mode} />
      <Testimonial mode={mode} />
    </>
  );
}, (prev, next) => prev.mode === next.mode);

function Home() {
  // 👉 Context sirf parent mein consume hoga
  const { mode } = useContext(ThemeContext);

  return (
    <Layout>
      <HomeView mode={mode} />
      
      {/* 👉 Button ko bahar rakha hai noise stop karne ke liye */}
      <ScrollToTopButoon mode={mode} />
    </Layout>
  );
}

export default Home;
