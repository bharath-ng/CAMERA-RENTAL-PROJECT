const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// MONGODB CONNECTION
mongoose
  .connect(
    "mongodb+srv://bng25_db_user:8FRB7KqbxDSwgp5S@cluster1.71ertbn.mongodb.net/?appName=Cluster1"
  )
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));


// AUTH ROUTES
app.use("/api/auth", authRoutes);

// ===============================
// CAMERA SCHEMA & MODEL
// ===============================
const cameraSchema = new mongoose.Schema({
  title: String,
  lens: String,
  pricePerDay: Number,
  location: String,
  contact: String,
  image: String
});

const Camera = mongoose.model("Camera", cameraSchema);

// ===============================
// CAMERA ROUTES
// ===============================

// ADD CAMERA
app.post("/cameras", async (req, res) => {
  try {
    const camera = new Camera(req.body);
    await camera.save();
    res.status(201).json(camera);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL CAMERAS
app.get("/cameras", async (req, res) => {
  try {
    const cameras = await Camera.find();
    res.json(cameras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===============================
// SERVER START
// ===============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
