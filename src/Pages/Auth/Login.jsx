import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

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
        console.log(result);
        toast.success("Login Successful");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        toast.error("Login failed. Please check your credentials.");
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center p-20">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleLogin)}>
            <h1 className="bg-red-600 text-white text-center text-3xl py-5 font-semibold rounded-md">
              LOGIN
            </h1>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label text-xl">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is required</p>
              )}
              {/* password */}
              <label className="label text-xl">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              <div className="flex items-center justify-between">
                <button className="btn bg-red-600 mt-4 text-white">
                  LOG IN
                </button>
                <a className="link link-hover text-lg">Forgot password?</a>
              </div>
            </fieldset>
          </form>
          <Link to="/register" state={location?.state}>
            <p className="text-center">
              New here ? to{" "}
              <span className="text-red-400 font-semibold">Register</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
