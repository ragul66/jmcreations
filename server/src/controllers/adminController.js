const Admin = require("../modules/admin");

// Controller for adding a new admin
exports.addAdmin = async (req, res) => {
  try {
    const { adminName, password } = req.body;

    const admin = await Admin.create({
      adminName,
      password,
    });

    return res.status(201).json(admin);
  } catch (error) {
    console.log("Error while posting admin", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding admin info" });
  }
};

// Controller for fetching admin details by user ID
exports.getAdminInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Admin.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error while fetching the admin details:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the details" });
  }
};
