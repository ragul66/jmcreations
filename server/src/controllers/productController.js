const Product = require("../modules/product");

// Controller function to add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      productName,
      productcategory,
      productsubcategory,
      productprice,
      stock,
      productdescription,
      age,
      language,
      publication,
    } = req.body;
    const productImages = req.files.map((file) => file.path);

    const newProduct = await Product.create({
      productimages: productImages,
      productName,
      productcategory,
      productsubcategory,
      productprice,
      stock,
      productdescription,
      age,
      language,
      publication,
    });
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);

    return res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error while adding product:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding product details" });
  }
};

//controller to get all the products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.log("Error while fetching products:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

// Controller function to get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log("Error while fetching product:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the product" });
  }
};

// Controller function to update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, productprice, productdescription, age, language } =
      req.body;

    const updatedFields = {
      productName,
      productprice,
      productdescription,
      age,
      language,
    };

    if (req.files) {
      const productImages = req.files.map((file) => file.path);
      updatedFields.productimages = productImages;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedFields,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.log("Error while updating product:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error while deleting product:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};
