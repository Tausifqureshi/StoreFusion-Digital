// import React, { useContext } from "react";
// import { MyContext } from "../../context api/myContext";

// function Filter() {
//   const { mode, product, searchkey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice, sortPrice, setSortPrice } = useContext(MyContext);
//   //  console.log(product);
//   const resetFilters = () => {
//     setSearchkey("");
//     setFilterType("");
//     setFilterPrice("");
//     setSortPrice("");
//   };
//   const uniqueCategories = [...new Set(product.map(item => item.category))]; // Set method duplicate keys ko allow nahi karta, isliye iska istemal kiya jata hai taaki har key sirf ek baar hi store ho sake. Yeh data structure ko unique values ke liye optimize karta hai, jo data management aur lookup ko efficient banata hai.

//   // console.log(uniqueCategories)
//   return (
//     <div className="container mx-auto px-4 mt-4">
//       <div
//         className="p-6 rounded-lg shadow-lg border border-gray-300 transition-all duration-300 ease-in-out"
//         style={{
//           backgroundColor: mode === "dark" ? "#1F1F1F" : "white",
//           color: mode === "dark" ? "white" : "black",
//         }}
//       >
//         <h2 className="text-xl font-bold mb-4">Filter Products</h2>

//           {/* Search Filter */}
//         <div className="relative mb-5">
//           <input
//             value={searchkey}
//             onChange={(e) => setSearchkey(e.target.value)}
//             type="text"
//             name="searchkey"
//             id="searchkey"
//             placeholder="Search products..."
//             className="pl-10 pr-4 py-3 w-full rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//             style={{
//               backgroundColor: mode === "dark" ? "#2C2C2C" : "white",
//               color: mode === "dark" ? "white" : "black",
//             }}
//           />
//           <svg
//             className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
//             viewBox="0 0 16 16"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
//           </svg>
//         </div>

//         <div className="flex items-center justify-between mb-4">
//           <p className="font-semibold text-lg">Filters</p>
//           <button
//             className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition duration-200"
//             onClick={resetFilters}
//           >
//             Reset Filters
//           </button>
//         </div>

//         <div className="flex flex-col md:flex-row md:justify-between mb-4">
//           <div className="flex flex-wrap gap-4 mb-4 md:mb-0 w-full md:w-3/4">
//             {/* Category Filter */}
//             <select
//               value={filterType}
//               onChange={(e) => setFilterType(e.target.value)}
//               className="px-4 py-3 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 w-full md:w-auto"
//               style={{
//                 backgroundColor: mode === "dark" ? "#2C2C2C" : "white",
//                 color: mode === "dark" ? "white" : "black",
//               }}
//             >

//               <option value="">All Products</option>
//               {uniqueCategories.map((category, index) => (
//                 <option key={index} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </select>

//             {/* Price Filter */}
//             <select
//               value={filterPrice}
//               onChange={(e) => setFilterPrice(e.target.value)}
//               className="px-4 py-3 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 w-full md:w-auto"
//               style={{
//                 backgroundColor: mode === "dark" ? "#2C2C2C" : "white",
//                 color: mode === "dark" ? "white" : "black",
//               }}
//             >
//               <option value="">All Prices</option>
//               <option value="10-100">₹10 - ₹100</option>
//               <option value="100-200">₹100 - ₹200</option>
//               <option value="200-300">₹200 - ₹300</option>
//               <option value="300-400">₹300 - ₹400</option>
//               <option value="400-500">₹400 - ₹500</option>
//             </select>
//           </div>

//           {/* Sort by Price */}
//           <select
//             value={sortPrice}
//             onChange={(e) => setSortPrice(e.target.value)}
//             className="px-4 py-3 rounded-md bg-gray-200 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 md:ml-4 w-full md:w-auto"
//             style={{
//               backgroundColor: mode === "dark" ? "#2C2C2C" : "white",
//               color: mode === "dark" ? "white" : "black",
//             }}
//           >
//             <option value="">Sort by</option>
//             <option value="low-to-high">Price: Low to High</option>
//             <option value="high-to-low">Price: High to Low</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Filter;




