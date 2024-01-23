const Posts = require("../models/postsModel");
const Comment = require("../models/commentModel");
const postsSeed = require("../models/postsSeed");

module.exports.seed = async (req, res) => {
  try {
    await Posts.deleteMany({});
    await Comment.deleteMany({});

    for (let post of postsSeed) {
      let comments = post.comments;
      post.comments = [];

      console.log(comments);

      const seededComments = await Comment.insertMany(comments);
      console.log(seededComments);
      const commentIds = seededComments.map((comment) => comment._id);
      post.comments = commentIds;

      await Posts.create(post);
    }
  } catch (err) {
    console.log(err);
  }
  res.redirect("/posts");
};

// display all posts
module.exports.index = async (req, res) => {
  const posts = await Posts.find().sort({ createdAt: 1 });
  res.render("posts/Index", { posts });
};

module.exports.delete = async (req, res) => {
  try {
    const posts = await Posts.findByIdAndDelete(req.params.id);
    console.log(posts.comments);
    await Comment.deleteMany({
      _id: {
        $in: posts.comments,
      },
    });
  } catch (err) {
    console.log(err.message);
  }
  res.redirect("/posts");
};

module.exports.update = async (req, res) => {
  await Posts.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/posts/${req.params.id}`);
};

module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    await Posts.create(req.body);
    res.redirect("/posts");
  } catch (err) {
    res.send(err.message);
  }
};

// open post, populate with ref. comments
module.exports.show = async (req, res) => {
  const post = await Posts.findById(req.params.id).populate("comments");
  console.log(post);
  res.render("posts/Show", { post });
};
