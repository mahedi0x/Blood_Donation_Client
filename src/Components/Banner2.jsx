import React from "react";
import { Link } from "react-router";
import { Target, Eye, ChevronDown, Heart, MoveRight, Users, Award, ShieldCheck } from "lucide-react";

const Banner2 = () => {
  const stats = [
    { label: "Active Donors", value: "15k+", icon: <Users size={24} /> },
    { label: "Lives Saved", value: "40k+", icon: <Heart size={24} /> },
    { label: "Verified Centers", value: "200+", icon: <ShieldCheck size={24} /> },
    { label: "Awards Won", value: "12", icon: <Award size={24} /> },
  ];


  return (
    <div className="pb-20 font-sans selection:bg-red-100 selection:text-[#ef233c]">
      
      {/* 1. Ultra-Modern Hero Section */}
      <section className="relative lg:min-h-[700px] md:min-h-[700px] min-h-[600px] flex items-center justify-center px-6 overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem]">        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC141HhTkbNfoy5Jl8pzu2zR0QkRfKAUsF4G36uFBy0VPCzAiSoMJ4Uh6BAmaPgatePEbHjzvJMLBWmgreSzhdRcmPpVGahwXfrz0Wr_j-XDGkm_1uI9TVxP0UR_UIz3xvTq3n4tR_q34GkgscIIkCbr2D5MFB0rYYbsxMvzp4WY2z940rjRoBKHYox3GpvtZeppG7UDzce0aV8y4tVpH7Ixt72pN8bS1H3k8B1Vy7K1XavCmdbXi8GbN-fvv4E6KjyCnuR9FFqBFg" 
          alt="Saving Lives" 
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#ef233c]/20 blur-3xl rounded-full z-10"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 blur-3xl rounded-full z-10"></div>

        <div className="relative z-20 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-bold mb-8 animate-in fade-in zoom-in duration-700">
            <Heart size={16} className="text-[#ef233c] fill-[#ef233c]" />
            <span>Trusted by 15,000+ Heroes</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            Saving Lives, <br />
            <span className="text-[#ef233c] drop-shadow-sm">One Drop</span> at a Time
          </h1>
          <p className="text-gray-200 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Connect directly with those in need or register to become a regular donor in your community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/register" className="group bg-[#ef233c] hover:bg-white hover:text-[#ef233c] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 flex items-center gap-3">
              Become a Donor
              <MoveRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Impact Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center group hover:border-[#ef233c] transition-all">
              <div className="w-12 h-12 bg-red-50 text-[#ef233c] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h4 className="text-3xl md:text-4xl font-black text-gray-900">{stat.value}</h4>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      

 


    </div>
  );
};

export default Banner2;