import React, { useContext, useMemo } from 'react';
import { ProductContext, TestimonialContext } from '../../context api/AllContext';
import { FaEdit, FaTrash, FaQuoteLeft, FaStar } from 'react-icons/fa'; // Ye ensure kar lena
import { useNavigate } from 'react-router-dom';

// ✅ INTERNAL VIEW: Locked to prevent reconciliation from parent re-renders
const TestimonialView = React.memo(function TestimonialView({ finalReviews, isDark, isAdmin, productId, getAvatar, editTestimonial, deleteTestimonial }) {
  if (finalReviews.length === 0) return null;
  return (
    <section className="body-font mb-10 transition-all">
      <div className="container px-5 py-8 md:py-12 mx-auto">
        <div className={`rounded-3xl p-4 md:p-6 md:px-8 shadow-sm border ${isDark ? 'bg-[#131921] border-gray-800' : 'bg-white border-gray-100 shadow-blue-900/5'}`}>
          {/* Section Heading */}
          <div className="flex items-center justify-between mb-10 border-l-4 border-orange-500 pl-4">
            <div>
              <h2 className={`text-3xl md:text-4xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
                What Our <span className="text-orange-500">Users Say</span>
              </h2>
              <p className={`text-xs md:text-sm font-bold uppercase tracking-[0.3em] mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                Customer Testimonials
              </p>
            </div>
          </div>

          <div className="flex flex-wrap -m-4">
            {finalReviews.map((item, index) => (
              <div key={index} className="lg:w-1/3 md:w-1/2 p-4 w-full">
                <div className={`group relative h-full flex flex-col p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${isDark ? "bg-gradient-to-b from-[#1e293b] to-[#131921] border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-blue-500/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]" : "bg-gradient-to-br from-white to-blue-50/40 border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:border-blue-200"}`}>
                  <FaQuoteLeft className={`absolute top-6 right-6 opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-500 group-hover:opacity-40 ${isDark ? "text-gray-500" : "text-blue-300"}`} size={56} />
                  <div className="relative z-10 flex-1 mb-8">
                    <div className="flex gap-1 mb-5 text-orange-400">
                      <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} />
                    </div>
                    <p className={`text-[15px] leading-relaxed italic ${isDark ? "text-gray-300 font-light" : "text-gray-700 font-medium"}`}>
                      "{item.text}"
                    </p>
                  </div>
                  <div className="relative z-10 flex items-center gap-4 mt-auto">
                    <div className="relative shrink-0">
                      <div className="w-[50px] h-[50px] rounded-full p-[2px] bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md">
                        <img
                          alt="customer"
                          loading="lazy"
                          decoding="async"
                          className={`w-full h-full object-cover rounded-full border-2 ${isDark ? 'border-[#1e293b]' : 'border-white'}`}
                          src={getAvatar(item)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col text-left">
                      <h2 className={`font-black text-[15px] tracking-wide ${isDark ? "text-white" : "text-gray-900"}`}>
                        {item.name}
                      </h2>
                      <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  {(isAdmin || productId) && (
                    <div className="relative z-10 mt-8 flex gap-3 justify-start border-t border-gray-200 dark:border-gray-800 pt-5">
                      <button onClick={() => editTestimonial(item)} className="flex-1 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider bg-transparent border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 px-4 py-2.5 rounded-xl hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:text-white transition-all shadow-sm">
                        <FaEdit size={14} /> Edit
                      </button>
                      <button onClick={() => deleteTestimonial(item.id)} className="flex-1 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider bg-transparent border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-4 py-2.5 rounded-xl hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:text-white transition-all shadow-sm">
                        <FaTrash size={14} /> Delete
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

function Testimonial({ productId = null, categoryName = null, isAdmin = false, mode }) {
  const { testimonial, getAvatar, editTestimonial, deleteTestimonial } = useContext(TestimonialContext);
  const { product } = useContext(ProductContext);
  const navigate = useNavigate();
  const isDark = mode === 'dark';

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