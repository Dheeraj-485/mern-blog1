import { useState, useEffect } from "react"
import Blog from "./Blog"

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState(null)

  async function fetchBlogs() {
    const url = "https://mern-blog1-1-z0ns.onrender.com/blog/get-my-blogs"

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })

      const json = await response.json()
      const data = json?.blogs
      setMyBlogs(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])
  return (
    <>
      <h3>My Blogs</h3>
      <div className="container m-2">
        <div className="row row-cols-4">
          {myBlogs ? (
            myBlogs.map((blog) => (
              <Blog
                key={blog?._id}
                id={blog?._id}
                title={blog?.title}
                description={blog?.description}
                imageUrl={blog.coverImage}
              />
            ))
          ) : (
            <p>Oops, no Blog found.</p>
          )}
        </div>
      </div>
    </>
  )
}
export default MyBlogs
