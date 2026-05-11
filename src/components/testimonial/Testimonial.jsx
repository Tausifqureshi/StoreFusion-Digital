import React, { useContext, useMemo } from 'react';
import { ThemeContext } from '../../context/AllContext';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SingleReviewCard from './SingleReviewCard/SingleReviewCard';
import { testimonialService } from '../../services/testimonialService';
import { setTestimonialForm } from '../../features/testimonials/testimonialSlice';
import { toast } from 'react-toastify';

// ✅ INTERNAL VIEW: Amazon Modern List Style
const TestimonialView = React.memo(function TestimonialView({ finalReviews, isDark, isAdmin, productId, getAvatar, editTestimonial, deleteTestimonial }) {
  if (finalReviews.length === 0) return (
    <div className={`text-center py-12 border rounded-xl ${isDark ? 'bg-gray-900/20 border-gray-800 text-gray-600' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
      <p className="font-bold italic">No customer reviews yet.</p>
    </div>
  );

  return (
    <div className="w-full max-w-[280px]">
      {finalReviews.map((item, index) => (
        <SingleReviewCard
          key={index}
          item={item}
          isDark={isDark}
          isAdmin={isAdmin}
          productId={productId}
          getAvatar={getAvatar}
          editTestimonial={editTestimonial}
          deleteTestimonial={deleteTestimonial}
        />
      ))}
    </div>
  );
});

function Testimonial({ productId = null, categoryName = null, isAdmin = false, mode: propMode, homePage = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const testimonials = useSelector((state) => state.testimonials.items);
  const products = useSelector((state) => state.products.items);
  const { mode: contextMode } = useContext(ThemeContext);

  const currentMode = propMode || contextMode;
  const isDark = currentMode === 'dark';

  const finalReviews = useMemo(() => {
    if (productId) return testimonials.filter(item => item.productId === productId);
    if (categoryName) {
      const categoryProductIds = products.filter(p => p.category?.toLowerCase() === categoryName.toLowerCase()).map(p => p.id);
      return testimonials.filter(t => categoryProductIds.includes(t.productId));
    }
    return testimonials;
  }, [testimonials, productId, categoryName, products]);

  // ✅ Slice reviews for Home Page
  const displayReviews = homePage ? finalReviews.slice(0, 4) : finalReviews;

  // ✅ Helper Functions (Previously in Context)
  const getAvatar = (item) => testimonialService.getAvatar(item);
  
  const editTestimonial = (item) => {
    dispatch(setTestimonialForm(item));
    navigate('/addtestimonial');
  };

  const deleteTestimonial = async (id) => {
    try {
      await testimonialService.deleteTestimonial(id);
      toast.success('Testimonial deleted!', { autoClose: 1000 });
    } catch (err) {
      toast.error('Error deleting testimonial');
    }
  };

  // ✅ Dynamic Heading Logic
  const getHeading = () => {
    if (homePage) return { main: "What Our", highlight: "Customers Say", sub: "Real experiences from real users", color: "text-orange-500" };
    if (categoryName) return { main: "Category", highlight: "Feedback", sub: `Top reviews in ${categoryName}`, color: "text-orange-500" };
    if (productId) return { main: "Product", highlight: "Reviews", sub: "What buyers are saying about this item", color: "text-orange-500" };
    return { main: "Customer", highlight: "Testimonials", sub: "Real feedback from our community", color: "text-orange-500" };
  };

  const heading = getHeading();

  return (
    <div className={`w-full rounded-3xl p-3 md:p-4 shadow-sm border mb-8 ${isDark ? 'bg-[#1a1f2e] border-gray-800' : 'bg-white border-gray-100 shadow-blue-900/5'}`}>
      {/* ── Section Heading (Dynamic) ── Match Home Page Style */}
      <div className={`flex items-center justify-between mb-6 pb-2 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'} px-2`}>
        <div>
          <h2 className={`text-2xl md:text-3xl font-black tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {heading.main} <span className={heading.color}>{heading.highlight}</span>
          </h2>
          <p className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {heading.sub}
          </p>
        </div>
      </div>

      {/* ── Testimonial Grid View ── */}
      <div className="flex justify-start">
        <div className="w-full">
          <TestimonialView
            finalReviews={displayReviews}
            isDark={isDark}
            isAdmin={isAdmin}
            productId={productId}
            getAvatar={getAvatar}
            editTestimonial={editTestimonial}
            deleteTestimonial={deleteTestimonial}
          />

          {/* ── View All Button (Only for Home Page) ── */}
          {homePage && finalReviews.length > 4 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => navigate('/all-testimonials')}
                className="px-10 py-3.5 bg-orange-500 text-white font-black uppercase tracking-widest text-[11px] rounded-full shadow-xl shadow-orange-500/20 hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                View All Reviews ({finalReviews.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(Testimonial);
