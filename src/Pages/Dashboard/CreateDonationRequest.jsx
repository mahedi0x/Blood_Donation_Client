import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { 
  User, 
  Mail, 
  MapPin, 
  Hospital, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Droplet, 
  ChevronDown,
  Info
} from "lucide-react";

const CreateDonationRequest = () => {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const realData = useLoaderData();
  const [upazilas, setUpazilas] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  console.log(errors)

  useEffect(() => {
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data))
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "recipientDistrict" });

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    return districtUpazilas.map((u) => u.name);
  };

  const onSubmit = (data) => {
    const districtName = realData.find((d) => d.id === data.recipientDistrict);

    const requestData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.recipientName,
      recipientDistrict: districtName?.name,
      recipientUpazila: data.recipientUpazila,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      donationStatus: "pending",
    };

    axiosSecure
      .post("/donation-requests?status=active", requestData)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Donation request created successfully!");
          reset();
        }
      })
      .catch((error) => {
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-10 px-4 md:px-4 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
            New <span className="text-[#ef233c]">Donation Request</span>
          </h1>
          <p className="text-gray-500 font-medium mt-3 text-lg">
            Complete the form below to broadcast an urgent request to the donor community.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Section 1: Identity (Read Only) */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-red-50 rounded-xl text-[#ef233c]"><Info size={20} /></div>
              <h3 className="text-xl font-black text-gray-900">Requester Info</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
                <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-bold">
                  <User size={18} /> {user?.displayName}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Your Email</label>
                <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-500 font-bold">
                  <Mail size={18} /> {user?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Patient & Medical Details */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-red-50 rounded-xl text-[#ef233c]"><Droplet size={20} /></div>
              <h3 className="text-xl font-black text-gray-900">Patient Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Recipient Name</label>
                <input
                  type="text"
                  {...register("recipientName", { required: true })}
                  placeholder="Enter full name"
                  className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-900 focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Blood Group Needed</label>
                <div className="relative group">
                  <select
                    {...register("bloodGroup", { required: true })}
                    className="w-full pl-6 pr-10 py-4 bg-white border border-gray-100 rounded-2xl font-black text-[#ef233c] outline-none focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 appearance-none cursor-pointer transition-all"
                  >
                    <option value="">Select Group</option>
                    {bloodGroups.map((bg, i) => <option key={i} value={bg}>{bg}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:rotate-180 transition-transform" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">District</label>
                <div className="relative group">
                  <select
                    {...register("recipientDistrict", { required: true })}
                    className="w-full pl-6 pr-10 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 outline-none focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 appearance-none cursor-pointer"
                  >
                    <option value="">Select District</option>
                    {realData.map((d, i) => <option key={i} value={d.id}>{d.name}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Upazila</label>
                <div className="relative group">
                  <select
                    {...register("recipientUpazila", { required: true })}
                    className="w-full pl-6 pr-10 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-700 outline-none focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 appearance-none cursor-pointer"
                  >
                    <option value="">Select Upazila</option>
                    {upazilaByDistrictId(selectedDistrict).map((u, i) => <option key={i} value={u}>{u}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Logistics & Timing */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-300">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-red-50 rounded-xl text-[#ef233c]"><Calendar size={20} /></div>
              <h3 className="text-xl font-black text-gray-900">Hospital & Timing</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Hospital size={12}/> Hospital Name</label>
                <input
                  type="text"
                  {...register("hospitalName", { required: true })}
                  placeholder="Enter hospital name"
                  className="w-full px-6 py-4 border border-gray-100 rounded-2xl font-bold focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><MapPin size={12}/> Full Address</label>
                <input
                  type="text"
                  {...register("fullAddress", { required: true })}
                  placeholder="Street / Ward / Area"
                  className="w-full px-6 py-4 border border-gray-100 rounded-2xl font-bold focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Calendar size={12}/> Required Date</label>
                <input
                  type="date"
                  {...register("donationDate", { required: true })}
                  className="w-full px-6 py-4 border border-gray-100 rounded-2xl font-bold focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><Clock size={12}/> Required Time</label>
                <input
                  type="time"
                  {...register("donationTime", { required: true })}
                  className="w-full px-6 py-4 border border-gray-100 rounded-2xl font-bold focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
              </div>
              <div className="md:col-span-2 space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2"><MessageSquare size={12}/> Request Message</label>
                <textarea
                  {...register("requestMessage", { required: true })}
                  rows="4"
                  placeholder="Explain why the blood is needed..."
                  className="w-full px-6 py-4 border border-gray-100 rounded-2xl font-bold focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex justify-center md:justify-end">
            <button
              type="submit"
              className="w-full md:w-auto px-12 py-5 bg-[#ef233c] text-white font-black text-lg rounded-2xl shadow-xl shadow-red-100 hover:bg-[#d90429] transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Create Donation Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;