import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl text-red-500">Payment Cancelled</h1>
      <Link to="/funding" className="btn btn-primary">
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancelled;
