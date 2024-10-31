const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// POST route to add admin
router.post("/add-admin", adminController.addAdmin);

// GET route to fetch admin info by ID
router.get("/admininfo/:userId", adminController.getAdminInfo);

module.exports = router;
