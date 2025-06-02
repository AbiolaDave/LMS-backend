const staffModel = require("../../../models/Staffs/staff.model");

const allStaff = async (req, res) => {
  const { school, role, admin } = req.query;
  console.log("Query parameters:", req.query);

  try {
    const allStaff = await staffModel.find({ school });
    if (!allStaff || allStaff.length === 0) {
        console.log("No staff found for this school");
      return res.status(404).json({
        message: "No staff found for this school",
      });
    }
    console.log("All staff retrieved:", allStaff);
    return res.status(200).json({
      message: "Staff retrieved successfully",
      data: allStaff,
    });
  } catch (err) {
    console.error("Error retrieving staff:", err);
    return res.status(500).json({
      message: "Error in retrieving staff",
      error: err.message,
    });
  }
};

module.exports = {
  allStaff,
};
