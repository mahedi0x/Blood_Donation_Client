import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { 
  Clock, 
  MapPin, 
  Droplet, 
  ArrowRight, 
  AlertCircle,
  Calendar
} from "lucide-react";

const UrgentRequests = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch only "inprogress" or "pending" requests, limited to 3 for the homepage
  const { data: urgentRequests = [], isLoading } = useQuery({
    queryKey: ["urgent-requests-home"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation"); // Adjust endpoint to filter by status if possible
      return res.data.filter(req => req.donationStatus === "inprogress" || req.donationStatus === "pending").slice(0, 3);
    },
  });

  if (isLoading) return null;

  return (
    <section className="py-24 bg-[#fdfdfd] font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-[#ef233c] text-xs font-black uppercase tracking-widest mb-6">
               <AlertCircle size={14} className="animate-pulse" />
               Urgent Needs
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter">
              Heroes Needed <span className="text-[#ef233c]">Immediately</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg mt-4">
              Real-time blood requests from people in your community. Your quick response could be the miracle they are waiting for.
            </p>
          </div>
          <Link to="/donation-requests" className="group flex items-center gap-2 text-gray-900 font-black uppercase tracking-widest text-sm border-b-2 border-gray-900 pb-1 hover:text-[#ef233c] hover:border-[#ef233c] transition-all">
            View All Requests <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {urgentRequests.map((request) => (
            <div key={request._id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-2xl transition-all duration-500 flex flex-col group">
              
              {/* Blood Group Badge */}
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-[#ef233c] font-black text-2xl shadow-sm group-hover:bg-[#ef233c] group-hover:text-white transition-all duration-500">
                  {request.bloodGroup}
                </div>
                <span className="px-4 py-1.5 rounded-xl bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest">
                  Urgent
                </span>
              </div>

              {/* Patient Info */}
              <div className="flex-1 space-y-4">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                  For {request.recipientName}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                    <MapPin size={16} className="text-[#ef233c]" />
                    {request.recipientUpazila}, {request.recipientDistrict}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                    <Calendar size={16} className="text-[#ef233c]" />
                    {request.donationDate}
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 font-bold text-sm">
                    <Clock size={16} className="text-[#ef233c]" />
                    {request.donationTime}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link 
                to={`/dashboard/donation-request-details/${request._id}`}
                className="mt-8 w-full py-4 bg-gray-50 text-gray-900 font-black rounded-2xl hover:bg-[#ef233c] hover:text-white transition-all text-center flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-red-100"
              >
                Donate Now
                <Droplet size={18} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UrgentRequests;