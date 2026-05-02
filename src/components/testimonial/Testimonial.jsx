import React, { useContext, useMemo } from 'react';
import { ProductContext, TestimonialContext, ThemeContext } from '../../context api/AllContext';
import { FaEdit, FaTrash, FaQuoteLeft, FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// ✅ INTERNAL VIEW: Optimized for dashboard integration
const TestimonialView = React.memo(function TestimonialView({ finalReviews, isDark, isAdmin, productId, getAvatar, editTestimonial, deleteTestimonial }) {
  if (finalReviews.length === 0) return (
    <div className={`text-center py-10 border-2 border-dashed rounded-3xl ${isDark ? 'border-gray-800 text-gray-600' : 'border-gray-100 text-gray-400'}`}>
      <p className="font-bold italic">No feedback available yet.</p>
    </div>
  );

  return (
    <section className="body-font mb-4 transition-all">
      <div className="container mx-auto">
        <div className={`rounded-3xl p-4 md:p-6 md:px-8 border transition-all duration-300 ${isDark ? 'bg-[#1e293b]/50 border-gray-700 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}>
          {/* Section Heading */}
          <div className="flex items-center justify-between mb-8 border-l-4 border-orange-500 pl-4">
            <div>
              <h2 className={`text-2xl md:text-3xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
                What Our <span className="text-orange-500">Users Say</span>
              </h2>
              <p className={`text-[10px] font-bold uppercase tracking-[0.3em] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Customer Testimonials
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {finalReviews.map((item, index) => (
              <div key={index} className="lg:w-1/3 md:w-1/2 p-4 w-full">
                <div className={`group relative h-full flex flex-col p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${isDark ? "bg-[#111827] border-gray-700 shadow-lg hover:border-orange-500/50" : "bg-gradient-to-br from-white to-orange-50/20 border-gray-200 shadow-sm hover:border-orange-200"}`}>
                  <FaQuoteLeft className={`absolute top-6 right-6 opacity-10 transition-all duration-500 group-hover:scale-110 group-hover:text-orange-500 group-hover:opacity-30 ${isDark ? "text-gray-500" : "text-orange-300"}`} size={48} />

                  <div className="relative z-10 flex-1 mb-8">
                    <div className="flex gap-1 mb-5 text-orange-400">
                      {[1, 2, 3, 4, 5].map((_, i) => <FaStar key={i} size={12} />)}
                    </div>
                    <p className={`text-[14px] leading-relaxed italic ${isDark ? "text-gray-300 font-light" : "text-gray-700 font-medium"}`}>
                      "{item.text}"
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center gap-4 mt-auto">
                    <div className="relative shrink-0">
                      <div className="w-[45px] h-[45px] rounded-full p-[2px] bg-gradient-to-tr from-orange-600 to-amber-400 shadow-md">
                        <img
                          alt="customer"
                          loading="lazy"
                          className={`w-full h-full object-cover rounded-full border-2 ${isDark ? 'border-gray-900' : 'border-white'}`}
                          src={getAvatar(item)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col text-left">
                      <h2 className={`font-black text-[14px] tracking-wide ${isDark ? "text-white" : "text-gray-900"}`}>
                        {item.name}
                      </h2>
                      <p className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mt-0.5">
                        {item.role || 'Verified User'}
                      </p>
                    </div>
                  </div>

                  {(isAdmin || productId) && (
                    <div className="relative z-10 mt-8 flex gap-3 justify-start border-t border-gray-200 dark:border-gray-800/50 pt-5">
                      <button onClick={() => editTestimonial(item)} className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider border px-3 py-2 rounded-xl transition-all shadow-sm ${isDark ? 'bg-transparent border-blue-900/50 text-blue-400 hover:bg-blue-600 hover:text-white' : 'bg-transparent border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
                        <FaEdit size={12} /> Edit
                      </button>
                      <button onClick={() => deleteTestimonial(item.id)} className={`flex-1 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-wider border px-3 py-2 rounded-xl transition-all shadow-sm ${isDark ? 'bg-transparent border-red-900/50 text-red-400 hover:bg-red-600 hover:text-white' : 'bg-transparent border-red-100 text-red-600 hover:bg-red-600 hover:text-white'}`}>
                        <FaTrash size={12} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

function Testimonial({ productId = null, categoryName = null, isAdmin = false, mode: propMode }) {
  const { testimonial, getAvatar, editTestimonial, deleteTestimonial } = useContext(TestimonialContext);
  const { product } = useContext(ProductContext);
  const { mode: contextMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const currentMode = propMode || contextMode;
  const isDark = currentMode === 'dark';

  const finalReviews = useMemo(() => {
    if (productId) return testimonial.filter(item => item.productId === productId);
    if (categoryName) {
      const categoryProductIds = product.filter(p => p.category?.toLowerCase() === categoryName.toLowerCase()).map(p => p.id);
      return testimonial.filter(t => categoryProductIds.includes(t.productId));
    }
    return testimonial;
  }, [testimonial, productId, categoryName, product]);

  return <TestimonialView
    finalReviews={finalReviews}
    isDark={isDark}
    isAdmin={isAdmin}
    productId={productId}
    getAvatar={getAvatar}
    editTestimonial={(item) => editTestimonial(item, navigate)}
    deleteTestimonial={deleteTestimonial}
  />;
}

export default React.memo(Testimonial);