import React from "react";
import { MapPin, ShieldCheck, Users, Zap, MoveRight, ArrowUpRight } from "lucide-react";

const Featured = () => {
  const features = [
    {
      title: "Find Donors Nearby",
      description:
        "Locate willing donors in your specific geo-location quickly with our advanced map search.",
      icon: <MapPin size={28} />,
      tag: "Real-time"
    },
    {
      title: "Request Blood Urgently",
      description:
        "Post urgent requests and instantly notify compatible donors via SMS and app notifications.",
      icon: <Zap size={28} />, 
      tag: "Emergency"
    },
    {
      title: "Organize a Drive",
      description:
        "Help your community by setting up a local blood donation camp with our organizing tools.",
      icon: <Users size={28} />,
      tag: "Community"
    },
    {
      title: "Trusted & Secure",
      description:
        "We verify all donor profiles to ensure safety and trust within the community.",
      icon: <ShieldCheck size={28} />,
      tag: "Verified"
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#fdfdfd] relative overflow-hidden">
      {/* --- Optimized Background Orbs --- */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-red-50/50 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-gray-100 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#ef233c] text-xs font-black uppercase tracking-widest mb-6">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef233c] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ef233c]"></span>
               </span>
               Our Mission
            </div>
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.85] tracking-tighter">
              Why Donate <br />
              <span className="text-[#ef233c] italic hover:not-italic transition-all duration-500 cursor-default">Blood?</span>
            </h2>
          </div>

          <div className="max-w-md space-y-8">
            <p className="text-gray-500 text-xl md:text-2xl leading-relaxed font-medium tracking-tight">
              A single donation can save up to <span className="text-gray-900 font-bold border-b-4 border-red-100 italic">three lives.</span> It’s a simple hour for you, but a lifetime for someone else.
            </p>
            
            <button className="group flex items-center gap-4 text-gray-900 font-black text-lg uppercase tracking-widest">
              <span className="relative">
                The Process
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-[#ef233c] origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500"></span>
              </span>
              <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center group-hover:bg-[#ef233c] transition-all duration-500 shadow-xl group-hover:shadow-red-200">
                <MoveRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* --- Features Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.02)] hover:shadow-[0_50px_100px_rgba(239,35,60,0.1)] transition-all duration-700 hover:-translate-y-3 overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              {/* Decorative Number Index */}
              <span className="absolute top-10 right-10 text-8xl font-black text-gray-50 group-hover:text-red-50/50 transition-colors duration-700 select-none">
                0{index + 1}
              </span>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-50 text-[#ef233c] rounded-[2rem] group-hover:bg-[#ef233c] group-hover:text-white transition-all duration-700 shadow-sm group-hover:rotate-[15deg] group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <span className="px-4 py-1.5 rounded-xl bg-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest group-hover:bg-red-50 group-hover:text-[#ef233c] transition-colors">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 tracking-tighter">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 leading-relaxed text-lg font-bold group-hover:text-gray-700 transition-colors max-w-sm">
                  {feature.description}
                </p>
              </div>

              <div className="relative z-10 mt-12 flex items-center justify-between border-t border-gray-50 pt-8 group-hover:border-red-50 transition-colors">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-gray-300 group-hover:text-[#ef233c] transition-all">
                  <span>Learn more</span>
                  <div className="w-12 h-1 bg-gray-100 rounded-full group-hover:bg-[#ef233c] group-hover:w-16 transition-all duration-500"></div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-red-50 group-hover:text-[#ef233c] transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;