const express = require("express")
const path = require("path")
const userRoutes = require("./routes/userRouter")
const blogRoutes = require("./routes/blogRouter")
const commentRoutes = require("./routes/commentRouter")
const cors = require("cors")
const connectToMongoDB = require("./db")

const app = express()

const PORT = process.env.PORT || 8000
connectToMongoDB()

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve("./public")))
app.use("/user", userRoutes)
app.use("/blog", blogRoutes)
app.use("/comment", commentRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening at the PORT : ${PORT}`)
})
