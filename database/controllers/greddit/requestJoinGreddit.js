const SubGreddit = require("../../models/SubGreddit");

const requestJoinGreddit = async (req, res) => {
  try {
    const gredditId = req.params.gredditId;
    const userId = req.tokenData.userId;
    let greddit = await SubGreddit.findById(gredditId);
    greddit.memberRequests = [...greddit.memberRequests, userId];
    greddit = await greddit.save()
    res.status(200).json({ success: true, greddit })
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error })
  }
}

module.exports = requestJoinGreddit;