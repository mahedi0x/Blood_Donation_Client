import React from "react";
import logo from "../assets/logo.jpg";

const Footer = () => {
  return (
    <footer className=" relative bg-gradient-to-r from-red-950/90 via-red-900/85 to-red-800/80">
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto relative z-10 container px-6 pt-16 pb-8  text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 ">
          {/* Brand */}
          <div className="lg:col-span-4 space-y-6 text-white">
            <a className="flex items-center space-x-2 group" href="#">
              <div className="text-primary">
                <img src={logo} alt="" className="w-20 rounded-2xl" />
              </div>
              <span className="text-5xl font-bold text-white tracking-tight">
                Red Love
              </span>
            </a>
            <p className="text-sm leading-relaxed  dark:text-gray-300 pr-4">
              RedLove: Streamlining blood donation with easy registration,
              login, and advanced search. Connect quickly, donate easily, save
              lives.
            </p>
          </div>

          {/* Pages */}
          <div className="lg:col-span-2 space-y-6 text-white">
            <h3 className="text-lg font-bold dark:text-white relative inline-block pb-2">
              Pages
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-white rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm text-white">
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Volunteers
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Campaign
                </a>
              </li>
              <li>
                <a
                  className="text-white hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Important */}
          <div className="lg:col-span-2 space-y-6 text-white">
            <h3 className="text-lg font-bold  dark:text-white relative inline-block pb-2">
              Important
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-white rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Volunteers
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Campaign
                </a>
              </li>
              <li>
                <a
                  className="hover:text-primary hover:pl-1 transition-all duration-300 block"
                  href="#"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-4 space-y-6 text-white">
            <h3 className="text-lg font-bold  dark:text-white relative inline-block pb-2">
              Contact Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-white rounded-full"></span>
            </h3>
            <form className="relative group">
              <input
                className="w-full bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-white/20 rounded pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 dark:placeholder-gray-400 transition-colors"
                placeholder="Email"
                type="email"
              />
              <button
                className="absolute right-1 top-1 bottom-1 bg-red-600 text-white rounded px-3 flex items-center justify-center transition-colors shadow-lg"
                type="button"
              >
                <span className="material-icons text-sm">send</span>
              </button>
            </form>
            <div className="flex items-center space-x-3 pt-2">
              <a
                className="w-10 h-10 bg-red-600 text-white rounded flex items-center justify-center transition-transform transform hover:-translate-y-1 shadow-md"
                href="#"
              >
                <span className="font-bold text-lg">F</span>
              </a>
              <a
                className="w-10 h-10  bg-red-600 text-white rounded flex items-center justify-center transition-transform transform hover:-translate-y-1 shadow-md"
                href="#"
              >
                <span className="material-icons text-lg">X</span>
              </a>
              <a
                className="w-10 h-10 bg-red-600 text-white rounded flex items-center justify-center transition-transform transform hover:-translate-y-1 shadow-md"
                href="#"
              >
                <span className="material-icons text-lg">L</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-white/10 text-center text-xs text-white">
          <p>
            Copyright © 2025
            <span className=" font-medium"> Soheb Akhter </span>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
