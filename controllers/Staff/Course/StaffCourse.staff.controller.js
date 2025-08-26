const courseModel = require("../../../models/Courses/courses.model");
const staffModel = require("../../../models/Staffs/staff.model");

const staffCourse = async (req, res) => {
  const { email, role, school, staffCourse, staffId } = req.query.payload;
  console.log("Query parameters:", req.query.payload);

  try {
   

    console.log(school);

    const allCourses = await courseModel.find({ school: school });

    if (!allCourses || allCourses.length === 0) {
      console.log("No courses found for this staff");
      return res.status(404).json({
        message: "No courses found for this staff",
      });
    }
    console.log("Courses retrieved:", allCourses);

    const courses = allCourses.filter((foundCourse) => {
      return foundCourse.lecturer == staffId;
    });

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
  staffCourse,
};
