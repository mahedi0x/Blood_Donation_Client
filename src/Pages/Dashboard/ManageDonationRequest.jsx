import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Edit3, MapPin, Hospital, User, Save, ArrowLeft } from "lucide-react";
import Loader from "../../Components/Loader";

const ManageDonationRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: realData = {}, refetch, isLoading } = useQuery({
    queryKey: ["donationRequest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (realData && Object.keys(realData).length > 0) {
      reset({
        recipientName: realData.recipientName,
        recipientDistrict: realData.recipientDistrict,
        recipientUpazila: realData.recipientUpazila,
        hospitalName: realData.hospitalName,
        fullAddress: realData.fullAddress,
      });
    }
  }, [realData, reset]);

  const onSubmit = (data) => {
    const updatedInfo = {
      ...data,
      donationStatus: realData.donationStatus,
    };

    axiosSecure
      .patch(`/update-donation-request/${id}`, updatedInfo)
      .then((res) => {
        if (res.data.modifiedCount || res.data.matchedCount) {
          toast.success("Donation request updated successfully");
          refetch();
        }
      })
      .catch(() => toast.error("Failed to update request"));
  };

  if (isLoading) return <div className="p-10 text-center font-black text-[#ef233c]"><Loader></Loader></div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* --- Header & Back Button --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-[#ef233c] hover:border-[#ef233c] transition-all shadow-sm"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Edit <span className="text-[#ef233c]">Request</span>
              </h1>
              <p className="text-gray-500 text-sm font-medium">Update the details for this blood requirement.</p>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            realData.donationStatus === 'done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
          }`}>
            Current Status: {realData.donationStatus}
          </div>
        </div>

        {/* --- Main Form Card --- */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Recipient Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  <User size={14} className="text-[#ef233c]" /> Recipient Name
                </label>
                <input
                  type="text"
                  {...register("recipientName")}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300"
                  placeholder="Enter recipient name"
                />
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  <MapPin size={14} className="text-[#ef233c]" /> District
                </label>
                <input
                  type="text"
                  {...register("recipientDistrict")}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300"
                  placeholder="Enter district"
                />
              </div>

              {/* Upazila */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  <MapPin size={14} className="text-[#ef233c]" /> Upazila
                </label>
                <input
                  type="text"
                  {...register("recipientUpazila")}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300"
                  placeholder="Enter upazila"
                />
              </div>

              {/* Hospital Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  <Hospital size={14} className="text-[#ef233c]" /> Hospital Name
                </label>
                <input
                  type="text"
                  {...register("hospitalName")}
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300"
                  placeholder="Enter hospital name"
                />
              </div>

              {/* Full Address */}
              <div className="md:col-span-2 space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                  <MapPin size={14} className="text-[#ef233c]" /> Full Detailed Address
                </label>
                <textarea
                  {...register("fullAddress")}
                  rows="3"
                  className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-900 focus:bg-white focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all duration-300 resize-none"
                  placeholder="Enter specific address details..."
                />
              </div>
            </div>

            {/* --- Action Buttons --- */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-gray-50 pt-8">
               <button 
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-8 py-4 bg-gray-100 text-gray-500 font-black rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="w-full sm:w-auto px-10 py-4 bg-[#ef233c] text-white font-black rounded-2xl shadow-xl shadow-red-100 hover:bg-[#d90429] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Save size={20} /> Update Request
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageDonationRequest;