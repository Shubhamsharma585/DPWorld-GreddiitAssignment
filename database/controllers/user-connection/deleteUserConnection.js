const UserConnection = require("../../models/UserConnection");
const User = require("../../models/User");

const deleteUserConnection = async (req, res) => {
    try {
        const ConnectionId = req.params.ConnectionId;
        const following = await UserConnection.findByIdAndDelete(ConnectionId);
        const sourceUser = await User.findById(following.user);
        const targetUser = await User.findById(following.follows);
        sourceUser.followingCount = sourceUser.followingCount - 1;
        targetUser.followerCount = targetUser.followerCount - 1;
        await sourceUser.save();
        await targetUser.save();
        res.status(201).json({ deleted: following._id });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = deleteUserConnection;