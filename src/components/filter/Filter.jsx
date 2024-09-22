import React, { useContext } from "react";
import { MyContext } from "../../context api/myContext";
function Filter() {
    // const returnValue = useContext(MyContext);
    // console.log(returnValue);
    const { mode } = useContext(MyContext);
    return (
        <div className='container mx-auto px-4 mt-5'>
          <div
            className="p-6 rounded-lg shadow-md border border-gray-300 transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: mode === 'dark' ? '#1F1F1F' : 'white',
              color: mode === 'dark' ? 'white' : 'black',
            }}
          >
        <div className="relative mb-5">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
            </svg>
            </div>
            <input
            type="text"
            name="searchkey"
            id="searchkey"
            placeholder="Search here"
            className="pl-10 pr-4 py-3 w-full rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            style={{
                backgroundColor: mode === 'dark' ? '#2C2C2C' : 'white',
                color: mode === 'dark' ? 'white' : 'black',
            }}
            />
            </div>
      
        <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-lg">Filters</p>
            <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition duration-200"
            style={{ display: 'flex', alignItems: 'center' }}
            >
            Reset Filter
            </button>
        </div>
    
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <select
            className="px-4 py-3 w-full rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
            style={{
                backgroundColor: mode === 'dark' ? '#2C2C2C' : 'white',
                color: mode === 'dark' ? 'white' : 'black',
            }}
            >
            <option value="jacket">Jacket</option>
            <option value="shirt">Shirt</option>
            <option value="mobile">Mobile</option>
            <option value="shoes">Shoes</option>
            </select>
            <select
            className="px-4 py-3 w-full rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
            style={{
                backgroundColor: mode === 'dark' ? '#2C2C2C' : 'white',
                color: mode === 'dark' ? 'white' : 'black',
            }}
            >
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            </select>
        </div>
        </div>
        </div>
      );      
}

export default Filter;
