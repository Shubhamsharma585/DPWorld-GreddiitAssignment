const express = require("express");
const createPost = require("../controllers/post/createPost");
const savePost = require("../controllers/post/savePost");
const removeSavedPost = require("../controllers/post/removeSavedPost");
const getSavedPosts = require("../controllers/post/getSavedPosts");
const getPostsById = require("../controllers/post/getPostById");
const getPostsByUserId = require("../controllers/post/getPostsByUserId");
const router = express.Router();

router.get("/", getPostsByUserId);
router.get("/:postId", getPostsById);
router.post("/", createPost);
router.post("/save/:postId", savePost);
router.delete("/save/:postId", removeSavedPost);
router.get("/savedposts/mine", getSavedPosts);

module.exports = router;