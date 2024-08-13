const router = require("express").Router()
const multer = require("multer")

const fetchUser = require("../middlewares/findUser")
const Blog = require("../models/blog")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/src/images/")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + file.originalname)
  },
})

const upload = multer({ storage: storage })

router.post(
  "/create-blog",
  upload.single("image"),
  fetchUser,
  async (req, res) => {
    const { title, description } = req.body
    const imageName = req?.file?.filename

    try {
      const blog = await Blog.create({
        title,
        description,
        user: req.user.id,

        coverImage: imageName,
      })
      return res.json({ message: "Blog created Successfully.", blog })
    } catch (error) {
      return res.json({ message: error.message })
    }
  }
)

router.get("/get-my-blogs", fetchUser, async (req, res) => {
  const userId = req.user.id

  let blogs = await Blog.find({ user: userId })

  return res.status(200).json({ blogs })
})

router.get("/blog-details/:id", async (req, res) => {
  const blogId = req.params.id

  try {
    const blogData = await Blog.findById(blogId).populate("user")
    return res.json({ message: " Blog details", blog: blogData })
  } catch (error) {
    return res.json({ message: error.message })
  }
})

router.delete("/delete-blog/:id", fetchUser, async (req, res) => {
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

router.patch(
  "/edit-blog/:id",
  upload.single("image"),
  fetchUser,
  async (req, res) => {
    const { title, description } = req.body
    const imageName = req?.file?.filename
    console.log(imageName)

    try {
      let blogToBeUpdated = await Blog.findById(req.params.id)

      if (blogToBeUpdated.user.toString() !== req.user.id) {
        return res.json({ message: "User not allowed to perform this action." })
      }

      const updatedData = {
        title,
        description,
        user: req.user.id,

        coverImage: imageName,
      }

      let updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        { $set: updatedData },
        { new: true }
      )
      return res.json({ message: "Blog updated successfully.", updatedBlog })
    } catch (error) {
      return res.json({ message: error.message })
    }
  }
)

router.get("/get-all-blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find()
    return res.json({ message: "All Blogs", blogs: allBlogs })
  } catch (error) {
    return res.json({ message: error.message })
  }
})

module.exports = router
