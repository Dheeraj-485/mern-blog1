import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <div className="row">
          {/* Brand & Description */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">🚀 Blogs</h5>
            <p className="text-muted small">
              Discover amazing stories, ideas, and insights from creators around
              the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link className="text-light text-decoration-none" to="/">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/about">
                  ℹ️ About
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/contact">
                  📩 Contact
                </Link>
              </li>
              <li>
                <Link className="text-light text-decoration-none" to="/privacy">
                  🔒 Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://facebook.com" className="text-light fs-5">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" className="text-light fs-5">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" className="text-light fs-5">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" className="text-light fs-5">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-3">
          <p className="small text-muted mb-0">
            &copy; {new Date().getFullYear()} Blogs. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
