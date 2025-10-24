import { useState } from "react";
import "../App.css";
import "../index.css";


export default function SightingForm({ addSighting }) {
  const [form, setForm] = useState({
    animalName: "",
    description: "",
    location: "",
    date: "",
    image: "",
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.animalName ||
      !form.description ||
      !form.location ||
      !form.date
    ) {
      alert("All fields are required!");
      return;
    }

    fetch("http://localhost:3004/sightings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => {
        addSighting(data);
        setForm({
          animalName: "",
          description: "",
          location: "",
          date: "",
          image: "",
        });
        setPreview(null);
        alert("Sighting added successfully!");
      })
      .catch((err) => console.error("Save error:", err));
  };

  return (
    <div className="container ">

    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2 className="text-white">Report a New Sighting</h2>
      <form onSubmit={handleSubmit}>
        <label className="text-white" >Animal Name</label>
        <br />
        <input
          type="text"
          name="animalName"
          value={form.animalName}
          onChange={handleChange}
        />
        <br />

        <label className="text-white" >Description</label>
        <br />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
        <br />

        <label  className="text-white">Location</label>
        <br />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
        />
        <br />

        <label className="text-white" >Date</label>
        <br />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <br />

        <label className="text-white" >Upload Photo</label>
        <br />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <br />

        {preview && (
          <div style={{ marginTop: "1rem" }}>
            <p  className="text-white">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        )}

        <br />
        <button  className="bg-primary"  type="submit" style={{ marginTop: "1rem" }}>
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