// import React, { useContext, useState, useEffect } from "react";
// import { MyContext } from "../../context api/myContext";
// import { useLocation } from "react-router-dom"; // Route check karne ke liye
// import { FiRefreshCw, FiSearch, FiSliders, FiX } from "react-icons/fi";
// import { Drawer, IconButton } from "@mui/material";

// function Filter() {
//   const {
//     mode,
//     product,
//     searchkey,
//     setSearchkey,
//     filterType,
//     setFilterType,
//     filterPrice,
//     setFilterPrice,
//     sortPrice,
//     setSortPrice,
//   } = useContext(MyContext);

//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [isRotating, setIsRotating] = useState(false); // Reset animation state
//   const location = useLocation(); // Current path check karne ke liye

//   const isDark = mode === "dark";

//   // ✅ Dynamic Margin Logic
//   const marginTopClass = location.pathname === "/" ? "mt-8" : "mt-28";

//   const resetFilters = () => {
//     setIsRotating(true); // Animation start
//     setSearchkey("");
//     setFilterType([]);
//     setFilterPrice("");
//     setSortPrice("");
    
//     // Animation reset 1 second baad
//     setTimeout(() => setIsRotating(false), 500);
//   };

//   const uniqueCategories = [...new Set(product.map((item) => item.category))];

//   const toggleCategory = (cat) => {
//     if (filterType.includes(cat)) {
//       setFilterType(filterType.filter((item) => item !== cat));
//     } else {
//       setFilterType([...filterType, cat]);
//     }
//   };

//   useEffect(() => {
//     const resizeListener = () => {
//       if (window.innerWidth >= 1024) setDrawerOpen(false);
//     };
//     window.addEventListener("resize", resizeListener);
//     return () => window.removeEventListener("resize", resizeListener);
//   }, []);

//   return (
//     <div className={`container mx-auto px-4 ${marginTopClass} mb-8 transition-all duration-300`}>
//       {/* Title with Navbar Font Style */}
//       <h2 className={`text-xl font-black italic tracking-tighter mb-4 uppercase ${isDark ? "text-white" : "text-blue-600"}`}>
//         Filter <span className="text-orange-500">Products</span>
//       </h2>

//       {/* --- DESKTOP FILTER VIEW --- */}
//       <div
//         className={`hidden lg:flex p-4 rounded-2xl border transition-all duration-300 ${
//           isDark
//             ? "bg-[#232f3e] border-gray-700 shadow-2xl"
//             : "bg-white border-gray-100 shadow-xl shadow-blue-100/40"
//         }`}
//       >
//         <div className="flex items-center justify-between w-full gap-4">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={searchkey}
//               onChange={(e) => setSearchkey(e.target.value)}
//               type="text"
//               placeholder="Search products..."
//               className={`w-full pl-12 pr-4 py-2.5 rounded-xl border outline-none text-sm font-medium transition-all ${
//                 isDark
//                   ? "bg-[#131921] border-gray-600 text-white focus:border-orange-500"
//                   : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400"
//               }`}
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Category Dropdown */}
//             <select
//               value=""
//               onChange={(e) => e.target.value && toggleCategory(e.target.value)}
//               className={`px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${
//                 isDark
//                   ? "bg-[#131921] text-gray-300 border-gray-600 hover:border-orange-500"
//                   : "bg-white border-gray-200 text-gray-600 hover:border-blue-500"
//               }`}
//             >
//               <option value="">Categories ({filterType.length})</option>
//               {uniqueCategories.map((cat, i) => (
//                 <option key={i} value={cat}>
//                   {filterType.includes(cat) ? `✓ ${cat.toUpperCase()}` : cat.toUpperCase()}
//                 </option>
//               ))}
//             </select>

//             {/* Price Range */}
//             <select
//               value={filterPrice}
//               onChange={(e) => setFilterPrice(e.target.value)}
//               className={`px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${
//                 isDark
//                   ? "bg-[#131921] text-gray-300 border-gray-600 hover:border-orange-500"
//                   : "bg-white border-gray-200 text-gray-600 hover:border-blue-500"
//               }`}
//             >
//               <option value="">Price Range</option>
//               <option value="0-100">Under ₹100</option>
//               <option value="100-500">₹100 - ₹500</option>
//               <option value="500-2000">₹500 - ₹2000</option>
//             </select>

