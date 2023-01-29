const express = require("express");
const createNewReport = require("../controllers/reports/createNewReport");
const blockReportedUser = require("../controllers/reports/blockReportedUser");
const deleteReportedPost = require("../controllers/reports/deleteReportedPost");
const getAllReports = require("../controllers/reports/getAllReports");
const ignoreReport = require("../controllers/reports/ignoreReport");

const router = express.Router();

router.get("/:gredditId", getAllReports);
router.post("/", createNewReport);
router.post("/blockUser/:reportId", blockReportedUser);
router.post("/deletePost/:reportId", deleteReportedPost);
router.post("/ignoreReport/:reportId", ignoreReport);

module.exports = router;