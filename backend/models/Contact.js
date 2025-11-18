const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  college: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  students: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);