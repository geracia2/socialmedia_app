const Posts = require("../models/postsModel");
const Comment = require("../models/commentModel");
const postsSeed = require("../models/postsSeed");

// ==SEED==
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

// ==INDEX== [http://localhost:8080/posts/] :: GET available: use model
// display all posts
module.exports.index = async (req, res) => {
  const posts = await Posts.find().sort({ createdAt: 1 });
  res.json({ posts });
};

// ===CREATE== [http://localhost:8080/posts/] ::  POST available: req.body
module.exports.create = async (req, res) => {
  console.log(req.body);
  try {
    await Posts.create(req.body);
    res.redirect("/posts");
  } catch (err) {
    res.send(err.message);
  }
};

// ===DELETE== [http://localhost:8080/posts/:id] :: DELETE available: req.params.id
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
  // res.redirect("/posts");
};

// ===UPDATE=== [http://localhost:8080/posts/:id] :: PUT available: req.params.id, req.body
module.exports.update = async (req, res) => {
  try {
    console.log("PUT  /posts/:id");
    console.log("you are changing: ", req.params.id);
    console.log("with this body: ", req.body);
    await Posts.findByIdAndUpdate(req.params.id, req.body);
    // noting sent back? send something or it will hang
    res.send('update was successful')
    // redirect on client side
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

// ===SHOW=== [http://localhost:8080/posts/:id] :: GET available: req.params.id
// open post, populate with ref. comments
module.exports.show = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id).populate("comments");
    console.log(post);
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
