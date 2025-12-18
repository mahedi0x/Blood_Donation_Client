import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [status, setStatus] = useState("all");

  const [totalRequest, setTotalRequest] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;

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
  if (isLoading) return <p>Loading...</p>;
  console.log(requests, "aaaaaaaaaaaa", totalRequest, totalPage);

  //এখানে ফিলটার করা হচ্ছে (with Status)
  const filteredRequests =
    status === "all"
      ? requests
      : requests.filter((s) => s.donationStatus === status);

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

  return (
    <div>
      <div className=" w-full px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-semibold mb-4 text-red-600">
            My Donation Requests
          </h2>
          {/* filter by status */}
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending Data</option>
            <option value="inprogress">Inprogress Data</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="overflow-x-auto py-5">
          <table className="table table-zebra">
            {/* head */}
            <thead className="bg-red-300">
              <tr>
                <th>#</th>
                <th>Requester</th>
                <th>Requester Email</th>
                <th>RecipientName</th>
                <th>RecipientDistrict</th>
                <th>Needed Group</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="bg-red-200">
              {filteredRequests.map((r, i) => (
                <tr key={i}>
                  <th className="text-lg font-semibold text-gray-600">
                    {i + 1}
                  </th>
                  <td className="text-lg font-semibold text-gray-600">
                    {r.requesterName}
                  </td>
                  <td className="text-lg font-semibold text-gray-600">
                    {r.requesterEmail}
                  </td>
                  <td className="text-lg font-semibold text-gray-600">
                    {r.recipientName}
                  </td>
                  <td className="text-lg font-semibold text-gray-600">
                    {r.recipientDistrict}
                  </td>
                  <td className="text-lg font-semibold text-gray-600">
                    {r.bloodGroup}
                  </td>
                  <td
                    className={`text-lg font-semibold text-gray-600 ${
                      r.donationStatus === "inprogress" ||
                      r.donationStatus === "done"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {r.donationStatus}
                  </td>
                  {r.donationStatus === "inprogress" && (
                    <td className="flex">
                      <button
                        onClick={() => handleDone(r._id)}
                        className="btn btn-primary"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleCancel(r._id)}
                        className="btn btn-warning ml-2"
                      >
                        Cancel
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="fixed bottom-0 left-0 w-full py-3 flex justify-center gap-2 shadow-lg z-50">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn"
        >
          Previous
        </button>
        {[...Array(totalPage).keys()].map((i) => (
          <button
            onClick={() => setCurrentPage(i)}
            className={`btn py-2 px-4 ${i === currentPage && "btn-primary"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPage - 1}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonationRequests;
