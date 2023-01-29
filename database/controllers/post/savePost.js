const SavedPosts = require("../../models/SavedPosts");

const savePost = async (req, res) => {
  try {
    let postId = req.params.postId
    let userId = req.tokenData.userId
    const userSaved = await SavedPosts.findOne({ user: userId })
    if (userSaved) {
      let savedPosts = await SavedPosts.findById(userSaved._id);
      if (!savedPosts.savedPosts.includes(postId)) {
        savedPosts.savedPosts = [...savedPosts.savedPosts, postId]
      }
      savedPosts = await savedPosts.save();
      savedPosts = await savedPosts.populate({
        path: 'savedPosts',
        populate: {
          path: 'user'
        }
      }).populate('user').execPopulate();
      res.status(201).json(savedPosts);
    } else {
      let savedPosts = await SavedPosts.create({ user: userId, savedPosts: [postId] });
      res.status(201).json(savedPosts);
    }

  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = savePost;

