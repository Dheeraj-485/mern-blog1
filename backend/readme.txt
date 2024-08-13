router.delete("/deleteBlog/:id", fetchUser, async (req, res) => {
  let blog = await Blog.findById(req.params.id)

  if (!blog) {
    return res.json({ message: "blog not found" })
  }

  if (blog.user.toString() !== req.user.id) {
    return res.json({ message: "user not owns this blog" })
  }

  await Blog.findByIdAndDelete(req.params.id)

  return res.json({ message: "blog deleted successfully" })
})



router.patch("/editblog/:id", fetchUser, async (req, res) => {
  const blog = req.body

  try {
    let blogToBeUpdated = await Blog.findById(req.params.id)

    if (blogToBeUpdated.user.toString() !== req.user.id) {
      return res.json({ message: "User not allowed to perform this action." })
    }

    let updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: blog },
      { new: true }
    )
    return res.json({ message: "Blog updated successfully.", updatedBlog })
  } catch (error) {
    return res.json({ message: error.message })
  }
})