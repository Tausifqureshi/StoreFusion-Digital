import React, { useContext, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../../layout/Layout';
import SingleReviewCard from '../SingleReviewCard/SingleReviewCard';
import { ThemeContext } from '../../../context/AllContext';
import { testimonialService } from '../../../services/testimonialService';
import { setTestimonialForm } from '../../../features/testimonials/testimonialSlice';
import { toast } from 'react-toastify';

function AllTestimonials() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const testimonials = useSelector((state) => state.testimonials.items);
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';
  const reviewsRef = useRef(null);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 12;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = testimonials.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(testimonials.length / reviewsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    reviewsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ Helper Functions
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

  return (
    <Layout>
      <div ref={reviewsRef} className={`min-h-screen py-12 px-4 md:px-8 pt-28 ${isDark ? 'bg-[#0f172a]' : 'bg-gray-50/50'}`}>
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="mb-12 border-l-4 border-orange-500 pl-6">
            <h1 className={`text-4xl md:text-5xl font-black italic tracking-tighter uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Community <span className="text-orange-500">Testimonials</span>
            </h1>
            <p className={`text-sm md:text-base font-bold uppercase tracking-[0.4em] mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              What our community thinks about us ({testimonials.length})
            </p>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentReviews.map((item, index) => (
              <SingleReviewCard
                key={index}
                item={item}
                isDark={isDark}
                getAvatar={getAvatar}
                editTestimonial={editTestimonial}
                deleteTestimonial={deleteTestimonial}
              />
            ))}
          </div>

          {currentReviews.length === 0 && (
            <div className="text-center py-20 opacity-30 font-black uppercase text-xl tracking-widest">
              No Reviews Found
            </div>
          )}

          {/* Pagination Buttons */}
          {testimonials.length > reviewsPerPage && (
            <div className="flex justify-center items-center gap-3 mt-16">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${isDark ? 'bg-gray-800 text-gray-400 disabled:opacity-30' : 'bg-white border text-gray-600 disabled:opacity-30 shadow-md hover:shadow-lg'}`}
              >
                Prev
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-10 h-10 rounded-xl font-black transition-all ${currentPage === i + 1 ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : (isDark ? 'bg-gray-800 text-gray-400 hover:bg-gray-700' : 'bg-white border text-gray-600 hover:bg-gray-50 shadow-sm')}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${isDark ? 'bg-gray-800 text-gray-400 disabled:opacity-30' : 'bg-white border text-gray-600 disabled:opacity-30 shadow-md hover:shadow-lg'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default AllTestimonials;
