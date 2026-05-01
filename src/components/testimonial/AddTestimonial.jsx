import { ProductAdminContext, TestimonialContext, ThemeContext } from '../../context api/AllContext';
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const RATING_CONFIG = [
  { label: "Terrible", color: "text-red-500", bg: "bg-red-50 border-red-200" },
  { label: "Poor", color: "text-orange-500", bg: "bg-orange-50 border-orange-200" },
  { label: "Okay", color: "text-yellow-500", bg: "bg-yellow-50 border-yellow-200" },
  { label: "Good", color: "text-lime-600", bg: "bg-lime-50 border-lime-200" },
  { label: "Excellent", color: "text-green-600", bg: "bg-green-50 border-green-200" },
];

// ✅ Main View Component
const AddTestimonialView = React.memo(function AddTestimonialView({
  isDark, rating, setRating, testimonialForm, setTestimonialForm, handleSubmit, loading
}) {
  const [hovered, setHovered] = useState(0);
  const active = hovered || rating;
  const config = active > 0 ? RATING_CONFIG[active - 1] : null;

  const inputCls = `w-full px-3.5 py-2.5 text-sm border rounded-lg outline-none transition-all duration-150
    ${isDark
      ? "bg-[#1e293b] border-gray-600 text-white placeholder-gray-500 focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0]/40"
      : "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-[#2874F0] focus:ring-1 focus:ring-[#2874F0]/20"
    }`;

  return (
    <div
      id="testimonial-form"
      className={`w-full max-w-2xl mx-auto overflow-hidden
        ${isDark
          ? "bg-[#1a1f2e] border border-gray-700 rounded-2xl"
          : "bg-white border border-gray-200 rounded-2xl shadow-lg shadow-gray-100"
        }`}
    >
      {/* ── Header Bar — website orange accent ── */}
      <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-base">Rate this product</h2>
          <p className="text-orange-100 text-xs mt-0.5">Help others with your experience</p>
        </div>
        {/* Live star preview in header */}
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map(s => (
            <FaStar key={s} size={14} className={s <= (rating) ? "text-white" : "text-orange-300/50"} />
          ))}
        </div>
      </div>

      {/* ── Star Rating Block ─────────────────────────────────────────── */}
      <div className={`px-6 py-5 border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
        <p className={`text-xs font-semibold mb-3 uppercase tracking-wide ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          Tap to rate
        </p>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(val => (
            <button
              key={val}
              type="button"
              onClick={() => setRating(val)}
              onMouseEnter={() => setHovered(val)}
              onMouseLeave={() => setHovered(0)}
              className="transition-all duration-100 hover:scale-125 active:scale-95 focus:outline-none"
              aria-label={`${val} star`}
            >
              <FaStar
                size={38}
                className={`transition-colors duration-150 drop-shadow-sm ${val <= active ? "text-[#FFD700]" : isDark ? "text-gray-600" : "text-gray-200"
                  }`}
              />
            </button>
          ))}

          {/* Rating pill badge — Meesho style */}
          {config && (
            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.color} transition-all duration-200`}>
              {config.label}
            </span>
          )}
        </div>
      </div>

      {/* ── Form Fields ───────────────────────────────────────────────── */}
      <div className="px-6 py-5 space-y-4">

        {/* Name */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className={inputCls}
            value={testimonialForm.name}
            onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
          />
        </div>

        {/* Review */}
        <div>
          <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Review Description <span className="text-red-400">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Describe what you liked or disliked, and share your overall experience..."
            className={`${inputCls} resize-none`}
            value={testimonialForm.text}
            onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
          />
          <p className={`text-xs mt-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
            {testimonialForm.text?.length || 0} characters
          </p>
        </div>

        {/* Photo + Role — 2 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Photo URL <span className={isDark ? "text-gray-600" : "text-gray-400"}>(optional)</span>
            </label>
            <input
              type="url"
              placeholder="https://photo-link.jpg"
              className={inputCls}
              value={testimonialForm.img}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, img: e.target.value })}
            />
          </div>
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Your Role
            </label>
            <input
              type="text"
              placeholder="e.g. Verified Buyer"
              className={inputCls}
              value={testimonialForm.role}
              onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* ── Footer / Submit ───────────────────────────────────────────── */}
      <div className={`px-6 py-4 border-t flex flex-col sm:flex-row items-center gap-3 ${isDark ? "border-gray-700 bg-[#141821]" : "border-gray-100 bg-gray-50"}`}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full sm:w-auto px-10 py-2.5 rounded-lg text-sm font-bold transition-all duration-150 active:scale-95
            ${loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#FB641B] hover:bg-[#e55b16] text-white shadow-md shadow-[#FB641B]/30"
            }`}
        >
          {loading ? "Submitting..." : testimonialForm.id ? "Update Review" : "Submit Review"}
        </button>
        <p className={`text-xs text-center sm:text-left ${isDark ? "text-gray-600" : "text-gray-400"}`}>
          Your review will be visible to all shoppers
        </p>
      </div>
    </div>
  );
});


function AddTestimonial({ productId = "" }) {
  const { testimonialForm, setTestimonialForm, addTestimonial, updateTestimonial } = useContext(TestimonialContext);
  const { loading } = useContext(ProductAdminContext);
  const { mode } = useContext(ThemeContext);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const isDark = mode === "dark";

  useEffect(() => {
    if (testimonialForm?.rating) setRating(testimonialForm.rating);
  }, [testimonialForm]);

  useEffect(() => {
    if (productId && !testimonialForm.id) {
      setRating(0);
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

  return (
    <AddTestimonialView
      isDark={isDark}
      rating={rating}
      setRating={setRating}
      testimonialForm={testimonialForm}
      setTestimonialForm={setTestimonialForm}
      handleSubmit={handleSubmit}
      loading={loading}
    />
  );
}

AddTestimonial.displayName = 'AddTestimonial';
export default React.memo(AddTestimonial);
