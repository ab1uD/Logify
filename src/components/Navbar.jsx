import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <h2>🐾 Logify</h2>
      <div>
        <Link to="/">Home</Link> |{" "}
        <Link to="/sightings">Sightings</Link> |{" "}
        <Link to="/report">Report</Link>
      </div>
      <hr />
    </nav>
  );
}

