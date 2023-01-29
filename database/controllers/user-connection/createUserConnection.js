const UserConnection = require("../../models/UserConnection");
const User = require("../../models/User");


const createUserConnection = async (req, res) => {
  try {
    const { userId } = req.tokenData;
    const user = userId;
    const { follows } = req.body;
    const following = await UserConnection.create({ user, follows });
    const sourceUser = await User.findById(user);
    const targetUser = await User.findById(follows);
    sourceUser.followingCount = sourceUser.followingCount + 1;
    targetUser.followerCount = targetUser.followerCount + 1;
    await sourceUser.save();
    await targetUser.save();
    res.status(201).json({ following });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = createUserConnection;