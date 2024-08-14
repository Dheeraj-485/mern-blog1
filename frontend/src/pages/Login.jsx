import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = "https://mern-blog1-1-z0ns.onrender.com/user/sign-in";
    try {
      const response = await axios.post(url, user);
      const token = response?.data?.token;
      localStorage.setItem("token", token);
      toast.success("Logged in successfully.", { position: "top-center" });
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or Password", { position: "top-center" });
    }
    setIsSubmitting(false);
  };
  return (
    <section className="loginSec container mt-5">
      <div className="loginForm">
        <form onSubmit={handleSubmit}>
          <h2>Login Page</h2>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleInputChange}
          />

          <button type="submit" className="loginBtn">
            {isSubmitting ? "Submitting..." : "Login"}
          </button>
        </form>
        <div>
          Don't Have an Account. <a href="/signup">Sign Up</a>
        </div>
      </div>
    </section>
  );
};
export default Login;
