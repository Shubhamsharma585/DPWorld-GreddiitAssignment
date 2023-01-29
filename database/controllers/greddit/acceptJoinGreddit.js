const SubGreddit = require('../../models/SubGreddit');

const acceptJoinGreddit = async (req, res) => {
  try {
    const gredditId = req.body.gredditId;
    const requestId = req.body.requestId;
    const userId = req.tokenData.userId;

    let greddit = await SubGreddit.findById(gredditId);
    if (greddit.moderator == userId) {
      greddit.memberRequests = greddit.memberRequests.filter(
        item => item != requestId
      );
      greddit.members = [...greddit.members, requestId];
      greddit.membersCount = greddit.membersCount + 1;
      greddit = await greddit.save();
      res.status(200).json({ success: true, greddit });
    } else {
      res.status(400).json({ success: false, error: 'unauthorized user' });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, error });
  }
};

module.exports = acceptJoinGreddit;
