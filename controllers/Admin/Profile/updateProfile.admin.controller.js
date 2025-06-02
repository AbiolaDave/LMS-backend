const adminModel = require("../../../models/Admin/admin.model");
const schoolModel = require("../../../models/School/schools.model");

const updateProfile = async (req, res) => {
  const { email, name, phoneNumber, address, gender } = req.body;

  const adminDetails = {
    email,
    name,
    phoneNumber,
    address,
    gender,
  };

  try {
    const updated = await adminModel.findOneAndUpdate(
      { adminEmail: email },
      adminDetails,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const fullAdmin = await adminModel.findOne({ email });
    const school = await schoolModel.findOne({ Admin: email });

    res.status(200).json({
      message: "Admin updated successfully",
      data: { school, admin: fullAdmin },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error in updating admin",
      error: err.message,
    });
  }
};

module.exports = {
  updateProfile,
};
