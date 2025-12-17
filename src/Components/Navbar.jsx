import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests">DonationRequests</NavLink>
      </li>
      {user ? (
        <li>
          <NavLink to="/funding">Funding</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      )}
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="shadow-sm ">
      <div className="max-w-7xl mx-auto navbar bg-base-100 flex flex-col md:flex-row">
        <div className="flex-1 flex items-center">
          <img src={logo} alt="logo" className="w-16 rounded-full" />
          <Link to="/" className="font-semibold text-red-600 text-5xl">
            Red Love
          </Link>
        </div>
        <div className="flex gap-2">
          <ul className="flex items-center gap-2 font-semibold text-xl">
            {links}
          </ul>
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    <button onClick={handleSignOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <ul>
              <li className="flex items-center">
                <Link
                  to="/login"
                  className="btn bg-red-600 text-white font-semibold text-xl"
                >
                  <CgProfile className="bg-red-600" />
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
