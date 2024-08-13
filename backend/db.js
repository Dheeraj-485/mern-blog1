const mongoose = require("mongoose")

const mongoURI = process.env.MONGOURL || "mongodb://127.0.0.1/blogsDatabase"

mongoose.set("strictQuery", true)

const connectToMongoDB = () => {
  try {
    mongoose.connect(mongoURI)
    console.log("Connected to database.")
  } catch (error) {
    console.log("Could not connect to database.")
  }
}

module.exports = connectToMongoDB
