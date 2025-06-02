const studentModel = require("../../models/Students/student.model");

const addCourse = async (req, res) => {
  console.log(req.body);

  let { courseIds, role, email } = req.body;
  let course = courseIds;
  console.log(course);
  try {
    const updatedStudent = await studentModel.findOneAndUpdate(
      { email },
      { $addToSet: { course: { $each: courseIds } } },
      { new: true }
    );

    if (!updatedStudent) {
      console.log("Student Not found");
      res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json({
      message: "Student course updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    console.log("Error here", error);
    res.status(500).json({
      message: "Error updating student courses",
      error: error.message,
    });
  }
};

module.exports = {
  addCourse,
};
