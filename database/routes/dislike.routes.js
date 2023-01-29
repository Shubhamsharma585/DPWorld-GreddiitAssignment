const express = require("express");
const createDislikeOnPost = require("../controllers/like/createDislikeOnPost");
const deleteDislikeOnPost = require("../controllers/like/deleteDislikeOnPost");

const router = express.Router();

router.post("/", createDislikeOnPost);
router.delete("/", deleteDislikeOnPost)

module.exports = router;