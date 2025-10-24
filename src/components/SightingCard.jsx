export default function SightingCard({ sighting, onDelete }) {
  const { animalName, description, location, date, image } = sighting;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "10px",
        background: "#f9f9f9",
      }}
    >
      {image && (
        <img
          src={image}
          alt={animalName}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      )}
      <h3>{animalName}</h3>
      <p>{description}</p>
      <p>
        <strong>Location:</strong> {location}
      </p>
      <p>
        <strong>Date:</strong> {date}
      </p>
      <button
        onClick={onDelete}
        style={{
          backgroundColor: "#d9534f",
          color: "white",
          border: "none",
          padding: "8px 12px",
          borderRadius: "6px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Delete
      </button>
    </div>
  );
}
