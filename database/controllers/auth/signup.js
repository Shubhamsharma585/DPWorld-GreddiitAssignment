const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const User = require("../../models/User");

const signup = async (req, res) => {
  console.log(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }
    user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(409).json({ message: "Username is not available" });
      return;
    }
    const tempUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(12);
    tempUser.password = await bcrypt.hash(password, salt);
    const newUser = await User.create(tempUser);

    const token = jwt.sign({ userId: newUser._id, email: newUser.email, username: newUser.username }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
    newUser.password = undefined;
    res.status(201).json({ success: true, user: newUser, token })
  } catch (err) {
    console.log(err);
    res.status(404).json({ success: false })
  }
}

module.exports = signup;