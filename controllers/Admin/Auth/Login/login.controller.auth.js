let adminModel = require("../../../../models/Admin/admin.model");
let schoolModel = require("../../../../models/School/schools.model");
let mongoose = require("mongoose");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const staffModel = require("../../../../models/Staffs/staff.model");
const studentModel = require("../../../../models/Students/student.model");

const Login = async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  adminModel
    .findOne({ email })
    .then((admin) => {
      console.log("Admin:", admin);
      if (!admin) {
        console.log("Not admin")
        staffModel
          .findOne({ email })
          .then((staff) => {
            if (!staff) {
              console.log("Not staff")
              studentModel.findOne({ email }).then((student) => {
                if (!student) {
                  console.log("Not staff")
                  res.status(404).json({
                    message: "User not found",
                  });
                } else {
                  console.log("Student bcrypt")
                  let secret = process.env.SECRET;
                  student.validatePassword(password, async (err, same) => {
                    if (!same) {
                      console.log("Failed student bcrypt")
                      res.status(401).json({
                        message: "user not found",
                      });
                    } else {
                      console.log("passed Student bcrypt")
                      let token = jwt.sign({ email }, secret, {
                        expiresIn: "7h",
                      });
                      let school = await schoolModel.findOne({
                        schoolId: student.school,
                      });

                      console.log(token);
                      console.log("Student Login successful", student);
                      let user = student;
                      res.status(200).json({
                        data: { user, school },
                        message: "Student Login successful",
                        token,
                      });
                    }
                  });
                  console.log("Signin successful");
                }
              });
            } else {
              console.log("Staff bcrypt")
              let secret = process.env.SECRET;
              staff.validatePassword(password, async (err, same) => {
                if (!same) {
                  console.log("Failed staff bcrypt")
                  res.status(401).json({
                    message: "User not found",
                  });
                } else {
                  console.log("Passed staff bcrypt")
                  let token = jwt.sign({ email }, secret, { expiresIn: "7h" });
                  let school = await schoolModel.findOne({
                    schoolId: staff.school,
                  });

                  console.log(token);
                  console.log("Staff Login successful", staff);
                  let user = staff;
                  res.status(200).json({
                    data: { user: staff, school },
                    message: "Staff Login successful",
                    token,
                  });
                }
              });
              console.log("Signin successful");
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Error in finding user",
              error: err,
            });
          });
      } else {
        console.log("Admin bcrypt")
        let secret = process.env.SECRET;
        admin.validatePassword(password, async (err, same) => {
          if (!same) {
            res.send({ status: false, message: "wrong credentials" });
          } else {
            let token = jwt.sign({ email }, secret, { expiresIn: "7h" });
            console.log(token);
            console.log("Admin Login successful", admin);
            let school = await schoolModel.findOne({ Admin: admin.adminId });
            console.log(school);
            let user = admin;
            res.status(200).json({
              data: { user, school },
              message: "Admin Login successful",
              token,
            });
          }
        });
        console.log("Signin successful");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  Login,
};
