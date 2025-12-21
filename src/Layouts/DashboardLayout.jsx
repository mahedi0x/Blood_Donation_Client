import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { MdBloodtype, MdDashboard, MdOutlineHome } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../Hooks/useRole";
import { GiHumanTarget } from "react-icons/gi";
import { BiDonateBlood } from "react-icons/bi";
import { IoMdCreate, IoMdMenu } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";

const DashboardLayout = () => {
  const { user, signOutUser } = useAuth();
  const { role } = useRole();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const navLinkStyles = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-bold group ${
      isActive
        ? "bg-[#ef233c] text-white shadow-lg shadow-red-100"
        : "text-gray-500 hover:bg-red-50 hover:text-[#ef233c]"
    }`;

  return (
    <div className="drawer lg:drawer-open bg-[#FDFDFD]">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen">
        {/* --- Modern Top Navbar --- */}
        <nav className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <IoMdMenu size={24} />
            </label>
            <div className="hidden flex-col md:flex">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                 Dashboard
              </h1>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                Welcome back, {role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick action buttons could go here */}
            <div className="flex items-center justify-center text-[#ef233c] font-black ">
              {role?.toUpperCase()}
            </div>
          </div>
        </nav>

        {/* --- Main Page Content --- */}
        <main className="flex-1 p-2 lg:p-2 animate-in fade-in duration-500">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* --- Sidebar Redesign --- */}
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="min-h-full w-60 border-r border-gray-100 bg-white p-6 flex flex-col">
          {/* Logo / Brand */}
          <div className="mb-10">
            <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-1 group">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-50 transition-transform group-hover:rotate-12">
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl md:text-3xl font-black tracking-tighter text-gray-900">
              <span className="text-[#ef233c]">Blood</span>Bridge
            </h2>
          </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 flex-1">
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
              Main Menu
            </p>

            <NavLink to="/dashboard" end className={navLinkStyles}>
              <MdDashboard size={22} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/dashboard/my-profile" className={navLinkStyles}>
              <GiHumanTarget size={22} />
              <span>My Profile</span>
            </NavLink>

            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-4 mb-2">
              Donations
            </p>

            <NavLink
              to="/dashboard/my-donation-requests"
              className={navLinkStyles}
            >
              <BiDonateBlood size={22} />
              <span>My Requests</span>
            </NavLink>

            <NavLink
              to="/dashboard/create-donation-request"
              className={navLinkStyles}
            >
              <IoMdCreate size={22} />
              <span>Create Request</span>
            </NavLink>

            {/* Admin / Volunteer Role Based UI */}
            {(role === "admin" || role === "volunteer") && (
              <>
                <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-4 mb-2">
                  Management
                </p>

                {role === "admin" && (
                  <NavLink to="/dashboard/all-users" className={navLinkStyles}>
                    <HiUserGroup size={22} />
                    <span>All Users</span>
                  </NavLink>
                )}

                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={navLinkStyles}
                >
                  <MdBloodtype size={22} />
                  <span>Public Requests</span>
                </NavLink>
              </>
            )}
          </div>

          {/* Logout Section */}

          <div className="mt-auto py-3">
            <div className="flex items-center gap-3 p-1 rounded-2xl bg-gray-50">
              <img
                src={user?.photoURL}
                alt="User Avatar"
                className="h-10 w-10 rounded-full bg-red-50 object-cover"
              />

              <div className="flex-1">
                <h4 className="text-base font-semibold text-gray-800">
                  Admin User
                </h4>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="mt-4 flex cursor-pointer w-full items-center justify-center gap-2 px-4 py-3
               rounded-xl font-semibold text-[#ef233c] bg-red-100
               hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              <LuLogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
