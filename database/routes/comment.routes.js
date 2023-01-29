const express = require("express");
const createCommentOnPost = require("../controllers/comment/createCommentOnPost");

const router = express.Router();

router.post("/", createCommentOnPost);

module.exports = router;