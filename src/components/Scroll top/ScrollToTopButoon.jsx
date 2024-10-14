import React, { useEffect, useState } from "react";

function ScrollToTopButoon() {
    
    const [isVisible, setIsVisible] = useState(false);

    // Show the button when the user scrolls down 300px
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
  
    // Scroll the user to the top of the page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    useEffect(() => {
      window.addEventListener('scroll', toggleVisibility);
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    return (
      <div className="fixed bottom-8 right-8">
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            ↑ Top
          </button>
        )}
      </div>
    );
    
}

export default ScrollToTopButoon;
