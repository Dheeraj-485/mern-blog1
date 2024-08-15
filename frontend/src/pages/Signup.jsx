import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Signup.css";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(null);

  const [error, setError] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = "https://mern-blog1-1-z0ns.onrender.com/user/sign-up";
    try {
      const response = await axios.post(url, user);
      toast.success("Account Created Successfully.", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
     if (
        error?.response &&
        error?.response?.data &&
        error?.response?.data?.message
      ) {
        toast.error(error?.response?.data?.message, { position: "top-center" });
      } else {
        toast.error("Something went wrong. Please try again later.", {
          position: "top-center",
        });
      }
    }
    setIsSubmitting(false);
  };
  return (
    <section className="signupPage container mt-5">
      <div className="signUpform">
        <form onSubmit={handleSubmit}>
          <h2>Signup Page</h2>

          <label htmlFor="name" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={handleInputChange}
            required
          />

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
            required
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
            required
          />

          <button type="submit" className="signupBtn">
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>
        <div>
          Have an Account. <a href="/login">Sign In</a>
        </div>
      </div>
    </section>
  );
};
export default Signup;
