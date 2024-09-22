import React from 'react'

function UpdateProduct() {
    return (
<div className="flex justify-center items-center h-screen bg-gray-100">
<div className="bg-white shadow-lg px-10 py-10 rounded-lg max-w-md w-full">
<h1 className="text-center text-gray-900 text-2xl font-semibold mb-6">Update Product</h1>

<div className="space-y-4">
<input
    type="text"
    name="title"
    className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    placeholder="Product Title"
/>

<input
    type="text"
    name="price"
    className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    placeholder="Product Price"
/>

<input
    type="text"
    name="imageurl"
    className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    placeholder="Product Image URL"
/>

<input
    type="text"
    name="category"
    className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    placeholder="Product Category"
/>

<textarea
    name="description"
    rows="4"
    className="border border-gray-300 rounded-lg w-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    placeholder="Product Description"
/>

<div className="flex justify-center">
    <button
        className="bg-blue-500 w-full text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors">
        Update Product
    </button>
</div>
</div>
</div>
</div>
    );
}

export default UpdateProduct