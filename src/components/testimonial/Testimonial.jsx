// import React, { useContext } from 'react';
// import { MyContext } from '../../context api/myContext';

// function Testimonial({ reviews = [] }) {
//   const { mode,getAvatar} = useContext(MyContext);
//     if (!reviews.length) {
//     return <p className="text-center text-gray-400">No reviews yet</p>;
//   }

//   // ⭐ Sara Filter Logic ab yahan hai
//   const finalReviews = useMemo(() => {
//     // Case 1: Agar Product ID mili hai (ProductInfo Page)
//     if (productId) {
//       return testimonial.filter(item => item.productId === productId);
//     }

//     // Case 2: Agar Category ke products mile hain (CategoryProducts Page)
//     if (categoryProducts) {
//       const categoryIds = categoryProducts.map(p => p.id);
//       return testimonial.filter(t => categoryIds.includes(t.productId));
//     }

//     // Case 3: Agar kuch nahi mila toh saare reviews dikhao (Home Page/Admin)
//     return testimonial;
//   }, [testimonial, productId, categoryProducts]);

//   // Agar koi review nahi mila toh section hi mat dikhao
//   if (finalReviews.length === 0) return null;

//   return (
//     <section className={`body-font mb-10 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} text-gray-600`}>
//       <div className="container px-5 py-10 mx-auto">
//         {/* <h1 className="text-center text-3xl font-bold mb-10">
//            What Our Customers Say
//         </h1> */}

//         {/* Testimonials Section */}
//         <div className="flex flex-wrap -m-4">
//           {reviews.map((testimonial, index) => (
//             <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
//               <div className={`h-full text-center p-6 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg shadow-lg`}>
//                 <div className="flex justify-center">
//                   <img
//                     alt="customer"
//                     className="w-24 h-24 mb-4 object-cover object-center rounded-full border-2 border-gray-200"
//                     // src={testimonial.img ||"https://i.pravatar.cc/300"}
//                     src={getAvatar(testimonial)}
//                   />
//                 </div>
//                 <p className={`leading-relaxed mb-4 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
//                   {testimonial.text}
//                 </p>

//                 <h2 className={`font-medium title-font tracking-wider text-sm uppercase mt-4 ${mode === 'dark' ? 'text-pink-500' : 'text-gray-900'}`}>
//                   {testimonial.name}
//                 </h2>
//                 <p className={`text-gray-500 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{testimonial.role}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Testimonial;



import React, { useContext, useMemo } from 'react';
import { MyContext } from '../../context api/myContext';
import { FaEdit, FaTrash, FaQuoteLeft, FaStar } from 'react-icons/fa'; // Ye ensure kar lena

// Props mein productId ya categoryName bhej sakte ho
function Testimonial({ productId = null, categoryName = null, isAdmin = false, mode }) {
  const { testimonial, product, getAvatar, editTestimonial, deleteTestimonial } = useContext(MyContext);
  const isDark = mode === 'dark';

  // ⭐ Sara Filter Logic ab yahan move ho gaya
  const finalReviews = useMemo(() => {
    // Case 1: Agar Product ID aayi hai (ProductInfo Page)
    if (productId) {
      return testimonial.filter(item => item.productId === productId);
    }

    // Case 2: Agar Category Name aaya hai (CategoryProducts Page)
    if (categoryName) {
      // Step A: Pehle check karo "Fashion" category mein kaun-kaun se products hain
      const categoryProductIds = product
        .filter(p => p.category?.toLowerCase() === categoryName.toLowerCase()) // ✅ Sirf "Fashion" wale
        .map(p => p.id); // ✅ Unki IDs ka array (e.g., ['p1', 'p5', 'p8'])

      // Step B: Ab wahi reviews dikhao jo in IDs se match karte hon
      return testimonial.filter(t => categoryProductIds.includes(t.productId));
    }

    // Case 3: Agar kuch nahi aaya toh saare dikhao (Home Page/Admin)
    return testimonial;
  }, [testimonial, productId, categoryName, product]);

  if (finalReviews.length === 0) return null; // Agar koi review nahi hai toh kuch mat dikhao
  return (
    <section className={`body-font mb-10 transition-all ${isDark ? "bg-[#131921]" : "bg-white"}`}>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {finalReviews.map((item, index) => (
            <div key={index} className="lg:w-1/3 md:w-1/2 p-4 w-full">
              <div className={`group relative h-full flex flex-col p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-2 ${isDark ? "bg-gradient-to-b from-[#1e293b] to-[#131921] border-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-blue-500/50 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]" : "bg-gradient-to-br from-white to-blue-50/40 border-gray-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:border-blue-200"}`}>

                {/* Large Background Quote */}
                <FaQuoteLeft className={`absolute top-6 right-6 opacity-20 transition-all duration-500 group-hover:scale-110 group-hover:text-blue-500 group-hover:opacity-40 ${isDark ? "text-gray-500" : "text-blue-300"}`} size={56} />

                {/* Text Content */}
                <div className="relative z-10 flex-1 mb-8">
                  {/* Subtle Premium Star Rating */}
                  <div className="flex gap-1 mb-5 text-orange-400">
                    <FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} /><FaStar size={14} />
                  </div>
                  <p className={`text-[15px] leading-relaxed italic ${isDark ? "text-gray-300 font-light" : "text-gray-700 font-medium"}`}>
                    "{item.text}"
                  </p>
                </div>

                {/* User Profile Footer */}
                <div className="relative z-10 flex items-center gap-4 mt-auto">
                  <div className="relative shrink-0">
                    <div className="w-[50px] h-[50px] rounded-full p-[2px] bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-md">
                      <img
                        alt="customer"
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

                {/* ⭐ Buttons: Only for Admin or Specific Product Info Page */}
                {(isAdmin || productId) && (
                  <div className="relative z-10 mt-8 flex gap-3 justify-start border-t border-gray-200 dark:border-gray-800 pt-5">
                    <button
                      onClick={() => editTestimonial(item)}
                      className="flex-1 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider bg-transparent border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 px-4 py-2.5 rounded-xl hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
                    >
                      <FaEdit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => deleteTestimonial(item.id)}
                      className="flex-1 flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-wider bg-transparent border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-4 py-2.5 rounded-xl hover:bg-red-600 hover:border-red-600 hover:text-white dark:hover:text-white transition-all shadow-sm"
                    >
                      <FaTrash size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

export default Testimonial;