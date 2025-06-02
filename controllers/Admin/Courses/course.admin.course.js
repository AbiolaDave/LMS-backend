const e = require("express");
const courseModel = require("../../../models/Courses/courses.model");

const addCourse = async (req, res) => {
  const {
    courseTitle,
    courseCode,
    courseDescription,
    lecturer,
    admin,
    school,
  } = req.body;

  console.log(req.body);

  const courseDetails = {
    courseTitle,
    courseCode,
    courseDescription,
    lecturer,
    admin,
    school,
  };

  try {
    const newCourse = new courseModel(courseDetails);
    const savedCourse = await newCourse.save();

    console.log("Course added successfully", savedCourse);

    return res.status(201).json({
      message: "Course added successfully",
      data: savedCourse,
    });
  } catch (err) {
    console.error("Error adding course:", err);
    return res.status(500).json({
      message: "Error in adding course",
      error: err.message,
    });
  }
};

module.exports = {
  addCourse,
};
