import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProductAdminContext } from '../../../context api/AllContext';
import { FiX } from "react-icons/fi";

function AddProduct() {
  const navigate = useNavigate();
  const { products, setProducts, addProduct } = useContext(ProductAdminContext);

  function inputHandle(e) {
    setProducts({ ...products, [e.target.name]: e.target.value });
  }

  // Memoized color toggle handler to keep JSX clean
  const handleColorToggle = useCallback((color) => {
    // setProducts({ ...products, color: products.color === color ? "" : color });
    if (products.color === color) {
      setProducts({ ...products, color: "" });
    } else {
      setProducts({ ...products, color: color });
    }
  }, [products, setProducts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddProduct = async () => {
    const success = await addProduct();
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto flex justify-center items-start min-h-screen bg-black/80 backdrop-blur-sm py-12 px-4">
      <div className="relative bg-white shadow-lg px-8 py-6 rounded-lg max-w-md w-full">
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
        >
          <FiX size={24} />
        </button>
        <h1 className="text-center text-blue-600 text-3xl font-black italic tracking-tighter mb-5 uppercase">
          ADD<span className="text-orange-500">PRODUCT</span>
        </h1>

        <div className="space-y-3">
          <input
            type="text"
            name="title"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Product Title"
            onChange={inputHandle}
            value={products.title}
          />

          <input
            type="text"
            name="price"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Product Price"
            onChange={inputHandle}
            value={products.price}
          />

          <input
            type="text"
            name="imageUrl"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Product Image URL"
            onChange={inputHandle}
            value={products.imageUrl}
          />

          <input
            type="text"
            name="category"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Main Category (e.g. Electronics, Fashion)"
            onChange={inputHandle}
            value={products.category}
          />

          <input
            type="text"
            name="subcategory"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Sub-category (e.g. Laptop, Watch, Shirt) (Optional)"
            onChange={inputHandle}
            value={products.subcategory || ""}
          />

          <div className="border border-gray-300 rounded-lg p-3">
            <p className="text-sm text-gray-500 mb-2">Select Product Color</p>
            <div className="grid grid-cols-4 gap-2">
              {['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Gray'].map((color) => (
                <div
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`cursor-pointer select-none flex items-center justify-center gap-1.5 p-1.5 rounded-full border transition-all ${products.color === color ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <div
                    className="w-4 h-4 rounded-full shadow-sm border border-gray-300"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                  <span className={`text-xs font-bold ${products.color === color ? 'text-orange-700' : 'text-gray-600'}`}>
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <input
            type="number"
            name="discount"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Discount % (optional)"
            onChange={inputHandle}
            value={products.discount}
          />

          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="rating"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Product Rating (0 - 5)"
            onChange={inputHandle}
            value={products.rating || ""}
          />

          <input
            type="number"
            name="stock"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Available Stock Quantity"
            onChange={inputHandle}
            value={products.stock}
          />

          <textarea
            name="description"
            rows="4"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Product Description"
            onChange={inputHandle}
            value={products.description}
          />

          <div className="flex justify-center">
            <button
              onClick={handleAddProduct}
              className="bg-blue-500 w-full text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
