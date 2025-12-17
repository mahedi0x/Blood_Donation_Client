import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const navigate = useNavigate();
  const token = user?.accessToken;

  useEffect(() => {
    //intercept request
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      }
    );
    //intercept response
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res; //যে কল করবে সে ডাটা টা পাবে
      },
      (error) => {
        console.log(error);
        if (error.status === 401 || error.status === 403) {
          signOutUser().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [token, signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
