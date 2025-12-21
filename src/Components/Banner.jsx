import React from "react";
import { useNavigate } from "react-router";
import { Heart, Search } from "lucide-react"; // Matching the icons in the image
import bannerImg from "../assets/banner.png";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[650px] flex items-center justify-center px-4 py-12 ">
      {/* Background Image Container with Rounded Corners */}
      <div className="absolute inset-0 max-w-7xl mx-auto overflow-hidden rounded-[2rem] shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${bannerImg}')` }}
        ></div>
        
        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl w-full text-left ml-4 md:ml-16 lg:ml-24">
        <div className="max-w-2xl space-y-6">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Your Blood Can Save <br />
            <span className="text-white">a Life. </span>
            <span className="relative inline-block">
              Be a Hero.
              <span className="absolute bottom-2 left-0 w-full h-2 bg-red-500 -z-10  -my-2"></span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed max-w-xl">
            Connect directly with those in need or register to become a regular
            donor in your community.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {/* Join as Donor Button */}
            <button
              onClick={() => navigate("/register")}
              className="group flex items-center justify-center gap-3 bg-[#ef233c] hover:bg-[#d90429] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-red-900/20 transition-all active:scale-95"
            >
              <Heart className="group-hover:fill-white transition-colors" size={22} />
              Join as a Donor
            </button>

            {/* Search Donors Button */}
            <button
              onClick={() => navigate("/search")}
              className="flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#ef233c] border-2 border-transparent hover:border-gray-100 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all active:scale-95"
            >
              <Search className="text-[#ef233c]" size={22} />
              Search Donors
            </button>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Banner;