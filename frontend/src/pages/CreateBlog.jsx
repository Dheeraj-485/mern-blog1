import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import pic from "../images/1719401437108sample_6.jpg";
import { BASE_URL } from "../BaseUrl";

const CreateBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // setImage(reader.result);
      setImagePreview(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = `${BASE_URL}blog/create-blog`;
    const formData = new FormData();
    formData.append("coverImage", image);
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });

      console.log(response);
      toast.success("Blog created Successfully.", { position: "top-center" });
      navigate("/");
      setBlogData({ title: "", description: "" });
      setImage(null);
    } catch (error) {
      // toast.error("Something went wrong.", { position: "top-center" });
      if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.message
      ) {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          position: "top-center",
        });
      }
    }
  };
  return (
    <>
      <form className="container mt-5" onSubmit={handleSubmit}>
        <h4 className="m-2">Create new Blog</h4>
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="file"
              onChange={handleImageChange}
              style={{ border: "none" }}
            />
          </div>
        </div>
        {/* <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <img
            src={imagePreview ? `${setImagePreview}` : pic}
            alt="mainImg"
            className="mainImg"
            height="20px"
            width="20px"
          />
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div> */}
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
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </>
  );
};
export default CreateBlog;
