import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ReportSighting = () => {
  const { username } = useParams(); 
  const [currentUser, setCurrentUser] = useState(null);
  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    animalName: "",
    description: "",
    location: "",
    date: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3002/users?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setCurrentUser(data[0]);
        } else {
          alert("User not found.");
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, [username]);

  useEffect(() => {
    fetch("http://localhost:3002/sightings")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error("Error fetching reports:", err));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 
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


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert("User not found. Please log in again.");
      return;
    }

    if (!formData.animalName || !formData.description || !formData.location || !formData.date) {
      alert("Please fill all fields.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      const dataToSend = {
        ...formData,
        image: base64Image,
        user: currentUser.username, 
      };

      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `http://localhost:3002/sightings/${editId}`
        : "http://localhost:3002/sightings";

      fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save sighting");
          return res.json();
        })
        .then(() => {
          alert(editId ? "Sighting updated!" : "Sighting reported!");
          setFormData({
            animalName: "",
            description: "",
            location: "",
            date: "",
            image: null,
          });
          setPreview(null);
          setEditId(null);

        
          fetch("http://localhost:3002/sightings")
            .then((res) => res.json())
            .then((data) => setReports(data));
        })
        .catch((err) => {
          console.error("Error submitting sighting:", err);
          alert("Error occurred. Please try again.");
        });
    };

    if (formData.image) reader.readAsDataURL(formData.image);
  };

  
  const myReports = reports.filter((r) => r.user === currentUser?.username);

 
  const handleEdit = (report) => {
    if (report.user !== currentUser?.username) {
      alert("You can only edit your own reports.");
      return;
    }

    setEditId(report.id);
    setFormData({
      animalName: report.animalName,
      description: report.description,
      location: report.location,
      date: report.date,
      image: null,
    });
    setPreview(report.image);
  };

  return (
    <div>
    <section id="report" className="py-5 bg-light">
          
      <div className="container">
      <h4 className="text-center mb-4 fw-bold">Report a Wildlife Sighting</h4>
        <div className="row">
        
          <div className="col-md-4 mb-4">
            <h4 className="text-success mb-3 text-center">
              {currentUser ? `${currentUser.username}'s Reports` : "Your Reports"}
            </h4>
            {myReports.length > 0 ? (
              myReports.map((report) => (
                <Card key={report.id} className="mb-3 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={report.image}
                    alt={report.animalName}
                    style={{ maxHeight: "180px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{report.animalName}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {report.location} <br />
                      <strong>Date:</strong> {report.date} <br />
                      <small>{report.description}</small>
                    </Card.Text>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleEdit(report)}
                    >
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p className="text-muted text-center">No reports found.</p>
            )}
          </div>

        
          <div className="col-md-7">
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
                  required={!editId}
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
                  {editId ? "Update Report" : "Submit Report"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ReportSighting;
