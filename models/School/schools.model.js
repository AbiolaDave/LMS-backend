const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let schoolSchema = mongoose.Schema({
  schoolName: { type: String, required: true, unique: true },
  schoolEmail: { type: String, required: true },
  schoolType: { type: String, required: true, unique: true },
  Admin: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  schoolId: { type: String, required: true, unique: true },
});

let schoolModel = mongoose.model("school", schoolSchema);

module.exports = schoolModel;