//             {/* Reset Button with Spin Animation */}
//             <button
//               onClick={resetFilters}
//               className={`p-2.5 rounded-lg transition-all shadow-sm ${
//                 isDark ? "bg-gray-800 text-red-400 hover:bg-red-900" : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
//               }`}
//             >
//               <FiRefreshCw 
//                 size={18} 
//                 className={`transition-transform duration-500 ${isRotating ? "rotate-180" : "rotate-0"}`} 
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- MOBILE FILTER VIEW --- */}
//       <div className="lg:hidden flex flex-col gap-3">
//         <div className="relative">
//           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             value={searchkey}
//             onChange={(e) => setSearchkey(e.target.value)}
//             type="text"
//             placeholder="Search StoreFusion..."
//             className={`w-full pl-12 pr-4 py-3 rounded-xl border shadow-md outline-none text-sm font-medium ${
//               isDark ? "bg-[#232f3e] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"
//             }`}
//           />
//         </div>

//         <div className="flex flex-wrap items-center gap-2 pb-1">
//           <button
//             onClick={() => setDrawerOpen(true)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
//               isDark ? "bg-[#232f3e] border-gray-600 text-white" : "bg-white border-gray-300 text-gray-700 shadow-sm"
//             }`}
//           >
//             Filters <FiSliders className="text-orange-500" />
//           </button>

//           {filterType.map((cat) => (
//             <div key={cat} className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-tighter">
//               {cat}
//               <FiX onClick={() => toggleCategory(cat)} className="cursor-pointer" size={14} />
//             </div>
//           ))}
          
//           {sortPrice && (
//             <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-tighter">
//               {sortPrice.replace("-", " ")}
//               <FiX onClick={() => setSortPrice("")} className="cursor-pointer" size={14} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MOBILE DRAWER (MUI) --- */}
//       <Drawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           className: `rounded-t-[30px] p-6 !transition-all !duration-500 ${
//             isDark ? "!bg-[#131921] !text-white" : "!bg-white !text-gray-900"
//           }`,
//           style: { maxHeight: "85vh" },
//         }}
//       >
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xl font-black italic tracking-tighter uppercase">
//             Quick <span className="text-orange-500">Filters</span>
//           </h2>
//           <IconButton onClick={() => setDrawerOpen(false)} className={isDark ? "!text-white" : ""}>
//             <FiX size={24} />
//           </IconButton>
//         </div>

//         <div className="space-y-8 overflow-y-auto pb-6">
//           {/* Categories */}
//           <div>
//             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Categories</p>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => setFilterType([])}
//                 className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
//                   filterType.length === 0 ? "bg-orange-500 border-orange-500 text-white shadow-lg" : "border-gray-200"
//                 }`}
//               >
//                 ALL
//               </button>
//               {uniqueCategories.map((cat, i) => (
//                 <button
//                   key={i}
//                   onClick={() => toggleCategory(cat)}
//                   className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
//                     filterType.includes(cat) ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "border-gray-200"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price & Sort Buttons Styled like Navbar Action Buttons */}
//           <div className="grid grid-cols-1 gap-6">
//              <div>
//                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Sort by Price</p>
//                 <div className="flex gap-3">
//                     <button onClick={() => setSortPrice("low-to-high")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "low-to-high" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>LOW TO HIGH</button>
//                     <button onClick={() => setSortPrice("high-to-low")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "high-to-low" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>HIGH TO LOW</button>
//                 </div>
//              </div>
//           </div>
//         </div>

//         {/* Footer Actions */}
//         <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800 mt-4">
//           <button
//             onClick={resetFilters}
//             className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-gray-800 text-red-400" : "bg-gray-100 text-gray-500"}`}
//           >
//             Clear All
//           </button>
//           <button
//             onClick={() => setDrawerOpen(false)}
//             className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black shadow-lg uppercase tracking-widest active:scale-95 transition-all"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </Drawer>
//     </div>
//   );
// }

// export default Filter;



import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../context api/myContext";
import { useLocation } from "react-router-dom"; 
import { FiRefreshCw, FiSearch, FiSliders, FiX } from "react-icons/fi";
import { Drawer, IconButton } from "@mui/material";

