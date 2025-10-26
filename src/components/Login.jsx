import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch users from db.json
    fetch("http://localhost:3002/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((users) => {
        // Find a matching user
        const validUser = users.find(
          (user) => user.email === email && user.password === password
        );

        if (validUser) {
          alert(`Welcome back, ${validUser.username}!`);
          localStorage.setItem("loggedInUser", JSON.stringify(validUser));

          // ✅ Redirect to dashboard dynamically
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
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

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
