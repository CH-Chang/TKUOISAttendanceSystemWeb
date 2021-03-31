const express = require("express");
const router = express.Router();

const statusController = require("../controllers/statusController");

router.get("/getPracticeStatus", statusController.getPracticeStatus);

module.exports = router;
