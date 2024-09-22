

import React, { useContext, useState } from "react";
import { MyContext } from "../../context api/myContext";

function ProductCard() {
  const { mode } = useContext(MyContext);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

return (
<section className="text-gray-600 body-font">
<div className="container px-5 py-8 md:py-16 mx-auto">
<div className="lg:w-1/2 w-full mb-6 lg:mb-10">
  <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
    Our Latest Collection
  </h1>
  <div className="h-1 w-20 bg-blue-800 rounded transition-all duration-300 ease-in-out hover:bg-blue-600"></div>
</div>


<div className="flex flex-wrap -m-4">
    <div className="p-4 md:w-1/4 drop-shadow-lg">
    <div className={`h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out ${mode === 'dark' ? 'bg-gray-800' : 'border-gray-200'} border-opacity-60 rounded-2xl overflow-hidden`}>
        <div className="flex justify-center cursor-pointer">
        <img className="rounded-2xl w-full h-56 p-2 hover:scale-110 transition-transform duration-300 ease-in-out" src="https://dummyimage.com/720x400" alt="blog" />
        </div>

        <div className="p-5 border-t-2 flex flex-col">
        <h2 className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${mode === 'dark' ? 'text-white' : ''}`}>
         StoreFusion
        </h2>
        <h1 className={`title-font text-lg font-medium mb-3 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            This is title
        </h1>
        <p className={`leading-relaxed mb-3 ${mode === 'dark' ? 'text-white' : ''}`}>₹ 500</p>
        {showMore && (
            <p className={`leading-relaxed mb-3 ${mode === 'dark' ? 'text-white' : ''}`}>
            Here is some additional information about the product. You can include details like features, specifications, or anything else you find relevant.
            </p>
        )}
        <div className="flex-grow"></div>

        <div className="flex justify-between mt-3">
            <button 
            type="button" 
            className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 mr-2"
            >
            Add To Cart
            </button>
            <button 
            onClick={toggleShowMore} 
            className="text-gray-600 hover:text-blue-600 font-medium text-sm"
            >
            {showMore ? "See Less" : "See More"}
            </button>
       </div>

        </div>
    </div>
    </div>
</div>


</div>
</section>
);
}

export default ProductCard;
