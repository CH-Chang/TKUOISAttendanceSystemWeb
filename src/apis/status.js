import axios from "axios";

const statusRequest = axios.create({
  baseURL: "/api/status",
  withCredentials: true,
});

// 攔截器
statusRequest.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["User-Authorization"] = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET
export const apiGetPracticeStatus = () =>
  statusRequest.get("/getPracticeStatus");
