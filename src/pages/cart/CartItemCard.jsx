import React, { useState } from 'react';
import { FiTrash2, FiMinus, FiPlus, FiChevronDown } from 'react-icons/fi';

const CartItemCard = ({ 
  item, 
  index, 
  isDark, 
  deleteCart, 
  decrementCartQuantity, 
  incrementCartQuantity, 
  cartUpdatingType 
}) => {
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const toggleDesc = () => setIsDescOpen(!isDescOpen);
  const toggleDescExpand = () => setIsDescExpanded(!isDescExpanded);

  const shortDesc = item.description?.length > 60 ? item.description.slice(0, 60) + "..." : item.description;

  return (
    <div className={`p-4 md:p-6 rounded-[24px] border transition-all ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
      <div className="flex flex-row gap-4 md:gap-6">
        {/* Image */}
        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl p-2 flex shrink-0 items-center justify-center overflow-hidden border ${isDark ? "bg-white border-gray-700" : "bg-white border-gray-50 shadow-inner"}`}>
          <img src={item.imageUrl} alt="product" className="max-h-full object-contain" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[8px] font-black text-orange-500 uppercase tracking-widest truncate">{item.category}</p>
              <h2 className="text-sm md:text-lg font-black uppercase tracking-tight truncate leading-tight">{item.title}</h2>
            </div>
            <button onClick={() => deleteCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors shrink-0">
              <FiTrash2 size={18} />
            </button>
          </div>

          {/* --- DESCRIPTION LOGIC --- */}
          <div className="mt-2">
            <button onClick={toggleDesc} className="flex items-center gap-1 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              {isDescOpen ? "Close Details" : "View Details"}
              <FiChevronDown className={`transition-transform duration-300 ${isDescOpen ? "rotate-180" : ""}`} />
            </button>
            {isDescOpen && (
              <div className={`mt-2 p-3 rounded-xl text-[11px] leading-relaxed font-bold ${isDark ? "bg-[#131921] text-gray-400" : "bg-gray-50 text-gray-600"}`}>
                {isDescExpanded ? item.description : shortDesc}
                {item.description?.length > 60 && (
                  <span onClick={toggleDescExpand} className="text-blue-600 ml-1 cursor-pointer underline">
                    {isDescExpanded ? "See Less" : "See More"}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between mt-4">
            <span className={`text-lg md:text-xl font-medium ${isDark ? "text-white" : "text-gray-900"}`}>₹ {item.price}</span>
            <div className={`flex items-center gap-3 px-3 py-1 rounded-xl border ${isDark ? "bg-[#131921] border-gray-700" : "bg-gray-50 border-gray-100"}`}>
              <button onClick={() => decrementCartQuantity(item.id)} disabled={cartUpdatingType === "decrement"} className="text-xs hover:text-blue-600 transition-colors">
                {cartUpdatingType === "decrement" ? <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin block" /> : <FiMinus />}
              </button>
              <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
              <button onClick={() => incrementCartQuantity(item.id)} disabled={cartUpdatingType === "increment"} className="text-xs hover:text-blue-600 transition-colors">
                {cartUpdatingType === "increment" ? <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin block" /> : <FiPlus />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartItemCard, (prevProps, nextProps) => {
  if (prevProps.isDark !== nextProps.isDark) return false;
  if (prevProps.cartUpdatingType !== nextProps.cartUpdatingType) return false;
  if (prevProps.item.id !== nextProps.item.id) return false;
  if (prevProps.item.quantity !== nextProps.item.quantity) return false;
  if (prevProps.item.price !== nextProps.item.price) return false;
  return true;
});
