const SubGreddit = require("../../models/SubGreddit");

const getMyGredditDetails = async (req, res) => {
  try {
    const gredditId = req.params.gredditId;
    const userId = req.tokenData.userId;
    const greddit = await SubGreddit.findById(gredditId)
      .populate({
        path: 'members',
        select: 'firstName lastName username',
        model: 'User'
      }).populate({
        path: 'memberRequests',
        select: 'firstName lastName username',
        model: 'User'
      })
      .populate({
        path: 'posts'
      })
      .populate('moderator');
    let stats = {}
    stats['postsByDate'] = greddit.posts.reduce((acc, entry) => {
      const date = entry.createdAt.toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});
     stats['membersByDate'] = greddit.members.reduce((acc, entry) => {
      const date = entry.createdAt.toDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(entry);
      return acc;
    }, {});


    if (greddit.moderator._id == userId) {
      res.status(200).json({ greddit, stats })
    }
    else {
      res.status(400).json({ success: false, error: "not your greddit" })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getMyGredditDetails;

