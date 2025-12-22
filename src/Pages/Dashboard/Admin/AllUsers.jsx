import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";
import { 
  ShieldCheck, 
  ShieldAlert, 
  UserCog, 
  UserMinus, 
  UserPlus, 
  MoreVertical,
  Mail,
  UserCheck
} from "lucide-react";
import Loader from "../../../Components/Loader";

const AllUsers = () => {
  const { role: currentUserRole } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: allUser = [], refetch, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  // Helper to force close DaisyUI dropdowns
  const closeDropdown = () => {
    const elem = document.activeElement;
    if (elem) {
      elem.blur();
    }
  };

  const handleBlock = (id) => {
    closeDropdown();
    const updateInfo = { status: "blocked" };
    axiosSecure.patch(`/user-status/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.error("User account restricted.");
        refetch();
      }
    });
  };

  const handleUnBlock = (id) => {
    closeDropdown();
    const updateInfo = { status: "active" };
    axiosSecure.patch(`/user-status/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("User account reactivated.");
        refetch();
      }
    });
  };

  const handleVolunteer = (id) => {
    closeDropdown();
    const updateInfo = { role: "volunteer" };
    axiosSecure.patch(`/user-role/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("Assigned Volunteer role.");
        refetch();
      }
    });
  };

  const handleAdmin = (id) => {
    closeDropdown();
    const updateInfo = { role: "admin" };
    Swal.fire({
      title: "Elevate to Admin?",
      text: "This user will have full access to dashboard controls.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef233c",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user-role/${id}`, updateInfo).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire("Success", "User promoted to Admin.", "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <div className="p-10 text-center font-black text-[#ef233c]"><Loader></Loader></div>;

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-10 px-4 md:px-8">
      {currentUserRole === "admin" && (
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              User <span className="text-[#ef233c]">Management</span>
            </h1>
            <p className="text-gray-500 font-medium mt-2">Oversee community roles, statuses, and permissions.</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <th className="px-8 py-6">#</th>
                    <th className="px-6 py-6">User Profile</th>
                    <th className="px-6 py-6">Email Address</th>
                    <th className="px-6 py-6">Current Role</th>
                    <th className="px-6 py-6">Status</th>
                    <th className="px-8 py-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {allUser.map((u, i) => (
                    // KEY FIXED: Use u._id instead of index i
                    <tr key={u._id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5 font-bold text-gray-300">{(i + 1).toString().padStart(2, '0')}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl border-2 border-white shadow-md overflow-hidden bg-gray-100">
                            <img src={u.photoURL} alt={u.displayName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-black text-gray-900 tracking-tight">{u.displayName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                          <Mail size={14} className="text-gray-300" />
                          {u.email}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          u.role === "admin" 
                            ? "bg-purple-50 text-purple-600 border-purple-100" 
                            : u.role === "volunteer" 
                            ? "bg-blue-50 text-blue-600 border-blue-100" 
                            : "bg-gray-50 text-gray-500 border-gray-100"
                        }`}>
                          {u.role}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          u.status === "active" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${u.status === "active" ? "bg-emerald-500" : "bg-rose-500"}`} />
                          {u.status}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="dropdown dropdown-left dropdown-end">
                          <label tabIndex={0} className="btn btn-ghost btn-xs text-gray-400 hover:text-[#ef233c]">
                            <MoreVertical size={20} />
                          </label>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white rounded-2xl border border-gray-50 w-52 space-y-1 mt-2">
                            {u.status === "active" ? (
                              <li>
                                <button onClick={() => handleBlock(u._id)} className="flex items-center gap-3 font-bold text-rose-500 py-3">
                                  <ShieldAlert size={16} /> Block User
                                </button>
                              </li>
                            ) : (
                              <li>
                                <button onClick={() => handleUnBlock(u._id)} className="flex items-center gap-3 font-bold text-emerald-500 py-3">
                                  <ShieldCheck size={16} /> Unblock User
                                </button>
                              </li>
                            )}

                            <li className="border-t border-gray-50 my-1 pt-1"></li>

                            {u.role === "admin" || u.role === "donor" ? (
                              <li>
                                <button onClick={() => handleVolunteer(u._id)} className="flex items-center gap-3 font-bold text-blue-500 py-3">
                                  <UserPlus size={16} /> Make Volunteer
                                </button>
                              </li>
                            ) : (
                              <li>
                                <button onClick={() => handleAdmin(u._id)} className="flex items-center gap-3 font-bold text-[#ef233c] py-3">
                                  <UserCheck size={16} /> Make Admin
                                </button>
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
      )}
    </div>
  );
};

export default AllUsers;