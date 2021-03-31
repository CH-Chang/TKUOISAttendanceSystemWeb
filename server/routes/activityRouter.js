const express = require("express");
const router = express.Router();

const activityController = require("../controllers/activityController");
const accountAuth = require("../middleware/accountAuth");

// GET
router.get(
  "/getTop5Activities",
  [accountAuth],
  activityController.getTop5Activities
);

module.exports = router;
