const Post = require("../../models/Post");
const SubGreddit = require("../../models/SubGreddit");
const Reports = require("../../models/Reports");

const ignoreReport = async (req, res) => {
  try {
    const reportId = req.params.reportId
    let report = await Reports.findById(reportId);
    report.status = 'ignored';
    report = await report.save();

    report = await report.populate('post').populate('reportedUser').populate('reportedBy').populate('greddit').execPopulate();
    res.status(201).json({ report });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = ignoreReport;

