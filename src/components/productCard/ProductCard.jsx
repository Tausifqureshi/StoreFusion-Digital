import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context api/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from 'react-toastify'

function ProductCard() {
  const { mode, product } = useContext(MyContext);
  const [showMoreIndex, setShowMoreIndex] = useState({});

  const toggleShowMore = (index) => {
    // Toggle 'See More' for individual items without affecting others
    setShowMoreIndex((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle the specific product's showMore state
    }));
  }

  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart)
  // console.log(cartItems);
  const addCart = (product) => {
    // Check if the product is already in the cart
    const isProductInCart = cartItems.some(item => item.id === product.id);
    if (isProductInCart) {
      // If product already exists, show a warning notification
      toast.info(`Product is already in your cart!`, {

        position: "top-right",  // Toast notification ki position
        autoClose: 1000,  // 2 seconds me auto-close
        hideProgressBar: false,  // Progress bar dikhana
        closeOnClick: true,  // Click karne par close ho
        pauseOnHover: true,  // Hover karne par pause ho
        draggable: true,  // Draggable banaye
        progress: undefined,  // Progress bar ko undefined rakhein
        icon: "🗑️",  // Custom icon for success
    });
  
    } else {
      // Otherwise, add the product to the cart
      const serializedProduct = {
        ...product,
        quantity: 1,  // Initial quantity set to 1
        time: product.time?.seconds ?? Date.now() // Serialize `time` if it exists
      };
      dispatch(addToCart(serializedProduct));
      toast.success("Product added to cart!", {
        position: "top-right",  // Toast notification ki position
        autoClose: 1000,  // 2 seconds me auto-close
        hideProgressBar: false,  // Progress bar dikhana
        closeOnClick: true,  // Click karne par close ho
        pauseOnHover: true,  // Hover karne par pause ho
        draggable: true,  // Draggable banaye
        progress: undefined,  // Progress bar ko undefined rakhein
        icon: "🗑️",  // Custom icon for success
      });
      
  
    }
  };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])



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
     
      {product.map((item, index)=>{
        const { title,price,imageUrl, category,date, description} = item;
        const isExpanded = showMoreIndex[index]; // Check if this product is expanded
        return <div className="p-4 w-full custom-md:w-1/2 md:w-1/2 lg:w-1/4 drop-shadow-lg" key={index}>
       <div className={`border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out ${mode === 'dark' ? 'bg-gray-800' : 'border-gray-200'} border-opacity-60 rounded-2xl overflow-hidden`}>
        <div className="flex justify-center cursor-pointer">
        <img className="rounded-2xl w-full h-56 p-2 hover:scale-110 transition-transform duration-300 ease-in-out" src={imageUrl} alt="blog" />
        </div>


        <div className="p-5 border-t-2 flex flex-col">
        <h2 className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${mode === 'dark' ? 'text-white' : ''}`}>
         StoreFusion
        </h2>
        {/* Titel */}
        <h1 className={`title-font text-lg font-medium mb-3 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {title}
        </h1>

        {/* Price */}
        <p className={`leading-relaxed mb-3 ${mode === 'dark' ? 'text-white' : ''}`}>₹ {price}</p>

           {/* Description */}
           <div
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isExpanded ? 'max-h-[600px]' : 'max-h-0'}`}
          style={{ transitionProperty: 'max-height' }} // Transition only max-height for a smoother effect
        >
          <p className={`leading-relaxed mb-3 ${mode === "dark" ? "text-white" : ""}`}>
            {description}
          </p>
         </div>

        <div className="flex-grow"></div>

        <div className="flex justify-between mt-3">
            <button  onClick={()=>addCart(item)}
            type="button" 
            className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 mr-2"
            >
            Add To Cart
            </button>
            <button 
            onClick={()=>{toggleShowMore(index)}} 
            className="text-gray-600 hover:text-blue-600 font-medium text-sm"
            >
            {isExpanded ? "See Less" : "See More"}
            </button>
       </div>

        </div>
    </div>
    </div>

       })}
   

    </div>


</div>
</section>
);


}

export default ProductCard;









