const SavedPosts = require("../../models/SavedPosts");

const removeSavePost = async (req, res) => {
  try {
    let postId = req.params.postId
    let userId = req.tokenData.userId
    const userSaved = await SavedPosts.findOne({ user: userId })
    if (userSaved) {
      let savedPosts = await SavedPosts.findById(userSaved._id);
      savedPosts.savedPosts = savedPosts.savedPosts.filter((item) => item != postId);
      savedPosts = await savedPosts.save();
      savedPosts = await savedPosts.populate({
        path: 'savedPosts',
        populate: {
          path: 'user'
        }
      }).populate('user').execPopulate();
      res.status(201).json(savedPosts);
    } else {
      res.status(201).json({ user: userId, savedPosts: [] });
    }

  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = removeSavePost;

