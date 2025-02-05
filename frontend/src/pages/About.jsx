import React from "react";

const About = () => {
  return (
    <div className="container my-5 ">
      <h2 className="text-center">About Us</h2>
      <p className="lead text-center">
        Welcome to our blogging platform! We aim to provide a space where
        everyone can share their thoughts, experiences, and ideas freely.
      </p>
      <div className="row mt-4">
        <div className="col-md-6">
          <h4>Our Mission</h4>
          <p>
            Our goal is to empower writers, bloggers, and readers by providing a
            seamless platform to publish and explore insightful content.
          </p>
        </div>
        <div className="col-md-6">
          <h4>Why Choose Us?</h4>
          <ul>
            <li>Easy-to-use blogging interface</li>
            <li>Secure authentication & user-friendly dashboard</li>
            <li>Beautiful and responsive design</li>
            <li>Active community and engaging content</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
