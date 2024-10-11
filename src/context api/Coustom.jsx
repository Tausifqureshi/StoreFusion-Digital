<Layout>
    {loading && <Loader />}
    <section className="text-gray-700 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
            {products ? (
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:h-[28rem] h-60 overflow-hidden rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                        <img
                            alt="ecommerce"
                            className="w-full h-full object-contain object-center"
                            src={products.imageUrl}
                        />
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-sm title-font text-gray-500 tracking-wide uppercase">Brand Name</h2>
                        <h1 className="text-gray-900 text-4xl title-font font-bold mb-2">{products.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                {[...Array(4)].map((_, i) => (
                                    <StarIcon key={i} className="text-yellow-500" />
                                ))}
                                <StarIcon filled={false} className="text-yellow-500" />
                                <span className="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-3">
                                <Link to="/cart" className="text-gray-600 hover:text-indigo-600 transition-colors">
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
                        <div className="flex items-center justify-between">
                            <span className="title-font font-bold text-4xl text-gray-900">₹{products.price}</span>
                            <div className="flex items-center">
                                <button onClick={() => addCart(products)} className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 transition-shadow shadow-md rounded-lg">
                                    Add To Cart
                                </button>
                                <button 
                                    onClick={toggleHeart} 
                                    className={`rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4 transition-colors ${isHeartFilled ? 'bg-red-600' : 'bg-gray-200'} hover:bg-gray-300`}
                                >
                                    <FaHeart className={`w-6 h-6 ${isHeartFilled ? 'text-white' : 'text-gray-500'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    </section>
</Layout>
