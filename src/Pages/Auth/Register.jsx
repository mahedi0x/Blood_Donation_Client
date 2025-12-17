import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useAuth();
  const [upazilas, setUpazilas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const realData = useLoaderData();

  useEffect(() => {
    fetch("./upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data))
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "district" });

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    return districtUpazilas.map((u) => u.name);
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

        const imageapiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

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
              toast.success("Registration Successful, Updated your profile");
              navigate(location?.state || "/");
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="bg-gray-700 h-50 flex items-center justify-center">
        <h1 className="text-4xl font-semibold text-white text-center items-center">
          REGISTRATION
        </h1>
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6 rounded-2xl p-10 bg-gray-200">
            {/* Left Column */}
            <div className="flex-1 space-y-4">
              {/* Email */}
              <fieldset className="w-full">
                <label className="label">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="input w-full"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500">Email Is Required</p>
                )}
              </fieldset>

              {/* Name */}
              <fieldset className="w-full">
                <label className="label">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input w-full"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-red-500">Name Is Required</p>
                )}
              </fieldset>

              {/* Password */}
              <fieldset className="w-full">
                <label className="label">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                  })}
                  className="input w-full"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password Is Required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-500">
                    Password must be at least 6 characters, with uppercase,
                    lowercase, and special character.
                  </p>
                )}
              </fieldset>

              {/* Confirm Password */}
              <fieldset className="w-full">
                <label className="label">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 6,
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                  })}
                  className="input w-full"
                  placeholder="Confirm Password"
                />
              </fieldset>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4">
              {/* Photo */}
              <fieldset className="w-full">
                <label className="label">Photo</label>
                <input
                  type="file"
                  {...register("photo", { required: true })}
                  className="file-input w-full"
                />
                {errors.photo && (
                  <p className="text-red-500">Photo Is Required</p>
                )}
              </fieldset>

              {/* Blood Group */}
              <fieldset className="w-full">
                <label className="label">Blood Group</label>
                <select
                  defaultValue=""
                  {...register("bloodGroup", { required: true })}
                  className="select w-full"
                >
                  <option value="" disabled>
                    Pick a Blood Group
                  </option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (b, i) => (
                      <option key={i} value={b}>
                        {b}
                      </option>
                    )
                  )}
                </select>
              </fieldset>

              {/* District */}
              <fieldset className="w-full">
                <label className="label">District</label>
                <select
                  defaultValue=""
                  {...register("district", { required: true })}
                  className="select w-full"
                >
                  <option value="" disabled>
                    Pick a District
                  </option>
                  {realData.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Upazila */}
              <fieldset className="w-full">
                <label className="label">Upazila</label>
                <select
                  defaultValue=""
                  {...register("upazila", { required: true })}
                  className="select w-full"
                >
                  <option value="" disabled>
                    Pick an Upazila
                  </option>
                  {upazilaByDistrictId(selectedDistrict).map((u, i) => (
                    <option key={i} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>
          </div>

          <button
            type="submit"
            className="btn bg-red-600 text-white w-full mt-4"
          >
            Register
          </button>

          <Link to="/login" state={location?.state}>
            <p className="text-center mt-2">
              Already Registered ?
              <span className="text-red-400 font-semibold"> Login</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
