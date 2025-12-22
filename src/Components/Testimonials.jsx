import React from "react";
import { Quote, Star, Heart } from "lucide-react";

const Testimonials = () => {
  const stories = [
    {
      id: 1,
      name: "Rahim Uddin",
      role: "Recipient",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "I was in urgent need of A+ blood for my father's surgery. Within 20 minutes of posting a request, I found a donor. This platform literally saved a life.",
      location: "Dhaka, Bangladesh"
    },
    {
      id: 2,
      name: "Sarah Islam",
      role: "Donor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      text: "Being a regular donor on RedLove is so rewarding. The dashboard makes it easy to track my donations, and knowing I helped someone today is the best feeling.",
      location: "Chittagong, Bangladesh"
    },
    {
      id: 3,
      name: "Rafiqul Hassan",
      role: "Volunteer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      text: "As a volunteer, I've seen how quickly this community responds to crises. The verification system ensures that every donation is safe and genuine.",
      location: "Sylhet, Bangladesh"
    }
  ];

  return (
    <section className="py-24 bg-gray-50/50 font-sans relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 blur-[120px] -z-10 rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 blur-[100px] -z-10 rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4">
              Real Stories from <br /> 
              <span className="text-[#ef233c]">Our Community</span>
            </h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Join thousands of people who have found hope and support through our life-saving network.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                   </div>
                ))}
             </div>
             <p className="ml-4 text-xs font-black text-gray-900 uppercase tracking-widest">4.9/5 Rating</p>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              
              <div className="flex justify-between items-start mb-8">
                <Quote size={40} className="text-red-50 opacity-50 group-hover:text-[#ef233c] group-hover:opacity-20 transition-colors" />
                <div className="flex text-orange-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </div>

              <p className="text-gray-600 font-medium text-lg italic leading-relaxed mb-8 flex-1">
                "{story.text}"
              </p>

              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md group-hover:rotate-3 transition-transform">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 leading-none mb-1">{story.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#ef233c] uppercase tracking-widest">{story.role}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{story.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Footer */}
        <div className="mt-20 text-center">
           <button className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-[#ef233c] shadow-xl transition-all active:scale-95 group">
              <Heart size={20} className="group-hover:fill-white" />
              Share Your Success Story
           </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;