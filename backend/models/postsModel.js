// reference relationship
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    subject: { type: String },
    body: { type: String },
    user: { type: String, default: "Bob" },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
);

const Posts = mongoose.model("posts", postSchema);

module.exports = Posts;
