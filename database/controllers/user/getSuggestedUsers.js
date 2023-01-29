const User = require("../../models/User");
const UserConnection = require("../../models/UserConnection");

const getSuggestedUsers = async (req, res) => {
    try {        
        let followedUsers = await UserConnection.find({ user: req.tokenData.userId }).select("follows");
        followedUsers = followedUsers.map((user) => user.follows);        
        const userCount = await User.find({ _id: { $nin: followedUsers } }).countDocuments();        
        const max = (userCount - 5) > 0 ? (userCount - 5) : 0;                
        const startInd = Math.floor(Math.random() * (max));        
        const users = await User.find({ _id: { $nin: [...followedUsers, req.tokenData.userId] } }).limit(5).skip(startInd).select("name username");          
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = getSuggestedUsers;