const courseModel = require("../../../models/Courses/courses.model");

const allCourses = async (req, res) => {
  const { email, role } = req.query;
  console.log(email);
  try {
    const courses = await courseModel.find({ admin: email });
    if (!courses || courses.length === 0) {
      return res.status(404).json({
        message: "No courses found for this admin",
      });
    }
    console.log(courses);
    return res.status(200).json({
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (err) {
    console.error("Error retrieving courses:", err);
    return res.status(500).json({
      message: "Error in retrieving courses",
      error: err.message,
    });
  }
};
module.exports = {
  allCourses,
};
// const courseModel = require("../../../models/Courses/courses.model");
// const allCourses = async (req, res) => {
