const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImgURL: {
    type: String,
    default: "./public/images/default.jpeg",
  },
})

const User = mongoose.model("users", userSchema)

module.exports = User
