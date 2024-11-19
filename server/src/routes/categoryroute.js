// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categorycontroller");

// Create a new category
router.post("/:adminId/postcategory", categoryController.createCategory);

// Get all categories
router.get("/getallcategory", categoryController.getAllCategories);

// Get category by ID
router.get("/:id/getcatbyId", categoryController.getCategoryById);

// Update category
router.put("/:id", categoryController.updateCategory);

// Delete category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