function Filter() {
  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    sortPrice,
    setSortPrice,
  } = useContext(MyContext);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const location = useLocation();

  const isDark = mode === "dark";
  const marginTopClass = location.pathname === "/" ? "mt-8" : "mt-28";

  const resetFilters = () => {
    setIsRotating(true);
    setSearchkey("");
    setFilterType([]);
    setFilterPrice("");
    setSortPrice("");
    setTimeout(() => setIsRotating(false), 500);
  };

  const uniqueCategories = [...new Set(product.map((item) => item.category))];

  const toggleCategory = (cat) => {
    if (filterType.includes(cat)) {
      setFilterType(filterType.filter((item) => item !== cat));
    } else {
      setFilterType([...filterType, cat]);
    }
  };

  useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth >= 1024) setDrawerOpen(false);
    };
    window.addEventListener("resize", resizeListener);
    return () => window.removeEventListener("resize", resizeListener);
  }, []);

  return (
    <div className={`container mx-auto px-4 ${marginTopClass} mb-16 transition-all duration-300`}>
      <h2 className={`text-xl font-black italic tracking-tighter mb-4 uppercase ${isDark ? "text-white" : "text-blue-600"}`}>
        Filter <span className="text-orange-500">Products</span>
      </h2>

      {/* --- DESKTOP FILTER VIEW --- */}
      <div
        className={`hidden lg:flex p-4 rounded-2xl border transition-all duration-300 ${
          isDark
            ? "bg-[#232f3e] border-gray-700 shadow-2xl"
            : "bg-white border-gray-100 shadow-xl shadow-blue-100/40"
        }`}
      >
        <div className="flex items-center justify-between w-full gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              type="text"
              placeholder="Search products..."
              className={`w-full pl-12 pr-4 py-2.5 rounded-xl border outline-none text-sm font-medium transition-all ${
                isDark
                  ? "bg-[#131921] border-gray-600 text-white focus:border-orange-500"
                  : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value=""
              onChange={(e) => e.target.value && toggleCategory(e.target.value)}
              className={`px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${
                isDark
                  ? "bg-[#131921] text-gray-300 border-gray-600 hover:border-orange-500"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-500"
              }`}
            >
              <option value="">Categories ({filterType.length})</option>
              {uniqueCategories.map((cat, i) => (
                <option key={i} value={cat}>
                  {filterType.includes(cat) ? `✓ ${cat.toUpperCase()}` : cat.toUpperCase()}
                </option>
              ))}
            </select>

            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className={`px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest border outline-none cursor-pointer transition-all ${
                isDark
                  ? "bg-[#131921] text-gray-300 border-gray-600 hover:border-orange-500"
                  : "bg-white border-gray-200 text-gray-600 hover:border-blue-500"
              }`}
            >
              <option value="">Price Range</option>
              <option value="0-100">Under ₹100</option>
              <option value="100-500">₹100 - ₹500</option>
              <option value="500-2000">₹500 - ₹2000</option>
            </select>

            <button
              onClick={resetFilters}
              className={`p-2.5 rounded-lg transition-all shadow-sm ${
                isDark ? "bg-gray-800 text-red-400 hover:bg-red-900" : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
              }`}
            >
              <FiRefreshCw 
                size={18} 
                className={`transition-transform duration-500 ${isRotating ? "rotate-180" : "rotate-0"}`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE FILTER VIEW --- */}
      <div className="lg:hidden flex flex-col gap-3">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            type="text"
            placeholder="Search StoreFusion..."
            className={`w-full pl-12 pr-4 py-3 rounded-xl border shadow-md outline-none text-sm font-medium ${
              isDark ? "bg-[#232f3e] border-gray-700 text-white" : "bg-white border-gray-200 text-gray-800"
            }`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pb-1">
          <button
            onClick={() => setDrawerOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all ${
              isDark ? "bg-[#232f3e] border-gray-600 text-white" : "bg-white border-gray-300 text-gray-700 shadow-sm"
            }`}
          >
            Filters <FiSliders className="text-orange-500" />
          </button>

          {filterType.map((cat) => (
            <div key={cat} className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-tighter">
              {cat}
              <FiX onClick={() => toggleCategory(cat)} className="cursor-pointer" size={14} />
            </div>
          ))}
        </div>
      </div>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          className: `rounded-t-[30px] p-6 !transition-all !duration-500 ${
            isDark ? "!bg-[#131921] !text-white" : "!bg-white !text-gray-900"
          }`,
          style: { maxHeight: "85vh" },
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black italic tracking-tighter uppercase">
            Quick <span className="text-orange-500">Filters</span>
          </h2>
          <IconButton onClick={() => setDrawerOpen(false)} className={isDark ? "!text-white" : ""}>
            <FiX size={24} />
          </IconButton>
        </div>

        <div className="space-y-8 overflow-y-auto pb-6">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Categories</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType([])}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                  filterType.length === 0 ? "bg-orange-500 border-orange-500 text-white shadow-lg" : "border-gray-200"
                }`}
              >
                ALL
              </button>
              {uniqueCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                    filterType.includes(cat) ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
             <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Sort by Price</p>
                <div className="flex gap-3">
                    <button onClick={() => setSortPrice("low-to-high")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "low-to-high" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>LOW TO HIGH</button>
                    <button onClick={() => setSortPrice("high-to-low")} className={`flex-1 p-3 rounded-xl border text-[10px] font-black transition-all ${sortPrice === "high-to-low" ? "bg-orange-500 text-white border-orange-500" : "border-gray-200"}`}>HIGH TO LOW</button>
                </div>
             </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800 mt-4">
          <button
            onClick={resetFilters}
            className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${isDark ? "bg-gray-800 text-red-400" : "bg-gray-100 text-gray-500"}`}
          >
            Clear All
          </button>
          <button
            onClick={() => setDrawerOpen(false)}
            className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[11px] font-black shadow-lg uppercase tracking-widest active:scale-95 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default Filter;









