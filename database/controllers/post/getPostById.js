const Post = require("../../models/Post");

const getPostsById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate({
        path: 'comments.user',
        select: 'name username',
        model: 'User'
      })
      .populate('user');
    res.status(200).json({ post })
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = getPostsById;