import React from "react";
import donateImg from "../assets/blood-donation-3.png";
import { FaShieldAlt, FaUserShield } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

const About = () => {
  return (
    <section className=" text-gray-800 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 mt-5">
          About <span className="text-red-600">Red Love</span>
        </h1>

        <p className="text-lg leading-8 mb-6 text-center">
          RedLove is a community-driven platform dedicated to connecting blood
          donors with people in urgent need. We also provide a trusted way for
          users to contribute small funds to support medical emergencies,
          transportation, and social wellness projects.
        </p>
      </div>

      <div className="bg-gradient-to-b from-red-200 to-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-5 py-20">
          <div>
            <img src={donateImg} alt="" />
          </div>
          <div>
            <div className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-4xl font-semibold">About RedLove</h1>
                <p>
                  Red Love is a community-driven blood donation platform
                  dedicated to saving lives by connecting blood donors with
                  patients in need. It enables users to create and manage blood
                  donation requests, view real-time details, and respond quickly
                  during emergencies. With a simple and user-friendly design,
                  Red Love aims to make blood donation faster, easier, and more
                  accessible for everyone.
                </p>
              </div>
              <div>
                <div className="flex gap-2">
                  <FaShieldAlt className="text-red-500 text-5xl " />
                  <div>
                    <h1 className="text-2xl font-semibold">
                      All Data is Secured
                    </h1>
                    <p>
                      Your personal and donation-related information is safely
                      stored and protected. Red Love ensures data privacy and
                      security so users can focus on what truly matters—saving
                      lives.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <FaUserShield className="text-red-500 text-5xl " />
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Always Free for All
                    </h1>
                    <p>
                      Red Love is completely free to use for everyone. There are
                      no hidden charges or fees—our mission is to make blood
                      donation accessible, open, and available to all who want
                      to help save lives.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <IoMdLogIn className="text-red-500 text-5xl " />
                  <div>
                    <h1 className="text-2xl font-semibold">
                      Advance Search Feature
                    </h1>
                    <p>
                      Easily find blood donors by selecting blood group,
                      district, and upazila. This advanced search helps you
                      quickly connect with the right donors during emergencies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
