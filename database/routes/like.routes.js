const express = require("express");
const createLikeOnPost = require("../controllers/like/createLikeOnPost");
const deleteLikeOnPost = require("../controllers/like/deleteLikeOnPost");

const router = express.Router();

router.post("/", createLikeOnPost);
router.delete("/", deleteLikeOnPost)

module.exports = router;