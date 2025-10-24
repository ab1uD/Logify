import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${isSignup ? "Signup" : "Login"} successful for`, form.username);
    navigate("/sightings");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "2rem",
          borderRadius: "10px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p
          onClick={() => setIsSignup(!isSignup)}
          style={{
            marginTop: "1rem",
            color: "#4caf50",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {isSignup
            ? "Already have an account? Log in"
            : "Don’t have an account? Sign up"}
        </p>
      </form>
    </div>
  );
};

export default Login;
