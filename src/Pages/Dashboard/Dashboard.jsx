import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";
import { 
  CircleDollarSign, 
  HeartPulse, 
  Syringe, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Calendar,
  MoreVertical,
  Users,
  TrendingUp,
  Droplet
} from "lucide-react";
import Loader from "../../Components/Loader";

const Dashboard = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: userData = {} } = useQuery({
    queryKey: ["users-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-profile?email=${user?.email}`);
      return res.data;
    },
  });

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard?email=${user?.email}`);
      return res.data;
    },
  });

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
        toast.warn("Donation marked as cancelled.");
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#gray",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-requests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Request removed.", "success");
            refetch();
          }
        });
      }
    });
  };

  // Stats Data
  const { data: donors = [] } = useQuery({
    queryKey: ["donor"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=donor`);
      return res.data;
    },
  });

  const { data: totalReq = [] } = useQuery({
    queryKey: ["total-donation"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-donation");
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  const totalAmount = payments.reduce((sum, i) => sum + i.amount, 0);


  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold text-[#ef233c]"><Loader></Loader></div>;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 font-sans">
      {/* Welcome Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">
          Hello, <span className="text-[#ef233c]">{userData?.displayName}</span>!
        </h1>
        <p className="text-gray-500 font-medium mt-2">Manage your activities and help save lives today.</p>
      </div>

      {/* --- DONOR VIEW --- */}
      {role === "donor" && (
        <div className="space-y-6">
          {requests.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
               <Syringe size={48} className="text-gray-200 mb-4" />
               <h2 className="text-2xl font-black text-gray-400">No Recent Requests</h2>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem]  border-gray-100 overflow-hidden min-h-[400px] shadow-xl border-2">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse shadow-xl">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                      <th className="px-6 py-6 text-center">#</th>
                      <th className="px-6 py-6">Participants</th>
                      <th className="px-6 py-6">Location</th>
                      <th className="px-6 py-6">Schedule</th>
                      <th className="px-6 py-6">Need</th>
                      <th className="px-6 py-6">Status</th>
                      <th className="px-6 py-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {requests?.map((r, i) => (
                      <tr key={r._id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-5 text-center font-bold text-gray-300">{(i + 1).toString().padStart(2, '0')}</td>
                        
                        <td className="px-6 py-5">
                          <div className="space-y-1">
                            <p className="font-black text-gray-900 text-sm flex items-center gap-2">
                              {r.recipientName} <span className="text-[10px] text-gray-300">Recipient</span>
                            </p>
                            <p className="text-xs font-bold text-gray-400 italic">Requested by {r.requesterName}</p>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm font-bold text-gray-600">
                            <MapPin size={14} className="text-[#ef233c]" />
                            {r.recipientUpazila}, {r.recipientDistrict}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <div className="space-y-1 text-xs font-bold text-gray-500">
                            <div className="flex items-center gap-1.5"><Calendar size={12} /> {r.donationDate}</div>
                            <div className="flex items-center gap-1.5"><Clock size={12} /> {r.donationTime}</div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-red-50 text-[#ef233c] rounded-xl font-black shadow-sm">
                            {r.bloodGroup}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            r.donationStatus === 'done' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            r.donationStatus === 'cancelled' ? 'bg-gray-100 text-gray-500 border-gray-200' :
                            'bg-orange-50 text-orange-600 border-orange-100'
                          }`}>
                            <div className={`w-1 h-1 rounded-full ${r.donationStatus === 'done' ? 'bg-emerald-500' : 'bg-orange-400'}`} />
                            {r.donationStatus}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-center">
                          {/* --- Action Dropdown --- */}
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
                                    <Link to={`/dashboard/manage-donation-request/${r._id}`} className="flex items-center gap-3 font-bold text-gray-600 py-3">
                                      <Edit3 size={16} className="text-orange-500" /> Edit Request
                                    </Link>
                                  </li>
                                  <li>
                                    <button onClick={() => handleDone(r._id)} className="flex items-center gap-3 font-bold text-gray-600 py-3">
                                      <CheckCircle size={16} className="text-emerald-500" /> Mark as Done
                                    </button>
                                  </li>
                                  <li>
                                    <button onClick={() => handleCancel(r._id)} className="flex items-center gap-3 font-bold text-gray-600 py-3">
                                      <XCircle size={16} className="text-red-400" /> Cancel Request
                                    </button>
                                  </li>
                                </>
                              )}
                              
                              <li className="border-t border-gray-50 pt-1">
                                <button onClick={() => handleDelete(r._id)} className="flex items-center gap-3 font-bold text-red-500 py-3 hover:bg-red-50">
                                  <Trash2 size={16} /> Delete
                                </button>
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
          )}
          <div className="flex justify-center mt-8">
            <Link to="/dashboard/my-donation-requests" className="px-8 py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl shadow-gray-200 hover:bg-[#ef233c] transition-all active:scale-95 text-sm uppercase tracking-widest">
              View All Requests
            </Link>
          </div>
        </div>
      )}

      {/* --- ADMIN / VOLUNTEER VIEW --- */}
      {(role === "admin" || role === "volunteer") && (
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
       {/* Total Donors Card */}
       <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative">
         <div className="flex justify-between items-start mb-6">
           <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
             <Users size={24} />
           </div>
           <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold">
             <TrendingUp size={16} /> +12%
           </div>
         </div>
         <div className="space-y-1">
           <p className="text-gray-500 font-bold text-sm">Total Donors</p>
           <h2 className="text-4xl font-black text-gray-900 tracking-tight">
             {donors.length.toLocaleString()}
           </h2>
         </div>
       </div>
     
       {/* Total Funding Card */}
       <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative">
         <div className="flex justify-between items-start mb-6">
           <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600">
             <CircleDollarSign size={24} />
           </div>
           <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold">
             <TrendingUp size={16} /> +5%
           </div>
         </div>
         <div className="space-y-1">
           <p className="text-gray-500 font-bold text-sm">Total Funding</p>
           <h2 className="text-4xl font-black text-gray-900 tracking-tight">
             ${totalAmount.toLocaleString()}
           </h2>
         </div>
       </div>
     
       {/* Blood Requests Card */}
       <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 relative">
         <div className="flex justify-between items-start mb-6">
           <div className="bg-red-50 p-4 rounded-xl text-[#ef233c]">
             <Droplet size={24} fill="currentColor" />
           </div>
           <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold">
             <TrendingUp size={16} /> +8%
           </div>
         </div>
         <div className="space-y-1">
           <p className="text-gray-500 font-bold text-sm">Blood Requests</p>
           <h2 className="text-4xl font-black text-gray-900 tracking-tight">
             {totalReq.length}
           </h2>
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default Dashboard;