
const SubGreddit = require("../../models/SubGreddit");
const Reports = require("../../models/Reports");
const SavedPosts = require("../../models/SavedPosts");
const UserConnection = require("../../models/UserConnection");

const getGredditDetails = async (req, res) => {
  try {
    const gredditId = req.params.gredditId;
    const userId = req.tokenData.userId;
    const greddit = await SubGreddit.findById(gredditId).select(["-memberRequests", "-members"])
      .populate({
        path: 'posts',
        populate: {
          path: 'user comments.user',
          select: 'firstName lastName username'
        }
      })
      .populate('moderator');
    const reports = await Reports.find({ greddit: gredditId })
    let userData = {}
    userData['reportedPosts'] = reports.filter(item => item.reportedBy == userId).map((item) => {
      return item.post
    })
    const followedData = await UserConnection.find({ user: userId }).select("follows");
    userData['followedUsers'] = followedData.map(item => item.follows)

    const savedData = await SavedPosts.findOne({ user: userId });
    userData['savedPosts'] = savedData.savedPosts

    res.status(200).json({ greddit, reports, userData })

  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getGredditDetails;