import React from 'react';

const OrderPagination = ({ isDark, currentPage, totalPages, setCurrentPage, itemsPerPage, totalItems }) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl md:rounded-full transition-all duration-300 ${isDark ? 'bg-[#1e293b] border border-gray-800' : 'bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      
      {/* 👉 Left k me items ki range dikhane wala text */}
      <span className={`text-sm font-medium text-center md:text-left md:pl-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        Showing <span className="font-semibold">{startItem}</span> to <span className="font-semibold">{endItem}</span> of <span className="font-semibold">{totalItems}</span> orders
      </span>

      {/* 👉 Pagination wale buttons */}
      <div className="flex justify-center items-center gap-2 pr-0 md:pr-4 flex-wrap">
        
        {/* 👉 Pichle page (Previous) jane wala button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            currentPage === 1
              ? (isDark ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow'
          }`}
        >
          Previous
        </button>

        {/* 👉 Beech wale Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white shadow'
                : (isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* 👉 Agle page (Next) jane wala button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            currentPage === totalPages
              ? (isDark ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed')
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow'
          }`}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default OrderPagination;
