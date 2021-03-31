import axios from "axios";

const postRequest = axios.create({
  baseURL: "/api/post/",
  withCredentials: true,
});

// 攔截器
postRequest.interceptors.request.use(
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

// POST

// GET
export const apiGetTop5Posts = () => postRequest.get("/getTop5Posts");
