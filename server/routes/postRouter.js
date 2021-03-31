const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/getTop5Posts", postController.getTop5Posts);

module.exports = router;
