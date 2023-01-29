const Post = require("../../models/Post");
const SubGreddit = require("../../models/SubGreddit");
const Reports = require("../../models/Reports");

const createNewReport = async (req, res) => {
  try {

    let postId = req.body.postId
    let userId = req.tokenData.userId
    let reportedUserId = req.body.userId
    let gredditId = req.body.gredditId
    let concernText = req.body.concernText

    let newReport = {
      greddit: gredditId,
      post: postId,
      reportedBy: userId,
      reportedUser: reportedUserId,
      time: Date.now(),
      status: 'unprocessed',
      concernText: concernText
    }

    let reports = await Reports.create(newReport);

    reports = await reports.populate('post').populate('reportedUser').populate('reportedBy').populate('greddit').execPopulate();
    res.status(201).json(reports);

  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = createNewReport;

