import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Hospital, 
  MessageSquare, 
  User as UserIcon, 
  Heart,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import Loader from "../../Components/Loader";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const openModal = useRef();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["donation-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });
  console.log(data)

  const handleModal = () => {
    openModal.current.showModal();
  };

  const handleConfirmDonate = (e) => {
    e.preventDefault();
    const updatedInfo = { donationStatus: "inprogress" };
    axiosSecure.patch(`/donation-requests/${id}`, updatedInfo).then((res) => {
      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        toast.success("Donation is now In Progress!");
        openModal.current.close();
        refetch();
      }
    });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-red-500"><Loader></Loader></div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-red-500">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900">Request ID#{data?._id?.slice(10)}</span>
        </nav>

        {/* Header Section */}
        <div className="flex-col md:flex-row justify-center items-start md:items-center mb-10 gap-6">
          <div className="text-center justify-center items-center">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              Request <span className="text-[#ef233c]">Details</span>
            </h1>
            <p className="text-gray-500 font-medium mt-2">View urgency, location, and requirements.</p>
          </div>
          
          <div className="flex justify-end">
          <div className={`flex gap-2 px-4 py-2 rounded-full w-30 text-xs font-black uppercase tracking-widest border -mb-5 ${
            data.donationStatus === 'pending' 
              ? 'bg-orange-200 text-orange-600 border-orange-100' 
              : 'bg-emerald-50 text-emerald-600 border-emerald-100'
          }`}>
            <Clock size={14} />
            {data.donationStatus}
          </div>
          </div>
        </div>

        {/* Main Info Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Top Banner: Recipient Info */}
          <div className="p-8 md:p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6 text-center md:text-left">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-red-50 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                 <UserIcon size={40} className="text-[#ef233c]" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">{data.recipientName}</h2>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-1">Recipient • Patient</p>
              </div>
            </div>

            <div className="bg-red-50 p-6 rounded-3xl flex items-center gap-4 border border-red-100">
               <div className="w-12 h-12 bg-[#ef233c] text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                  {data.bloodGroup}
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ef233c]">Required</p>
                  <p className="text-gray-900 font-bold">Blood Group</p>
               </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Location */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-50 space-y-10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">Location Details</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
                    <Hospital size={30} fill="green" className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Hospital</p>
                    <p className="font-black text-gray-900 leading-tight">{data.hospitalName}</p>
                    <p className="text-gray-500 text-sm mt-1">{data.recipientUpazila}, {data.recipientDistrict}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 border border-gray-100">
                    <MapPin size={30} fill="red" className="text-white"/>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-1">Full Address</p>
                    <p className="font-bold text-gray-700 leading-relaxed text-sm">{data.fullAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Timing & Message */}
            <div className="p-8 md:p-12 space-y-10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-300">Timing & Urgency</h3>
              
              <div className="space-y-8">
                <div className="flex items-center gap-12">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 text-[#ef233c] rounded-xl flex items-center justify-center">
                      <Calendar size={18} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase">Required Date</p>
                       <p className="font-black text-gray-900">{data.donationDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 text-gray-900 rounded-xl flex items-center justify-center border border-gray-100">
                      <Clock size={18} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase">Time</p>
                       <p className="font-black text-gray-900">{data.donationTime}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50/50 p-6 rounded-3xl border border-yellow-100">
                   <div className="flex items-center gap-2 mb-3 text-yellow-700">
                      <MessageSquare size={16} />
                      <p className="text-xs font-black uppercase tracking-widest">Request Message</p>
                   </div>
                   <p className="text-gray-600 font-medium italic leading-relaxed text-sm">
                      "{data.requestMessage}"
                   </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="p-4 bg-gray-50/50 border-t border-gray-50 flex justify-center md:justify-end mb-4">
            <button 
              onClick={handleModal} 
              disabled={data.donationStatus !== 'pending'}
              className="group flex cursor-pointer items-center gap-3 bg-[#ef233c] text-white px-12 py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-100 hover:bg-[#d90429] transition-all active:scale-95 disabled:bg-gray-300 disabled:shadow-none"
            >
              <Heart size={20} fill="white" className="animate-ping" />
              Donate Now
            </button>
          </div>
        </div>
      </div>

      {/* --- MODAL DESIGN --- */}
      <dialog ref={openModal} className="modal modal-middle">
        <div className="modal-box rounded-[2.5rem] p-10 max-w-md bg-white border-none shadow-2xl">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-[#ef233c] mx-auto mb-6">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-black text-gray-900 tracking-tight text-center mb-2">Confirm Donation</h3>
          <p className="text-gray-500 text-center text-sm font-medium mb-8">Please confirm that you are available and willing to donate for this patient.</p>

          <form onSubmit={handleConfirmDonate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Donor Name</label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-400 cursor-not-allowed"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Donor Email</label>
              <input
                type="email"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-400 cursor-not-allowed"
                defaultValue={user?.email}
                readOnly
              />
            </div>

            <button type="submit" className="w-full cursor-pointer bg-[#ef233c] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#d90429] shadow-xl shadow-red-100 transition-all active:scale-95">
              Confirm & Start
            </button>
          </form>

          <div className="mt-4">
            <form method="dialog">
              <button className="w-full text-gray-400 font-bold text-sm hover:text-gray-600 py-2 transition-colors cursor-pointer">I changed my mind</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-gray-900/60 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DonationRequestDetails;