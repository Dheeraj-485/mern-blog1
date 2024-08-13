import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const EditBlog = () => {
  const { id } = useParams()
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    coverImage: "",
  })
  const [image, setImage] = useState()

  async function getBlogData() {
    const url = `http://localhost:8000/blog/blog-details/${id}`

    try {
      const response = await axios.get(url)
      const data = response?.data?.blog
      setBlogData({
        ...blogData,
        title: data?.title,
        description: data?.description,
        coverImage: data?.coverImage.toString(),
      })
      //   console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBlogData()
  }, [])

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setBlogData({ ...blogData, [name]: value })
  }

  const handleImageChange = (e) => {
    console.log(e.target.files[0])
    setImage(e.target.files[0])
  }

  //   const handleSubmit = async (e) => {
  //     e.preventDefault()
  //     const url = "http://localhost:8000/blog/create-blog"
  //     const formData = new FormData()
  //     formData.append("image", image)
  //     formData.append("title", blogData.title)
  //     formData.append("description", blogData.description)

  //     try {
  //       const response = await axios.post(url, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       })

  //       console.log(response)
  //       toast.success("Blog created Successfully.", { position: "top-center" })
  //       navigate("/")
  //       setBlogData({ title: "", description: "" })
  //       setImage(null)
  //     } catch (error) {
  //       toast.error("Something went wrong.", { position: "top-center" })
  //     }
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(image)
    const url = `http://localhost:8000/blog/edit-blog/${id}`
    console.log(url)
    const formData = new FormData()
    formData.append("image", image)
    formData.append("title", blogData.title)
    formData.append("description", blogData.description)

    try {
      const response = await axios.patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      })
      console.log(response)
      toast.success("Blog updated Successfully.", { position: "top-center" })
      navigate("/")
      setBlogData({ title: "", description: "" })
      setImage(null)
    } catch (error) {
      toast.error("Something went wrong.", { position: "top-center" })
    }
  }
  return (
    <>
      {blogData && (
        <form className="container mt-5" onSubmit={handleSubmit}>
          <h4 className="m-2">Edit Blog</h4>
          <div className="mb-3 mt-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="title"
              placeholder="Enter title"
              value={blogData.title}
              onChange={handleInputChange}
              required={true}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              //   value={image}
              onChange={handleImageChange}
            />
          </div>
          <div className="mb-3 mt-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              cols="10"
              rows="5"
              aria-describedby="description"
              placeholder="Enter description"
              value={blogData.description}
              onChange={handleInputChange}
              required={true}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      )}
    </>
  )
}
export default EditBlog
