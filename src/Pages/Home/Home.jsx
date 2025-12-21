import React from "react";
import Banner from "../../Components/Banner";
import Featured from "../../Components/Featured";
import ContactUs from "../../Components/ContactUs";
import Banner2 from "../../Components/Banner2";

const Home = () => {
  return (
    <div>
      {/* <Banner></Banner> */}
      <Banner2></Banner2>
      <Featured></Featured>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
