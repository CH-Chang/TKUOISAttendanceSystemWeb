const express = require("express");
const router = express.Router();

const formController = require("../controllers/formController");
const accountAuth = require("../middleware/accountAuth");

// GET
router.get(
  "/getCheckRecordForm",
  [accountAuth],
  formController.getCheckRecordForm
);

module.exports = router;
