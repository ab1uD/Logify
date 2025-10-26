import React, { useEffect, useState } from "react";
import { Card, Spinner, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3002/sightings")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch sightings");
        return res.json();
      })
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
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

  const handleBack = () => {
    navigate("/sightings");
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">All Wildlife Sightings</h2>
      
      <Row className="g-4">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Col md={4} key={report.id}>
              <Card className="shadow-sm border-0 h-100">
                {report.image && (
                  <Card.Img
                    variant="top"
                    src={report.image}
                    alt={report.animalName}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{report.animalName}</Card.Title>
                  <Card.Text>{report.description}</Card.Text>
                  <p className="text-muted mb-1">
                    <strong>Location:</strong> {report.location}
                  </p>
                  <p className="text-muted">
                    <strong>Date:</strong> {report.date}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No reports available.</p>
        )}
      </Row>

      <div className="text-center mt-5">
        <Button variant="outline-success" size="lg" onClick={handleBack}>
          ← Back to Sightings
        </Button>
      </div>
    </Container>
  );
};

export default AllReports;

