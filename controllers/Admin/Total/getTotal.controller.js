const adminModel = require("../../../models/Admin/admin.model");
const courseModel = require("../../../models/Courses/courses.model");
const staffModel = require("../../../models/Staffs/staff.model");
const studentModel = require("../../../models/Students/student.model");

const getTotal = async (req, res) => {
  const { school } = req.query;
  console.log("Query parameters:", req.query);

  try {
    const totalStudents = await studentModel.countDocuments({ school });
    const totalStaff = await staffModel.countDocuments({ school });
    const totalCourses = await courseModel.countDocuments({ school });
    const totalAdmins = await adminModel.countDocuments({ school });

    res.status(200).json({
      message: "Total counts retrieved successfully",
      data: {
        totalStudents,
        totalStaff,
        totalCourses,
        totalAdmins,
      },
    });
  } catch (err) {
    console.error("Error retrieving totals:", err);
    return res.status(500).json({
      message: "Error in retrieving totals",
      error: err.message,
    });
  }
};

module.exports = {
  getTotal,
};
