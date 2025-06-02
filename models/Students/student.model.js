const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  department: { type: String },
  college: { type: String },
  studentId: { type: String, required: true, unique: true },
  course: {   type: [String], default: [],},
  gender: { type: String, required: true },
  role: { type: String, required: true, default: "Student" },
  school: { type: String, required: true },
  admin: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let saltRound = 10;

studentSchema.pre("save", function (next) {
  console.log(this.password);
  bcrypt.hash(this.password, saltRound, (err, hashedPassword) => {
    console.log(hashedPassword);
    if (err) {
      console.log(err);
    } else {
      this.password = hashedPassword;
      next();
    }
  });
});

studentSchema.methods.validatePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (!err) {
      callback(err, same);
    } else {
      next();
    }
  });
};

let studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
