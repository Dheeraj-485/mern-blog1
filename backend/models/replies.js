const mongoose = require("mongoose")

const repliesSchema = new mongoose.Schema({
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
  },
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

const Replies = mongoose.model("replies", repliesSchema)

module.exports = Replies
