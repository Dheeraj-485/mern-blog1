import axios from "axios";
import React from "react";
import { MyBlog } from "./index";
import { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/Dashboard.css"; // Create a CSS file for custom styles
import { BASE_URL } from "../BaseUrl";

function DashBoard() {
  const [userData, setUserData] = useState(null);
  const [blogData, setBlogData] = useState(null);

  async function fetchUserData() {
    const url = `${BASE_URL}user/get-user-details`;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = response?.data?.user;
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchUserBlogs() {
    const url = `${BASE_URL}blog/get-my-blogs`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = response?.data?.blogs;
      setBlogData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchUserBlogs();
  }, []);

  return (
    <>
      <div className="dashboard">
        <h3 className="text-center mb-4">Dashboard</h3>

        {userData && (
          <div className="container user-info bg-light p-4 rounded shadow-sm mb-4">
            <h4>Welcome Back, {userData.name}</h4>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>
        )}
        <h4 className="text-center mb-4">My Blogs</h4>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {blogData &&
              blogData.map((blog) => (
                <MyBlog
                  key={blog._id}
                  id={blog._id}
                  title={blog.title}
                  description={blog.description}
                  imageUrl={blog.coverImage}
                />
              ))}
          </div>
        </div>
      </div>
      {!blogData ? (
        <p className="container not-found">Oops, No Blogs Found.</p>
      ) : null}
    </>
  );
}

export default DashBoard;
