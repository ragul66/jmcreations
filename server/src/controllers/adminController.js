const Admin = require("../modules/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Add admin with hashed password
exports.addAdmin = async (req, res) => {
  try {
    const { adminName, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      adminName,
      password: hashedPassword,
    });

    return res.status(201).json(admin);
  } catch (error) {
    console.log("Error while adding admin", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding admin info" });
  }
};

// Login controller for admin
exports.loginAdmin = async (req, res) => {
  try {
    const { adminName, password } = req.body;

    const admin = await Admin.findOne({ adminName });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Protected route for fetching admin details
exports.getAdminInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the admin
    const user = await Admin.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error while fetching the admin details:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the details" });
  }
};
