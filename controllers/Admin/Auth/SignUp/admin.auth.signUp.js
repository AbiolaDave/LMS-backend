let adminModel = require("../../../../models/Admin/admin.model");
let schoolModel = require("../../../../models/School/schools.model");
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const registerAdmin = async (req, res) => {
  console.log(req.body);
  console.log(req.body.profilePicture);
  let {
    adminEmail,
    adminName,
    password,
    phoneNumber,
    address,
    schoolName,
    schoolType,
    schoolEmail,
    profilePicture,
    gender,
    adminId,
    schoolId,
  } = req.body;

  if (profilePicture) {
    let image = await profilePicture;
    await cloudinary.v2.uploader.upload(image, async (err, result) => {
      if (err) {
        console.error("Error uploading image:", err);
        return res.status(500).json({
          message: "Error uploading profile picture",
          error: err,
        });
      }
      profilePicture = await result.secure_url;
    });
  }

  let adminDetails = {
    email: adminEmail,
    name: adminName,
    password,
    phoneNumber,
    address,
    gender,
    profilePicture,
    school: schoolId,
    adminId,
  };

  let schoolDetails = {
    schoolName,
    schoolType,
    schoolEmail,
    schoolId,
    Admin: adminId,
  };

  let form = new adminModel(adminDetails);
  form
    .save()
    .then((data) => {
      let schoolForm = new schoolModel(schoolDetails);
      schoolForm.save(schoolDetails).then((schoolData) => {
        console.log("School registered successfully", schoolData);
        res.status(200).json({
          message: "School registered successfully",
          data: { schoolData, data },
        });
      });
      console.log("Admin registered successfully", data);
    })
    .catch((err) => {
      console.log("Error in registering admin", err);
      res.status(500).json({
        message: "Error in registering admin",
        error: err,
      });
    });
};

module.exports = {
  registerAdmin,
};
