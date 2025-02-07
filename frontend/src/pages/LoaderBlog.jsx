import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderBlog = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "50vh" }}
    >
      <Spinner animation="border" variant="success" />
    </div>
  );
};

export default LoaderBlog;
