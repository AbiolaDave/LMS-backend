const express = require("express");
const router = express.Router();

const { findCourses } = require("../../controllers/Course/courses.controller");
const { addCourse } = require("../../controllers/Student/addCourses.student");
const {
  fetchAllCourses,
} = require("../../controllers/Student/allCourses.student.controller");

router.get("/courses", findCourses);
router.patch("/student/courses/add", addCourse);
router.get("/student/courses/all", fetchAllCourses);

module.exports = router;
