const express = require("express");
const login = require("../controllers/auth/login");
const signup = require("../controllers/auth/signup");
const welcome = require("../controllers/auth/welcome");

const router = express.Router();

router.get("/", welcome);
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;