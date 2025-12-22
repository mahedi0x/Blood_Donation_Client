import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { CheckCircle2, Home, Receipt, Heart, ArrowRight } from "lucide-react";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);

  // FIX FOR DOUBLE PAYMENTS: Prevents React 18 Strict Mode from firing twice
  const hasCalledAPI = useRef(false);

  useEffect(() => {
    if (session_id && !hasCalledAPI.current) {
      hasCalledAPI.current = true; // Lock the execution

      axiosSecure
        .post(`payment-success?session_id=${session_id}`)
        .then((res) => {
          // res.data now contains the full object from the backend fix above
          setPaymentInfo(res.data);
          
          if (res.data._id || res.data.insertedId) {
            toast.success("Contribution recorded. Thank you!");
          }
        })
        .catch((err) => {
          console.error("Verification Error:", err);
          toast.error("Could not verify payment details.");
        })
        .finally(() => setLoading(false));
    }
  }, [session_id, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD]">
        <div className="relative w-20 h-20 mb-6">
          <div className="absolute inset-0 bg-[#ef233c] rounded-full animate-ping opacity-20"></div>
          <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border border-red-50">
            <Heart size={32} className="text-[#ef233c] animate-pulse fill-current" />
          </div>
        </div>
        <p className="font-black text-gray-400 uppercase tracking-[0.3em] text-[10px]">Processing...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-20 px-4 font-sans flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-gray-100 text-center p-10 md:p-16">
        
        <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">
          Payment <span className="text-[#ef233c]">Successful!</span>
        </h1>
        
        <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10">
          Your donation has been securely processed. We appreciate your support for 
          <span className="text-gray-900 font-bold italic"> BloodBridge</span>.
        </p>

        {/* --- Transaction Detail Card --- */}
        {paymentInfo ? (
          <div className="bg-gray-50 rounded-[2rem] p-8 mb-10 border border-gray-100 text-left space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center border-b border-gray-200/50 pb-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount Donated</span>
              <span className="text-2xl font-black text-gray-900">${paymentInfo.amount?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction ID</span>
              <span className="text-xs font-mono font-bold text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-100 shadow-sm">
                #{paymentInfo.transactionId?.slice(-12).toUpperCase()}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-10 italic">Retrieving transaction summary...</p>
        )}

        <div className="flex flex-col gap-4">
          <Link 
            to="/funding" 
            className="group w-full py-5 bg-gray-900 text-white font-black rounded-2xl shadow-xl transition-all hover:bg-gray-800 flex items-center justify-center gap-3 active:scale-95"
          >
            <Receipt size={20} />
            View History
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            to="/" 
            className="w-full py-5 bg-white border-2 border-gray-100 text-gray-500 font-black rounded-2xl hover:border-[#ef233c] hover:text-[#ef233c] transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;