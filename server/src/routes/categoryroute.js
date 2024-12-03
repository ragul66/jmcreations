// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categorycontroller");

// Create a new category
router.post(
  "/postcategory",
  authenticateJWT,
  categoryController.createCategory
);

// Get all categories
router.get(
  "/getallcategory",
  authenticateJWT,
  categoryController.getAllCategories
);

// Get category by ID
router.get("/:id/getcatbyId", categoryController.getCategoryById);

// Update category
router.put("/:id", categoryController.updateCategory);

// Delete category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
