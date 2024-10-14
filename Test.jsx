// import "./App.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Navigate,
//   Route,
//   RouterProvider,
  
// } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Order from "./components/order/Order";
// import Cart from "./pages/cart/Cart";
// import Dashboard from "./pages/admin/dashboard/Dashboard";
// import NoPage from "./pages/nopage/NoPage";
// import Signup from "./pages/registration/Signup";
// import Login from "./pages/registration/Login";
// import ProductInfo from "./pages/productInfo/ProductInfo";
// import AddProduct from "./pages/admin/page-admin/AddProduct";
// import UpdateProduct from "./pages/admin/page-admin/UpdateProduct";
// import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Allproducts from "./pages/allproducts/Allproducts";

// import MyState from "./context api/MySatate";
// // import Coustom from "./context api/Coustom";


// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//       <Route path="/" element={<Home />} />
//       <Route path="/order" element={ <Order />}/>

//       <Route path="/cart" element={<Cart />} />
//       <Route path="/allProducts" element={<Allproducts/>} />
//       {/* <Route path="/addproduct" element={<AddProduct/>} /> */}

//       <Route path="/dashboard" element={<ProtectedRoutesForAdmin>
//         <Dashboard />
//         {/* Only Admin ke liye */}
//       </ProtectedRoutesForAdmin>} />

//       <Route path="/signup" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//       {/* <Route path="/mystate" element={<MyState/>} /> */}
//       <Route path="/productInfo/:id" element={<ProductInfo />} />

//       <Route path="/addProduct/" element={<ProtectedRoutesForAdmin>
//         <AddProduct />
//        {/* Only Admin hi is me prodcuts use kar sakta hai users nhi admin matlab jis ne website create kiya */}
//       </ProtectedRoutesForAdmin>} />

//       <Route path="/updateProduct/" element={<ProtectedRoutesForAdmin >
//         <UpdateProduct/>
//       </ProtectedRoutesForAdmin>} />
//       <Route path="/*" element={<NoPage />} />
//     </Route>
//   )
// );
// function App() {
//   return (
//     <>
//       {/* <Coustom> */}

//       <MyState>
//         <RouterProvider router={router} />
//         <ToastContainer />
//       </MyState>
//       {/* </Coustom> */}

     
      
       
//     </>
//   );

 

// }

// export default App;


  








  




























































































































import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../../context api/myContext';
import Filter from '../../components/filter/Filter';
import Layout from '../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Allproducts() {
  const { mode, product ,searchkey, filterType, filterPrice, setFilterPrice, sortPrice } = useContext(MyContext);
  const [visibleProducts, setVisibleProducts] = useState(8); // Start with 8 products
  const [showMoreIndex, setShowMoreIndex] = useState({});

  const toggleShowMore = (index) => {
    setShowMoreIndex((prevState) => ({
      ...prevState,
      [index]: !prevState[index], 
    }));
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.cart);
  const navigate = useNavigate(); 

  const addCart = (product) => {
    const isProductInCart = cartItems.some(item => item.id === product.id);
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

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Apply filters
  const filteredProducts = product
    .filter((item) => item.title.toLowerCase().includes(searchkey.toLowerCase()))
    .filter((item) => filterType === '' || item.category === filterType)
    .filter((item) => {
      if (filterPrice === "") return true;
      const [minPrice, maxPrice] = filterPrice.split('-').map(Number);
      return item.price >= minPrice && item.price <= maxPrice;
    })
    .sort((a, b) => {
      if (sortPrice === 'low-to-high') return a.price - b.price;
      if (sortPrice === 'high-to-low') return b.price - a.price;
      return 0;
    });

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 4); // Load 4 more products on click
  };

  return (
    <Layout>
      <Filter />

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-blue-800 rounded transition-all duration-300 ease-in-out hover:bg-blue-600"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {filteredProducts.slice(0, visibleProducts).map((item, index) => {
              const { title, price, imageUrl, category, description, id } = item;
              const isExpanded = showMoreIndex[index];

              return (
                <div className="p-4 w-full custom-md:w-1/2 md:w-1/2 lg:w-1/4 drop-shadow-lg" key={index}>
                  <div className={`border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out ${mode === 'dark' ? 'bg-gray-800' : 'border-gray-200'} border-opacity-60 rounded-2xl overflow-hidden`}>
                    <div
                      onClick={() => navigate(`/productinfo/${item.id}`)}
                      className="flex justify-center cursor-pointer bg-white"
                    >
                      <img className="rounded-2xl w-full h-64 p-2 object-contain hover:scale-105 transition-transform duration-300 ease-in-out" src={imageUrl} alt="product" />
                    </div>

                    <div className="p-5 border-t-2 flex flex-col">
                      <h2 className={`tracking-widest text-xs title-font font-medium text-gray-400 mb-1 ${mode === 'dark' ? 'text-white' : ''}`}>
                        {category}
                      </h2>
                      <h1 className={`title-font text-lg font-medium mb-3 ${mode === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {title}
                      </h1>

                      <p className={`leading-relaxed mb-3 ${mode === 'dark' ? 'text-white' : ''}`}>₹ {price}</p>

                      <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${isExpanded ? 'max-h-[600px]' : 'max-h-0'}`}>
                        <p className={`leading-relaxed mb-3 ${mode === 'dark' ? 'text-white' : ''}`}>
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
                          onClick={() => { toggleShowMore(index); }}
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

          {/* "Load more" button, shown if there are more products to display */}
          {visibleProducts < filteredProducts.length && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                onClick={loadMoreProducts}
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default Allproducts;
