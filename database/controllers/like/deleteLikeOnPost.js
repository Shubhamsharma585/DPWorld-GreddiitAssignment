
const Post = require("../../models/Post");

const deleteLikeOnPost = async (req, res) => {
  try {
    const postId = req.postId;
    const { userId } = req.tokenData;
    let post = await Post.findById(postId);
    post.likes.pull(userId);
    await post.save();
    post = await post
      .populate({
        path: 'comments.user',
        select: 'firstName lastName username',
        model: 'User'
      })
      .populate('user').execPopulate();
    res.status(200).json({ post })
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = deleteLikeOnPost;