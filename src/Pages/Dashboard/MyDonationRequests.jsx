import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  MapPin, 
  Droplet, 
  Eye, 
  Edit3, 
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Loader from "../../Components/Loader";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [status, setStatus] = useState("all");

  const [totalRequest, setTotalRequest] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 10;

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myDonationRequests", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-donation-requests?email=${user?.email}&limit=${limit}&skip=${
          currentPage * limit
        }`
      );

      setTotalRequest(res.data.total);
      const page = Math.ceil(res.data.total / limit);
      setTotalPage(page);
      return res.data.data;
    },
  });

  // Client-side filtering
  const filteredRequests =
    status === "all"
      ? requests
      : requests.filter((s) => s.donationStatus === status);

  const handleDone = (id) => {
    const updateInfo = { donationStatus: "done" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Donation marked as successful!");
        refetch();
      }
    });
  };

  const handleCancel = (id) => {
    const updateInfo = { donationStatus: "cancelled" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.warn("Donation request marked as cancelled.");
        refetch();
      }
    });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#ef233c]"><Loader></Loader></div>;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans pb-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-none">
              My <span className="text-[#ef233c]">Donation Requests</span>
            </h2>
            <p className="text-gray-500 font-medium mt-2">Manage and track your blood donation posts.</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64 group">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-gray-600 outline-none hover:border-[#ef233c] transition-all appearance-none cursor-pointer"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
                </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2.5rem] border border-gray-300 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <th className="px-6 py-6 text-center">#</th>
                  <th className="px-6 py-6">Recipient Info</th>
                  <th className="px-6 py-6">Location</th>
                  <th className="px-6 py-6 text-center">Group</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-6 py-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredRequests.map((r, i) => (
                  <tr key={r._id} className="hover:bg-gray-50/50 transition-colors group">
                    <th className="px-6 py-5 text-center font-bold text-gray-300">
                      {(currentPage * limit + i + 1).toString().padStart(2, '0')}
                    </th>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <p className="font-black text-gray-900 text-sm truncate max-w-[150px]">
                          {r.recipientName}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 flex items-center gap-1 uppercase">
                          Posted by You
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                        <MapPin size={14} className="text-[#ef233c]" />
                        {r.recipientDistrict}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center justify-center w-9 h-9 bg-red-50 text-[#ef233c] rounded-xl font-black shadow-sm">
                        {r.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        r.donationStatus === 'done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        r.donationStatus === 'cancelled' ? 'bg-gray-50 text-gray-400 border-gray-100' :
                        r.donationStatus === 'inprogress' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                        'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                        <div className={`w-1 h-1 rounded-full ${r.donationStatus === 'done' ? 'bg-emerald-500' : 'bg-orange-400'}`} />
                        {r.donationStatus}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center">
                        <div className="dropdown dropdown-left dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-xs text-gray-400 hover:text-red-500">
                                <MoreVertical size={18} />
                            </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-2xl border border-gray-50 w-48 space-y-1">
                                <li>
                                    <Link to={`/dashboard/donation-request-details/${r._id}`} className="flex items-center gap-3 font-bold text-gray-600 py-3">
                                        <Eye size={16} className="text-blue-500" /> View Details
                                    </Link>
                                </li>
                                {r.donationStatus === "inprogress" && (
                                    <>
                                        <li>
                                            <button onClick={() => handleDone(r._id)} className="flex items-center gap-3 font-bold text-gray-600 py-3">
                                                <CheckCircle size={16} className="text-emerald-500" /> Mark as Done
                                            </button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleCancel(r._id)} className="flex items-center gap-3 font-bold text-gray-600 py-3">
                                                <XCircle size={16} className="text-[#ef233c]" /> Cancel
                                            </button>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <Link to={`/dashboard/manage-donation-request/${r._id}`} className="flex items-center gap-3 font-bold text-gray-600 py-3 border-t border-gray-50">
                                        <Edit3 size={16} className="text-orange-500" /> Edit Request
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-2">
          <p className="text-sm font-bold text-gray-400">
              Showing <span className="text-gray-900">{currentPage * limit + 1}</span> to <span className="text-gray-900">{Math.min((currentPage + 1) * limit, totalRequest)}</span> of <span className="text-gray-900">{totalRequest}</span> results
          </p>

          <div className="flex items-center gap-2">
            <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold disabled:opacity-30 hover:border-[#ef233c] transition-all shadow-sm"
            >
                <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-1">
                {[...Array(totalPage).keys()].map((i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                    i === currentPage 
                        ? "bg-[#ef233c] text-white shadow-lg shadow-red-100" 
                        : "bg-white text-gray-500 border border-gray-100 hover:border-[#ef233c]"
                    }`}
                >
                    {i + 1}
                </button>
                ))}
            </div>

            <button
                disabled={currentPage === totalPage - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 font-bold disabled:opacity-30 hover:border-[#ef233c] transition-all shadow-sm"
            >
                <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;