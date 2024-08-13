import { Link } from "react-router-dom";
import "./Blog.css";

const Blog = ({ id, title, description, imageUrl }) => {
  return (
    <div
      className="card blog-card m-3 col"
      style={{
        width: "20rem",
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="blog-image-wrapper">
        <img
          src={require(`../images/${imageUrl}`)}
          className="card-img-top"
          alt="Image"
        />
        <div className="image-overlay"></div>
      </div>
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 30)}...</h5>
        <p className="card-text text-muted">{description.slice(0, 50)}...</p>
        <Link to={`/blogs/${id}`} className="btn btn-primary btn-custom">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Blog;
