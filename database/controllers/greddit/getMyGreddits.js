const SubGreddit = require("../../models/SubGreddit");

const getMyGreddits = async (req, res) => {
  try {
    // const userId = req.query.userId;
    const userId = req.tokenData.userId;
    const greddits = await SubGreddit.find({ moderator: userId }).sort({ time: 'desc' })
      .populate({
        path: 'members',
        select: 'firstName lastName username',
        model: 'User'
      })
      .populate('moderator');
    res.status(200).json({ greddits })
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getMyGreddits;