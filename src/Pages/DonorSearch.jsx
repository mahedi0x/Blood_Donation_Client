import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import { Search, MapPin, Mail, User, Heart, Phone, X, PhoneCall, Droplet, SmileIcon } from "lucide-react";
import Loader from "../Components/Loader";

const DonorSearch = () => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, control } = useForm();
    
    const [donors, setDonors] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDonor, setSelectedDonor] = useState(null); 
    const realData = useLoaderData();

    useEffect(() => {
        fetch("/upazilas.json")
            .then((res) => res.json())
            .then((data) => setUpazilas(data))
            .catch((err) => console.log(err));
    }, []);

    const selectedDistrictId = useWatch({ control, name: "district" });

    const upazilaByDistrictId = (districtId) => {
        const districtUpazilas = upazilas.filter((u) => u.district_id === districtId);
        return districtUpazilas.map((u) => u.name);
    };

    const onSearch = async (data) => {
        setIsLoading(true);
        setHasSearched(true);
        const districtName = realData.find((d) => d.id === data.district);

        try {
            const res = await axiosSecure.get("/search-donors", {
                params: {
                    bloodGroup: data.bloodGroup,
                    district: districtName?.name,
                    upazila: data.upazila,
                    role: "donor",
                },
            });
            setDonors(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    return (
        <div className="min-h-screen bg-[#FDFDFD] py-20 px-4 font-sans selection:bg-red-100">
            {isLoading && <Loader />} 

            {/* --- Header --- */}
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6">
                    Find a <span className="text-[#ef233c]">Blood Donor</span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                    Connecting heroes with those in need. Search by group and location.
                </p>
            </div>

            {/* --- Search Bar --- */}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 relative">
                    <form onSubmit={handleSubmit(onSearch)} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Blood Group</label>
                            <select {...register("bloodGroup")} className="w-full pl-6 pr-10 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:border-red-200 transition-all cursor-pointer">
                                <option value="">Select Group</option>
                                {bloodGroups.map((group) => <option key={group} value={group}>{group}</option>)}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">District</label>
                            <select {...register("district", { required: true })} className="w-full pl-6 pr-10 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:border-red-200 transition-all cursor-pointer">
                                <option value="">Select District</option>
                                {realData.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Upazila</label>
                            <select {...register("upazila", { required: true })} className="w-full pl-6 pr-10 py-4 bg-gray-50 border border-transparent rounded-2xl font-bold text-gray-700 outline-none focus:bg-white focus:border-red-200 transition-all cursor-pointer">
                                <option value="">Select Upazila</option>
                                {upazilaByDistrictId(selectedDistrictId).map((u, i) => <option key={i} value={u}>{u}</option>)}
                            </select>
                        </div>

                        <button 
                            disabled={isLoading}
                            className={`flex cursor-pointer items-center justify-center gap-3 w-full bg-[#ef233c] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-red-100 transition-all active:scale-95 group ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#d90429]'}`}
                        >
                            <Search size={20} className={isLoading ? "animate-spin" : "group-hover:rotate-12 transition-transform"} />
                            {isLoading ? "Searching..." : "Search Donors"}
                        </button>
                    </form>
                </div>
            </div>

            {/* --- Donors List --- */}
            <div className="max-w-7xl mx-auto px-2">
                {!isLoading && donors.length === 0 ? (
                    /* --- ANIMATED EMPTY STATE --- */
                    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 max-w-4xl mx-auto overflow-hidden relative">
                        <div className="absolute inset-0 bg-red-50/30 opacity-50 blur-3xl -z-10 animate-pulse"></div>
                        <div className="relative">
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 bg-[#ef233c] rounded-full opacity-20 animate-ping"></div>
                                <div className="absolute inset-0 bg-[#ef233c] rounded-full opacity-10 animate-pulse scale-150"></div>
                                <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-red-50 z-10">
                                    <div className="animate-bounce transition-all duration-1000">
                                        <Droplet 
                                            size={40} 
                                            className={`${hasSearched ? "text-gray-300" : "text-[#ef233c]"} fill-current`} 
                                        />
                                    </div>
                                </div>
                                {!hasSearched && (
                                    <>
                                        <SmileIcon size={16} className="absolute -top-2 -right-2 text-[#ef233c] animate-bounce delay-100" fill="currentColor" />
                                        <SmileIcon size={12} className="absolute top-4 -left-4 text-[#ef233c] opacity-40 animate-pulse delay-300" fill="currentColor" />
                                    </>
                                )}
                            </div>
                            <h3 className="text-3xl font-black text-gray-900 tracking-tighter mb-3">
                                {hasSearched ? "No matching donors found" : "Ready to find a hero?"}
                            </h3>
                            <p className="text-gray-500 font-medium max-w-xs mx-auto leading-relaxed">
                                {hasSearched 
                                    ? "Try adjusting your filters or searching in a nearby district." 
                                    : "Select a blood group and location to see available donors."}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {donors.map((donor) => (
                            <div key={donor._id} className="group bg-white shadow-[0_15px_40px_rgba(0,0,0,0.03)] rounded-[2.5rem] border border-gray-50 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex justify-center mb-6 relative">
                                    <div className="w-24 h-24 rounded-[2rem] bg-red-50 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                                        {donor.photoURL ? (
                                            <img src={donor.photoURL} alt={donor.displayName} className="w-full h-full object-cover" />
                                        ) : (
                                            <User size={40} className="text-[#ef233c]" />
                                        )}
                                    </div>
                                    <div className="absolute -bottom-2 right-1/2 translate-x-12 w-10 h-10 bg-[#ef233c] rounded-xl flex items-center justify-center text-white font-black shadow-lg border-2 border-white">
                                        {donor.bloodGroup}
                                    </div>
                                </div>

                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight mb-1 truncate">
                                        {donor.displayName || donor.name}
                                    </h3>
                                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">{donor.gender || "Donor"}</p>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover/item:bg-red-50 group-hover/item:text-[#ef233c] transition-colors">
                                            <MapPin size={18} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Location</p>
                                            <p className="text-sm font-bold text-gray-700 truncate">{donor.upazila}, {donor.district}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group/item">
                                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover/item:bg-red-50 group-hover/item:text-[#ef233c] transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Email Address</p>
                                            <p className="text-sm font-bold text-gray-700 truncate">{donor.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={() => setSelectedDonor(donor)}
                                    className="w-full cursor-pointer bg-emerald-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-[#ef233c] transition-all shadow-xl group-hover:shadow-red-200"
                                >
                                    Contact Now
                                    <Heart size={16} fill="white" className="animate-pulse ms-2" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- CONTACT POPUP MODAL --- */}
            {selectedDonor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDonor(null)}></div>
                    <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
                        <div className="absolute top-6 right-6">
                            <button onClick={() => setSelectedDonor(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="pt-12 pb-8 px-8 text-center">
                            <div className="w-20 h-20 mx-auto bg-red-50 rounded-3xl flex items-center justify-center text-[#ef233c] mb-6 shadow-inner">
                                <PhoneCall size={36} />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-1">Contact Donor</h2>
                            <p className="text-gray-500 font-medium mb-8 uppercase text-[10px] tracking-widest">{selectedDonor.displayName}</p>
                            
                            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Verified Phone Number</p>
                                <p className="text-3xl font-black text-gray-900 tracking-tighter">
                                    {selectedDonor.phoneNumber || "Not Available"}
                                </p>
                            </div>

                            <a 
                                href={`tel:${selectedDonor.phoneNumber}`}
                                className="flex items-center justify-center gap-3 w-full bg-[#ef233c] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-red-100 hover:bg-[#d90429] transition-all active:scale-95"
                            >
                                <Phone size={20} />
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonorSearch;