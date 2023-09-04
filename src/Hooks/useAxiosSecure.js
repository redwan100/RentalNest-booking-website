import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // interceptor request
    axiosSecure.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    // interceptor response
    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.status === 403
        ) {
          await logout();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );
  }, [axiosSecure, logout, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
