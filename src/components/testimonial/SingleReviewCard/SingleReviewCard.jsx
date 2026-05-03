import React, { useState } from 'react';
import { FaEdit, FaTrash, FaStar, FaEllipsisH } from 'react-icons/fa';

// ✅ SUB-COMPONENT: Individual Review Item with Read More logic
const SingleReviewCard = ({ item, isDark, isAdmin, productId, getAvatar, editTestimonial, deleteTestimonial }) => {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleDescExpand = () => setIsDescExpanded(!isDescExpanded);

  const shortDesc = item.text?.length > 80 ? item.text.slice(0, 80) + "..." : item.text;

  return (
    <div className={`px-4 py-4 mb-4 border rounded-xl transition-all duration-300 ${isDark ? 'bg-gray-900/40 border-gray-800' : 'bg-white border-gray-100 shadow-sm'}`}>
      {/* ── 1. User Header ── */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            alt="user avatar"
            loading="lazy"
            className="w-full h-full object-cover"
            src={getAvatar(item)}
          />
        </div>
        <h4 className={`text-sm font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {item.name}
        </h4>
      </div>

      {/* ── 2. Stars ── */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex text-[#ffa41c]">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={13} className={i < (item.rating || 5) ? "fill-current" : "text-gray-200 dark:text-gray-700"} />
          ))}
        </div>
        <span className={`text-[13px] font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Excellent Quality!
        </span>
      </div>

      {/* ── 3. Date ── */}
      <p className={`text-[12px] mb-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
        Reviewed in India on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {/* ── 4. Verified Purchase ── */}
      <div className="mb-3">
        <span className="text-[11px] font-bold text-[#c45500]">Verified Purchase</span>
      </div>

      {/* ── 5. Review Body ── */}
      <div className={`text-[13.5px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
        <span>{isDescExpanded ? item.text : shortDesc}</span>
        {item.text?.length > 80 && (
          <span
            onClick={toggleDescExpand}
            className="text-[13px] font-bold text-blue-600 dark:text-blue-400 ml-1 hover:underline cursor-pointer select-none"
          >
            {isDescExpanded ? "See Less" : "See More"}
          </span>
        )}
      </div>

      {/* Review Image */}
      {item.img && item.img !== "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" && (
        <div className="mt-3 w-20 h-20 rounded-md overflow-hidden border dark:border-gray-800 hover:opacity-80 transition-opacity cursor-pointer">
          <img src={item.img} alt="review" className="w-full h-full object-cover" />
        </div>
      )}

      {/* ── Admin/Product Conditional Actions ── */}
      {(isAdmin || productId) && (
        <>
          {/* ── Horizontal Divider ── */}
          <div className="border-t border-gray-100 dark:border-gray-800/50 mt-3 mb-4"></div>

          {/* ── 6. Footer Actions (Helpful & Admin Options) ── */}
          <div className="flex justify-between items-center">
            <button className={`px-6 py-1.5 text-[13px] font-black uppercase tracking-wider rounded-md border-none transition-all duration-300 active:scale-95 shadow-sm hover:shadow-orange-500/20 bg-orange-500 text-white hover:bg-orange-600`}>
              Helpful
            </button>

            {/* Admin Options Menu */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`group w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'} ${menuOpen ? (isDark ? 'ring-2 ring-blue-500/50' : 'ring-2 ring-blue-500/30') : ''}`}
              >
                <FaEllipsisH size={14} className="transition-colors" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className={`absolute bottom-full right-0 mb-2 w-32 rounded-2xl shadow-2xl overflow-hidden z-20 border animate-in fade-in slide-in-from-bottom-2 ${isDark ? 'bg-[#1a1f2e] border-gray-700' : 'bg-white border-gray-100'}`}>
                    <div className="p-1.5">
                      <button
                        onClick={() => { editTestimonial(item); setMenuOpen(false); }}
                        className={`w-full px-3 py-2 text-[11px] font-bold rounded-xl flex items-center gap-3 transition-all ${isDark ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
                      >
                        <FaEdit size={12} /> Edit
                      </button>
                      <button
                        onClick={() => { deleteTestimonial(item.id); setMenuOpen(false); }}
                        className={`w-full px-3 py-2 text-[11px] font-bold rounded-xl flex items-center gap-3 transition-all text-red-500 ${isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
                      >
                        <FaTrash size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default React.memo(SingleReviewCard);
