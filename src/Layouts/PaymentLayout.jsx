import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const PaymentLayout = () => {
  return (
    <div className=" flex flex-col min-h-screen">
      <div>
        <Navbar></Navbar>
      </div>
      <div className=" flex-1">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default PaymentLayout;
