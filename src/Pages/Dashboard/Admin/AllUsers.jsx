import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../../../Hooks/useRole";

const AllUsers = () => {
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: allUser = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-users");
      return res.data;
    },
  });

  const handleBlock = (id) => {
    // Update the user status to "blocked"
    const updateInfo = { status: "blocked" };
    axiosSecure.patch(`/user-status/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.error("User marked as blocked.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleUnBlock = (id) => {
    // Update the user status to "active"
    const updateInfo = { status: "active" };
    axiosSecure.patch(`/user-status/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("User marked as active.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleVolunteer = (id) => {
    // Update the user status to "Volunteer"
    const updateInfo = { role: "volunteer" };
    axiosSecure.patch(`/user-role/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success("User marked as Volunteer.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleAdmin = (id) => {
    // Update the user status to "Admin"
    const updateInfo = { role: "admin" };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/user-role/${id}`, updateInfo).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              title: "Admin",
              text: "User marked as Admin.",
              icon: "success",
            });
            // Optionally, refetch the requests or update the local state
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      {role === "admin" && (
        <>
          <h1 className="text-4xl text-center text-red-400 font-semibold p-5">
            All Users
          </h1>

          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="bg-red-400 text-white">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="bg-red-100 text-lg">
                {allUser.map((u, i) => (
                  <tr>
                    <th>{i + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={u.photoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{u.displayName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td
                      className={`${
                        u.role === "admin" ? "text-green-600" : "text-blue-600"
                      }`}
                    >
                      {u.role}
                    </td>
                    <td
                      className={`${
                        u.status === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {u.status}
                    </td>
                    <th className="flex gap-1">
                      {u.status === "active" && (
                        <button
                          onClick={() => handleBlock(u._id)}
                          className="btn btn-primary btn-xs"
                        >
                          Block
                        </button>
                      )}
                      {u.status === "blocked" && (
                        <button
                          onClick={() => handleUnBlock(u._id)}
                          className="btn btn-primary btn-xs"
                        >
                          Unblock
                        </button>
                      )}
                      {u.role === "admin" || u.role === "donor" ? (
                        <button
                          onClick={() => handleVolunteer(u._id)}
                          className="btn btn-neutral btn-xs"
                        >
                          Make Volunteer
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            handleAdmin(u._id);
                          }}
                          className="btn btn-neutral btn-xs"
                        >
                          Make Admin
                        </button>
                      )}
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;
