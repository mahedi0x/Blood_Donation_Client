import React from "react";
import Banner from "../../Components/Banner";
import Featured from "../../Components/Featured";
import ContactUs from "../../Components/ContactUs";
import Banner2 from "../../Components/Banner2";
import HowItWorks from "../../Components/HowItWorks";
import Testimonials from "../../Components/Testimonials";
import UrgentRequests from "../../Components/UrgentRequests";

const Home = () => {
  return (
    <div>
      {/* <Banner></Banner> */}
      <Banner2></Banner2>
      <HowItWorks></HowItWorks>
      <UrgentRequests></UrgentRequests>
      <Testimonials></Testimonials>
      {/* <Featured></Featured> */}
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
