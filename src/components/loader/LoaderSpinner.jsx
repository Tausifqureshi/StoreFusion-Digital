import React from "react";

/**
 * LoaderSpinner — Lightweight inline loader
 * Use anywhere backend se data aa raha ho.
 * Props:
 *   isDark (bool)   — page theme match karne ke liye
 *   label (string)  — optional message below spinner
 *   size (string)   — "sm" | "md" (default md)
 */
export default function LoaderSpinner({ isDark = false, label = "Loading...", size = "md" }) {
  const ring = size === "sm"
    ? "w-7 h-7 border-[3px]"
    : "w-10 h-10 border-4";

  return (
    <div className="flex flex-col items-center justify-center py-28 gap-4">
      <div
        className={`${ring} rounded-full border-t-blue-600 animate-spin ${
          isDark ? "border-gray-700" : "border-gray-200"
        }`}
      />
      {label && (
        <p className={`text-[10px] font-bold uppercase tracking-widest ${
          isDark ? "text-gray-500" : "text-gray-400"
        }`}>
          {label}
        </p>
      )}
    </div>
  );
}
