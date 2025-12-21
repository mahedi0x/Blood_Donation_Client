import React, { useRef, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Receipt, CreditCard, ChevronLeft, ChevronRight, Lock } from "lucide-react";

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

  // Helper to get initials for the avatar
  const getInitials = (name) => {
    return name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "AN";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-evenly items-center mb-10 gap-6">
          <div className="text-center md:text-left items-center">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Funding <span className="text-[#ef233c]">History</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">Manage and track your contributions to the community.</p>
          </div>
          <button
            onClick={() => modalRef.current.showModal()}
            className="group flex items-center gap-2 px-8 py-4 bg-[#ef233c] text-white font-black rounded-2xl shadow-lg shadow-red-100 hover:bg-[#d90429] transition-all active:scale-95"
          >
            <CreditCard size={20} />
            Give Fund
          </button>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
                  <th className="px-8 py-6">Donor</th>
                  <th className="px-6 py-6">Transaction ID</th>
                  <th className="px-6 py-6">Date</th>
                  <th className="px-6 py-6 text-right">Amount</th>
                  <th className="px-6 py-6 text-center">Status</th>
                  <th className="px-8 py-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs border border-gray-200">
                          {getInitials(p.senderName)}
                        </div>
                        <div>
                          <p className="font-black text-gray-900 leading-none">{p.senderName}</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Member</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <code className="text-xs font-bold text-gray-400 font-mono bg-gray-50 px-2 py-1 rounded">
                        #{p.transactionId?.slice(-8).toUpperCase()}
                      </code>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm font-bold text-gray-600">
                        {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-right font-black text-gray-900 text-lg">
                      ${p.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        p.paymentStatus === 'paid' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                          : 'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${p.paymentStatus === 'paid' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                        {p.paymentStatus === 'paid' ? 'Success' : 'Pending'}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <button className="p-2 text-gray-300 hover:text-[#ef233c] hover:bg-red-50 rounded-lg transition-all">
                        <Receipt size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-bold text-gray-400">
              Showing <span className="text-gray-900">{currentPage * limit + 1}</span> to <span className="text-gray-900">{Math.min((currentPage + 1) * limit, totalRequest)}</span> of <span className="text-gray-900">{totalRequest}</span> results
            </p>
            
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-2 rounded-xl border border-gray-200 bg-white text-gray-500 disabled:opacity-30 hover:border-red-200 transition-all shadow-sm"
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
                        : "bg-white text-gray-500 border border-gray-100 hover:border-red-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={currentPage === totalPage - 1}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-2 rounded-xl border border-gray-200 bg-white text-gray-500 disabled:opacity-30 hover:border-red-200 transition-all shadow-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Secure Message */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs font-bold">
          <Lock size={14} />
          <span>Payments secured by Stripe</span>
        </div>
      </div>

      {/* Modal - Redesigned */}
      <dialog ref={modalRef} className="modal modal-middle">
        <div className="modal-box rounded-[2.5rem] p-10 max-w-md bg-white">
          <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2 text-center">Make a Contribution</h3>
          <p className="text-gray-500 text-center text-sm font-medium mb-8">Enter the amount you wish to donate to support our lifesaving operations.</p>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xl">$</span>
              <input
                type="number"
                name="amount"
                className="w-full pl-10 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-gray-900 focus:ring-4 focus:ring-red-50 focus:border-[#ef233c] outline-none transition-all text-xl"
                placeholder="0.00"
                required
              />
            </div>
            <button type="submit" className="w-full bg-[#ef233c] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#d90429] shadow-xl shadow-red-100 transition-all active:scale-95">
              Confirm & Pay
            </button>
          </form>

          <div className="mt-4">
            <form method="dialog">
              <button className="w-full text-gray-400 font-bold text-sm hover:text-gray-600 transition-colors">Maybe later</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-gray-900/40 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Funding;