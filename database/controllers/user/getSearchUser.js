const User = require("../../models/User");
const UserConnection = require("../../models/UserConnection");

const getSearchUser = async (req, res) => {
    try {        
        const userId = req.params.userId;        
        const user = await User.findBy(userId);
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

module.exports = getSearchUser;