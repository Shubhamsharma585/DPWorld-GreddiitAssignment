const UserConnection = require("../../models/UserConnection")

const getUsersByConnectionType = async (req, res) => {
  try {
    const tData = req.tokenData;
    const userId = req.query.userId || tData.userId;
    const type = req.query.type;
    if (type === "following") {
      const followings = await UserConnection.find({ user: userId }).select("follows").populate("follows");
      res.status(200).json({ followings });
    } else if (type === "follower") {
      const followers = await UserConnection.find({ follows: userId }).select("user").populate("user");
      res.status(200).json({ followers });
    } else {
      res.status(400).json({ message: "No Connection Type Provided" })
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getUsersByConnectionType