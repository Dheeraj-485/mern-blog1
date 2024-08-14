import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AddComment = ({ blogId, userId }) => {
  const [comment, setComment] = useState({
    content: "",
    user: "",
    blog: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const url = "https://mern-blog1-1-z0ns.onrender.com/comment/add-comment";
    const commentData = {
      content: comment.content,
      user: userId,
      blog: blogId,
    };
    try {
      const response = await axios.post(url, commentData, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      toast.success("Comment added.", { position: "top-center" });

      setComment({ content: "", user: "", blog: "" });
    } catch (error) {
      toast.error("Something went wrong.", { position: "top-center" });
    }
  }

  return (
    <div className="container my-4">
      <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleSubmit}>
        <h5 className="mb-4">Leave a Comment</h5>
        <div className="mb-3">
          <label className="form-label" htmlFor="content">
            Comment
          </label>
          <textarea
            id="content"
            name="content"
            className="form-control"
            rows="3"
            placeholder="Write your comment here..."
            value={comment.content}
            onChange={(e) =>
              setComment({ ...comment, content: e.target.value })
            }
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default AddComment;
