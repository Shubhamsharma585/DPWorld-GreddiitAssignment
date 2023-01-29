const Post = require("../../models/Post");
const SubGreddit = require("../../models/SubGreddit");
const Reports = require("../../models/Reports");

const deleteReportedPost = async (req, res) => {
  try {
    const reportId = req.params.reportId
    let report = await Reports.findById(reportId)
    let greddit = await SubGreddit.findById(report.greddit)
    if (greddit) {
      greddit.posts = greddit.posts.filter((item) => item != report.post)
      greddit.postsCount = greddit.posts.length
      await greddit.save()
    }

    // const reportId = req.params.reportId
    report.status = 'deletedPost';
    report = await report.save();

    report = await report.populate('post').populate('reportedUser').populate('reportedBy').populate('greddit').execPopulate();
    res.status(201).json({ report });


  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = deleteReportedPost;

