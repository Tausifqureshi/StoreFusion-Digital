import React from "react";

/* 🔥 PREMIUM BRAND LOADER (DARK MODE) */
export default function Loader({ fullScreen = false }) {
  // ALWAYS FORCE DARK MODE FOR PREMIUM LOADER
  return (
    <div className={`flex flex-col items-center justify-center w-full ${fullScreen ? "fixed inset-0 z-[9999] bg-[#1a1f2e] backdrop-blur-md" : "min-h-screen py-40 bg-[#1a1f2e]"}`}>

      {/* Sleek Indeterminate Progress Bar */}
      <div className="relative w-48 h-[3px] overflow-hidden rounded-full mb-6 bg-gray-800 shadow-inner">
        <div className="absolute top-0 bottom-0 left-0 bg-blue-500 w-1/3 rounded-full animate-yt-progress"></div>
      </div>

      {/* Brand Text Below the Loader */}
      <h2 className="text-2xl font-black italic tracking-tighter uppercase animate-pulse text-white">
        Store<span className="text-orange-500">Fusion</span>
      </h2>
      <p className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-2">Connecting...</p>

      <style dangerouslySetInnerHTML={{
        __html: `
         @keyframes yt-progress {
           0% { transform: translateX(-150%); width: 30%; }
           50% { width: 50%; }
           100% { transform: translateX(350%); width: 30%; }
         }
         .animate-yt-progress {
           animation: yt-progress 1.5s infinite linear;
         }
       `}} />
    </div>
  );
}
