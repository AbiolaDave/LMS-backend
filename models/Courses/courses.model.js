const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let courseSchema = mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseTitle: { type: String, required: true, unique: true },
  courseDescription: { type: String },
  lecturer: [{ type: String }],
  admin: { type: String , required: true },
  school: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
});

let courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
