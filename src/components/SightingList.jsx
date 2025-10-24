import SightingCard from "./SightingCard";
import { useEffect, useState } from "react";

export default function SightingList() {
  const [sightings, setSightings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3004/sightings")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setSightings(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // 🧹 Handle deletion of a sighting
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this sighting?")) return;

    fetch(`http://localhost:3004/sightings/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete sighting");
        // Update local state after deleting from DB
        setSightings((prev) => prev.filter((s) => s.id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🐾 Recent Wildlife Sightings</h2>

      {sightings.length === 0 ? (
        <p>No sightings yet. Be the first to report one!</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {sightings.map((sighting) => (
            <SightingCard
              key={sighting.id}
              sighting={sighting}
              onDelete={() => handleDelete(sighting.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
