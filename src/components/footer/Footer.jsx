
// import React, { useContext } from "react";
// import { MyContext } from "../../context api/myContext";
// import { Link } from 'react-router-dom';

// function Footer() {
//   const { mode } = useContext(MyContext);

//   const socialMediaLinks = [
//     { platform: "facebook", path: "M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 4.41 0 8-3.59 8-8 0-4.42-3.58-8-8-8zm1 14.5v-5h-2v-2h2v-2c0-1.1.9-2 2-2h2v2h-2c-.55 0-1 .45-1 1v2h3l-1 2h-2z" },
//     { platform: "twitter", path: "M23.643 4.937a10.034 10.034 0 01-2.828.775A4.927 4.927 0 0022.917 3a9.934 9.934 0 01-3.127 1.152A4.916 4.916 0 0016.188 2c-2.743 0-4.95 2.227-4.95 4.97 0 .39.045.765.13 1.129-4.114-.207-7.75-2.174-10.188-5.17a4.798 4.798 0 00-.668 2.491c0 1.72.874 3.23 2.195 4.12a4.904 4.904 0 01-2.243-.617v.061c0 2.4 1.694 4.4 3.949 4.85a4.91 4.91 0 01-2.235.085 4.92 4.92 0 004.588 3.418A9.866 9.866 0 012 20.29a13.92 13.92 0 007.548 2.211c9.056 0 14.006-7.498 14.006-13.985 0-.213 0-.426-.015-.637A10.032 10.032 0 0024 4.59a9.935 9.935 0 01-2.357.645 4.949 4.949 0 002.163-2.723z" },
//     { platform: "instagram", path: "M7.75 2C5.42 2 3.5 3.92 3.5 6.25v11.5C3.5 20.08 5.42 22 7.75 22h8.5C18.58 22 20.5 20.08 20.5 17.75V6.25C20.5 3.92 18.58 2 16.25 2h-8.5zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7zM17.75 6.5c.69 0 1.25.56 1.25 1.25S18.44 9 17.75 9 16.5 8.44 16.5 7.75 17.06 6.5 17.75 6.5z" },
//     { platform: "linkedin", path: "M20.447 20.452h-3.6v-5.675c0-1.363-.024-3.12-1.898-3.12-1.898 0-2.187 1.484-2.187 3.017v5.778h-3.6V9h3.459v1.517h.05c.481-.908 1.653-1.868 3.395-1.868 3.63 0 4.295 2.386 4.295 5.487v5.316zM5.837 7.857c-1.161 0-2.095.932-2.095 2.085 0 1.153.934 2.086 2.095 2.086h.034c1.162 0 2.096-.933 2.096-2.086 0-1.153-.934-2.085-2.096-2.085zm1.798 12.595h-3.6V9h3.6v11.452z" },
//   ];

//   return (
//     <footer className={`text-gray-600 ${mode === "dark" ? "bg-gray-800" : "bg-white"}`}>
//       <div className="container px-5 py-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
//         {/* Categories Section */}
//         <div className="p-4">
//           <h2 className={`font-bold text-lg ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
//             CATEGORIES
//           </h2>
//           <nav className="list-none mt-4">
//             {["Home", "Order", "Local For Vocal", "Cart"].map((item) => (
//               <li key={item}>
//                 <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className={`block hover:underline ${mode === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"}`}>
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </nav>
//         </div>

//         {/* Customer Service Section */}
//         <div className="p-4">
//           <h2 className={`font-bold text-lg ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
//             CUSTOMER SERVICE
//           </h2>
//           <nav className="list-none mt-4">
//             {["Return Policy", "About", "Contact Us"].map((item) => (
//               <li key={item}>
//                 <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className={`block hover:underline ${mode === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"}`}>
//                   {item}
//                 </Link>
//               </li>
//             ))}
//           </nav>
//         </div>

//         {/* Services Section */}
//         <div className="p-4">
//           <h2 className={`font-bold text-lg ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
//             SERVICES
//           </h2>
//           <nav className="list-none mt-4">
//             <li>
//               <Link to="/privacypolicy" className={`block hover:underline ${mode === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"}`}>
//                 Privacy
//               </Link>
//             </li>
//           </nav>
//         </div>

//         {/* Payment Methods Section */}
//         <div className="p-4 flex justify-center items-center">
//           <img src="https://ecommerce-sk.vercel.app/pay.png" alt="Payment methods" className="w-3/4 h-auto" />
//         </div>
//       </div>

