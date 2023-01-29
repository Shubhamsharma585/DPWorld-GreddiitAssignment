const mongoose = require('mongoose');

const UserConnectionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: { select: '_id firstName lastName username' } },
  follows: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: { select: '_id firstName lastName username' } },
}, { timestamps: true })

UserConnectionSchema.index({ 'user': 1, 'follows': 1 }, { unique: true });
const UserConnection = mongoose.model('UserConnection', UserConnectionSchema);

module.exports = UserConnection;