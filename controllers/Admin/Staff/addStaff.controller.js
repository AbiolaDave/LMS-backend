const staffModel = require("../../../models/Staffs/staff.model");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const addStaff = async (req, res) => {
  let {
    name,
    email,
    gender,
    address,
    phoneNumber,
    school,
    college,
    course,
    staffId,
    password,
    department,
    profilePicture,
    admin,
  } = req.body;
  let adminDetails = {
     name,
     email,
    phoneNumber,
    address,
    password,
    profilePicture,
    department,
    college,
    course,
    gender,
    staffId,
    school,
    admin,
  };

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

  try {
    const newStaff = new staffModel(adminDetails);
    const savedStaff = await newStaff.save();

    console.log("Staff added successfully", savedStaff);

    if (savedStaff) {
      return res.status(201).json({
        message: "Staff added successfully",
        data: savedStaff,
      });
    } else {
      return res.status(400).json({
        message: "Staff already exists",
        data: null,
      });
    }
  } catch (err) {
    console.error("Error adding staff:", err);
    return res.status(500).json({
      message: "Error in adding staff",
      error: err.message,
    });
  }
};
module.exports = {
  addStaff,
};
