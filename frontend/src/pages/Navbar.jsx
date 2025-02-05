// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useNavigate, Outlet } from "react-router-dom";

// const Navbar = () => {
//   let location = useLocation();
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?title=${encodeURIComponent(searchQuery)}`);
//     }
//   };

//   const handleLogout = () => {
//     navigate("/login");
//     localStorage.removeItem("token");
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
//         <div className="container-fluid">
//           <Link className="navbar-brand" to="/">
//             Blogs
//           </Link>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarSupportedContent"
//             aria-controls="navbarSupportedContent"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0">
//               <li className="nav-item mx-2">
//                 <Link
//                   className={`nav-link ${
//                     location.pathname === "/" ? "active" : ""
//                   }`}
//                   aria-current="page"
//                   to="/"
//                 >
//                   Home
//                 </Link>
//               </li>
//             </ul>

//             {/* Search Bar */}
//             <form className="d-flex" onSubmit={handleSearch}>
//               <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search blogs..."
//                 aria-label="Search"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <button className="btn btn-outline-light" type="submit">
//                 Search
//               </button>
//             </form>
//             {!localStorage.getItem("token") ? (
//               <form className="d-flex" role="search">
//                 <Link
//                   className="btn btn-warning mx-2"
//                   to="/login"
//                   role="button"
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   className="btn btn-warning mx-2"
//                   to="/signup"
//                   role="button"
//                 >
//                   Sign Up
//                 </Link>
//               </form>
//             ) : (
//               <>
//                 <Link to="/createblog" className="btn btn-success m-1">
//                   Create Blog
//                 </Link>
//                 <Link to={`/dashboard`} className="btn btn-info m-2">
//                   Dashboard
//                 </Link>

//                 <button onClick={handleLogout} className="btn btn-danger">
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//       <Outlet />
//     </div>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Handles search input submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?title=${encodeURIComponent(searchQuery)}`);
    }
    // setSearchQuery("");
  };

  // Logout function
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          {/* Brand Name */}
          <Link className="navbar-brand fw-bold text-light" to="/">
            🚀 Blogs
          </Link>

          {/* Responsive Toggle Button */}
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

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center mb-2 mb-lg-0">
              {/* Home Button */}
              <li className="nav-item mx-2">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  to="/"
                >
                  🏠 Home
                </Link>
              </li>
            </ul>

            {/* Search Bar */}
            <form className="d-flex me-3" onSubmit={handleSearch}>
              <input
                className="form-control me-2 rounded-pill" // Added rounded corners for a smooth look
                type="search"
                placeholder="🔍 Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-light px-3 rounded-pill"
                type="submit"
              >
                Search
              </button>
            </form>

            {/* Authentication & User Actions */}
            {!localStorage.getItem("token") ? (
              <div className="d-flex">
                {/* Login & Signup Buttons Styled Similarly */}
                <Link
                  className="btn btn-primary mx-2 rounded-pill px-3"
                  to="/login"
                >
                  🔐 Log In
                </Link>
                <Link
                  className="btn btn-primary mx-2 rounded-pill px-3"
                  to="/signup"
                >
                  📝 Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                {/* Create Blog Button */}
                <Link
                  to="/createblog"
                  className="btn btn-success mx-2 rounded-pill px-3"
                >
                  ✍️ Create Blog
                </Link>

                {/* Dashboard Button */}
                <Link
                  to={`/dashboard`}
                  className="btn btn-info mx-2 rounded-pill px-3"
                >
                  📊 Dashboard
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="btn btn-danger mx-2 rounded-pill px-3"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Render Other Components */}
      <Outlet />
    </div>
  );
};

export default Navbar;
