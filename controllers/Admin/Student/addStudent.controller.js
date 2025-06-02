const cloudinary = require("cloudinary");
const studentModel = require("../../../models/Students/student.model");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

const addStudent = async (req, res) => {
  let {
    name,
    email,
    gender,
    address,
    phoneNumber,
    school,
    college,
    course,
    studentId,
    password,
    department,
    profilePicture,
    admin,
  } = req.body;


  course = Array.isArray(course)
    ? course
    : typeof course === "string" && course.trim() !== ""
    ? [course]
    : [];


    if (typeof course === "string") {
      course = course.trim() === "" ? [] : [course];
    } else if (!Array.isArray(course)) {
      course = [];
    }



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
    studentId,
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
    const newStudent = new studentModel(adminDetails);
    const savedStudent = await newStudent.save();

    console.log("Student added successfully", savedStudent);

    if (savedStudent) {
      return res.status(201).json({
        message: "Student added successfully",
        data: savedStudent,
      });
    } else {
      return res.status(400).json({
        message: "Student already exists",
        data: null,
      });
    }
  } catch (err) {
    console.error("Error adding student:", err);
    return res.status(500).json({
      message: "Error in adding student",
      error: err.message,
    });
  }
};
module.exports = {
  addStudent,
};
