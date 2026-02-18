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

import React from "react";

function ProductSkeleton() {
  return (
    <div className="flex flex-wrap -m-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="p-4 w-full md:w-1/2 lg:w-1/4">
          <div className="border rounded-2xl p-4 animate-pulse">
            {/* Image */}
            <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>

            {/* Category */}
            <div className="h-3 bg-gray-300 rounded w-1/3 mb-2"></div>

            {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-3"></div>

            {/* Price */}
            <div className="h-4 bg-gray-400 rounded w-1/4 mb-4"></div>

            {/* Button */}
            <div className="h-8 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;
