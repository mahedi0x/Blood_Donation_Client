import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import useRole from "../../Hooks/useRole";
import { CircleDollarSign, HeartPulse, Syringe } from "lucide-react";

const Dashboard = () => {
  const { role } = useRole();
  // console.log("this is the role", role);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  //user indevitual data for WELCOMING
  const { data: userData = {} } = useQuery({
    queryKey: ["users-profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users-profile?email=${user?.email}`);
      return res.data;
    },
  });

  // const [page, setPage] = useState(1);
  // const limit = 10;

  const { data: requests = [], refetch } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard?email=${user?.email}`);
      return res.data;
    },
  });
  // console.log("donation requests data test", requests);

  const handleDone = (id) => {
    // Update the donation request status to "done"
    const updateInfo = { donationStatus: "done" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast("Donation request marked as done.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };
  const handleCancel = (id) => {
    // Update the donation request status to "cancelled"
    const updateInfo = { donationStatus: "cancelled" };
    axiosSecure.patch(`/donation-requests/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast("Donation request marked as cancelled.");
        // Optionally, refetch the requests or update the local state
        refetch();
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donation-requests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  //Dashboard এ admin এর অংশ এখানে
  const { data: donors = [] } = useQuery({
    queryKey: ["donor"], //backend theke je data antesi.. sei data Key hisebe bosbe
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
  console.log(totalAmount);

  return (
    <div>
      <h1 className="text-4xl font-normal text-center py-5">
        Hello Welcome
        <span className="text-red-500 font-bold"> {userData?.displayName}</span>
      </h1>
      {/* Dashboard এ donor এর অংশ এখানে  */}
      {role === "donor" && (
        <>
          {requests.length === 0 ? (
            <h1 className="text-5xl text-gray-400 text-center mt-24">
              Nothing Found
            </h1>
          ) : (
            <>
              <div
                className={`overflow-x-auto bg-linear-to-b from-red-300 to-red-100`}
              >
                <table className="table table-zebra">
                  {/* head */}
                  <thead className="bg-red-400 text-white">
                    <tr>
                      <th>#</th>
                      <th>RequesterName</th>

                      <th>RecipientName</th>
                      <th>RecipientDistrict</th>
                      <th>RecipientUpazila</th>
                      <th>Donation Date</th>
                      <th>Donation Time</th>
                      <th>Needed Group</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {requests?.map((r, i) => (
                      <tr key={i}>
                        <th className="font-semibold text-lg text-gray-600">
                          {i + 1}
                        </th>
                        <td className="font-semibold text-lg text-gray-600">
                          {r.requesterName}
                        </td>

                        <td className="font-semibold text-lg text-gray-600">
                          {r.recipientName}
                        </td>
                        <td className="font-semibold text-lg text-gray-600">
                          {r.recipientDistrict}
                        </td>
                        <td className="font-semibold text-lg text-gray-600">
                          {r.recipientUpazila}
                        </td>
                        <td className="font-semibold text-lg text-gray-600">
                          {r.donationDate}
                        </td>
                        <td className="font-semibold text-lg text-gray-600">
                          {r.donationTime}
                        </td>
                        <td className="font-semibold text-lg text-gray-600">
                          {r.bloodGroup}
                        </td>
                        <td className="font-semibold text-lg text-gray-600">
                          {r.donationStatus}
                        </td>
                        {r.donationStatus === "inprogress" && (
                          <td className="flex">
                            <td className="btn btn-neutral">
                              <Link
                                to={`/dashboard/manage-donation-request/${r._id}`}
                              >
                                Edit
                              </Link>
                            </td>
                            <td
                              onClick={() => handleDelete(r._id)}
                              className="btn btn-error"
                            >
                              Delete
                            </td>
                            <td className="btn btn-neutral">
                              <Link
                                to={`/dashboard/donation-request-details/${r._id}`}
                              >
                                View
                              </Link>
                            </td>
                            <td
                              onClick={() => handleDone(r._id)}
                              className="btn btn-primary"
                            >
                              Done
                            </td>
                            <td
                              onClick={() => handleCancel(r._id)}
                              className="btn btn-warning"
                            >
                              Cancel
                            </td>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-center mt-5">
                <Link
                  to="/dashboard/my-donation-requests"
                  className="btn btn-primary "
                >
                  View My All Request
                </Link>
              </div>
            </>
          )}
        </>
      )}

      {/* Dashboard এ admin এর অংশ এখানে  */}
      {(role === "admin" || role === "volunteer") && (
        <div className="flex items-center justify-center gap-10">
          <div className=" flex flex-col justify-center items-center p-10 rounded-2xl shadow-2xl hover:scale-105">
            <div className="bg-red-100 p-2 flex items-center justify-center w-20 rounded-full">
              <HeartPulse className="text-red-600" />
            </div>
            <h2 className="text-7xl font-semibold text-red-600">
              {donors.length}
            </h2>
            <h1 className="text-xl font-semibold text-gray-600">
              Total Donor User
            </h1>
          </div>
          <div className=" flex flex-col justify-center items-center p-10 rounded-2xl shadow-2xl hover:scale-105">
            <div className="bg-red-100 p-2 flex items-center justify-center w-20 rounded-full">
              <CircleDollarSign className="text-red-600" />
            </div>
            <h2 className="text-7xl font-semibold text-red-600">
              ${totalAmount}
            </h2>
            <h1 className="text-xl font-semibold text-gray-600">
              Total Funding
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center p-10 rounded-2xl shadow-2xl hover:scale-105">
            <div className="bg-red-100 p-2 flex items-center justify-center w-20 rounded-full">
              <Syringe className="text-red-600" />
            </div>
            <h2 className="text-7xl font-semibold text-red-600">
              {totalReq.length}
            </h2>
            <h1 className="text-xl font-semibold text-gray-600">
              Total Blood Donation Request
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