// import React, { useContext, useState ,useEffect} from "react";
// import { MyContext } from "../../context api/myContext";
// import { FiRefreshCw, FiSearch, FiSliders, FiX } from "react-icons/fi";
// // Material UI Components
// import { Drawer, IconButton } from "@mui/material";

// function Filter() {
//   const {
//     mode,
//     product,
//     searchkey,
//     setSearchkey,
//     filterType,
//     setFilterType,
//     filterPrice,
//     setFilterPrice,
//     sortPrice,
//     setSortPrice,
//   } = useContext(MyContext);

//   const [drawerOpen, setDrawerOpen] = useState(false); // MUI Drawer State

//   const resetFilters = () => {
//     setSearchkey("");
//     setFilterType("");
//     setFilterPrice("");
//     setSortPrice("");
//   };

//   const uniqueCategories = [...new Set(product.map((item) => item.category))];
//   const isDark = mode === "dark";
//   // Filter.jsx ke andar function update karein
//   const toggleCategory = (cat) => {
//     if (filterType.includes(cat)) {
//       // Agar pehle se select hai toh remove karo
//       setFilterType(filterType.filter((item) => item !== cat));
//     } else {
//       // Agar select nahi hai toh add karo
//       setFilterType([...filterType, cat]);
//     }
//   };

//   useEffect(() => {
//     const resizeListener = () => {
//       if(window.innerWidth >= 768){
//         setDrawerOpen(false)
//       }
//     }
//     window.addEventListener("resize",resizeListener)
//     return () => {
//       window.removeEventListener("resize",resizeListener)
//     }
    


//   },[])

//   return (
//     <div className="container mx-auto px-4 mt-28 mb-8">
//        <h2 className= {`text-xl font-bold mb-4 ${isDark ? "text-white" : "text-black"}`}>Filter Products</h2>
//       {/* --- DESKTOP FILTER VIEW (Tailwind 80% Style) --- */}
//       <div
//         className={`hidden lg:flex p-4 rounded-2xl border transition-all duration-300 ${
//           isDark
//             ? "bg-[#232f3e] border-gray-700"
//             : "bg-white border-gray-100 shadow-xl shadow-blue-100/40"
//         }`}
//       >
//         <div className="flex items-center justify-between w-full gap-4">
//           <div className="relative flex-1">
//             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               value={searchkey}
//               onChange={(e) => setSearchkey(e.target.value)}
//               type="text"
//               placeholder="Search products..."
//               className={`w-full pl-12 pr-4 py-2.5 rounded-xl border outline-none text-sm transition-all ${
//                 isDark
//                   ? "bg-[#131921] border-gray-600 text-white focus:border-blue-500"
//                   : "bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400"
//               }`}
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Category Dropdown (Multiple Selection Support) */}
//             <select
//               // Hum value ko "" rakhenge taaki har baar user naya option select kar sake.sirf bade device ke liye yaha
//               value=""
//               onChange={(e) => {
//                 const selectedCat = e.target.value;
//                 if (selectedCat === "") return; // Agar "Categories" empty option select kiya toh kuch na karo

