import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  //   console.log(session_id);

  useEffect(() => {
    if (session_id) {
      axiosSecure
        .post(`payment-success?session_id=${session_id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success("payment successful");
          }
        });
    }
  }, [session_id, axiosSecure]);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold text-red-400 text-center">
        Payment Successfull Thaanks
      </h1>
    </div>
  );
};

export default PaymentSuccess;
