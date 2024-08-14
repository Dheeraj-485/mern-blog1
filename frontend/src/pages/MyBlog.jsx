import { Link, Navigate } from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const MyBlog = ({ id, title, description, imageUrl }) => {
  const navigate = useNavigate()
  const handleDelete = async () => {
    const url = `https://mern-blog1-1-z0ns.onrender.com/blog/delete-blog/${id}`

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      console.log(response)
      toast.success("Blog Deleted Successfully.", { position: "top-center" })
      // Navigate("/dashboard")
    } catch (error) {
      // console.log(error)
      toast.error("Something went Wrong.", { position: "top-center" })
    }
    // console.log("Blog Deleted Successfully.")
  }
  return (
    <div className="card m-2 col" style={{ width: "18rem" }}>
      <img
        src={require(`../images/${imageUrl}`)}
        className="card-img-top"
        alt="Image"
        width="200px"
        height="200px"
      />

      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 30)}...</h5>
        <p className="card-text">{description.slice(0, 50)}...</p>
        <Link to={`/blogs/${id}`} href="#" className="btn btn-primary m-1">
          Read
        </Link>
        <Link to={`/editblog/${id}`} href="#" className="btn btn-primary m-1">
          Edit
        </Link>
        <button className="btn btn-primary m-1" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}
export default MyBlog