//                 // Toggle Logic: Agar category array mein nahi hai toh add karo
//                 if (!filterType.includes(selectedCat)) {
//                   setFilterType([...filterType, selectedCat]);
//                 }
//               }}
//               className={`px-3 py-2 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
//                 isDark
//                   ? "bg-[#131921] text-white border-gray-600"
//                   : "bg-white border-gray-200 text-gray-600"
//               }`}
//             >
//               <option value="">
//                 Categories ({filterType.length} Selected)
//               </option>
//               {uniqueCategories.map((cat, i) => (
//                 <option key={i} value={cat}>
//                   {/* Agar category selected hai toh tick mark dikhao (optional) */}
//                   {filterType.includes(cat)
//                     ? `✓ ${cat.toUpperCase()}`
//                     : cat.toUpperCase()}
//                 </option>
//               ))}
//             </select>

//             {/* Price Range Dropdown (Same as before) */}
//             <select
//               value={filterPrice}
//               onChange={(e) => setFilterPrice(e.target.value)}
//               className={`px-3 py-2 rounded-lg text-xs font-bold border outline-none cursor-pointer ${
//                 isDark
//                   ? "bg-[#131921] text-white border-gray-600"
//                   : "bg-white border-gray-200 text-gray-600"
//               }`}
//             >
//               <option value="">Price Range</option>
//               <option value="0-100">Under ₹100</option>
//               <option value="100-500">₹100 - ₹500</option>
//               <option value="500-2000">₹500 - ₹2000</option>
//             </select>

//             {/* Reset Button */}
//             <button
//               onClick={resetFilters}
//               className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
//             >
//               <FiRefreshCw size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- MOBILE FILTER VIEW (Amazon Style Layout) --- */}
//       <div className="lg:hidden flex flex-col gap-3">
//         {/* Search Input */}
//         <div className="relative">
//           <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             value={searchkey}
//             onChange={(e) => setSearchkey(e.target.value)}
//             type="text"
//             placeholder="Search StoreFusion..."
//             className={`w-full pl-12 pr-4 py-3 rounded-xl border shadow-md outline-none text-sm font-medium ${
//               isDark
//                 ? "bg-[#232f3e] border-gray-700 text-white"
//                 : "bg-white border-gray-200 text-gray-800"
//             }`}
//           />
//         </div>

//         {/* Filter Chips Container - Flex Wrap lagaya gaya hai */}
//         <div className="flex flex-wrap items-center gap-2 pb-1">
//           {/* 'flex-wrap' ki wajah se chips niche move honge */}

//           <button
//             onClick={() => setDrawerOpen(true)}
//             className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all ${
//               isDark
//                 ? "bg-[#232f3e] border-gray-600 text-white"
//                 : "bg-white border-gray-300 text-gray-700"
//             }`}
//           >
//             Filters <FiSliders className="text-blue-500" />
//           </button>

//           {/* Multiple Selected Category Chips */}
//           {filterType.length > 0 &&
//             filterType.map((cat) => (
//               <div
//                 key={cat}
//                 className="flex items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white text-[11px] font-bold whitespace-nowrap"
//               >
//                 {cat.toUpperCase()}
//                 <FiX
//                   onClick={() =>
//                     setFilterType(filterType.filter((c) => c !== cat))
//                   }
//                   className="cursor-pointer hover:bg-blue-700 rounded-full transition-colors"
//                   size={14}
//                 />
//               </div>
//             ))}

