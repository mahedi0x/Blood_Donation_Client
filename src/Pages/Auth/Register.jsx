import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { User, Mail, MapPin, Map as MapIcon, Lock, RotateCcw, Camera, ChevronDown } from "lucide-react";

const Register = () => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
  const { createUser, updateUser } = useAuth();
  const [upazilas, setUpazilas] = useState([]);
  const [preview, setPreview] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const realData = useLoaderData();

  // Watch fields for logic
  const selectedDistrict = useWatch({ control, name: "district" });
  const selectedBloodGroup = useWatch({ control, name: "bloodGroup" });

  useEffect(() => {
    fetch("./upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data))
      .catch((err) => console.log(err));
  }, []);

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter((u) => u.district_id === districtId);
    return districtUpazilas.map((u) => u.name);
  };

  // Image Preview Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    const profielImg = data.photo[0];
    const districtName = realData.find((d) => d.id === data.district);

    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profielImg);

        const imageapiURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios.post(imageapiURL, formData).then((res) => {
          const photoURL = res.data.data.url;
          const userInfo = {
            displayName: data.name,
            photoURL,
            email: data.email,
            bloodGroup: data.bloodGroup,
            district: districtName.name,
            upazila: data.upazila,
            status: "active",
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) console.log("user added to database");
          });

          const userProfile = { displayName: data.name, photoURL };
          updateUser(userProfile)
            .then(() => {
              toast.success("Registration Successful!");
              navigate(location?.state || "/");
            })
            .catch((err) => console.log(err));
        });
    })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 font-sans py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="pt-10 pb-6 text-center px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#df353d] mb-2">
            Join the Lifesaving Community
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            Create an account to become a donor and save lives
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="px-6 md:px-12 pb-12 space-y-8">
          
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-orange-50 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-12 h-16 bg-white border-2 border-gray-200 rounded-sm"></div>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                <Camera size={20} className="text-gray-600" />
                <input 
                  type="file" 
                  className="hidden" 
                  {...register("photo", { required: true, onChange: handleImageChange })} 
                />
              </label>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-800">Profile Photo</h3>
              <p className="text-xs text-gray-400">Upload via ImageBB</p>
              {errors.photo && <p className="text-red-500 text-xs mt-1">Photo is required</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  {...register("name", { required: true })}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs">Name is required</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
            </div>

            {/* District */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">District</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  {...register("district", { required: true })}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none appearance-none transition-all"
                >
                  <option value="">Select District</option>
                  {realData.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Upazila */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Upazila</label>
              <div className="relative">
                <MapIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  {...register("upazila", { required: true })}
                  className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none appearance-none transition-all"
                >
                  <option value="">Select Upazila</option>
                  {upazilaByDistrictId(selectedDistrict).map((u, i) => (
                    <option key={i} value={u}>{u}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          {/* Blood Group Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-700 ml-1">Blood Group</label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  type="button"
                  onClick={() => setValue("bloodGroup", group)}
                  className={`py-3 text-sm font-bold rounded-lg border transition-all ${
                    selectedBloodGroup === group
                      ? "bg-[#df353d] text-white border-[#df353d] shadow-md shadow-red-100"
                      : "bg-white text-gray-700 border-gray-200 hover:border-red-200 hover:bg-red-50"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("bloodGroup", { required: true })} />
            {errors.bloodGroup && <p className="text-red-500 text-xs">Please select a blood group</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
              <div className="relative">
                <RotateCcw className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-100 focus:border-red-400 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#df353d] hover:bg-[#c42d34] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-100 transition-all active:scale-[0.98]"
            >
              Complete Registration
            </button>
            <p className="text-center mt-6 text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-[#df353d] font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </form>

        {/* Footer Disclaimer */}
        <div className="bg-gray-50 px-8 py-6 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 leading-relaxed max-w-md mx-auto">
            By registering, you agree to become part of the active donor pool. Your information will be shared with verified recipients only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;