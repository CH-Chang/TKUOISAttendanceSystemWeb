import axios from "axios";

const formRequest = axios.create({
  baseURL: "/api/form",
  withCredentials: true,
});

formRequest.interceptors.request.use(
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

export const apiGetCheckRecordForm = () =>
  formRequest.get("/getCheckRecordForm");