//           {/* Price Sort Chip */}
//           {sortPrice && (
//             <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-orange-500 text-white text-[11px] font-bold whitespace-nowrap uppercase">
//               {sortPrice.replace("-", " ")}
//               <FiX
//                 onClick={() => setSortPrice("")}
//                 className="cursor-pointer hover:bg-orange-600 rounded-full"
//                 size={14}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- MATERIAL UI DRAWER (Mobile Slide-up) --- */}
//       <Drawer
//         anchor="bottom"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         PaperProps={{
//           className: `rounded-t-[30px] p-6 !transition-all !duration-500 ${
//             isDark ? "!bg-[#131921] !text-white" : "!bg-white !text-gray-900"
//           }`,
//           style: { maxHeight: "85vh" },
//         }}
//       >
//         {/* Drawer Content Styled with Tailwind */}
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xl font-black italic tracking-tighter">
//             Filters
//           </h2>
//           <IconButton
//             onClick={() => setDrawerOpen(false)}
//             className={isDark ? "!text-white" : ""}
//           >
//             <FiX size={24} />
//           </IconButton>
//         </div>

//         <div className="space-y-8 overflow-y-auto pb-6">
//           {/* Categories Section */}
//           <div>
//             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
//               Choose Category
//             </p>
//             <div className="flex flex-wrap gap-2">
//               <button
//                 onClick={() => setFilterType([])}
//                 className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
//                   filterType === ""
//                     ? "bg-blue-600 border-blue-600 text-white"
//                     : "border-gray-200"
//                 }`}
//               >
//                 ALL
//               </button>
//               {/* {uniqueCategories.map((cat, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setFilterType(cat)}
//                   className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
//                     filterType === cat ? "bg-blue-600 border-blue-600 text-white shadow-lg" : "border-gray-200"
//                   }`}
//                 >
//                   {cat.toUpperCase()}
//                 </button>
//               ))} */}
//               {uniqueCategories.map((cat, i) => (
//                 <button
//                   key={i}
//                   onClick={() => toggleCategory(cat)} // Change here
//                   className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
//                     filterType.includes(cat) // Change here (array check)
//                       ? "bg-blue-600 border-blue-600 text-white shadow-lg"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   {cat.toUpperCase()}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Price Range Section */}
//           <div>
//             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
//               Price Range
//             </p>
//             <div className="grid grid-cols-2 gap-3">
//               {["0-100", "100-500", "500-1000", "1000-5000"].map((range) => (
//                 <button
//                   key={range}
//                   onClick={() => setFilterPrice(range)}
//                   className={`p-3 rounded-xl border text-xs font-black transition-all ${
//                     filterPrice === range
//                       ? "bg-[#232f3e] text-white border-blue-500"
//                       : "border-gray-200"
//                   }`}
//                 >
//                   ₹{range}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sort Section */}
//           <div>
//             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">
//               Sort By Price
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setSortPrice("low-to-high")}
//                 className={`flex-1 p-3 rounded-xl border text-xs font-black transition-all ${
//                   sortPrice === "low-to-high"
//                     ? "bg-orange-500 text-white border-orange-500"
//                     : "border-gray-200"
//                 }`}
//               >
//                 LOW TO HIGH
//               </button>
//               <button
//                 onClick={() => setSortPrice("high-to-low")}
//                 className={`flex-1 p-3 rounded-xl border text-xs font-black transition-all ${
//                   sortPrice === "high-to-low"
//                     ? "bg-orange-500 text-white border-orange-500"
//                     : "border-gray-200"
//                 }`}
//               >
//                 HIGH TO LOW
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Footer Action Buttons */}
//         {/* <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800 mt-4">
//           <button
//             onClick={resetFilters}
//             className="flex-1 py-4 text-xs font-black text-gray-500 uppercase tracking-widest"
//           >
//             Clear All
//           </button>
//           <button
//             onClick={() => setDrawerOpen(false)}
//             className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-lg uppercase tracking-widest active:scale-95 transition-transform"
//           >
//             Show Results
//           </button>
//         </div> */}
//         <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-gray-800 mt-4">
//           {/* --- Clear All Button --- */}
//           <button
//             onClick={resetFilters}
//             className="flex-1 py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-2xl text-xs font-black shadow-md uppercase tracking-widest active:bg-red-600 active:text-white active:scale-95 transition-all duration-200"
//           >
//             Clear All
//           </button>

//           {/* --- Show Results Button --- */}
//           <button
//             onClick={() => setDrawerOpen(false)}
//             className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-lg uppercase tracking-widest active:scale-95 active:bg-blue-700 transition-all duration-200"
//           >
//             Show Results
//           </button>
//         </div>
//       </Drawer>
//     </div>
//   );
// }

// export default Filter;
