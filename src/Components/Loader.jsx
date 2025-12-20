import React from "react";
import { Heart } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute h-24 w-24 animate-spin rounded-full border-4 border-gray-100 border-t-[#ef233c]"></div>
        
        {/* Inner pulsing heart */}
        <div className="relative animate-bounce">
          <Heart 
            size={40} 
            className="text-[#ef233c] fill-[#ef233c] animate-pulse drop-shadow-[0_0_15px_rgba(239,35,60,0.4)]" 
          />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-2xl font-black tracking-tighter text-gray-900">
          Red<span className="text-[#ef233c]">Love</span>
        </h2>
        <div className="mt-2 flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ef233c] [animation-delay:-0.3s]"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ef233c] [animation-delay:-0.15s]"></span>
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#ef233c]"></span>
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
          Preparing to save lives
        </p>
      </div>
    </div>
  );
};

export default Loader;