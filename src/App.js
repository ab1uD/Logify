import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import SightingList from "./components/SightingList";
import SightingForm from "./components/SightingForm";
import { useState, useEffect } from "react";

function App() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/sightings")
      .then((res) => res.json())
      .then((data) => setSightings(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const addSighting = (newSighting) => setSightings([...sightings, newSighting]);
  const deleteSighting = (id) => {
    fetch(`http://localhost:3004/sightings/${id}`, { method: "DELETE" })
      .then(() => setSightings(sightings.filter((s) => s.id !== id)))
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/sightings"
          element={<SightingList onDelete={deleteSighting} />}
        />
        <Route
          path="/report"
          element={<SightingForm addSighting={addSighting} />}
        />
      </Routes>
    </>
  );
}

export default App;



