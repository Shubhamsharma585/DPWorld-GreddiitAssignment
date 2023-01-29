const express = require("express");
const createSubGreddit = require("../controllers/greddit/createGreddit");
const getMyGreddits = require("../controllers/greddit/getMyGreddits");
const getMyGredditDetails = require("../controllers/greddit/getMyGredditDetails");
const getGredditDetails = require("../controllers/greddit/getGredditDetails");
const getAllGreddits = require("../controllers/greddit/getAllGreddits");
const deleteMyGreddit = require("../controllers/greddit/deleteMyGreddit");
const requestJoinGreddit = require("../controllers/greddit/requestJoinGreddit");
const leaveGreddit = require("../controllers/greddit/leaveGreddit");
const acceptJoinGreddit = require("../controllers/greddit/acceptJoinGreddit");
const rejectJoinGreddit = require("../controllers/greddit/rejectJoinGreddit");
const router = express.Router();

router.get("/mine", getMyGreddits);
router.get("/mine/:gredditId", getMyGredditDetails);
router.get("/:gredditId", getGredditDetails);
router.get("/", getAllGreddits);
router.delete("/:gredditId", deleteMyGreddit);
router.post("/", createSubGreddit);
router.post("/join/:gredditId", requestJoinGreddit);
router.post("/leave/:gredditId", leaveGreddit);
router.post("/accept", acceptJoinGreddit);
router.post("/reject", rejectJoinGreddit);
router.post("/reject", rejectJoinGreddit);
router.post("/reject", rejectJoinGreddit);

module.exports = router;