const courseModel = require("../../models/Courses/courses.model");

const findCourses = async (req, res) => {
  const { search, school } = req.query;

  console.log("Courses query", search, school);

  try {
    let filter = { school };

    // If there's a search query, add a case-insensitive regex filter
    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { courseTitle: regex },
        { courseCode: regex },
        { courseDescription: regex },
      ];
    }

    const courses = await courseModel.find(filter);

    if (!courses.length) {
      return res.status(404).json({ message: "No courses found" });
    }

    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({
      message: "An error occurred",
      error: err.message,
    });
  }
};

module.exports = {
  findCourses,
};
