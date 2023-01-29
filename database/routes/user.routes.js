const express = require("express");
const getSuggestedUsers = require("../controllers/user/getSuggestedUsers");
const getUserById = require("../controllers/user/getUserById");
const getUserByTokenData = require("../controllers/user/getUserByTokenData");
const updateUserByTokenData = require("../controllers/user/updateUserTokenData");
const router = express.Router();

router.get("/", getUserByTokenData);
router.get("/suggested-users", getSuggestedUsers);
router.get("/:userId", getUserById);
router.post("/", updateUserByTokenData);

module.exports = router;