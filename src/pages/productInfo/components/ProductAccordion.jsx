import React, { useState, useCallback } from "react";

const ProductAccordion = React.memo(function ProductAccordion({ accordionData, isDark }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <div className="space-y-3 px-1 md:px-0">
      {accordionData.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id}
            className={`border rounded-2xl overflow-hidden transition-all duration-300
              ${isDark ? "border-gray-800 bg-[#1a1f2e]" : "border-gray-50 bg-gray-50 shadow-sm"}`}
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center p-4 text-left outline-none"
            >
              <h3 className={`font-black text-[10px] md:text-[11px] uppercase tracking-widest ${isOpen && !isDark ? "text-blue-600" : ""}`}>
                {item.title}
              </h3>
              <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                {item.icon}
              </span>
            </button>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-60 opacity-100 px-4 pb-4" : "max-h-0 opacity-0"}`}>
              <div className="text-xs md:text-sm leading-relaxed opacity-70 text-left">{item.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default ProductAccordion;
