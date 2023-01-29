const express = require("express");
const createUserConnection = require("../controllers/user-connection/createUserConnection");
const deleteUserConnection = require("../controllers/user-connection/deleteUserConnection");
const getUsersByConnectionType = require("../controllers/user-connection/getUsersByConnectionType");
const router = express.Router();

router.get("/", getUsersByConnectionType);
router.post("/", createUserConnection);
router.delete("/:ConnectionId", deleteUserConnection);

module.exports = router;