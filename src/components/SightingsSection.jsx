import React, { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SightingsSection = () => {
  const [sightings, setSightings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch data from db.json (port 3002)
  useEffect(() => {
    fetch("http://localhost:3002/sightings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch sightings");
        }
        return response.json();
      })
      .then((data) => {
        setSightings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sightings:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  // Show only the latest 3 sightings
  const limitedSightings = sightings.slice(0, 3);

  return (
    <section id="sightings" className="py-5 text-center">
      <div className="container">
        <h2 className="mb-4">Recent Sightings</h2>

        <div className="row g-4">
          {limitedSightings.length > 0 ? (
            limitedSightings.map((item) => (
              <div className="col-md-4" key={item.id}>
                <Card className="shadow-sm border-0 h-100">
                  {item.image && (
                    <Card.Img
                      variant="top"
                      src={item.image}
                      alt={item.animalName}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className="text-capitalize">{item.animalName}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <p className="text-muted mb-1">
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p className="text-muted">
                      <strong>Date:</strong> {item.date}
                    </p>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-muted">No sightings available.</p>
          )}
        </div>

        {sightings.length > 3 && (
          <Button
            variant="outline-success"
            size="lg"
            className="mt-4"
            onClick={() => navigate("/reports")}
          >
            View All Reports
          </Button>
        )}
      </div>
    </section>
  );
};

export default SightingsSection;
