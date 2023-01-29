const User = require("../../models/User");

const updateUserByTokenData = async (req, res) => {
    try {
        const { userId } = req.tokenData;
        const user = await User.findById(userId);
        const userUpdates = req.body;
        Object.keys(userUpdates).forEach(key => {
            if (key in user) {
                user[key] = userUpdates[key];
            }
        })
        await user.save();
        res.status(200).json({ user: req.body })
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false })
    }
}

module.exports = updateUserByTokenData;