import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";
import { LogOut, LayoutDashboard, UserCircle, Menu, X, Heart } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const linkStyles = ({ isActive }) =>
    `relative px-3 py-2 transition-all duration-300 text-lg font-semibold hover:text-[#ef233c] ${
      isActive ? "text-[#ef233c]" : "text-gray-700"
    }`;

  const navLinks = (
    <>
      <NavLink to="/" className={linkStyles} onClick={() => setIsMobileMenuOpen(false)}>
        Home
      </NavLink>
      <NavLink to="/donation-requests" className={linkStyles} onClick={() => setIsMobileMenuOpen(false)}>
        Donation Requests
      </NavLink>
      {user ? (
        <NavLink to="/funding" className={linkStyles} onClick={() => setIsMobileMenuOpen(false)}>
          Funding
        </NavLink>
      ) : (
        <NavLink to="/search" className={linkStyles} onClick={() => setIsMobileMenuOpen(false)}>
          Search Donor
        </NavLink>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2" 
          : "bg-white border-b border-gray-100 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-red-50 transition-transform group-hover:rotate-12">
              <img src={logo} alt="logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900">
              <span className="text-[#ef233c]">Blood</span>Bridge
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              {navLinks}
            </div>

            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-[#ef233c]/10 hover:border-[#ef233c] transition-all overflow-hidden">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="profile" />
                  </div>
                </label>
                <ul tabIndex={0} className="mt-4 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-white rounded-2xl w-60 border border-gray-100">
                  <div className="px-4 py-3 border-b border-gray-50 mb-2">
                    <p className="font-bold text-gray-900 truncate">{user?.displayName}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <li>
                    <Link to="/dashboard" className="py-3 flex items-center gap-3 font-bold text-gray-700 hover:text-[#ef233c]">
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="py-3 flex items-center gap-3 font-bold text-red-500 hover:bg-red-50">
                      <LogOut size={18} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-[#ef233c] hover:bg-[#d90429] text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-red-100 active:scale-95"
              >
                <UserCircle size={20} /> Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#ef233c] transition-colors"
            >
              {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden absolute w-full bg-white shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${isMobileMenuOpen ? "max-h-[100vh] border-b" : "max-h-0"}`}>
        <div className="flex flex-col p-6 space-y-6">
          
          {/* Mobile Profile Section */}
          {user && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <img src={user?.photoURL} className="w-14 h-14 rounded-full border-2 border-white shadow-sm" alt="profile" />
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 truncate">{user?.displayName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2">
            {navLinks}
            {user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center gap-3 px-3 py-3 text-lg font-bold text-gray-700 hover:text-[#ef233c]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LayoutDashboard size={20} /> Dashboard
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-3 py-3 text-lg font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            )}
          </div>

          {!user && (
            <Link 
              to="/login" 
              className="flex items-center justify-center gap-2 bg-[#ef233c] text-white py-4 rounded-2xl font-black shadow-lg shadow-red-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UserCircle size={22} /> Login
            </Link>
          )}

          <div className="pt-4 border-t border-gray-100 flex justify-center items-center gap-2 text-gray-400 text-sm font-medium">
             Made with <Heart size={14} className="text-[#ef233c] fill-[#ef233c]" /> for Life
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;