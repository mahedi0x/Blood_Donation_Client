import React from "react";
import { MapPin, ShieldCheck, Users, Zap, MoveRight } from "lucide-react";

const Featured = () => {
  const features = [
    {
      title: "Find Donors Nearby",
      description:
        "Locate willing donors in your specific geo-location quickly with our advanced map search.",
      icon: <MapPin size={28} />,
    },
    {
      title: "Request Blood Urgently",
      description:
        "Post urgent requests and instantly notify compatible donors via SMS and app notifications.",
      icon: <Zap size={28} />, 
    },
    {
      title: "Organize a Drive",
      description:
        "Help your community by setting up a local blood donation camp with our organizing tools.",
      icon: <Users size={28} />,
    },
    {
      title: "Trusted & Secure",
      description:
        "We verify all donor profiles to ensure safety and trust within the community.",
      icon: <ShieldCheck size={28} />,
    },
  ];

  return (
    <div className="py-20 md:py-32 bg-[#fdfdfd] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60 -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-500 rounded-full blur-3xl opacity-60 -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Why Donate Blood? */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-10 mb-20 md:mb-28 w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">
              Why Donate <br />
              <span className="text-[#ef233c] inline-block hover:scale-105 transition-transform cursor-default">Blood?</span>
            </h2>
          </div>

          <div className="max-w-md space-y-6">
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium">
              Donating blood is a simple procedure that can be done in an hour. 
              A single donation can save up to <span className="text-gray-900 font-bold underline decoration-red-200">three lives.</span>
            </p>
            
            <button className="group flex items-center gap-3 text-[#ef233c] font-bold text-lg">
              <span className="relative">
                Learn more about the process
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ef233c] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
              <div className="p-2 rounded-full bg-red-50 group-hover:bg-[#ef233c] group-hover:text-white transition-all duration-300">
                <MoveRight size={20} />
              </div>
            </button>
          </div>
        </div>

        {/* Features Grid: Responsive 2x2 or 1x1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_80px_rgba(239,35,60,0.08)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Animated Corner Background */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-red-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-700 opacity-50"></div>

              <div className="relative z-10">
                {/* Icon Container */}
                <div className="mb-8 w-16 h-16 flex items-center justify-center bg-gray-50 text-[#ef233c] rounded-2xl group-hover:bg-[#ef233c] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-red-200 group-hover:shadow-lg group-hover:rotate-[10deg]">
                  {feature.icon}
                </div>

                {/* Text Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-lg font-medium group-hover:text-gray-600 transition-colors">
                  {feature.description}
                </p>

                {/* Interactive Footer */}
                <div className="mt-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#ef233c] transition-colors">
                  <span>Explore</span>
                  <div className="w-8 h-[2px] bg-gray-200 group-hover:bg-[#ef233c] transition-all group-hover:w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;