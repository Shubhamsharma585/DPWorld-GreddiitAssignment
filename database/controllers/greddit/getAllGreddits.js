const SubGreddit = require("../../models/SubGreddit");

const getAllGreddits = async (req, res) => {
  try {
    // const userId = req.query.userId;
    const userId = req.tokenData.userId;
    const greddits = await SubGreddit.find({}).sort({ time: 'desc' }).populate('moderator');
    res.status(200).json({ greddits })
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getAllGreddits;