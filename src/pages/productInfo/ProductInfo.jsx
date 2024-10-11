import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useParams, Link  } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { MyContext } from '../../context api/myContext';
import Loader from '../../components/loader/Loader';
import { FaHeart, FaShoppingCart, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const StarIcon = ({ filled = true }) => (
    <svg
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        className="w-5 h-5 text-indigo-500"
        viewBox="0 0 24 24"
    >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
);

function ProductInfo() {
    const { loading, setLoading } = useContext(MyContext);
    const [products, setProducts] = useState('');
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

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


    // Toggle Heart
    const toggleHeart = () => {
        setIsHeartFilled(prev => !prev);
    };


return (
<Layout>
{loading && <Loader />}
<section className="text-gray-700 body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
        {products ? (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                    alt="ecommerce"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded hover:scale-105 transition-transform duration-300"
                    src={products.imageUrl}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-wide uppercase">Brand Name</h2>
                    <h1 className="text-gray-900 text-4xl title-font font-bold mb-2">{products.title}</h1>
                    <div className="flex mb-4">
                        <span className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                                <StarIcon key={i} />
                            ))}
                            <StarIcon filled={false} />
                            <span className="text-gray-600 ml-3">4 Reviews</span>
                        </span>
                        <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-3">
                        <Link to="/cart" className="text-gray-600 hover:text-indigo-600     transition-colors">
                        <FaShoppingCart className="w-5 h-5" />
                            </Link>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                        </span>
                    </div>
                    <p className="leading-relaxed border-b-2 mb-6 pb-6 text-gray-700">{products.description}</p>
                    <div className="flex">
                        <span className="title-font font-bold text-3xl text-gray-900">₹{products.price}</span>
                        <button onClick={() => addCart(products)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 transition-shadow shadow-md rounded">
                            Add To Cart
                        </button>
                        <button 
                            onClick={toggleHeart} 
                            className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4 transition-colors ${isHeartFilled ? 'bg-red-500' : 'bg-gray-200'} hover:bg-gray-300`}
                        >
                            <FaHeart className={`w-6 h-6 ${isHeartFilled ? 'text-white' : 'text-gray-500'}`} />
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            ""
        )}
        </div>
    </section>
</Layout>
    );
}

export default ProductInfo;
