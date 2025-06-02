const adminModel = require("../../../models/Admin/admin.model");
const schoolModel = require("../../../models/School/schools.model");

const adminProfile = async (req, res) => {
  const { email, role, school } = req.body;
  console.log(req.body);
  console.log("admin details:", email, role, school);
  try {
    const admin = await adminModel.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    let school = await schoolModel.findOne({ Admin: school });

    console.log(admin, school);
    return res.status(200).json({
      message: "Admin retrieved successfully",
      data: { admin, school },
    });
  } catch (err) {
    console.error("Error retrieving admin:", err);
    return res.status(500).json({
      message: "Error in retrieving admin",
      error: err.message,
    });
  }
};

module.exports = {
  adminProfile,
};
