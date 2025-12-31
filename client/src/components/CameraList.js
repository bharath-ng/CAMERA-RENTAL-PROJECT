import React, { useEffect, useState } from "react";
import { getCameras } from "../services/api";
import bgImage from "../assets/camera-bg.jpg";

const CameraList = ({ refresh }) => {
  const [cameras, setCameras] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchCameras();
  }, [refresh]);

  const fetchCameras = async () => {
    const res = await getCameras();
    setCameras(res.data);
  };

  const filteredCameras = cameras.filter((cam) =>
    cam.location.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        color: "white"
      }}
    >
      <h2>Available Cameras</h2>

      <input
        type="text"
        placeholder="Search by location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          width: "250px",
          borderRadius: "4px",
          border: "none"
        }}
      />

      {filteredCameras.map((camera) => (
        <div
          key={camera._id}
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px"
          }}
        >
          <h3>{camera.title}</h3>
          <p>Lens: {camera.lens}</p>
          <p>₹{camera.pricePerDay} / day</p>
          <p>Location: {camera.location}</p>
          <p>Contact: {camera.contact}</p>
        </div>
      ))}
    </div>
  );
};

export default CameraList;
