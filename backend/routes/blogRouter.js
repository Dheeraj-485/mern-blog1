const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const ErrorHandler = require("../middlewares/ErrorHandler");

const fetchUser = require("../middlewares/findUser");
const Blog = require("../models/blog");

router.post("/create-blog", fetchUser, async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Blog Main Image Is Mandatory!", 400));
  }
  const { coverImage } = req.files;
  console.log(coverImage);

  if (!coverImage) {
    return next(new ErrorHandler("Blog Main Image Is Mandatory!", 400));
  }
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(coverImage.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file type. Only JPG, PNG and WEBP Formats Are Allowed!",
        400
      )
    );
  }
  const { title, description } = req.body;

  try {
    const uploadPromises = [
      cloudinary.uploader.upload(coverImage.tempFilePath),
    ];
    const [coverImageRes] = await Promise.all(uploadPromises);

    if (!coverImageRes || coverImageRes.error) {
      return next(
        new ErrorHandler(
          "Error occured while uploading one or more images!",
          500
        )
      );
    }

    const blog = await Blog.create({
      title,
      description,
      user: req.user.id,

      coverImage: coverImageRes.secure_url,
    });
    return res.json({ message: "Blog created Successfully.", blog });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.get("/get-my-blogs", fetchUser, async (req, res) => {
  const userId = req.user.id;

  let blogs = await Blog.find({ user: userId });

  return res.status(200).json({ blogs });
});

router.get("/blog-details/:id", async (req, res) => {
  const blogId = req.params.id;

  try {
    const blogData = await Blog.findById(blogId).populate("user");
    return res.json({ message: " Blog details", blog: blogData });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.delete("/delete-blog/:id", fetchUser, async (req, res) => {
  let blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.json({ message: "blog not found" });
  }

  if (blog.user.toString() !== req.user.id) {
    return res.json({ message: "user not owns this blog" });
  }

  await Blog.findByIdAndDelete(req.params.id);

  return res.json({ message: "blog deleted successfully" });
});

router.patch("/edit-blog/:id", fetchUser, async (req, res) => {
  const { title, description } = req.body;

  try {
    let coverImageRes = null;
    if (req.files && req.files.coverImage) {
      const { coverImage } = req.files;

      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedFormats.includes(coverImage.mimetype)) {
        return next(
          new ErrorHandler(
            "Invalid file type. Only JPG, PNG, and WEBP formats are allowed!",
            400
          )
        );
      }

      // Upload the new image
      coverImageRes = await cloudinary.uploader.upload(coverImage.tempFilePath);

      if (!coverImageRes || coverImageRes.error) {
        return next(
          new ErrorHandler("Error occurred while uploading the image!", 500)
        );
      }
    }

    let blogToBeUpdated = await Blog.findById(req.params.id);

    if (blogToBeUpdated.user.toString() !== req.user.id) {
      return res.json({
        message: "User not allowed to perform this action.",
      });
    }

    const updatedData = {
      title,
      description,
      user: req.user.id,
    };
    if (coverImageRes) {
      updatedData.coverImage = coverImageRes.secure_url;
    }

    let updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true }
    );
    return res.json({ message: "Blog updated successfully.", updatedBlog });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.get("/get-all-blogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find();
    return res.json({ message: "All Blogs", blogs: allBlogs });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

module.exports = router;
