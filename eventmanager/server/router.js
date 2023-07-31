const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/eventmanagerdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  birthdate: { type: Date, required: true },
});

const User = mongoose.model("User", userSchema);


router.post("/api/users", async (req, res) => {
  try {
    const { name, email, birthdate } = req.body;
    const newUser = new User({ name, email, birthdate });
    await newUser.save();
    res.status(201).json(newUser);
    console.log("Request body:", req.body);
  } catch (error) {
    res.status(400).json({ error: "Failed to create a new user" });
  }
});


router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});


router.put("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, birthdate } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, birthdate },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to update user" });
  }
});


router.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndRemove(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
