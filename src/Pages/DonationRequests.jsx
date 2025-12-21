import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "../Components/Loader";
import { 
  MapPin, 
  Calendar, 
  ArrowRight,
  ChevronDown
} from "lucide-react";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pendingData = [], isLoading } = useQuery({
    queryKey: ["donationRequests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests?status=pending");
      return res.data;
    },
  });

  // Helper to determine theme based on date (Matching the reference image)
  const getCardTheme = (date) => {
    const today = new Date().toISOString().split('T')[0];
    if (date === today) {
      return { label: "Urgent: Today", bg: "bg-red-50", text: "text-red-500", border: "border-red-100", btn: "bg-[#ef233c]" };
    }
    if (date > today) {
      return { label: "Upcoming", bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-100", btn: "bg-blue-500" };
    }
    return { label: "Gone", bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-100", btn: "bg-orange-500" };
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-16 px-4 md:px-8 font-sans">
      <div className="max-w-[1600px] mx-auto">
        
        {/* --- Header Section --- */}
        <div className="mb-16 text-center flex justify-center items-center">
          <div className="">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
          Donation <span className="text-[#ef233c]"> Requests</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-2xl leading-relaxed">
            Your donation can save a life. Browse pending requests below and find urgent needs matching your blood group.
          </p>
          </div>
        </div>

      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pendingData.length > 0 ? (
            pendingData.map((item) => {
              const theme = getCardTheme(item.donationDate);
              return (
                <div 
                  key={item._id} 
                  className={`group bg-white rounded-[2.5rem] border ${theme.border} overflow-hidden shadow-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col`}
                >
                  
                  {/* 1. Dynamic Status Banner */}
                  <div className={`${theme.bg} px-8 py-4 flex justify-between items-center `}>
                    <span className={`flex items-center gap-2 h-20 text-[10px] font-black uppercase tracking-widest ${theme.text}`}>
                      <div className={`w-2 h-2 rounded-full animate-pulse ${theme.text.replace('text', 'bg')}`} />
                      {theme.label}
                    </span>
                  </div>

                  <div className="p-8 pt-0 flex flex-col flex-1">
                    {/* 2. Floating Blood Group Badge */}
                    <div className="flex justify-start -mt-10 mb-6">
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-gray-50 group-hover:scale-110 transition-transform">
                        <span className="text-3xl font-black text-[#ef233c]">{item.bloodGroup}</span>
                      </div>
                    </div>

                    {/* 3. Recipient Information */}
                    <div className="text-center mb-8">
                      <h3 className="text-xl font-black text-gray-900 tracking-tight truncate px-2">
                        {item.recipientName}
                      </h3>
                      <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Recipient</p>
                    </div>

                    {/* 4. Details Section */}
                    <div className="space-y-5 flex-1">
                      {/* Location Row */}
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center shrink-0`}>
                          <MapPin size={18} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Location</p>
                          <p className="text-sm font-bold text-gray-700 truncate">
                            {item.recipientUpazila}, {item.recipientDistrict}
                          </p>
                        </div>
                      </div>

                      {/* Date & Time Row */}
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.text} flex items-center justify-center shrink-0`}>
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Date & Time</p>
                          <p className="text-sm font-bold text-gray-700">
                            {new Date(item.donationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            <span className="text-gray-300 mx-2">|</span>
                            {item.donationTime}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 5. View Details Button */}
                    <div className="mt-8">
                      <Link 
                        to={`/dashboard/donation-request-details/${item._id}`}
                        className={`w-full ${theme.btn} text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-100 hover:brightness-110 transition-all active:scale-95 group/btn`}
                      >
                        View Details
                        <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-32 text-center bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-black text-xl tracking-tight">No pending donation requests available.</p>
            </div>
          )}
        </div>

        {/* --- Load More Action --- */}
        <div className="mt-20 flex justify-center">
          <button className="group px-10 py-4 bg-white border border-gray-100 rounded-full font-black text-gray-500 shadow-sm hover:shadow-xl hover:border-red-100 hover:text-[#ef233c] transition-all flex items-center gap-3">
            Load More Requests
            <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;