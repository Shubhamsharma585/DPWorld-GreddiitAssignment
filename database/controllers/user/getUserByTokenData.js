const User = require("../../models/User");

const getUserByTokenData = async (req, res) => {
    try {
        const { userId } = req.tokenData;
        const user = await User.findById(userId);
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = getUserByTokenData;