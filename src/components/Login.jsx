import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3002/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((users) => {
    
        const validUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (validUser) {
          alert(`Welcome back, ${validUser.username}!`);
          localStorage.setItem("loggedInUser", JSON.stringify(validUser));

          navigate(`/report/${validUser.username}`);
        } else {
          alert("Invalid email or password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred while logging in.");
      });
  };

  return (
    <div id="loginpart" className="d-flex justify-content-center align-items-center vh-100 ">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <h4 className="text-center mb-4">Login Page</h4>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-3">
          Login
        </button>

        <p className="text-center mb-0">
          Don’t have an account?{" "}
          <Link to="/register" className="text-success fw-bold text-decoration-none">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
