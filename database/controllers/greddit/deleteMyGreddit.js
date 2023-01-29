const SubGreddit = require("../../models/SubGreddit");

const deleteMyGreddit = async (req, res) => {
  try {
    const gredditId = req.params.gredditId;
    const userId = req.tokenData.userId;
    const greddit = await SubGreddit.findById(gredditId);
    if (greddit.moderator == userId) {
      const deleted = await SubGreddit.findByIdAndDelete(gredditId);
      res.status(200).json({ deleted })

    } else {
      res.status(400).json({ success: false, error: 'wrong greddit id' })
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = deleteMyGreddit;