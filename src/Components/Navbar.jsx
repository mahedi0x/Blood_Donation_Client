import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import { LogOut, LayoutDashboard, UserCircle, Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for background transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Logout Successful");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const linkStyles = ({ isActive }) =>
    `relative px-3 py-2 transition-all duration-300 text-lg hover:text-[#ef233c] ${
      isActive ? "text-[#ef233c]" : "text-gray-700"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkStyles}>
        Home
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ef233c] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
      </NavLink>
      <NavLink to="/donation-requests" className={linkStyles}>
        Donation Requests
      </NavLink>
      {user ? (
        <NavLink to="/funding" className={linkStyles}>
          Funding
        </NavLink>
      ) : (
        <NavLink to="/about" className={linkStyles}>
          About
        </NavLink>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2" 
          : "bg-white-50 border-b border-gray-200 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-100 transition-transform group-hover:rotate-12">
                <img src={logo} alt="logo" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter text-gray-900">
          <span className="text-[#ef233c]">Blood</span>Bridge
        </h2>
              {/* <span className="font-black text-3xl tracking-tighter text-[#ef233c]">
                Blood<span className="text-gray-900">Bridge</span>
              </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
              {navLinks}
            </div>

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-[#ef233c]/20 hover:border-[#ef233c] transition-all">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="User profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-56 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-50 mb-2">
                    <p className="font-bold text-gray-900 truncate">{user?.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <li>
                    <Link to="/dashboard" className="py-3 flex items-center gap-3 font-semibold text-gray-700 hover:text-[#ef233c]">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="py-3 flex items-center gap-3 font-semibold text-red-600 hover:bg-red-50">
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-[#ef233c] hover:bg-[#d90429] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-red-200 active:scale-95"
              >
                <UserCircle size={20} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-[#ef233c] transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden absolute w-full bg-white shadow-xl transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 py-6 border-b" : "max-h-0 overflow-hidden"}`}>
        <div className="flex flex-col items-center gap-4 px-4">
          {navLinks}
          {!user && (
            <Link 
              to="/login" 
              className="w-full text-center bg-[#ef233c] text-white py-3 rounded-xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;