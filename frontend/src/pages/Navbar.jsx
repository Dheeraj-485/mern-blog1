import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blogs
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-warning mx-2"
                  to="/login"
                  role="button"
                >
                  Log In
                </Link>
                <Link
                  className="btn btn-warning mx-2"
                  to="/signup"
                  role="button"
                >
                  Sign Up
                </Link>
              </form>
            ) : (
              <>
                <Link to="/createblog" className="btn btn-success m-1">
                  Create Blog
                </Link>
                <Link to={`/dashboard`} className="btn btn-info m-2">
                  Dashboard
                </Link>

                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
