import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1950&q=80")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 3rem",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(6px)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
          transition: "background-color 0.4s ease",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#4caf50",
            fontWeight: "bold",
            letterSpacing: "1px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          🐾 Logify
        </h2>

        <nav>
          <button onClick={() => navigate("/")} style={navButtonStyle}>
            Home
          </button>
          <button onClick={() => navigate("/login")} style={navButtonStyle}>
            Login
          </button>
          <button onClick={() => navigate("/sightings")} style={navButtonStyle}>
            Sightings
          </button>
          <button onClick={() => navigate("/report")} style={navButtonStyle}>
            Report
          </button>
        </nav>
      </header>



      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "brightness(0.9)",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            textShadow: "2px 2px 8px rgba(0,0,0,0.6)",
            marginBottom: "1rem",
            animation: "fadeIn 1s ease-out",
          }}
        >
          Welcome to <span style={{ color: "#4caf50" }}>Logify</span>
        </h1>

        <p
          style={{
            fontSize: "1.25rem",
            maxWidth: "650px",
            lineHeight: "1.6",
            textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
            marginBottom: "2rem",
            opacity: 0.95,
          }}
        >
          Discover, record, and share wildlife sightings from your adventures in
          nature. Join our community of explorers and protectors of the wild.
        </p>

        <button
          onClick={() => navigate("/login")}
          style={{
            padding: "14px 30px",
            fontSize: "1.1rem",
            borderRadius: "30px",
            border: "none",
            backgroundColor: "#4caf50",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Get Started
        </button>
      </main>

  
      <footer
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "1rem",
          textAlign: "center",
          fontSize: "0.9rem",
          boxShadow: "0 -2px 6px rgba(0,0,0,0.4)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Logify | Built with by Nature Lovers
        </p>
      </footer>
    </div>
  );
};

const navButtonStyle = {
  background: "transparent",
  border: "1px solid #4caf50",
  color: "#4caf50",
  padding: "8px 16px",
  marginLeft: "10px",
  borderRadius: "20px",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "all 0.3s ease",
};

export default Home;
