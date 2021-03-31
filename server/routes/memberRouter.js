const express = require("express");
const router = express.Router();

const memberController = require("../controllers/memberController");
const accountAuth = require("../middleware/accountAuth");

router.get("/logout", [accountAuth], memberController.logout);
router.get("/getUser", [accountAuth], memberController.getUser);
router.get("/getUserDetail", [accountAuth], memberController.getUserDetail);

router.post("/login", memberController.login);

module.exports = router;
