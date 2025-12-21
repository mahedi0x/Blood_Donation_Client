import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, ShieldCheck } from "lucide-react";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result)
        toast.success("Login Successful");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error("Login failed. Please check your credentials.");
        console.error("Login error:", err);
      });
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-4 md:p-10 font-sans">
      <div className="max-w-5xl w-full bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Image & Branding (Hidden on mobile) */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img 
            src="https://www.shutterstock.com/image-vector/blood-bag-dripping-transfusion-donate-600nw-2177952605.jpg" 
            alt="Medical Hero" 
            className="absolute inset-0 w-full h-full object-cover rounded-2xl p-10"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-black/10 bg-gradient-to-t from-black/10 to-transparent"></div>
          
          <div className="relative z-10 mt-auto p-12 text-white text-center">
            <h2 className="text-2xl font-bold leading-tight mb-2 text-center flex ">
              Your 15 minutes can save 3 lives.
            </h2>
            <p className="text-gray-200 text-lg">Join our community of heroes today.</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative">
          {/* Subtle background blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-700 rounded-full -mr-16 -mt-16 opacity-50"></div>
          
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-500">Please enter your details to access your donor dashboard.</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" size={20} />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="user@example.com"
                  className={`w-full pl-12 pr-4 py-4 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-500 outline-none transition-all shadow-sm`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <button type="button" className="text-xs font-bold text-red-500 hover:text-red-600">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" size={20} />
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-4 bg-white border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-2xl focus:ring-4 focus:ring-red-50 focus:border-red-500 outline-none transition-all shadow-sm`}
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Eye size={20} />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 transition-all active:scale-[0.98] mt-4"
            >
              Log In
            </button>
          </form>

          {/* Registration Link */}
          <div className="text-center mt-10">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link to="/register" state={location?.state} className="text-[#ef233c] font-bold hover:underline">
                Register to donate
              </Link>
            </p>
          </div>

          {/* Secure Footer */}
          <div className="mt-auto pt-10 flex items-center justify-center gap-2 text-gray-400 text-xs">
            <ShieldCheck size={16} className="text-red-300" />
            <span>Secure 256-bit Encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;