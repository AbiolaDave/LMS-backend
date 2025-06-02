const express = require("express");
const router = express.Router();

const {
  staffCourse,
} = require("../../controllers/Staff/Course/StaffCourse.staff.controller");
const {
  fetchMyStudents,
} = require("../../controllers/Staff/Students/myStudents.staff.controller");

router.get("/staff/my-course", staffCourse);
router.get("/staff/my-students", fetchMyStudents);

module.exports = router;
