const User = require("../../models/User");
const UserConnection = require("../../models/UserConnection");

const getUserById = async (req, res) => {
    try {        
        const userId = req.params.userId;        
        const user = await User.findById(userId);
        delete user.password;
        const userConnection = await UserConnection.findOne({user: req.tokenData.userId, follows: userId});
        if(userConnection){
            res.status(200).json({ user, following: userConnection });   
            return;
        }
        res.status(200).json({ user, following: userConnection });   
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = getUserById;