const courseModel = require("../../models/Courses/courses.model");
const studentModel = require("../../models/Students/student.model");

const fetchAllCourses = async (req, res) => {
  const { email } = req.query;

  try {
    const student = await studentModel.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const courseCodes = student.course;

    const courses = await courseModel.find({
      courseCode: { $in: courseCodes },
    });

    res.status(200).json({
      message: "Student courses found",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving student courses",
      error: error.message,
    });
  }
};

module.exports = {
  fetchAllCourses,
};
