const Post = require("../../models/Post");
const UserConnection = require("../../models/UserConnection");

const getUserHome = async (req, res) => {
    try {
        const { userId } = req.tokenData;
        let users = await UserConnection.find({ user: userId }).select("follows");
        users = users.map((user) => user.follows);  
        const postOfFollowingUsers = await Post.find({ $or: [{ user: { $in: users } }, { user: userId }] }).sort({ time: 'desc' })
            .populate({
                path: 'likes',
                select: 'name username',
                model: 'User'
            })
            .populate({
                path: 'comments.user',
                select: 'name username',
                model: 'User'
            }).populate('user');;
        res.status(200).json({ posts: postOfFollowingUsers });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = getUserHome;