const express = require("express");
const router = express.Router();

const attendanceController = require("../controllers/attendanceController");
const accountAuth = require("../middleware/accountAuth");

// GET
router.get(
  "/getTop5Attendances",
  [accountAuth],
  attendanceController.getTop5Attendance
);

// POST
router.post(
  "/getConditionalAttendances",
  [accountAuth],
  attendanceController.getConditionalAttendance
);
router.post(
  "/exportConditionalAttendances",
  [accountAuth],
  attendanceController.exportConditionalAttendance
);

module.exports = router;
