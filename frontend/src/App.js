import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
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
import { Footer } from "./pages/Footer";

//create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="blogs/:id" element={<BlogDetails />} />
      <Route path="createblog" element={<CreateBlog />} />
      <Route path="blog" element={<Blog />} />
      <Route path="myblogs" element={<MyBlogs />} />
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="editblog/:id" element={<EditBlog />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
      {/* <Footer /> */}
    </div>
  );
}

export default App;
