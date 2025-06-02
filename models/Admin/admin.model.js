const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "admin" },
  gender: { type: String },
  profilePicture: { type: String },
  school: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  adminId: { type: String, unique: true },
  college: { type: String },
  department: { type: String },
});

let saltRound = 10;

adminSchema.pre("save", function (next) {
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

adminSchema.methods.validatePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (!err) {
      callback(err, same);
    } else {
      next();
    }
  });
};

let adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