//       {/* Footer Bottom Section */}
//       <div className={`bg-gray-200 ${mode === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
//         <div className="container px-5 py-4 mx-auto flex flex-col md:flex-row items-center justify-between">
//           <Link to="/" className="flex">
//             <h1 className={`text-2xl font-bold ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
//               StoreFusion
//             </h1>
//           </Link>
          
//           <p className={`text-sm mt-4 md:mt-0 ${mode === "dark" ? "text-gray-300" : "text-gray-600"} text-center`}>
//             © 2024 StoreFusion —
//             <a href="https://www.StoreFusion.com" rel="noopener noreferrer" target="_blank" className={`ml-1 ${mode === "dark" ? "text-gray-300" : "text-blue-600"}`}>
//               www.StoreFusion.com
//             </a>
//           </p>
          
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             {socialMediaLinks.map(({ platform, path }) => (
//               <a key={platform} href={`https://${platform}.com`} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${platform} page`} className={`text-gray-500 hover:text-blue-600 transition duration-300 ease-in-out`}>
//                 <svg fill="currentColor" className="w-6 h-6">
//                   <path d={path} />
//                 </svg>
//               </a>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;























import React, { useContext } from "react";
import { MyContext } from "../../context api/myContext";
import { Link } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

function Footer() {
  const { mode } = useContext(MyContext);

  const socialMediaLinks = [
    { platform: "youtube", icon: <FaYoutube />, href: "https://youtube.com" },
    { platform: "twitter", icon: <FaTwitter />, href: "https://twitter.com" },
    { platform: "instagram", icon: <FaInstagram />, href: "https://instagram.com" },
    { platform: "linkedin", icon: <FaLinkedin />, href: "https://linkedin.com" },
  ];

  return (
    <footer className={`text-gray-600 ${mode === "dark" ? "bg-gray-800" : "bg-white"}`}>
      <div className="container px-5 py-10 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Categories Section */}
        <div className="p-4">
          <h2 className={`font-bold text-lg ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
            CATEGORIES
          </h2>
          <nav className="list-none mt-4">
            {["Home", "Order", "Local For Vocal", "Cart"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className={`block hover:underline ${mode === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"}`}>
                  {item}
                </Link>
              </li>
            ))}
          </nav>
        </div>

        {/* Customer Service Section */}
        <div className="p-4">
          <h2 className={`font-bold text-lg ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
            CUSTOMER SERVICE
          </h2>
          <nav className="list-none mt-4">
            {["Return Policy", "About", "Contact Us"].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className={`block hover:underline ${mode === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"}`}>
                  {item}
                </Link>
              </li>
            ))}
          </nav>
        </div>

        {/* Services Section */}
        <div className="p-4">
          <h2 className={`font-bold text-lg ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
            SERVICES
          </h2>
          <nav className="list-none mt-4">
            <li>
              <Link to="/privacypolicy" className={`block hover:underline ${mode === "dark" ? "text-gray-300 hover:text-blue-500" : "text-gray-600 hover:text-blue-500"}`}>
                Privacy
              </Link>
            </li>
          </nav>
        </div>

        {/* Payment Methods Section */}
        <div className="p-4 flex justify-center items-center">
          <img src="https://ecommerce-sk.vercel.app/pay.png" alt="Payment methods" className="w-3/4 h-auto" />
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className={`bg-gray-200 ${mode === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="container px-5 py-4 mx-auto flex flex-col md:flex-row items-center justify-between">
          <Link to="/" className="flex">
            <h1 className={`text-2xl font-bold ${mode === "dark" ? "text-white" : "text-gray-800"}`}>
              StoreFusion
            </h1>
          </Link>
          
          <p className={`text-sm mt-4 md:mt-0 ${mode === "dark" ? "text-gray-300" : "text-gray-600"} text-center`}>
            © 2024 StoreFusion —
            <a href="https://www.StoreFusion.com" rel="noopener noreferrer" target="_blank" className={`ml-1 ${mode === "dark" ? "text-gray-300" : "text-blue-600"}`}>
              www.StoreFusion.com
            </a>
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            {socialMediaLinks.map(({ platform, icon, href }) => (
              <a key={platform} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${platform} page`} className={`text-gray-500 hover:text-blue-600 transition duration-300 ease-in-out`}>
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
