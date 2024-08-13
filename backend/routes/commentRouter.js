const Comment = require("../models/comment")
const router = require("express").Router()

const isVerified = require("../middlewares/findUser")

router.post("/add-comment", isVerified, async (req, res) => {
  const { content, blog } = req.body

  try {
    const comment = await Comment.create({
      content,
      blog,
      user: req.user.id,
    })

    return res.json({ message: "Comment added successfully", comment })
  } catch (error) {
    return res.json({ message: error.message })
  }
})

router.get("/get-blog-comments/:blogId", async (req, res) => {
  try {
    const allComments = await Comment.find({
      blog: req.params.blogId,
    }).populate("user")
    return res.json({ comments: allComments })
  } catch (error) {
    return res.json({ message: error.message })
  }
})

module.exports = router
