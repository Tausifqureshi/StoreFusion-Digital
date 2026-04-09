import React, { useState } from 'react';
import { FaStar, FaEllipsisH, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCard = ({ item, isDark, edithandle, deleteProduct }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const stock = Number(item.stock) || 0;
  const price = Number(String(item.price || "0").replace(/[^0-9.-]+/g, ""));
  const sales = Number(item.sales) || 0;
  const rating = Number(item.rating) || 4.5; 

  // Status computation for badge
  let status = "Active";
  let statusColors = isDark ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-green-100 text-green-700";

  if (stock === 0) {
    status = "Out of Stock";
    statusColors = isDark ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-red-100 text-red-700";
  } else if (stock < 10) {
    status = "Draft"; 
    statusColors = isDark ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-yellow-100 text-yellow-700";
  }

  return (
    <div className={`relative rounded-[2rem] p-5 transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-[#1e293b] border border-gray-600 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-gray-500' : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl'}`}>

      {/* Image Area */}
      <div className={`relative w-full h-44 rounded-2xl mb-5 flex items-center justify-center p-4 overflow-hidden ${isDark ? 'bg-[#131921]/50' : 'bg-gray-50'}`}>
        {/* Status Badge */}
        <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full z-10 ${statusColors}`}>
          {status}
        </span>

        {item.imageUrl && (
          <img src={item.imageUrl} alt={item.title} className="max-h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform hover:scale-110 duration-500" />
        )}
      </div>

      {/* Content */}
      <h2 className={`font-black text-xl leading-tight line-clamp-1 mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h2>

      <p className={`text-xs font-medium line-clamp-2 mb-4 h-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        {item.description || "High-quality product with amazing features and excellent durability."}
      </p>

      {/* Price & Rating */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-black text-green-500 tracking-tighter">
          ${price.toLocaleString()}
        </span>
        <div className="flex items-center gap-1">
          <FaStar className="text-yellow-400 text-xs" />
          <span className={`text-sm font-bold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{rating}</span>
        </div>
      </div>

      {/* Stock & Sales */}
      <div className="flex items-center justify-between mb-5">
        <span className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Stock: <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>{stock}</span>
        </span>
        <span className={`text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Sales: <span className={isDark ? 'text-gray-200' : 'text-gray-800'}>{sales}</span>
        </span>
      </div>

      {/* Footer / Actions */}
      <div className="flex items-center justify-between mt-auto">
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isDark ? 'bg-[#131921] text-gray-300 border-gray-700' : 'bg-white text-gray-600 border-gray-200'}`}>
          {item.category || "General"}
        </span>

        {/* 3 Dots Menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'} ${menuOpen ? (isDark ? 'bg-gray-800' : 'bg-gray-100') : ''}`}
          >
            <FaEllipsisH size={14} />
          </button>

          {menuOpen && (
            <>
              {/* Overlay to close menu */}
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />

              <div className={`absolute bottom-[120%] right-0 w-40 rounded-2xl shadow-xl overflow-hidden z-20 animate-in fade-in slide-in-from-bottom-2 ${isDark ? 'bg-[#1e293b] border border-gray-700' : 'bg-white border border-gray-100'}`}>
                <div className="py-2">
                  <Link
                    to={`/productInfo/${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`w-full px-4 py-2 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}`}
                  >
                    <FaEye size={12} /> View Details
                  </Link>
                  <Link
                    to="/updateProduct"
                    onClick={() => edithandle(item)}
                    className={`w-full px-4 py-2 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                  >
                    <FaEdit size={12} /> Edit Product
                  </Link>
                  <button
                    onClick={() => { deleteProduct(item); setMenuOpen(false); }}
                    className={`w-full px-4 py-2 text-xs font-bold flex items-center gap-3 transition-all ${isDark ? 'text-red-400 hover:bg-gray-800' : 'text-red-500 hover:bg-red-50'}`}
                  >
                    <FaTrash size={12} /> Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
