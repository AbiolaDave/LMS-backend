const staffModel = require("../../../models/Staffs/staff.model");
const studentModel = require("../../../models/Students/student.model");

const fetchMyStudents = async (req, res) => {
  const { email, role, school } = req.query;
  console.log(email, school);

  try {
    const lecturer = await staffModel.findOne({ email });

    if (!lecturer) {
      return res.status(404).json({
        message: "Staff not found",
      });
    }

    const courseCodes = lecturer.course || [];

    console.log(courseCodes);

    if (courseCodes.length === 0) {
      return res.status(200).json({
        message: "No courses assigned to this lecturer",
        data: [],
      });
    }

    const students = await studentModel.find({
      school,
      course: { $in: courseCodes },
    });

    console.log(students, school, courseCodes);

    res.status(200).json({
      message: "Lecturer students found",
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving staff students",
      error: error.message,
    });
  }
};

module.exports = {
  fetchMyStudents,
};
