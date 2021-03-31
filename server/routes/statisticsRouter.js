const express = require("express");
const router = express.Router();

const statisticsController = require("../controllers/statisticsController");

const accountAuth = require("../middleware/accountAuth");

router.get(
  "/getMonthGeneralTimes",
  [accountAuth],
  statisticsController.getMonthGeneralTimes
);
router.get(
  "/getMonthCoverTimes",
  [accountAuth],
  statisticsController.getMonthCoverTimes
);
router.get(
  "/getMonthAccumMoney",
  [accountAuth],
  statisticsController.getMonthAccumMoney
);

module.exports = router;
