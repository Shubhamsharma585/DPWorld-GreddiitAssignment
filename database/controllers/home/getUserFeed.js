const Post = require("../../models/Post");
const UserConnection = require("../../models/UserConnection");

const getUserFeed = async (req, res) => {    
    try {        
        const { userId } = req.tokenData;
        let { current, size } = req.query;
        current = parseInt(current);
        size = parseInt(size);        
        let users = await UserConnection.find({ user: userId }).select("follows");
        users = users.map((user) => user.follows); 
        postOfFollowingUsers = await Post.find({ $or: [{ user: { $in: users } }, { user: userId }] })
            .sort({ time: 'desc' })
            .limit(size)
            .skip(current)
            .populate({
                path: 'likes',
                select: 'name username',
                model: 'User'
            })
            .populate({
                path: 'comments.user',
                select: 'name username',
                model: 'User'
            })
            .populate('user');

        if ((current + size + 1) >= await Post.find({ $or: [{ user: { $in: users } }, { user: userId }] }).countDocuments()) {
            next = null;
        } else {
            next = current + size;
        }
        res.status(200).json({ posts: postOfFollowingUsers, current, next });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = getUserFeed;