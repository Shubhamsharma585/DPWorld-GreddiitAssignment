const Post = require("../../models/Post");
const SubGreddit = require("../../models/SubGreddit");
const Reports = require("../../models/Reports");

const getAllReports = async (req, res) => {
  try {
    const gredditId = req.params.gredditId
    const reports = await Reports.find({ greddit: gredditId }).populate('post').populate('reportedUser').populate('reportedBy').populate('greddit');

    res.status(201).json({ reports });

  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getAllReports;

