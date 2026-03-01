// import React, { useContext } from "react";
// import { MyContext } from "../../context api/myContext";
// import { Link } from 'react-router-dom';
// import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

// function Footer() {
//   const { mode } = useContext(MyContext); 

//   const socialMediaLinks = [
//     { platform: "youtube", icon: <FaYoutube />, href: "https://youtube.com" },
//     { platform: "twitter", icon: <FaTwitter />, href: "https://twitter.com" },
//     { platform: "instagram", icon: <FaInstagram />, href: "https://instagram.com" },
//     { platform: "linkedin", icon: <FaLinkedin />, href: "https://linkedin.com" },
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
//             © 2025 StoreFusion —
//             <a href="https://www.StoreFusion.com" rel="noopener noreferrer" target="_blank" className={`ml-1 ${mode === "dark" ? "text-gray-300" : "text-blue-600"}`}>
//               www.StoreFusion.com
//             </a>
//           </p>
          
//           <div className="flex space-x-4 mt-4 md:mt-0">
//             {socialMediaLinks.map(({ platform, icon, href }) => (
//               <a key={platform} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit our ${platform} page`} className={`text-gray-500 hover:text-blue-600 transition duration-300 ease-in-out`}>
//                 {icon}
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
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaGlobe } from "react-icons/fa";

function Footer() {
  const { mode } = useContext(MyContext);
  const isDark = mode === "dark";

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`transition-all duration-500 border-t ${isDark ? "bg-[#131921] border-gray-800" : "bg-white border-gray-200"}`}>
      
      {/* --- BACK TO TOP BUTTON --- */}
      <button 
        onClick={backToTop}
        className={`w-full py-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all ${
          isDark 
          ? "bg-[#232f3e] hover:bg-[#37475a] text-white" 
          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
        }`}
      >
        Back to top
      </button>

      {/* --- MAIN LINKS GRID --- */}
      <div className="container mx-auto px-5 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
          
          {/* Get to Know Us */}
          <div className="space-y-4">
            <h2 className={`font-black uppercase text-[12px] tracking-wider italic ${isDark ? "text-orange-500" : "text-blue-600"}`}>
              Get to Know Us
            </h2>
            <nav className="flex flex-col space-y-3">
              {["About StoreFusion", "Careers", "Press Releases", "Our Science"].map((item) => (
                <Link key={item} to="#" className={`text-sm font-medium hover:underline transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-blue-600"}`}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect with Us */}
          <div className="space-y-4">
            <h2 className={`font-black uppercase text-[12px] tracking-wider italic ${isDark ? "text-orange-500" : "text-blue-600"}`}>
              Connect with Us
            </h2>
            <nav className="flex flex-col space-y-3">
              <a href="#" className={`text-sm font-medium flex items-center gap-2 hover:underline ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-blue-600"}`}>
                <FaInstagram className="text-pink-500"/> Instagram
              </a>
              <a href="#" className={`text-sm font-medium flex items-center gap-2 hover:underline ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-blue-600"}`}>
                <FaTwitter className="text-blue-400"/> Twitter
              </a>
              <a href="#" className={`text-sm font-medium flex items-center gap-2 hover:underline ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-blue-600"}`}>
                <FaYoutube className="text-red-600"/> YouTube
              </a>
            </nav>
          </div>

          {/* Make Money with Us */}
          <div className="space-y-4">
            <h2 className={`font-black uppercase text-[12px] tracking-wider italic ${isDark ? "text-orange-500" : "text-blue-600"}`}>
              Make Money
            </h2>
            <nav className="flex flex-col space-y-3">
              {["Sell on StoreFusion", "Protect your Brand", "Become an Affiliate", "Advertise Products"].map((item) => (
                <Link key={item} to="#" className={`text-sm font-medium hover:underline ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-blue-600"}`}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          {/* Let Us Help You */}
          <div className="space-y-4">
            <h2 className={`font-black uppercase text-[12px] tracking-wider italic ${isDark ? "text-orange-500" : "text-blue-600"}`}>
              Let Us Help You
            </h2>
            <nav className="flex flex-col space-y-3">
              {["Your Account", "Returns Centre", "Purchase Protection", "Help Center"].map((item) => (
                <Link key={item} to="#" className={`text-sm font-medium hover:underline ${isDark ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-blue-600"}`}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>

        </div>
      </div>

      {/* --- BRAND CENTER SECTION --- */}
      <div className={`border-t py-12 ${isDark ? "bg-[#131921] border-gray-800" : "bg-gray-50 border-gray-200"}`}>
        <div className="container mx-auto px-5 flex flex-col items-center space-y-8">
          <Link to="/" className="flex items-center">
             <h1 className={`text-3xl font-black italic tracking-tighter uppercase ${isDark ? "text-white" : "text-blue-600"}`}>
               Store<span className="text-orange-500">Fusion</span>
             </h1>
          </Link>

          <div className="flex flex-wrap justify-center gap-4">
             <div className={`border px-5 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer ${isDark ? "border-gray-700 text-gray-300 hover:border-white" : "border-gray-300 text-gray-600 hover:border-blue-600"}`}>
                <FaGlobe className={isDark ? "text-orange-500" : "text-blue-600"}/> English
             </div>
             <div className={`border px-5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 cursor-pointer ${isDark ? "border-gray-700 text-gray-300 hover:border-white" : "border-gray-300 text-gray-600 hover:border-blue-600"}`}>
                ₹ INR - Rupee
             </div>
          </div>
        </div>
      </div>

      {/* --- FINAL BOTTOM BAR --- */}
      <div className={`py-10 ${isDark ? "bg-[#0b0f15]" : "bg-white border-t border-gray-100"}`}>
        <div className="container mx-auto px-5 text-center">
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-6">
              {["Conditions of Sale", "Privacy Notice", "Interest-Based Ads"].map((item) => (
                <Link key={item} to="#" className={`text-[11px] font-black uppercase tracking-widest hover:underline ${isDark ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-blue-600"}`}>
                  {item}
                </Link>
              ))}
           </div>
           <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? "text-gray-600" : "text-gray-400"}`}>
             © 2026 StoreFusion.com — All Rights Reserved
           </p>
           
           <div className="mt-8">
              <img 
                src="https://ecommerce-sk.vercel.app/pay.png" 
                alt="Payment" 
                className={`h-6 mx-auto transition-all duration-500 ${isDark ? "opacity-30 grayscale brightness-200 hover:opacity-100" : "opacity-60 hover:opacity-100"}`} 
              />
           </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;

