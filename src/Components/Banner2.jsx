import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import CountUp from "react-countup";
import { 
  Eye, 
  Heart, 
  MoveRight, 
  Users, 
  Droplet, 
  DollarSign 
} from "lucide-react";

const Banner2 = () => {
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Total Donors
  const { data: donors = [] } = useQuery({
    queryKey: ["total-donors-count"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=donor`);
      return res.data;
    },
  });

  // 2. Fetch Total Donation Requests
  const { data: totalReq = [] } = useQuery({
    queryKey: ["total-requests-count"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation");
      return res.data;
    },
  });

  // 3. Fetch Total Funding/Payments
  const { data: payments = [] } = useQuery({
    queryKey: ["total-payments-count"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // Calculate Total Funding Amount
  const totalAmount = payments.reduce((sum, i) => sum + i.amount, 0);

  // Statistics configuration
  const stats = [
    { 
        label: "Active Donors", 
        value: donors.length, 
        suffix: "+", 
        prefix: "",
        icon: <Users size={24} /> 
    },
    { 
        label: "Total Funding", 
        value: totalAmount, 
        suffix: "", 
        prefix: "$",
        icon: <DollarSign size={24} /> 
    },
    { 
        label: "Total Requests", 
        value: totalReq.length, 
        suffix: "", 
        prefix: "",
        icon: <Droplet size={24} /> 
    },
  ];

  return (
    <div className="pb-20 font-sans selection:bg-red-100 selection:text-[#ef233c]">
      
      {/* 1. Ultra-Modern Hero Section */}
      <section className="relative lg:min-h-[700px] md:min-h-[700px] min-h-[600px] flex items-center justify-center px-6 overflow-hidden rounded-b-[2rem] md:rounded-b-[4rem]">        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBnb0Ea5IENH7DL-HvbzUUPb7sWmMbcLtA0eU48pU9Qw0h8eBMkRAxC5d23wt6S7yjGc9NYm4a5OFn4rvVj0TKwp02J0XWT_Lo1PEQv4HSK49g-H-OEQk2UuK_uw9yqnxErugrxVfgfxdtwrluCGxJuR9YrOm5QESGIVH7cl2K0xxPm0UxSRIGC--kdVbXIN5zmapXGMxe6jA_wyBsK5RtT9WrfkMEoKC3HutVrjpzGrfvBbl90pr4G5-GLO7GDWn3GZ9YI9WZu7k"
          alt="Saving Lives" 
          className="absolute inset-0 w-full h-full object-cover scale-100"
        />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#ef233c]/20 blur-3xl rounded-full z-10"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 blur-3xl rounded-full z-10"></div>

        <div className="relative z-20 max-w-5xl text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-sm font-bold mb-8 animate-in fade-in zoom-in duration-700">
            <Heart size={16} className="text-[#ef233c] fill-[#ef233c]" />
            <span>Trusted by {donors.length}+ Local Heroes</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
            Saving Lives, <br />
            <span className="text-[#ef233c] drop-shadow-sm">One Drop</span> at a Time
          </h1>
          
          <p className="text-gray-200 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Connect directly with {totalReq.length} pending requests or join our community of donors to help save more lives.
          </p>
          
          {/* --- Responsive Hero Actions --- */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full max-w-md sm:max-w-none px-4 sm:px-0">
            <Link 
              to="/register" 
              className="group w-full sm:w-auto bg-[#ef233c] hover:bg-white hover:text-[#ef233c] text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 border-2 border-[#ef233c]"
            >
              <span>Become a Donor</span>
              <MoveRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <Link 
              to="/search" 
              className="group w-full sm:w-auto bg-white/10 backdrop-blur-lg border border-white/30 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-lg md:text-xl hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span>Search Donors</span>
              <Eye size={24} className="group-hover:scale-110 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Impact Stats Grid */}
      <section className="max-w-7xl mx-auto px-6 -mt-16 md:-mt-20 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 flex flex-col items-center text-center group hover:border-[#ef233c] transition-all hover:-translate-y-2 duration-300"
            >
              <div className="w-14 h-14 bg-red-50 text-[#ef233c] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#ef233c] group-hover:text-white transition-all duration-300">
                {stat.icon}
              </div>
              
              <h4 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                <CountUp 
                    start={0} 
                    end={stat.value} 
                    duration={4.0} 
                    separator="," 
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                />
              </h4>
              
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mt-3 leading-none">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Banner2;