import React, { useEffect, useState, useContext, useCallback } from "react";
import throttle from "lodash/throttle";

import { FiArrowUp } from "react-icons/fi";

function ScrollToTopButoon({ mode }) {
  // const { mode } = useContext(ThemeContext);;
  const [isVisible, setIsVisible] = useState(false);
  const isDark = mode === "dark";

  // Show the button when the user scrolls down 300px
  const toggleVisibility = useCallback(
    throttle(() => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 200),
    []
  );

  // Scroll the user to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <div className="fixed bottom-6 right-6 z-[100] transition-all duration-500 pointer-events-none flex justify-end">
      {/* 
        Using z-[100] ensures the button stays perfectly above the footer.
        Pointer events none on wrapper and auto on inner button so we only click the button.
      */}
      <div
        className={`pointer-events-auto transition-all duration-500 transform flex items-center justify-center ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"
          }`}
      >
        <button
          onClick={scrollToTop}
          className={`relative group flex items-center justify-center w-12 h-12 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border-2 border-transparent hover:border-white/20 hover:-translate-y-2 hover:scale-110 active:scale-95 overflow-hidden ${isDark
            ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
            : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30 font-black"
            }`}
          aria-label="Scroll to top"
        >
          {/* Subtle pulse and glow hover effect matching website's advanced aesthetic */}
          <span className="absolute inset-0 w-full h-full rounded-full bg-orange-400 opacity-0 group-hover:animate-ping duration-1000"></span>
          <FiArrowUp size={22} strokeWidth={3} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
      </div>
    </div>
  );
}

export default React.memo(ScrollToTopButoon);
