import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const ReportSighting = () => {
  const [formData, setFormData] = useState({
    animalName: "",
    description: "",
    location: "",
    date: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // Handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.animalName || !formData.description || !formData.location || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    // Convert image to base64 for storage in db.json
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      const dataToSend = {
        animalName: formData.animalName,
        description: formData.description,
        location: formData.location,
        date: formData.date,
        image: base64Image,
      };

      fetch("http://localhost:3002/sightings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to submit sighting");
          }
          return response.json();
        })
        .then(() => {
          alert("Sighting reported successfully!");
          setFormData({
            animalName: "",
            description: "",
            location: "",
            date: "",
            image: null,
          });
          setPreview(null);
        })
        .catch((error) => {
          console.error("Error submitting sighting:", error);
          alert("An error occurred. Please try again.");
        });
    };

    if (formData.image) {
      reader.readAsDataURL(formData.image);
    } else {
      alert("Please attach a photo before submitting.");
    }
  };

  return (
    <section id="report" className="py-5 bg-light">
      <div className="container" style={{ maxWidth: "700px" }}>
        <h2 className="text-center mb-4 fw-bold">Report a Wildlife Sighting</h2>
        <Form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
          <Form.Group className="mb-3">
            <Form.Label>Animal Name</Form.Label>
            <Form.Control
              type="text"
              name="animalName"
              placeholder="Enter animal name"
              value={formData.animalName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Describe the sighting"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              placeholder="Where was the animal spotted?"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Attach Photo</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </Form.Group>

          {preview && (
            <Card className="mb-4">
              <Card.Header>Preview</Card.Header>
              <Card.Img
                variant="top"
                src={preview}
                alt="Preview"
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{formData.animalName || "Unnamed Animal"}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {formData.description || "N/A"}
                  <br />
                  <strong>Location:</strong> {formData.location || "N/A"}
                  <br />
                  <strong>Date:</strong> {formData.date || "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          )}

          <div className="text-center">
            <Button type="submit" variant="success" size="lg">
              Submit Report
            </Button>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default ReportSighting;
