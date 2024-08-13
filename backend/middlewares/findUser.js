const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

const secret = process.env.JWT_SECRET

const fetchUser = (req, res, next) => {
  //get user from jwt_token
  const token = req.header("Authorization")

  if (!token) {
    return res.status(401).json({ message: "Access Denied." })
  }

  try {
    const payload = jwt.verify(token, secret)
    req.user = payload.user

    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token." })
  }
}

module.exports = fetchUser
