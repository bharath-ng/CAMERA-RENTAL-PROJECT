import React, { useState } from "react";
import { addCamera } from "../services/api";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/add-camera-bg.jpg";

const AddCamera = ({ onCameraAdded }) => {
  const navigate = useNavigate();

  const [camera, setCamera] = useState({
    title: "",
    lens: "",
    pricePerDay: "",
    location: "",
    contact: "",
    image: ""
  });

  const handleChange = (e) => {
    setCamera({ ...camera, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addCamera(camera);
      alert("✅ Camera listed successfully!");
      onCameraAdded();
      navigate("/");
    } catch (error) {
      alert("❌ Failed to list camera. Try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "90%",
          maxWidth: "1000px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          padding: "30px 40px",
          borderRadius: "16px",
          color: "#fff",
          boxShadow: "0 10px 40px rgba(0,0,0,0.6)"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Add Your Camera
        </h2>

        {/* GRID LAYOUT */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px"
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Camera Name"
            value={camera.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lens"
            placeholder="Lens Details"
            value={camera.lens}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="pricePerDay"
            placeholder="Price / Day (₹)"
            value={camera.pricePerDay}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={camera.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={camera.contact}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (optional)"
            value={camera.image}
            onChange={handleChange}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          style={{
            marginTop: "25px",
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #4caf50, #2e7d32)",
            color: "#fff"
          }}
        >
          ➕ Add Camera
        </button>
      </form>
    </div>
  );
};

export default AddCamera;
