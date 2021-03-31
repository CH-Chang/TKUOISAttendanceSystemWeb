import axios from "axios";

const activityRequests = axios.create({
  baseURL: "/api/activity",
  withCredentials: true,
});

activityRequests.interceptors.request.use(
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
export const apiGetTop5Activities = () =>
  activityRequests.get("/getTop5Activities");
