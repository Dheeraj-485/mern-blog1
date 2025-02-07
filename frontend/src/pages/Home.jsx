import React, { useEffect, useState } from "react";
import Blogs from "./Blogs";
import HomePage from "../assets/HomePage.png";
import about from "../assets/about.png";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import { motion } from "framer-motion";

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
};
function Home() {
  const isLogin = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);
  const [showBlogs, setShowBlogs] = useState(false);

  // Simulate loading delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setShowBlogs(true);
    }, 2000); // Simulated 2-second loading time
  }, []);
  return (
    <>
      <div className="container-fluid d-flex flex-column flex-lg-row justify-content-center align-items-center py-5">
        <div className="col-lg-6 text-center text-lg-start mb-4 mb-lg-0">
          <div>
            <p className="h1 fw-bold">A Place To Read</p>
            <p className="h1 fw-bold">Write and Connect</p>
          </div>
          <p className="lead fw-semibold py-4">
            It is easy and free to post your thinking on any topics and connect
            with millions of readers.
          </p>
          <div className="d-flex justify-content-center justify-content-lg-start">
            <Link to={isLogin ? "/createblog" : "/signup"}>
              <button className="btn btn-success">Get Started</button>
            </Link>
          </div>
        </div>

        <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
          <motion.img
            src={HomePage}
            alt="Home Page"
            className="img-fluid"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
      </div>
      {/* <div className="d-flex justify-content-center mx-4">
        <Blogs />
      </div> */}

      {/* Blog Section */}
      <div className="d-flex justify-content-center mx-4">
        {isLoading ? (
          <Loader /> // Show loader while fetching blogs
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }} // Start hidden & move up
            animate={{ opacity: 1, y: 0 }} // Fade in & move up
            transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
          >
            <Blogs />
          </motion.div>
        )}
      </div>

      <div
        className="d-flex align-items-center justify-content-center mt-5 bg-light"
        style={{ minHeight: "80vh" }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <div className="d-none d-lg-block col-lg-6">
            <img src={about} alt="About" className="img-fluid" />
          </div>
          <div className="col-lg-6 text-center text-lg-left">
            <div>
              <p className="display-4 font-weight-bold">Publish, Grow, Gain</p>
              <p className="display-4 font-weight-bold">
                Knowledge in One Place
              </p>
            </div>
            <p className="lead font-weight-semibold py-4">
              If you have knowledge to share, or a perspective
              <br /> to offer - Welcome home.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <Link to={isLogin ? "/createblog" : "/login"}>
                <button className="btn btn-success">Let's Start</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
