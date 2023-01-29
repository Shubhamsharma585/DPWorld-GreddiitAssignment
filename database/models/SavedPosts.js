const mongoose = require('mongoose');

const SavedPostSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", populate: {} },
  savedPosts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post", populate: { select: 'user content' } }
  ]
}, { timestamps: true })

SavedPostSchema.index({ 'user': 1 }, { unique: true });
const SavedPosts = mongoose.model('SavedPosts', SavedPostSchema);

module.exports = SavedPosts;