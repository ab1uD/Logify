import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3002/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to send message");
        }
        return response.json();
      })
      .then((data) => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); 
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("An error occurred while sending your message.");
      });
  };

  return (
    <section id="contact" className="py-5 text-center bg-light">
      <div className="container" style={{ maxWidth: "600px" }}>
        <h2 className="mb-4 fw-bold">Contact Us</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              name="message"
              rows={4}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" size="lg">
            Send Message
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default ContactUs;

