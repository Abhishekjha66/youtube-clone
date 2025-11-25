import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export const useAxiosPrivate = () => {
  const { token, API_BASE } = useAuth();

  const instance = axios.create({
    baseURL: `${API_BASE}`,
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};
