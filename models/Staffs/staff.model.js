const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

let staffSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  department: { type: String },
  college: { type: String },
  course: [{ type: String }],
  gender: { type: String, required: true },
  staffId: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: "Staff" },
  school: { type: String, required: true },
  admin: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

let saltRound = 10;

staffSchema.pre("save", function (next) {
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

staffSchema.methods.validatePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, same) => {
    if (!err) {
      callback(err, same);
    } else {
      next();
    }
  });
};

let staffModel = mongoose.model("staff", staffSchema);

module.exports = staffModel;
