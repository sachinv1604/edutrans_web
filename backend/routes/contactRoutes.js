const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// Save new contact
router.post("/", async (req, res) => {
  try {
    const { college, name, email, phone, students } = req.body;

    // Basic validation
    if (!college || !name || !email || !phone || !students) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ college, name, email, phone, students });
    await newContact.save();

    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

module.exports = router;