import axios from "axios";

const attendanceRequest = axios.create({
  baseURL: "/api/attendance",
  withCredentials: true,
});

attendanceRequest.interceptors.request.use(
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
export const apiGetTop5Attendances = () =>
  attendanceRequest.get("/getTop5Attendances");

// POST
export const apiGetConditionalAttendances = (params) =>
  attendanceRequest.post("/getConditionalAttendances", params);
export const apiExportConditionalAttendances = (params) =>
  attendanceRequest.post("/exportConditionalAttendances", params);
