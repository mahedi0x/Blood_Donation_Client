import React from "react";
import { Link } from "react-router";
import { MoveLeft, Home, Search, AlertCircle, Droplet } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center px-6 font-sans overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-50 blur-[120px] rounded-full opacity-50 -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 blur-[120px] rounded-full opacity-50 -z-10"></div>

      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon Section */}
        <div className="relative inline-block mb-8">
          <div className="bg-red-50 w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] flex items-center justify-center animate-pulse">
            <Droplet className="text-[#ef233c] fill-[#ef233c]" size={64} />
          </div>
          <div className="absolute -top-2 -right-2 bg-white p-3 rounded-2xl shadow-lg border border-gray-100 animate-bounce">
            <AlertCircle className="text-orange-500" size={24} />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-7xl md:text-9xl font-black text-gray-900 tracking-tighter mb-4">
          4<span className="text-[#ef233c]">0</span>4
        </h1>
        <h2 className="text-2xl md:text-4xl font-black text-gray-800 mb-6 tracking-tight">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-medium mb-12 leading-relaxed max-w-lg mx-auto">
          The page you're looking for might have been moved, deleted, or never existed in the first place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#ef233c] text-white font-black rounded-2xl shadow-xl shadow-red-100 hover:bg-[#d90429] transition-all active:scale-95"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <Link 
            to="/search" 
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:border-[#ef233c] hover:text-[#ef233c] transition-all active:scale-95 shadow-sm"
          >
            <Search size={20} />
            Search Donors
          </Link>
        </div>

        {/* Helpful Link */}
        <div className="mt-12">
          <Link to="/contact" className="text-sm font-bold text-gray-400 hover:text-[#ef233c] flex items-center justify-center gap-2 group">
            <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Report this issue to support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;