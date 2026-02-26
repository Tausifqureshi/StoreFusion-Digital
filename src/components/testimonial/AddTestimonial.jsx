// import React, { useContext } from "react";
// import { MyContext } from "../../context api/myContext";

// function AddTestimonial() {
//   const { testimonialForm, setTestimonialForm, addTestimonial, loading } =
//     useContext(MyContext);

//   return (
//     <div className="p-6 max-w-md">
//       <input
//         className="border p-2 w-full mb-3"
//         placeholder="Name"
//         value={testimonialForm.name}
//         onChange={(e) =>
//           setTestimonialForm({ ...testimonialForm, name: e.target.value })
//         }
//       />

//       <input
//         className="border p-2 w-full mb-3"
//         placeholder="Image URL"
//         value={testimonialForm.img}
//         onChange={(e) =>
//           setTestimonialForm({ ...testimonialForm, img: e.target.value })
//         }
//       />

//       <textarea
//         className="border p-2 w-full mb-3"
//         placeholder="Review"
//         value={testimonialForm.text}
//         onChange={(e) =>
//           setTestimonialForm({ ...testimonialForm, text: e.target.value })
//         }
//       />

//       <input
//         className="border p-2 w-full mb-3"
//         placeholder="Role"
//         value={testimonialForm.role}
//         onChange={(e) =>
//           setTestimonialForm({ ...testimonialForm, role: e.target.value })
//         }
//       />

//       <button
//         onClick={addTestimonial}
//         className="bg-black text-white px-4 py-2 rounded w-full"
//       >
//         {loading ? "Adding..." : "Add Testimonial"}
//       </button>
//     </div>
//   );
// }

// export default AddTestimonial;




import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context api/myContext";

const Star = ({ filled, onClick }) => (
  <svg
    onClick={onClick}
    className={`w-7 h-7 cursor-pointer transition-colors ${
      filled ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
    }`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

function AddTestimonial({ productId = "" }) {
  const { testimonialForm, setTestimonialForm, addTestimonial, loading, updateTestimonial } =
    useContext(MyContext);

  const [rating, setRating] = useState(0);
useEffect(() => {
  if (testimonialForm?.rating) {
    setRating(testimonialForm.rating);
  }
}, [testimonialForm]);


  // const isEdit = testimonialForm?.id;

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a star rating");
      return;
    }

  if (testimonialForm.id) {
    updateTestimonial();
    return;
  } else {
    addTestimonial({
      ...testimonialForm,
      rating,
      // productId,
       productId: productId || testimonialForm.productId || "",
    });
  }

    setRating(0);
    setTestimonialForm({ name: "", text: "", img: "", role: "", productId: "" });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg mt-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Submit Your Review
      </h2>

      {/* Star Rating */}
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} filled={star <= rating} onClick={() => setRating(star)} />
        ))}
      </div>

      <input
        placeholder="Your Name"
        className="border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md p-3 w-full mb-4 transition-all"
        value={testimonialForm.name}
        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
      />

      <textarea
        placeholder="Write your review..."
        className="border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md p-3 w-full mb-4 transition-all resize-none h-24"
        value={testimonialForm.text}
        onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
      />

      <input
        placeholder="Image URL (optional)"
        className="border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md p-3 w-full mb-4 transition-all"
        value={testimonialForm.img}
        onChange={(e) => setTestimonialForm({ ...testimonialForm, img: e.target.value })}
      />

      <input
        placeholder="Role / Position"
        className="border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md p-3 w-full mb-4 transition-all"
        value={testimonialForm.role}
        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg w-full font-medium hover:bg-indigo-700 transition-all shadow-md"
      >
        {/* {loading ? "Submitting..." : "Submit Review"}
         */}
         {loading ? "Saving..." : testimonialForm.id ? "Update Review" : "Submit Review"}
      </button>
    </div>
  );
}

export default AddTestimonial;












