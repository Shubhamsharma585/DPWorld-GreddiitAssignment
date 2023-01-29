const Post = require("../../models/Post");
const SubGreddit = require("../../models/SubGreddit");

function censorWords(str, words) {
  for (let i = 0; i < words.length; i++) {
    str = str.replace(new RegExp(words[i], "gi"), "***");
  }
  return str;
}


const createPost = async (req, res) => {
  try {

    const greddit = await SubGreddit.findById(req.body.greddit)
    const content = censorWords(req.body.content, greddit.bannedWords)
    let post = {
      user: req.tokenData.userId,
      content,
      greddit: req.body.greddit,
      time: Date.now(),
    }
    if (greddit) {
      post = await Post.create(post);
      greddit.posts = [...greddit.posts, post._id];
      greddit.postsCount = greddit.postsCount + 1;
      greddit.save()
      post = await post.populate('user').execPopulate();
      res.status(201).json({ post });
    } else {
      res.status(400).json({ success: false, error: "invalid greddit" });

    }

  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false })
  }
}

module.exports = createPost;

