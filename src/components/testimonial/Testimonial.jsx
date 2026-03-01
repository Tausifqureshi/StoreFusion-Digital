import React, { useContext } from 'react';
import { MyContext } from '../../context api/myContext';

function Testimonial({ reviews = [] }) {
  const { mode,getAvatar} = useContext(MyContext);
    if (!reviews.length) {
    return <p className="text-center text-gray-400">No reviews yet</p>;
  }

  return (
    <section className={`body-font mb-10 ${mode === 'dark' ? 'bg-gray-800' : 'bg-white'} text-gray-600`}>
      <div className="container px-5 py-10 mx-auto">
        {/* <h1 className="text-center text-3xl font-bold mb-10">
           What Our Customers Say
        </h1> */}

        {/* Testimonials Section */}
        <div className="flex flex-wrap -m-4">
          {reviews.map((testimonial, index) => (
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

export default Testimonial;

