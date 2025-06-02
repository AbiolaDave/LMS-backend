const studentModel = require("../../../models/Students/student.model");

const allStudent = async (req, res) => {
  const { school, role, admin } = req.query;
  console.log("Query parameters:", req.query);

  try {
    const allStudent = await studentModel.find({ school });
    if (!allStudent || allStudent.length === 0) {
        console.log("No student found for this school");
      return res.status(404).json({
        message: "No student found for this school",
      });
    }
    console.log("All student retrieved:", allStudent);
    return res.status(200).json({
      message: "Student retrieved successfully",
      data: allStudent,
    });
  } catch (err) {
    console.error("Error retrieving student:", err);
    return res.status(500).json({
      message: "Error in retrieving student",
      error: err.message,
    });
  }
};

module.exports = {
  allStudent,
};
