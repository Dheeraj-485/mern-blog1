import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Comment = ({ blogId, userId }) => {
  const [comments, setComments] = useState([])
  const [reply, setReply] = useState({})
  const { id } = useParams()

  async function getComments() {
    const url = `http://localhost:8000/comment/get-blog-comments/${id}`
    try {
      const response = await axios.get(url)
      const data = response.data.comments
      setComments(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getComments()
  }, [id])

  const handleReplyChange = (e, commentId) => {
    setReply({ ...reply, [commentId]: e.target.value })
  }

  const handleReplySubmit = async (parentCommentId) => {
    try {
      await axios.post(`http://localhost:8000/comment/add`, {
        blogId: id,
        userId: userId,
        parentCommentId,
        content: reply[parentCommentId],
      })
      setReply({ ...reply, [parentCommentId]: "" })
      getComments()
    } catch (error) {
      console.log(error)
    }
  }

  const renderComments = (comments, parentId = null) => {
    return comments
      .filter((comment) => comment.parentCommentId === parentId)
      .map((comment) => (
        <div key={comment._id} className="container mb-2 border">
          <img
            src={require(`../images/default.jpeg`)}
            width="50px"
            height="50px"
            alt="user"
          />
          <span>{comment.user?.name}</span>
          <pre>{comment.content}</pre>
          <button
            className="btn"
            onClick={() => setReply({ ...reply, [comment._id]: "" })}
          >
            reply
          </button>
          {reply[comment._id] !== undefined && (
            <div className="reply-container">
              <textarea
                value={reply[comment._id]}
                onChange={(e) => handleReplyChange(e, comment._id)}
              ></textarea>
              <button
                className="btn"
                onClick={() => handleReplySubmit(comment._id)}
              >
                Submit Reply
              </button>
            </div>
          )}
          {renderComments(comments, comment._id)}
        </div>
      ))
  }

  return (
    <>
      <h5 className="container">Comments:</h5>
      {!comments ? (
        <p className="container">No comments yet.</p>
      ) : (
        renderComments(comments)
      )}
    </>
  )
}

export default Comment
