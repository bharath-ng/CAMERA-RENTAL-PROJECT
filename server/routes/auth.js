const express = require("express");
const User = require("../models/User");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, phone, email, location } = req.body;

  const exists = await User.findOne({ phone });
  if (exists) return res.status(400).json("User already exists");

  const user = new User({ name, phone, email, location });
  await user.save();

  res.json("Registered successfully");
});

// LOGIN
router.post("/login", async (req, res) => {
  const { phone, location } = req.body;

  const user = await User.findOne({ phone, location });
  if (!user) return res.status(400).json("Invalid credentials");

  res.json(user);
});

module.exports = router;
