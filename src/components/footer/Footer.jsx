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
            © 2025 StoreFusion —
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
 