const Post = require("../models/postsModel");
const Comment = require("../models/commentModel");

// ==CREATE==
module.exports.create = async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    // as this is on the client side, post ID should be ref as a param
    await Post.findByIdAndUpdate(req.params.postId, {
      $push: {
        comments: comment._id,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
  res.redirect(`/posts/${req.params.postId}`);
};

// ==DELETE==
module.exports.delete = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    // as this is on the client side, post ID should be ref as a param
    await Post.findByIdAndUpdate(req.params.postId, {
      $pull: {
        comments: req.params.commentId,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
  res.redirect(`/posts/${req.params.postId}`);
};

// ==UPDATE==
module.exports.update = async (req, res) => {
  try {
    await Comment.findByIdAndUpdate(req.params.commentId, req.body);
  } catch (err) {
    console.log(err.message);
  }
  res.redirect(`/posts/${req.params.postId}`);
};

//  ==INDEX== populating the post with comments
module.exports.index = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate("comments");
    res.send(post.comments);
  } catch (err) {
    console.log(err.message);
    res.redirect(`/posts/${req.params.postId}`);
  }
};
