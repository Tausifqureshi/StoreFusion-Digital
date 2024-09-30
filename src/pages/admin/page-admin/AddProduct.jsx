import React, { useContext } from "react";
import { MyContext } from "../../../context api/myContext";

function AddProduct() {
  const { products, setProducts, addProduct, navigate } = useContext(MyContext);


  function inputHandle(e) {
    setProducts({ ...products, [e.target.name]: e.target.value });
  }


  // const produtsAdded = async () => {
  //   await addProduct(); // Wait for addProduct to finish
  //   navigate('/dashboard'); // Navigate after adding the product
  // };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg px-10 py-10 rounded-lg max-w-md w-full">
        <h1 className="text-center text-gray-900 text-2xl font-semibold mb-6">
          Add Product
        </h1>

        <div className="space-y-4">
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
            placeholder="Product Category"
            onChange={inputHandle}
            value={products.category}
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
              onClick={()=>{addProduct()}}
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
