import { ProductAdminContext, TestimonialContext, ThemeContext } from '../../context api/AllContext';
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const RATING_CONFIG = [
  { label: "Terrible", color: "text-red-500", bg: "bg-red-50 border-red-200" },
  { label: "Poor", color: "text-orange-500", bg: "bg-orange-50 border-orange-200" },
  { label: "Okay", color: "text-yellow-500", bg: "bg-yellow-50 border-yellow-200" },
  { label: "Good", color: "text-lime-600", bg: "bg-lime-50 border-lime-200" },
  { label: "Excellent", color: "text-green-600", bg: "bg-green-50 border-green-200" },
];

// ✅ Amazon Exact Style View Component
const AddTestimonialView = React.memo(function AddTestimonialView({
  isDark, rating, setRating, testimonialForm, setTestimonialForm, handleSubmit, loading, showClose, onClose
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || rating;
  const config = active > 0 ? RATING_CONFIG[active - 1] : null;

  const inputCls = `w-full px-4 py-3 text-sm rounded-lg border outline-none transition-all duration-200
    ${isDark
      ? "bg-[#1e293b] border-gray-700 text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
      : "bg-white border-gray-300 text-gray-800 focus:border-[#e77600] focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]"
    }`;

  return (
    <div
      className={`w-full max-w-2xl mx-auto overflow-hidden
        ${isDark
          ? "bg-[#1a1f2e] border border-gray-800 rounded-lg shadow-xl"
          : "bg-white border border-gray-200 rounded-lg shadow-sm"
        }`}
    >
      {/* ── Brand Style Header ── */}
      <div className={`px-6 py-5 flex items-center justify-between border-b ${isDark ? "border-gray-800" : "border-gray-100"}`}>
        <h2 className={`text-xl md:text-2xl font-black uppercase tracking-tighter italic ${isDark ? "text-white" : "text-gray-900"}`}>
          {testimonialForm.id ? "Update" : "Create"} <span className="text-orange-500">Review</span>
        </h2>
        {showClose && (
          <button
            onClick={onClose}
            className={`p-1 rounded-md transition-all ${isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"}`}
          >
            <FiX size={24} />
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* ── 1. Overall Rating ── */}
        <div className="space-y-2">
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Overall rating</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRating(val)}
                  onMouseEnter={() => setHovered(val)}
                  onMouseLeave={() => setHovered(0)}
                  className="transition-transform active:scale-90"
                >
                  <FaStar
                    size={36}
                    className={`transition-colors duration-200 ${val <= active 
                      ? "text-[#f5a623]" 
                      : isDark ? "text-gray-800" : "text-gray-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            {config && (
              <span className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {config.label}
              </span>
            )}
          </div>
        </div>

        <div className={`border-t ${isDark ? "border-gray-800" : "border-gray-100"} pt-4 space-y-4`}>
          
          {/* ── 2. Add a Photo ── */}
          <div className="space-y-2">
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Add a photo</h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Shoppers find images more helpful than text alone</p>
            <input
              type="url"
              placeholder="Paste photo link here (e.g. https://...)"
              className={inputCls}
              value={testimonialForm.img}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, img: e.target.value })}
            />
          </div>

          {/* ── 3. Name & Role ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Your Name</h3>
              <input
                type="text"
                placeholder="John Doe"
                className={inputCls}
                value={testimonialForm.name}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Your Role</h3>
              <input
                type="text"
                placeholder="Verified Buyer"
                className={inputCls}
                value={testimonialForm.role}
                onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
              />
            </div>
          </div>

          {/* ── 4. Written Review ── */}
          <div className="space-y-2">
            <h3 className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Add a written review</h3>
            <textarea
              rows={3}
              placeholder="What did you like or dislike? What did you use this product for?"
              className={`${inputCls} resize-none`}
              value={testimonialForm.text}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
            />
          </div>

        </div>

        {/* ── Website Theme Style Submit Button ── */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-10 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95
              ${loading
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
              }`}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
});


function AddTestimonial({ productId = "" }) {
  const { testimonialForm, setTestimonialForm, addTestimonial, updateTestimonial, resetFormState } = useContext(TestimonialContext);
  const { loading } = useContext(ProductAdminContext);
  const { mode } = useContext(ThemeContext);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const isDark = mode === "dark";

  useEffect(() => {
    // Ye function tab chalta hai jab component screen se hat-ta hai (Unmount)
    return () => {
      resetFormState(); // Context ke form ko wapas khali kar do
      setRating(0);      // Star rating ko zero kar do
    };
  }, [resetFormState]);


  useEffect(() => {
    if (testimonialForm?.rating) setRating(testimonialForm.rating);
  }, [testimonialForm]);

  useEffect(() => {
    if (productId) {
      setRating(0);  // Kabhi-kabhi Admin ek product page se doosre product page par direct ja sakta hai. Wahan bhi form reset hona chahiye Naye productId ke liye form ko reset kar do
      setTestimonialForm({ name: "", text: "", img: "", role: "", productId: productId });
    }
  }, [productId, setTestimonialForm]);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (testimonialForm.id) {
      updateTestimonial(navigate);
    } else {
      addTestimonial({
        ...testimonialForm,
        rating,
        productId: productId || testimonialForm.productId || "",
      });
    }
    setRating(0);
    setTestimonialForm({ name: "", text: "", img: "", role: "", productId: "" });
  };

  // 👉 Agar productId hai (yaani ProductInfo page), toh sirf View dikhao bina extra background/close button ke
  if (productId) {
    return (
      <AddTestimonialView
        isDark={isDark}
        rating={rating}
        setRating={setRating}
        testimonialForm={testimonialForm}
        setTestimonialForm={setTestimonialForm}
        handleSubmit={handleSubmit}
        loading={loading}
        showClose={false}
      />
    );
  }

  // 👉 Agar productId nahi hai (yaani Standalone page), toh background aur Header me 'X' button ke saath dikhao
  return (
    <div className={`min-h-screen py-6 px-4 transition-all duration-300 ${isDark ? "bg-[#111827]" : "bg-gray-50"}`}>
      <AddTestimonialView
        isDark={isDark}
        rating={rating}
        setRating={setRating}
        testimonialForm={testimonialForm}
        setTestimonialForm={setTestimonialForm}
        handleSubmit={handleSubmit}
        loading={loading}
        showClose={true}
        onClose={() => navigate(-1)}
      />
    </div>
  );
}

AddTestimonial.displayName = 'AddTestimonial';
export default React.memo(AddTestimonial);