import React, { useContext } from 'react';
import { MyContext } from '../../context api/myContext';

function AllTestimonial() {
  const { mode, testimonial,getAvatar  } = useContext(MyContext);

  return (
    <section className={`body-font mb-10 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} text-gray-600`}>
      <div className="container px-5 py-10 mx-auto">
        {/* Heading */}
        <h1 className={`text-center text-3xl font-bold ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
          What Our Customers Are Saying
        </h1>
        <h2 className={`text-center text-2xl font-semibold mb-10 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
          See how our <span className='text-pink-500'>customers</span> love our products!
        </h2>

        {/* Testimonials Section */}
        <div className="flex flex-wrap -m-4">
          {testimonial.map((testimonial, index) => (
            <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className={`h-full text-center p-6 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg shadow-lg`}>
                <div className="flex justify-center">
                  <img
                    alt="customer"
                    className="w-24 h-24 mb-4 object-cover object-center rounded-full border-2 border-gray-200"
                    // src={testimonial.img ||"https://i.pravatar.cc/300"}
                    src={getAvatar(testimonial)}
                  />
                </div>
                <p className={`leading-relaxed mb-4 ${mode === 'dark' ? 'text-white' : 'text-black'}`}>
                  {testimonial.text}
                </p>
                
                <h2 className={`font-medium title-font tracking-wider text-sm uppercase mt-4 ${mode === 'dark' ? 'text-pink-500' : 'text-gray-900'}`}>
                  {testimonial.name}
                </h2>
                <p className={`text-gray-500 ${mode === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllTestimonial;



// {similarProducts.map((item) => (
//                 <div
//                   key={item.id}
//                   onClick={() => navigate(`/productinfo/${item.id}`)}
//                   className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow transform hover:scale-105"
//                 >
//                   {/* <img className="w-full h-48 object-contain p-4" src={item.imageUrl} alt={item.title} /> */}
//                   <div className="relative">
//         {discount > 0 && (
//           <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
//             {discount}% OFF
//           </span>
//         )}

//         <img
//           className="w-full h-48 object-contain p-4"
//           src={item.imageUrl}
//           alt={item.title}
//         />
//       </div>
                  
//                   <div className="p-4">
//                     <h3 className="text-xs text-gray-500 mb-1">{item.category}</h3>
//                     <h2 className="text-lg font-medium text-gray-900">{item.title}</h2>
//                     {/* <p className="mt-1 font-bold">₹{item.price}</p> */}
//                     <div className="flex items-center gap-2 mt-1">
//           <span className="font-bold text-green-600">₹{finalPrice}</span>

//           {discount > 0 && (
//             <span className="line-through text-gray-400 text-sm">
//               ₹{item.price}
//             </span>
//           )}
//         </div>
//                   </div>
//                 </div>
//               ))}