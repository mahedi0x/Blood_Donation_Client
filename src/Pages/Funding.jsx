import React, { useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Funding = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();

  const [totalRequest, setTotalRequest] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const limit = 12;

  const { data: payments = [] } = useQuery({
    queryKey: ["all-payments", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-payments?limit=${limit}&skip=${currentPage * limit}`
      );
      setTotalRequest(res.data.total);
      const page = Math.ceil(res.data.total / limit);
      setTotalPage(page);
      return res.data.data;
    },
  });

  console.log(totalRequest);

  const handlePayment = (e) => {
    e.preventDefault();
    const amount = e.target.amount.value;

    const paymentInfo = {
      senderName: user?.displayName,
      senderEmail: user?.email,
      amount: Number(amount),
      parcelName: "Funding Amount",
    };

    axiosSecure.post("/create-checkout-session", paymentInfo).then((res) => {
      window.location.assign(res.data.url);
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-5xl font-medium text-center text-red-400 py-2">
        Funding History
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => modalRef.current.showModal()}
          className="btn bg-red-700 text-white"
        >
          Give Fund
        </button>
      </div>

      <div className="overflow-x-auto mb-24 min-h-10/12">
        <table className="table table-zebra">
          <thead className="bg-red-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="bg-red-100">
            {payments.map((p, i) => (
              <tr key={p._id}>
                <th>{currentPage * limit + i + 1}</th>
                <td>{p.senderName}</td>
                <td>{p.amount}</td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="w-full py-3 flex justify-center gap-2 bg-white shadow-lg">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="btn"
        >
          Previous
        </button>

        {[...Array(totalPage).keys()].map((i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`btn ${i === currentPage ? "btn-primary" : ""}`}
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

      {/* Modal */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Funding Amount</h3>

          <form onSubmit={handlePayment} className="flex gap-2 mt-4">
            <input
              type="number"
              name="amount"
              className="input"
              placeholder="Enter amount"
              required
            />
            <button type="submit" className="btn bg-red-400 text-white">
              Confirm
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Funding;
