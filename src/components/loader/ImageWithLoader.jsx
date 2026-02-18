import React, { useState } from "react";

function ImageWithLoader({ src, alt }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl"></div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={`rounded-2xl w-full h-64 p-2 object-contain transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}

export default ImageWithLoader;
