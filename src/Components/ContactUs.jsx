import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form logic here
  };

  return (
    <section className="bg-[#FDFDFD] py-20 px-4 md:px-8 font-sans" id="contact">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4">
            Get in <span className="text-[#ef233c]">Touch</span>
          </h2>
          <p className="text-gray-500 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Have questions, suggestions, or want to collaborate? Reach out anytime, and our team will respond as quickly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-6 group hover:border-[#ef233c] transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 text-[#ef233c] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#ef233c] group-hover:text-white transition-all duration-300">
                <Phone size={28} />
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Hotline</h4>
                <p className="text-xl font-black text-gray-900">+8801891474769</p>
                <p className="text-sm font-bold text-gray-400 mt-1 italic text-[10px]">Available 24/7 for emergencies</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-50 flex items-start gap-6 group hover:border-[#ef233c] transition-all duration-300">
              <div className="w-14 h-14 bg-red-50 text-[#ef233c] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#ef233c] group-hover:text-white transition-all duration-300">
                <Mail size={28} />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</h4>
                <p className="text-xl font-black text-gray-900 truncate">mahedi.swe04@gmail.com</p>
                <p className="text-sm font-bold text-gray-400 mt-1 italic text-[10px]">Response time: within 24 hours</p>
              </div>
            </div>

            <div className="bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#ef233c] opacity-10 blur-3xl -z-0"></div>
               <div className="relative z-10 text-white">
                 <h3 className="text-2xl font-black mb-4">Join Our Community</h3>
                 <p className="text-gray-400 font-medium leading-relaxed text-sm">
                   We are always looking for passionate volunteers and donors to help expand our reach across Bangladesh.
                 </p>
                 <div className="mt-8 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-gray-700 overflow-hidden">
                        <img src="https://i.ibb.co.com/SDcKzsxD/Red-Modern-Formal-Facebook-Profile-Picture-photoaidcom-cropped-1.png" alt="Community Member" />
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest leading-none">
                        15,000+ Heroes Joined
                    </p>
                 </div>
               </div>
            </div>
          </div>

          {/* Right Side: Modern Contact Form */}
          <div className="lg:col-span-7">
            <form 
              onSubmit={handleSubmit}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-gray-100 h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-red-50 rounded-xl text-[#ef233c]">
                    <MessageSquare size={20} />
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Send Us a Message</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-8 flex-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea
                  placeholder="How can we help you?"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300 h-40 md:h-full resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-[#ef233c] text-white font-black text-lg rounded-2xl shadow-xl shadow-red-100 hover:bg-[#d90429] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3"
              >
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;