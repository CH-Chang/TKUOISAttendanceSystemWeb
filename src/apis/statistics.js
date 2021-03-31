import axios from "axios";

const statisticsRequests = axios.create({
  baseURL: "/api/statistics",
  withCredentials: true,
});

statisticsRequests.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("token")) {
      config.headers["User-Authorization"] = localStorage.getItem("token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// GET
export const apiGetMonthGeneralTimes = () =>
  statisticsRequests.get("/getMonthGeneralTimes");
export const apiGetMonthCoverTimes = () =>
  statisticsRequests.get("/getMonthCoverTimes");
export const apiGetMonthAccumMoney = () =>
  statisticsRequests.get("/getMonthAccumMoney");
