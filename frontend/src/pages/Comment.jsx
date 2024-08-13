import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Comment = () => {
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  async function getComments() {
    const url = `http://localhost:8000/comment/get-blog-comments/${id}`;
    try {
      const response = await axios.get(url);
      const data = response?.data?.comments;
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(() => {
    getComments();
  }, [id]);

  async function handleReply(parentComment, userId) {
    const reply = prompt("Enter your reply:");
    if (reply) {
      console.log("Reply:", reply);
    }
  }

  return (
    <div className="container my-4">
      <h5 className="mb-4">Comments:</h5>
      {!comments.length ? (
        <p className="text-muted">No comments yet.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="card mb-3 border-light shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-start mb-2">
                <img
                  src={require(`../images/default.jpeg`)}
                  alt="User"
                  className="rounded-circle me-3"
                  width="50"
                  height="50"
                />
                <div>
                  <h6 className="card-subtitle mb-1 text-primary">
                    {comment?.user?.name}
                  </h6>
                  <p className="card-text mb-2">{comment.content}</p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleReply(comment._id, comment?.user?._id)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Comment;
