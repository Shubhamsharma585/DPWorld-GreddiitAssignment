
const SubGreddit = require("../../models/SubGreddit");

const createSubGreddit = async (req, res) => {
  try {

    const geddit = {
      moderator: req.tokenData.userId,
      name: req.body.name,
      description: req.body.description,
      time: Date.now(),
      bannedWords: req.body.bannedWords,
      tags: req.body.tags,
      membersCount: 1,
      members: [req.tokenData.userId],
      blockedMembers: []
    }
    let newGreddit = await SubGreddit.create(geddit);
    newGreddit = await newGreddit.populate('moderator').populate('members').execPopulate();
    res.status(201).json({ geddit: newGreddit });
  } catch (error) {
    console.log(err);
    res.status(404).json({ success: false })
  }
}

module.exports = createSubGreddit;