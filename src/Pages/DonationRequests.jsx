import React from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const DonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: pendingData = [], isLoading } = useQuery({
    queryKey: ["donationRequests", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donation-requests?status=pending");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading .......................................</p>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl text-center text-red-400 font-semibold p-5">
        Pending Donation Requests
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-red-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>fullAddress</th>
              <th>bloodGroup</th>
              <th>donationDate</th>
              <th>donationTime</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-red-100">
            {pendingData.map((pending, i) => (
              <tr key={i}>
                <th className="text-xl font-semibold text-gray-600">{i + 1}</th>
                <td className="text-xl font-semibold text-gray-600">
                  {pending.recipientName}
                </td>
                <td className="text-xl font-semibold text-gray-600">
                  {pending.fullAddress}
                </td>
                <td className="text-xl font-semibold text-gray-600">
                  {pending.bloodGroup}
                </td>
                <td className="text-xl font-semibold text-gray-600">
                  {pending.donationDate}
                </td>
                <td className="text-xl font-semibold text-gray-600">
                  {pending.donationTime}
                </td>
                <td className="text-xl font-semibold text-gray-600">
                  {pending.donationStatus}
                </td>
                <td className="btn bg-red-500 text-white btn-xs">
                  <Link
                    to={`/dashboard/donation-request-details/${pending._id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequests;
