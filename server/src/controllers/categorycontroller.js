// controllers/categoryController.js
const Category = require("../modules/Category");
const Admin = require("../modules/admin");

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { categoryName, subCategory, age, language } = req.body;
    const { adminId } = req.params;

    // Validate input
    if (!categoryName || !subCategory || !age || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCategory = new Category({
      categoryName,
      subCategory,
      age,
      language,
    });

    const savedCategory = await newCategory.save();

    // Update admin's categories
    await Admin.findByIdAndUpdate(adminId, {
      $push: { categories: savedCategory._id },
    });

    res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating category",
      error: error.message,
    });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching categories",
      error: error.message,
    });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category",
      error: error.message,
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { categoryName, Subcategory, age, Language } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { categoryName, Subcategory, age, Language },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating category",
      error: error.message,
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting category",
      error: error.message,
    });
  }
};
