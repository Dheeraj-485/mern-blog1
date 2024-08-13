import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white p-4 text-center">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <ul className="list-inline">
              <li className="list-inline-item mx-3">
                <a href="/" className="text-white">
                  <i className="fas fa-home fa-lg"></i> Home
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a
                  href="https://github.com"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-github fa-lg"></i> GitHub
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a
                  href="https://linkedin.com"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-linkedin fa-lg"></i> LinkedIn
                </a>
              </li>
              <li className="list-inline-item mx-3">
                <a
                  href="https://instagram.com"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram fa-lg"></i> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
