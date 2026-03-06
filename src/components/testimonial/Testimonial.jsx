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
import { FaEdit, FaTrash, FaQuoteLeft } from 'react-icons/fa'; // Ye ensure kar lena

// Props mein productId ya categoryName bhej sakte ho
function Testimonial({ productId = null, categoryName = null, isAdmin = false }) {
  const {mode, testimonial, product, getAvatar, editTestimonial, deleteTestimonial } = useContext(MyContext);
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

  // return (
  //   <section className={`body-font mb-10 transition-all ${mode === 'dark' ? 'bg-[#131921]' : 'bg-white'}`}>
  //     <div className="container px-5 py-10 mx-auto">
  //       <div className="flex flex-wrap -m-4">
  //         {finalReviews.map((item, index) => (
  //           <div key={index} className="lg:w-1/3 p-4">
  //             <div className={`h-full text-center p-6 rounded-xl border transition-all ${mode === 'dark' ? 'bg-[#1e293b] border-gray-800' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
  //               <div className="flex justify-center mb-4">
  //                 <img
  //                   alt="customer"
  //                   className="w-20 h-20 object-cover rounded-full border-2 border-orange-500 p-1"
  //                   src={getAvatar(item)}
  //                 />
  //               </div>
  //               <p className={`leading-relaxed mb-4 text-sm italic ${mode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
  //                 "{item.text}"
  //               </p>
  //               <h2 className={`font-black uppercase text-xs tracking-widest ${mode === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
  //                 {item.name}
  //               </h2>
  //               <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{item.role}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );


return (
    <section className={`body-font mb-10 transition-all ${isDark ? "bg-[#131921]" : "bg-white"}`}>
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-wrap -m-4">
          {finalReviews.map((item, index) => (
            <div key={index} className="lg:w-1/3 md:w-1/2 p-4 w-full">
              <div className={`h-full text-center p-8 rounded-3xl border transition-all duration-300 ${isDark ? "bg-[#1e293b] border-gray-800 shadow-2xl" : "bg-gray-50 border-gray-100 shadow-sm hover:shadow-md"}`}>
                
                {/* Image Section - Fixed Rounding */}
                <div className="flex justify-center mb-6">
                  <img
                    alt="customer"
                    className="w-20 h-20 object-cover rounded-full border-4 border-blue-600 p-1 shadow-lg"
                    src={getAvatar(item)}
                  />
                </div>

                <FaQuoteLeft className="text-blue-600 mb-4 mx-auto opacity-20" size={30} />
                
                <p className={`leading-relaxed mb-6 text-sm italic font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  "{item.text}"
                </p>

                <div className="mt-auto">
                    <h2 className={`font-black uppercase text-xs tracking-widest ${isDark ? "text-white" : "text-blue-600"}`}>
                    {item.name}
                    </h2>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">{item.role}</p>
                </div>

                {/* ⭐ Buttons: Only for Admin or Specific Product Info Page */}
                {(isAdmin || productId) && (
                  <div className="mt-6 flex gap-3 justify-center border-t border-gray-200 dark:border-gray-700 pt-4">
                    <button 
                      onClick={() => editTestimonial(item)} 
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <FaEdit size={12} /> Edit
                    </button>
                    <button 
                      onClick={() => deleteTestimonial(item.id)} 
                      className="flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                    >
                      <FaTrash size={12} /> Delete
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