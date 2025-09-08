import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context api/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

function ProductCard() {
  const {
    mode,
    product,
    searchkey,
    filterType,
    filterPrice,
    sortPrice,
    loading,
    setLoading,
  } = useContext(MyContext);
  const [showMoreIndex, setShowMoreIndex] = useState({});

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate(); // Use the hook for navigation

  const addCart = (product) => {
    const isProductInCart = cartItems.some((item) => item.id === product.id);
    if (isProductInCart) {
      toast.info(`Product is already in your cart!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "🗑️",
      });
    } else {
      const serializedProduct = {
        ...product,
        quantity: 1,
        time: product.time?.seconds ?? Date.now(),
      };
      dispatch(addToCart(serializedProduct));
      toast.success("Product added to cart!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "🗑️",
      });
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cartItems));
  //   // window.scrollTo(0, 0);
  // }, [cartItems]);

  // Apply filters
  
  const filteredProducts = product
    .filter((item) =>
      // Filter by search key
      item.title.toLowerCase().includes(searchkey.toLowerCase())
    )
    .filter(
      (item) =>
        // Filter by category (filterType)
        filterType === "" || item.category === filterType
    )
    .filter((item) => {
      // Filter by price range
      if (filterPrice === "") return true; // No price filter
      const [minPrice, maxPrice] = filterPrice.split("-").map(Number);
      return item.price >= minPrice && item.price <= maxPrice;
    })

    //Apply filters and sorting
    .sort((a, b) => {
      if (sortPrice === "low-to-high") {
        return a.price - b.price; // Low to High
      } else if (sortPrice === "high-to-low") {
        return b.price - a.price; // High to Low
      }
      return 0; // No sorting
    })
    .slice(0, 8);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader />
          </div>
        ) : (
          <>
            <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
              <h1
                className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${
                  mode === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Our Latest Collection
              </h1>
              <div className="h-1 w-20 bg-blue-800 rounded transition-all duration-300 ease-in-out hover:bg-blue-600"></div>
            </div>

            <div className="flex flex-wrap -m-4">
              {filteredProducts.map((item, index) => {
                const { title, price, imageUrl, category, description, id } =
                  item;
                const isExpanded = showMoreIndex[index];

                return (
                  <div
                    className="p-4 w-full custom-md:w-1/2 md:w-1/2 lg:w-1/4 drop-shadow-lg"
                    key={index}
                  >
                    <div
                      className={`border-2 hover:shadow-2xl transition-shadow duration-300 ease-in-out 
    ${
      mode === "dark"
        ? "bg-gray-800 hover:shadow-gray-900" // dark mode shadow
        : "border-gray-200 hover:shadow-gray-100" // light mode shadow
    } 
    border-opacity-60 rounded-2xl overflow-hidden`}
                    >
                      <div
                        onClick={() => navigate(`/productinfo/${item.id}`)}
                        className="flex justify-center cursor-pointer bg-white"
                      >
                        <img
                          className="rounded-2xl w-full h-64 p-2 object-contain hover:scale-105 transition-transform duration-300 ease-in-out"
                          src={imageUrl}
                          alt="product"
                        />
                      </div>

                      <div className="p-5 border-t-2 flex flex-col">
                        <h2
                          className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${
                            mode === "dark" ? "text-white" : ""
                          }`}
                        >
                          {category}
                        </h2>
                        <h1
                          className={`title-font text-lg font-medium mb-3 ${
                            mode === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {title}
                        </h1>

                        <p
                          className={`leading-relaxed mb-3 ${
                            mode === "dark" ? "text-white" : ""
                          }`}
                        >
                          ₹ {price}
                        </p>

                        <div
                          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                            isExpanded ? "max-h-[600px]" : "max-h-0"
                          }`}
                        >
                          <p
                            className={`leading-relaxed mb-3 ${
                              mode === "dark" ? "text-white" : ""
                            }`}
                          >
                            {description}
                          </p>
                        </div>

                        <div className="flex justify-between mt-3">
                          <button
                            onClick={() => addCart(item)}
                            type="button"
                            className="focus:outline-none text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2 mr-2"
                          >
                            Add To Cart
                          </button>
                          <button
                            onClick={() => {
                              toggleShowMore(index);
                            }}
                            className="text-gray-600 hover:text-blue-600 font-medium text-sm"
                          >
                            {isExpanded ? "See Less" : "See More"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ProductCard;
