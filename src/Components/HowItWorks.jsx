import React from "react";
import { UserPlus, Search, Droplet, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Register",
      description: "Create an account in minutes to join our life-saving community.",
      icon: <UserPlus size={32} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: 2,
      title: "Search or Request",
      description: "Find a donor near you or post a request for your specific blood group.",
      icon: <Search size={32} />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      id: 3,
      title: "Connect",
      description: "Chat with available donors and coordinate the donation details.",
      icon: <Droplet size={32} />,
      color: "bg-red-50 text-[#ef233c]",
    },
    {
      id: 4,
      title: "Save a Life",
      description: "Complete the donation and make a real impact in someone's life.",
      icon: <CheckCircle size={32} />,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <section className="py-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-6">
            Getting Started is <span className="text-[#ef233c]">Simple</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Follow these four easy steps to either find blood donors or start saving lives as a volunteer.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-0 w-full h-[2px] bg-gray-50 -z-10"></div>

          {steps.map((step) => (
            <div key={step.id} className="group relative flex flex-col items-center text-center">
              
              {/* Icon Container */}
              <div className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 border border-white`}>
                {step.icon}
              </div>

              {/* Step Number Badge */}
              <div className="absolute top-16 bg-white border border-gray-100 text-gray-400 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-sm group-hover:bg-[#ef233c] group-hover:text-white transition-colors duration-500">
                {step.id}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 flex justify-center">
          <div className="p-1 bg-gray-50 rounded-full inline-flex items-center gap-2 pr-6 border border-gray-100">
            <span className="bg-[#ef233c] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
              Ready?
            </span>
            <p className="text-sm font-bold text-gray-600">
              Join 15,000+ heroes today. <a href="/register" className="text-[#ef233c] hover:underline">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;