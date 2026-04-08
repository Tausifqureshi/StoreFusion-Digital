// import React from "react";

// function ProductSkeleton() {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
//       {[...Array(8)].map((_, i) => (
//         <div
//           key={i}
//           className="h-72 bg-gray-200 rounded-xl animate-pulse"
//         ></div>
//       ))}
//     </div>
//   );
// }

// export default ProductSkeleton;

import React, { useContext } from "react";
import { ThemeContext } from "../../context api/AllContext";

function ProductSkeleton() {
  const { mode } = useContext(ThemeContext);
  const isDark = mode === "dark";

  return (
    <div className="flex flex-wrap -m-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="p-4 w-full sm:w-1/2 lg:w-1/4">
          <div className={`p-5 rounded-[30px] border-2 transition-all ${isDark ? "bg-[#131921] border-gray-800" : "bg-white border-gray-100"} animate-pulse`}>
            {/* Image Placeholder */}
            <div className={`w-full aspect-[4/3] rounded-[20px] mb-5 flex items-center justify-center overflow-hidden relative ${isDark ? "bg-[#1e293b]" : "bg-gray-100"}`}>
               <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? "from-transparent via-gray-700/20 to-transparent" : "from-transparent via-white/50 to-transparent"} -translate-x-full animate-[shimmer_1.5s_infinite]`}></div>
            </div>

            <div className="space-y-4">
              {/* Category */}
              <div className={`h-3 w-1/3 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>

              {/* Title Multi-line */}
              <div className="space-y-2">
                 <div className={`h-4 w-full rounded-full ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
                 <div className={`h-4 w-2/3 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
              </div>

              {/* Footer row (Price & Add Button) */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-dashed border-gray-200 dark:border-gray-800">
                <div className={`h-6 w-20 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-300"}`}></div>
                <div className={`h-10 w-24 rounded-xl ${isDark ? "bg-gray-800" : "bg-gray-200"}`}></div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `
      }} />
    </div>
  );
}

export default ProductSkeleton;
