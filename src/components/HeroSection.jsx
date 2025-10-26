import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); 

  return (
    <section className="hero text-center text-light d-flex align-items-center justify-content-center">
      <div className="container">
        <h1 className="display-4 fw-bold">Welcome to Logify</h1>
        <p className="lead mb-4">
          Report and track wild animal sightings to keep our communities safe and our parks protected.
        </p>
        <Button
          onClick={() => navigate("/login")}
          variant="success"
          size="lg"
          className="me-3"
        >
          Report a Sighting
        </Button>
        <Button
          onClick={() => navigate("/sightings")}
          variant="outline-light"
          size="lg"
        >
          View Reports
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

