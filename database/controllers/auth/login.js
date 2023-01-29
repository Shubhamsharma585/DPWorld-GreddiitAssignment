const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")

const login = async (req, res) => {
  try {
    const userCredentials = {
      email: req.body.email,
      password: req.body.password
    }

    let user = await User.findOne({ email: userCredentials.email }).select(['_id', 'firstName', 'lastName', 'username', 'followerCount', 'followingCount', 'email', 'password']);
    if (!user) {
      res.status(404).json({ message: 'user does not exsist' })
    }
    const isMatch = await bcrypt.compare(userCredentials.password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "incorrect password" })
    }
    user.lastLogin = new Date();
    user = await user.save();
    const token = jwt.sign({ userId: user._id, email: user.email, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
    user.password = undefined;
    res.status(200).json({ user, token })
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false })
  }
}

module.exports = login;