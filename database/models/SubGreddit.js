const mongoose = require('mongoose');

const SubGredditSchema = mongoose.Schema({
  moderator: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: { select: 'firstName lastName username' } },
  name: { type: String },
  description: { type: String },
  time: { type: Date },
  bannedWords: [{ type: String }],
  tags: [{ type: String }],
  membersCount: { type: Number, default: 0 },
  postsCount: { type: Number, default: 0 },
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: { select: 'firstName lastName username' } }
  ],
  memberRequests: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: { select: 'firstName lastName username' } }
  ],
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post", populate: { select: 'user content' } }
  ],
  blockedMembers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ]
}, { timestamps: true })

const SubGreddit = mongoose.model('SubGreddit', SubGredditSchema);

module.exports = SubGreddit;