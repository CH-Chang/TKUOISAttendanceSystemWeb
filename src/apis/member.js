import axios from "axios";

const memberRequest = axios.create({
  baseURL: "/api/member",
  withCredentials: true,
});

// 攔截器
memberRequest.interceptors.request.use(
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
export const apiLogin = (params) => memberRequest.post("/login", params);

// GET
export const apiLogout = () => memberRequest.get("/logout");
export const apiGetUser = () => memberRequest.get("/getUser");
export const apiGetUserDetail = () => memberRequest.get("/getUserDetail");
