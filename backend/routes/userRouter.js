const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const isVerified = require("../middlewares/findUser");

dotenv.config();

const secret = process.env.JWT_SECRET;

router.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already in use, please use different email.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({ message: "User created Successfully.", user: newUser });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect Password." });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, secret);

    return res.json({ message: "Logged in Successfully.", user, token });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

router.get("/get-user-details", isVerified, async (req, res) => {
  const userId = req.user.id;
  try {
    const userDetails = await User.findById(userId);
    return res.json({ message: "User Details", user: userDetails });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

module.exports = router;
