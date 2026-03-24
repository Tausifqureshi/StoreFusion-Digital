import React from 'react';

const ProductPagination = ({ isDark, currentPage, totalPages, setCurrentPage, itemsPerPage, totalItems }) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between gap-4 mt-8 transition-all duration-300`}>

      {/* 👉 Text showing current item range on the left (responsive center on mobile) */}
      <span className={`text-sm font-medium text-center md:text-left ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Showing <span className="font-semibold">{startItem}</span> to <span className="font-semibold">{endItem}</span> of <span className="font-semibold">{totalItems}</span> products
      </span>

      {/* 👉 Premium Modern Pagination Container matching Tabs */}
      <div className={`inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 sm:rounded-2xl rounded-xl transition-all border ${isDark ? 'bg-[#1e293b] border-gray-600 shadow-lg shadow-black/20' : 'bg-white border-gray-200 shadow-[0_2px_15px_rgba(0,0,0,0.04)]'}`}>

        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border border-transparent ${currentPage === 1
              ? isDark 
                ? 'text-gray-600 cursor-not-allowed bg-transparent' 
                : 'text-gray-300 cursor-not-allowed bg-transparent'
              : isDark 
                ? 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/60' 
                : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => {
          const isSelected = currentPage === i + 1;
          return (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`min-w-[40px] px-3 py-2 rounded-xl text-sm font-bold transition-all duration-300 border ${isSelected
                  ? isDark
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40'
                    : 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : isDark
                    ? 'bg-transparent text-gray-400 border-transparent hover:text-gray-200 hover:bg-gray-800/60'
                    : 'bg-transparent text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-100/60'
                }`}
            >
              {i + 1}
            </button>
          )
        })}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 border border-transparent ${currentPage === totalPages
              ? isDark 
                ? 'text-gray-600 cursor-not-allowed bg-transparent' 
                : 'text-gray-300 cursor-not-allowed bg-transparent'
              : isDark 
                ? 'bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800/60' 
                : 'bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
            }`}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default ProductPagination;
