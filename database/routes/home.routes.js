const express = require("express");
const getUserFeed = require("../controllers/home/getUserFeed");
const getUserHome = require("../controllers/home/getUserHome");
const router = express.Router();

router.get("/", getUserHome);
router.get("/feed", getUserFeed);

module.exports = router;