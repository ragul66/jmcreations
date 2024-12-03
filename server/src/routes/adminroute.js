const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateJWT } = require("../middlewares/authMiddleware");

// POST route to add admin
router.post("/add-admin", adminController.addAdmin);

// POST route to login admin
router.post("/login", adminController.loginAdmin);

// GET route to fetch admin info (protected)
router.get("/admininfo/:userId", authenticateJWT, adminController.getAdminInfo);

module.exports = router;
