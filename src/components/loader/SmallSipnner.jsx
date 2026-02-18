// SmallSpinner.jsx
import React from "react";

function SmallSpinner({ size = 16 }) {
 return (
    <span
      style={{ width: size, height: size }}
      className="inline-block border-2 border-white border-t-transparent rounded-full animate-spin"
    />
  );
}

export default SmallSpinner;
