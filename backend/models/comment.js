const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "blogs",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
})

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment

// const mongoose = require("mongoose")

// const commentSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//     required: true,
//   },
//   blogId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "blogs",
//     required: true,
//   },
//   parentCommentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "comments",
//     default: null,
//   },
//   content: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// })

// const Comment = mongoose.model("Comment", commentSchema)

// module.exports = Comment
