import React, { useContext, useEffect, useCallback, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { productService } from "../../../services/productService";


import { ThemeContext } from '../../../context/AllContext';
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";

function UpdateProduct() {
  const navigate = useNavigate();
  const reduxForm = useSelector(state => state.products.form);
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';
  const [isSuccess, setIsSuccess] = useState(false);

  // 🔥 PRODUCTION OPTIMIZATION: Local state for editing to prevent Redux spam
  const [products, setProductsState] = useState({ ...reduxForm });

  function inputHandle(e) {
    setProductsState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleColorToggle = useCallback((color) => {
    setProductsState(prev => ({ ...prev, color: prev.color === color ? "" : color }));
  }, []);

  const handleSizeToggle = useCallback((size) => {
    setProductsState(prev => ({ ...prev, size: prev.size === size ? "" : size }));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!products.id) {
      navigate('/dashboard');
    }
  }, [products.id, navigate]);

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => navigate('/dashboard', { replace: true }), 800);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, navigate]);


  const handleUpdateProduct = async () => {
    if (!products.id) return toast.error("Product ID missing! ⚠️");
    try {
      await productService.updateProduct(products.id, products);
      toast.success("Product Updated successfully! ✨🚀");
      setIsSuccess(true);
    } catch (error) {
      console.error("Update Product Error:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };



    return (
        <div className={`fixed inset-0 z-[100] overflow-y-auto flex justify-center items-start min-h-screen backdrop-blur-sm py-12 px-4 transition-colors duration-300 ${isDark ? "bg-black/60" : "bg-black/80"}`}>
            <div className={`relative shadow-2xl px-8 py-6 rounded-3xl max-w-md w-full border transition-all duration-300 ${isDark ? "bg-[#1a1f2e] border-gray-800 text-white" : "bg-white border-gray-100 text-gray-900"}`}>
                <button
                    onClick={() => navigate(-1)}
                    className={`absolute top-6 right-6 p-2 rounded-full transition-all ${isDark ? "text-gray-400 hover:text-red-400 hover:bg-gray-800" : "text-gray-400 hover:text-red-500 hover:bg-red-50"}`}
                >
                    <FiX size={24} />
                </button>
                <h1 className="text-center text-blue-600 text-3xl font-black italic tracking-tighter mb-8 uppercase">
                    UPDATE<span className="text-orange-500">PRODUCT</span>
                </h1>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Product Title</label>
                        <input
                            type="text"
                            name="title"
                            className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                            placeholder="Product Title"
                            onChange={inputHandle}
                            value={products.title}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Price</label>
                            <input
                                type="text"
                                name="price"
                                className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                                placeholder="Product Price"
                                onChange={inputHandle}
                                value={products.price}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Discount %</label>
                            <input
                                type="number"
                                name="discount"
                                className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                                placeholder="Discount %"
                                onChange={inputHandle}
                                value={products.discount}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                            placeholder="Product Image URL"
                            onChange={inputHandle}
                            value={products.imageUrl}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Category</label>
                            <input
                                type="text"
                                name="category"
                                className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                                placeholder="Main Category"
                                onChange={inputHandle}
                                value={products.category}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Sub-category</label>
                            <input
                                type="text"
                                name="subcategory"
                                className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                                placeholder="Sub-category"
                                onChange={inputHandle}
                                value={products.subcategory || ""}
                            />
                        </div>
                    </div>

                    <div className={`p-4 rounded-2xl border ${isDark ? "bg-gray-800/20 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Select Color</p>
                        <div className="grid grid-cols-4 gap-2">
                            {['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Gray'].map((color) => (
                                <div
                                    key={color}
                                    onClick={() => handleColorToggle(color)}
                                    className={`cursor-pointer select-none flex items-center justify-center gap-1.5 p-2 rounded-full border transition-all ${products.color === color ? 'border-orange-500 bg-orange-500/10 text-orange-500' : isDark ? 'border-gray-700 bg-gray-800/40 text-gray-400' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <div
                                        className="w-3 h-3 rounded-full shadow-sm border border-black/10"
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    />
                                    <span className="text-[9px] font-black uppercase tracking-tighter">
                                        {color}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`p-4 rounded-2xl border ${isDark ? "bg-gray-800/20 border-gray-700" : "bg-gray-50 border-gray-100"}`}>
                        <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Select Size</p>
                        <div className="grid grid-cols-5 gap-2">
                            {['S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10'].map((size) => (
                                <div
                                    key={size}
                                    onClick={() => handleSizeToggle(size)}
                                    className={`cursor-pointer select-none flex items-center justify-center p-2 rounded-xl border transition-all ${products.size === size ? 'border-orange-500 bg-orange-500/10 text-orange-500 font-black' : isDark ? 'border-gray-700 bg-gray-800/40 text-gray-400' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className="text-[10px] uppercase font-black tracking-widest">
                                        {size}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                name="rating"
                                className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                                placeholder="Rating (0 - 5)"
                                onChange={inputHandle}
                                value={products.rating || ""}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Stock</label>
                            <input
                                type="number"
                                name="stock"
                                className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                                placeholder="Available Stock"
                                onChange={inputHandle}
                                value={products.stock}
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Sale End Date & Time (Flash Sale)</label>
                        <input
                            type="datetime-local"
                            name="saleEndTime"
                            className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                            onChange={inputHandle}
                            value={products.saleEndTime || ""}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            className={`w-full px-4 py-3 rounded-xl outline-none border transition-all resize-none ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                            placeholder="Product Description"
                            onChange={inputHandle}
                            value={products.description}
                        />
                    </div>

                    <button
                        onClick={handleUpdateProduct}
                        className="w-full bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-[10px] py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 mt-4"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct
