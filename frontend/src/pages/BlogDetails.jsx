import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Comment, AddComment } from "./index";

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const { id } = useParams();

  async function fetchBlogDetails() {
    const urlForBlog = `http://localhost:8000/blog/blog-details/${id}`;
    try {
      const response = await axios.get(urlForBlog);
      const blogData = response?.data?.blog;
      const userData = response?.data?.blog?.user;

      setBlogDetails(blogData);
      setUserDetails(userData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  return (
    <section className="container my-5">
      <h4 className="text-center mb-4">Blog Details</h4>
      {blogDetails && (
        <div className="card border-light shadow-sm mb-4">
          <div className="card-body">
            <h3 className="card-title mb-3">{blogDetails?.title}</h3>
            <div className="d-flex align-items-center mb-4">
              <img
                src={require(`../images/default.jpeg`)}
                alt="User"
                className="rounded-circle me-3"
                width="60"
                height="60"
              />
              <span className="fw-bold">{userDetails?.name}</span>
            </div>
            <img
              src={require(`../images/${blogDetails?.coverImage}`)}
              alt="Cover"
              className="img-fluid rounded mb-3"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
            <div className="mb-4 p-3 bg-light border rounded">
              <h5 className="mb-2">Description</h5>
              <p className="mb-0 text-muted">{blogDetails?.description}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              {localStorage.getItem("token") ? (
                <AddComment blogId={id} userId={blogDetails?.id} />
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login to Comment
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
      <Comment />
    </section>
  );
};

export default BlogDetails;
