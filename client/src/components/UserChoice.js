import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserChoice.css";
import bgImage from "../assets/bg-camera.jpg";

const UserChoice = () => {
  const navigate = useNavigate();

  return (
    <div
      className="user-choice"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`
      }}
    >
      <div className="user-choice-content">
        <h1>Camera Rental Platform</h1>
        <p>What do you want to do?</p>

        <div className="user-choice-buttons">
          <button onClick={() => navigate("/rent")}>
            📸 I want a camera for rent
          </button>

          <button onClick={() => navigate("/add")}>
            ➕ I want to give my camera for rent
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChoice;
