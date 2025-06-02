const express = require("express");
const router = express.Router();

const {
  registerAdmin,
} = require("../../controllers/Admin/Auth/SignUp/admin.auth.signUp");
const {
  Login,
} = require("../../controllers/Admin/Auth/Login/login.controller.auth");
const {
  updateProfile,
} = require("../../controllers/Admin/Profile/updateProfile.admin.controller");
const {
  addCourse,
} = require("../../controllers/Admin/Courses/course.admin.course");
const {
  allCourses,
} = require("../../controllers/Admin/Courses/allCourses.controller");
const {
  adminProfile,
} = require("../../controllers/Admin/Profile/profile.admin.controller");
const {
  addStaff,
} = require("../../controllers/Admin/Staff/addStaff.controller");
const {
  allStaff,
} = require("../../controllers/Admin/Staff/allStaff.admin.controller");
const {
  allStudent,
} = require("../../controllers/Admin/Student/allStudent.controller");
const {
  addStudent,
} = require("../../controllers/Admin/Student/addStudent.controller");
const {
  getTotal,
} = require("../../controllers/Admin/Total/getTotal.controller");

router.post("/admin/auth/signup", registerAdmin);
router.post("/admin/auth/login", Login);
router.patch("/admin/profile/update", updateProfile);
router.post("/courses/add", addCourse);
router.get("/courses/all", allCourses);
router.post("/admin/details", adminProfile);
router.post("/staff/add", addStaff);
router.get("/staff/all", allStaff);
router.post("/students/add", addStudent);
router.get("/students/all", allStudent);
router.get("/admin/total", getTotal);

module.exports = router;
