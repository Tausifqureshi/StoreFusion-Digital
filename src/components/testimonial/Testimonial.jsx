import React, { useContext } from 'react';
import { MyContext } from '../../context api/myContext';

function Testimonial() {
  const { mode } = useContext(MyContext);

  const testimonials = [
    {
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "I ordered a dress for my sister's wedding, and it fit perfectly! The quality is amazing for the price. I’ve received so many compliments on the dress!",
      name: "Sarah Johnson",
      role: "Fashion Lover",
    },
    {
      img: "https://randomuser.me/api/portraits/women/65.jpg",
      text: "The skincare set I bought has transformed my routine. My skin feels so much healthier! I love how my skin glows now!",
      name: "Emily Davis",
      role: "Beauty Enthusiast",
    },
    {
      img: "https://randomuser.me/api/portraits/women/32.jpg",
      text: "I found the perfect pair of shoes for my vacation. They’re stylish and comfortable! They’ve become my go-to pair for any occasion!",
      name: "Anna Taylor",
      role: "Travel Aficionado",
    },
  ];

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
          {testimonials.map((testimonial, index) => (
            <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div className={`h-full text-center p-6 ${mode === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg shadow-lg`}>
                <div className="flex justify-center">
                  <img
                    alt="customer"
                    className="w-24 h-24 mb-4 object-cover object-center rounded-full border-2 border-gray-200"
                    src={testimonial.img}
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
