import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import UserChoice from "./components/UserChoice";
import AddCamera from "./components/AddCamera";
import CameraList from "./components/CameraList";

import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshList = () => setRefresh(!refresh);

  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* DEFAULT REDIRECT */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <UserChoice />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rent"
            element={
              <ProtectedRoute>
                <CameraList refresh={refresh} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddCamera onCameraAdded={refreshList} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
