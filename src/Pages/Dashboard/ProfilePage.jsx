import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { 
  User, Mail, MapPin, Calendar, 
  Droplet, ShieldCheck, Lock, Edit3, CheckCircle2, Save, XCircle 
} from 'lucide-react';

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const email = user?.email;
  const [editable, setEditable] = useState(false);

  // Fetch Single User Data
  const { data: userData = {}, refetch } = useQuery({
    queryKey: ["users-profile", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-profile?email=${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // React Hook Form
  const { register, handleSubmit, reset } = useForm();

  // Reset form when entering edit mode or when data updates
  useEffect(() => {
    if (userData?._id) {
      reset({
        displayName: userData?.displayName || "",
        bloodGroup: userData?.bloodGroup || "",
        district: userData?.district || "",
        upazila: userData?.upazila || "",
      });
    }
  }, [userData, reset]);

  // Update Profile Logic
  const onSubmit = (data) => {
    const updatedData = {
      displayName: data.displayName,
      bloodGroup: data.bloodGroup,
      district: data.district,
      upazila: data.upazila,
    };

    axiosSecure
      .patch(`/user-profile/${userData?._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
          refetch();
          toast.success("Profile updated successfully");
          setEditable(false);
        }
      })
      .catch(() => toast.error("Failed to update profile"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* 1. Header Section */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Profile Settings</h1>
            <p className="text-gray-500 font-medium">Manage your personal information and donor status.</p>
          </div>
          <div className="flex gap-3">
            {!editable ? (
              <button 
                onClick={() => setEditable(true)}
                className="flex items-center gap-2 px-6 py-2.5 border-2 border-red-100 text-[#ef233c] font-bold rounded-xl hover:bg-red-50 transition-all active:scale-95"
              >
                <Edit3 size={18} /> Edit Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setEditable(false)}
                  className="flex items-center gap-2 px-6 py-2.5 border-2 border-gray-100 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSubmit(onSubmit)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#ef233c] text-white font-bold rounded-xl hover:bg-[#d90429] shadow-lg shadow-red-200 transition-all active:scale-95"
                >
                  <Save size={18} /> Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* 2. Banner & Identity Area */}
        <div className="relative">
          <div className="h-32 md:h-44 bg-[#3b020d] relative overflow-hidden">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>
          
          <div className="px-6 md:px-12 -mt-12 md:-mt-16 flex flex-col md:flex-row items-end md:items-center gap-6 relative z-10">
            <div className="relative">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                <img src={userData?.photoURL} alt="avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-2xl md:text-4xl font-black text-gray-600 leading-tight">{userData?.displayName}</h2>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full border uppercase tracking-tighter ${userData?.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                  <CheckCircle2 size={12} /> {userData?.status} Donor
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-gray-500 font-medium">
                <div className="flex items-center gap-1.5"><MapPin size={16} className="text-red-400" /> {userData?.upazila}, {userData?.district}</div>
              </div>
            </div>

            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 min-w-[120px] text-center mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-1">Blood Group</p>
                <div className="text-3xl md:text-4xl font-black text-[#ef233c]">{userData?.bloodGroup}</div>
            </div>
          </div>
        </div>

        {/* 3. Form Section */}
        <form className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-10">
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg text-[#ef233c]"><User size={20} /></div>
                <h3 className="text-xl font-black text-gray-900">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    {...register("displayName")}
                    disabled={!editable}
                    className={`w-full px-4 py-3.5 rounded-xl font-bold transition-all border ${editable ? 'bg-white border-red-200 focus:ring-2 focus:ring-red-100 outline-none' : 'bg-gray-50 border-gray-100 text-gray-700'}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email (Fixed)</label>
                  <div className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-400 flex justify-between items-center cursor-not-allowed">
                    {userData?.email} <Lock size={16} />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-50 rounded-lg text-[#ef233c]"><MapPin size={20} /></div>
                <h3 className="text-xl font-black text-gray-900">Address Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">District</label>
                  <input
                    {...register("district")}
                    disabled={!editable}
                    className={`w-full px-4 py-3.5 rounded-xl font-bold transition-all border ${editable ? 'bg-white border-red-200 outline-none' : 'bg-gray-50 border-gray-100 text-gray-700'}`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Upazila</label>
                  <input
                    {...register("upazila")}
                    disabled={!editable}
                    className={`w-full px-4 py-3.5 rounded-xl font-bold transition-all border ${editable ? 'bg-white border-red-200 outline-none' : 'bg-gray-50 border-gray-100 text-gray-700'}`}
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-red-50/30 rounded-[2.5rem] p-8 border border-red-50 space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-lg text-[#ef233c] shadow-sm"><Droplet size={20} /></div>
                  <h3 className="text-lg font-black text-gray-900">Medical Profile</h3>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Blood Group</label>
                  <select
                    {...register("bloodGroup")}
                    disabled={!editable}
                    className={`w-full px-4 py-3.5 rounded-xl font-black transition-all border appearance-none ${editable ? 'bg-white border-red-200 text-[#ef233c]' : 'bg-white border-gray-100 text-[#ef233c]'}`}
                  >
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((grp) => (
                      <option key={grp} value={grp}>{grp}</option>
                    ))}
                  </select>
                </div>
              </section>

              {/* Status Logic */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${userData?.status === 'active' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
                    {userData?.status === 'active' ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 mb-1">{userData?.status === 'active' ? 'Eligible to Donate' : 'Account Blocked'}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                      {userData?.status === 'active' 
                        ? 'Your account is in good standing. You are ready to save lives.' 
                        : 'Please contact support to verify your account status.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;