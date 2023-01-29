const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: ["Can't create without first name"] },
  lastName: { type: String, required: ["Can't create without last name"] },
  username: { type: String, unique: true, required: ["Can't create without username"] },
  email: { type: String, unique: true, required: ["Can't create without email"] },
  password: { type: String, select: false },
  followerCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema);

module.exports = User;