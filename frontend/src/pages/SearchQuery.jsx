import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Extract search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("title");

  useEffect(() => {
    const fetchResults = async () => {
      if (!searchQuery) return;

      try {
        const response = await fetch(
          `https://mern-blog1-1-z0ns.onrender.com//blog/query?title=${encodeURIComponent(
            searchQuery
          )}`
        );

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setBlogs(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <div className="container mt-4">
      <h2>Search Results for "{searchQuery}"</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && blogs.length === 0 && (
        <p>No blogs found for "{searchQuery}". Try a different search!</p>
      )}

      <div className="row">
        {blogs.map((blog) => (
          <div key={blog._id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{blog.title}</h5>
                <div className="blog-image-wrapper">
                  <img
                    src={blog.coverImage}
                    className="card-img-top"
                    alt="Image"
                  />
                  <div className="image-overlay"></div>
                </div>
                <p className="card-text">
                  {blog.description.length > 100
                    ? `${blog.description.substring(0, 100)}...`
                    : blog.description}
                </p>
                <a href={`/blogs/${blog._id}`} className="btn btn-primary">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
