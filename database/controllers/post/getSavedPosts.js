const SavedPosts = require("../../models/SavedPosts");

const getSavedPosts = async (req, res) => {
  try {
    let userId = req.tokenData.userId
    const userSaved = await SavedPosts.findOne({ user: userId })
    // console.log("userSaver", userSaved)
    if (userSaved) {
      let savedPosts = await SavedPosts.findById(userSaved._id).populate({
        path: 'savedPosts',
        populate: {
          path: 'user'
        }
      }).populate('user');
      res.status(201).json(savedPosts);
    } else {
      res.status(201).json({ user: userId, savedPosts: [] });
    }

  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getSavedPosts;

