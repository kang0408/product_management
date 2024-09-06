const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema({
  likes: Number,
  dislikes: Number,
});
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  tags: Array,
  reactions: reactionSchema,
  views: Number,
  userId: Number,
});

const Post = mongoose.model("Post", postSchema, "posts");

module.exports = Post;
