const express = require("express");
const router = express.Router();
const Posts = require('../models/postsModel')
const PostsSeed = require('../models/postsSeed')
// const postsController = require("../controllers/postController");

// ==INDEX== :: GET available: use model
module.exports = router.get("/", async (req, res) => {
  // res.send('you made it') //tested
  // res.json(PostsSeed) // tested

  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
    // res.send(posts)
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

// ===CREATE== [http://localhost:8080/posts/] ::  POST available: req.body
// coming from front end, test with postman
router.post("/", async (req, res) => {
  try {
    console.log("POST /posts");
    console.log(req.body);
    const posts = await Posts.create(req.body);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

// ===DELETE== [http://localhost:8080/posts/:id] :: DELETE available: req.params.id
router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE /api/posts/:id");
    await Posts.findByIdAndDelete(req.params.id); // get an id from client, await axios.delete(`/posts/${id}`);
    res.status(200).json({ message: "successfully deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});

// ===UPDATE=== :: PUT available: req.params.id, req.body
router.put("/:id", async (req, res) => {
  try {
    console.log("UPDATE /api/posts/:id");
    await Posts.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "successfully updated" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err);
  }
});


module.exports = router

// SHOW and EDIT are not necessary for client side
// as they would be handled in the app as a component

