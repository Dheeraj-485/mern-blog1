// import { Toaster } from "react-hot-toast";

// import {
//   createBrowserRouter,
//   Route,
//   createRoutesFromElements,
//   RouterProvider,
//   Outlet,
// } from "react-router-dom";
// import {
//   Home,
//   Login,
//   Signup,
//   CreateBlog,
//   NotFound,
//   Blog,
//   Blogs,
//   BlogDetails,
//   Navbar,
//   MyBlogs,
//   DashBoard,
//   EditBlog,
// } from "./pages/index";
// import SearchResults from "./pages/SearchQuery";
// import Footer from "./pages/Footer";
// import Contact from "./pages/Contact";

// const Layout = () => {
//   return (
//     <>
//       <Navbar />
//       <Outlet />
//       <Footer />
//     </>
//   );
// };
// //create router
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<Navbar />}>
//         <Route path="/search" element={<SearchResults />} />

//         <Route index element={<Home />} />
//         <Route path="signup" element={<Signup />} />
//         <Route path="login" element={<Login />} />
//         <Route path="blogs" element={<Blogs />} />
//         <Route path="blogs/:id" element={<BlogDetails />} />
//         <Route path="createblog" element={<CreateBlog />} />
//         <Route path="blog" element={<Blog />} />
//         <Route path="myblogs" element={<MyBlogs />} />
//         <Route path="dashboard" element={<DashBoard />} />
//         <Route path="editblog/:id" element={<EditBlog />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="*" element={<NotFound />} />
//       </Route>
//       {/* <Footer /> */}
//     </>
//   )
// );
// function App() {
//   return (
//     <div>
//       <RouterProvider router={router} />
//       <Toaster />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Home,
  Login,
  Signup,
  CreateBlog,
  NotFound,
  Blog,
  Blogs,
  BlogDetails,
  Navbar,
  MyBlogs,
  DashBoard,
  EditBlog,
} from "./pages/index";
import SearchResults from "./pages/SearchQuery";
import Footer from "./pages/Footer";
import Contact from "./pages/Contact";
import About from "./pages/About";

// Layout Component to wrap Navbar, Page Content, and Footer
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content">{children}</div> {/* Allows flex-grow */}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/myblogs" element={<MyBlogs />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/editblog/:id" element={<EditBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
