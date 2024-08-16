import axios from "axios";
import { useEffect, useState } from "react";
import Blog from "./Blog";
import { BASE_URL } from "../BaseUrl";

const Blogs = () => {
  const [blogs, setBlogs] = useState(null);

  async function getAllBlogs() {
    const url = `${BASE_URL}blog/get-all-blogs`;

    try {
      const allBlogs = await axios.get(url);
      const data = allBlogs?.data?.blogs;

      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div className="container mt-3">
      <h4 className="mt-4 mb-4">All Blogs</h4>
      <div className="d-flex justify-content-around row row-cols-4">
        {blogs &&
          blogs.map((blog) => (
            <Blog
              key={blog._id}
              id={blog._id}
              title={blog.title}
              description={blog.description}
              imageUrl={blog.coverImage}
            />
          ))}
      </div>
    </div>
  );
};
export default Blogs;
