const Post = require("../../models/Post");
const SubGreddit = require("../../models/SubGreddit");
const Reports = require("../../models/Reports");

const blockReportedUser = async (req, res) => {
  try {
    const reportId = req.params.reportId
    let report = await Reports.findById(reportId)
    let greddit = await SubGreddit.findById(report.greddit)
    if (greddit) {
      if (!greddit.blockedMembers.includes(report.reportedUser)) {
        greddit.blockedMembers.push(report.reportedUser)
        await greddit.save()
      }
    }

    // const reportId = req.params.reportId
    report.status = 'blockedUser';
    report = await report.save();

    report = await report.populate('post').populate('reportedUser').populate('reportedBy').populate('greddit').execPopulate();
    res.status(201).json({ report });


  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = blockReportedUser;

