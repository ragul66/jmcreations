const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/productController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).array("productimages", 4);

// Route to add product
router.post("/add-product", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: "Image upload failed" });
    }
    productController.addProduct(req, res);
  });
});

// Route to get a product by ID
router.get("/product/:productId", productController.getProductById);

// Route to get all products
router.get("/products", productController.getAllProducts);

// Route to update a product by ID
router.put("/product/:productId", (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: "Image upload failed" });
    }
    productController.updateProduct(req, res);
  });
});

// Route to delete a product by ID
router.delete("/product/:productId", productController.deleteProduct);

module.exports = router;
