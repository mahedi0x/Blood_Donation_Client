import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Filter, 
  Mail, 
  MapPin, 
  User, 
  Clock 
} from "lucide-react";
import Loader from "../../../Components/Loader";

const AllDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("all");

  const { data: requests = [], refetch, isLoading } = useQuery({
    queryKey: ["total-donation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation");
      return res.data;
    },
  });

  // Force close DaisyUI dropdowns
  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  const filteredRequests =
    status === "all"
      ? requests
      : requests.filter((s) => s.donationStatus === status);

  const handleDone = (id) => {
    closeDropdown();
    const updateInfo = { donationStatus: "done" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Donation status: Done");
        refetch();
      }
    });
  };

  const handleCancel = (id) => {
    closeDropdown();
    const updateInfo = { donationStatus: "cancelled" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.warn("Donation status: Cancelled");
        refetch();
      }
    });
  };

  if (isLoading) return <div className="p-10 text-center font-black text-[#ef233c]"><Loader></Loader></div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-10 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header & Filter Bar --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className=" px-5">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-none">
              All <span className="text-[#ef233c]">Donation Requests</span>
            </h2>
            <p className="text-gray-500 font-medium mt-2">Manage public donation activities across the platform.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto border-2 rounded-2xl border-red-600 shadow-xl">
            <div className="relative flex-1 md:w-64 group">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="w-full pl-12 pr-10 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 outline-none focus:border-[#ef233c] focus:ring-4 focus:ring-red-50 transition-all appearance-none cursor-pointer shadow-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <th className="px-8 py-6">#</th>
                  <th className="px-6 py-6">Participants</th>
                  <th className="px-6 py-6">Location</th>
                  <th className="px-6 py-6 text-center">Group</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-8 py-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRequests.map((r, i) => (
                  <tr key={r._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 font-bold text-gray-300">
                      {(i + 1).toString().padStart(2, '0')}
                    </td>
                    
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-black text-gray-900 text-sm">
                          <User size={14} className="text-gray-400" /> {r.recipientName}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                          <Mail size={12} /> {r.requesterEmail}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <MapPin size={14} className="text-[#ef233c]" />
                        {r.recipientDistrict}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-red-50 text-[#ef233c] rounded-xl font-black shadow-sm">
                        {r.bloodGroup}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        r.donationStatus === 'done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        r.donationStatus === 'cancelled' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        r.donationStatus === 'inprogress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${r.donationStatus === 'done' ? 'bg-emerald-500' : r.donationStatus === 'inprogress' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                        {r.donationStatus}
                      </span>
                    </td>

                    <td className="px-8 py-5 text-center">
                      <div className="dropdown dropdown-left dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-xs text-gray-400 hover:text-[#ef233c] transition-colors">
                          <MoreVertical size={20} />
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-2xl border border-gray-50 w-48 space-y-1">
                          <li className="menu-title text-[9px] font-black uppercase tracking-widest text-gray-300 px-4 py-2 italic border-b border-gray-50 mb-1">
                            Control Panel
                          </li>
                          
                          {r.donationStatus === "inprogress" ? (
                            <>
                              <li>
                                <button onClick={() => handleDone(r._id)} className="flex items-center gap-3 font-bold text-emerald-600 py-3 hover:bg-emerald-50 transition-colors">
                                  <CheckCircle size={16} /> Mark as Done
                                </button>
                              </li>
                              <li>
                                <button onClick={() => handleCancel(r._id)} className="flex items-center gap-3 font-bold text-rose-500 py-3 hover:bg-rose-50 transition-colors">
                                  <XCircle size={16} /> Mark as Cancel
                                </button>
                              </li>
                            </>
                          ) : (
                            <li className="px-4 py-3 text-[11px] font-bold text-gray-400 text-center">
                              Status finalized
                            </li>
                          )}
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllDonationRequest;