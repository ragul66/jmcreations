import React, { useState, useEffect } from "react";

const ProductPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productprice: "",
    category: "",
    subcategory: "",
    stock: "",
    publication: "",
    productdescription: "",
    age: "",
    language: "",
  });
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [ages, setAges] = useState([]);
  const [languages, setLanguages] = useState([]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("No authentication token found. Please log in.");
        return;
      }
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/category/getallcategory`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Add the token to the Authorization header
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Update subcategories, ages, and languages when a category is selected
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      category: selectedCategory,
      // Reset dependent fields when category changes
      subcategory: "",
      age: "",
      language: "",
    }));

    const categoryData = categories.find(
      (cat) => cat.categoryName === selectedCategory
    );
    if (categoryData) {
      setSubcategories(categoryData.subCategory || []);
      setAges(categoryData.age || []);
      setLanguages(categoryData.language || []);
    } else {
      // Reset dependent states if no category found
      setSubcategories([]);
      setAges([]);
      setLanguages([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }

    const requiredFields = [
      "productName",
      "productprice",
      "category",
      "subcategory",
      "stock",
      "publication",
      "age",
      "language",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    const data = new FormData();
    // Append each form field individually to ensure single value
    data.append("productName", formData.productName.trim());
    data.append("productprice", formData.productprice.toString());
    data.append("stock", formData.stock.toString());
    data.append("publication", formData.publication.trim());
    data.append(
      "productdescription",
      (formData.productdescription || "").trim()
    );
    data.append("category", formData.category.trim());
    data.append("subcategory", formData.subcategory.trim());
    data.append("age", formData.age.trim());
    data.append("language", formData.language.trim());

    // Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    images.forEach((image) => data.append("productimages", image));
    // Log the data being sent (for debugging)
    console.log("Form data being sent:", Object.fromEntries(data.entries()));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/product/add-product`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          productName: "",
          productprice: "",
          category: "",
          subcategory: "",
          stock: "",
          publication: "",
          productdescription: "",
          age: "",
          language: "",
        });
        setImages([]);
      } else {
        const error = await response.json();
        alert(`Failed to add product: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 ">
      <div className="w-full max-w-2xl space-y-8 bg-white p-10 rounded-xl shadow-2xl border-t-4 border-blue-600">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Add New Product
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details for your new product
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter product name"
              />
            </div>

            {/* Product Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Price
              </label>
              <input
                type="number"
                name="productprice"
                value={formData.productprice}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter price"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter stock quantity"
              />
            </div>

            {/* Publication */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publication
              </label>
              <input
                type="text"
                name="publication"
                value={formData.publication}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                placeholder="Enter publication"
              />
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Description
            </label>
            <textarea
              name="productdescription"
              value={formData.productdescription}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 resize-none"
              placeholder="Describe your product"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age Group
              </label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="">Select age group</option>
                {ages.map((age, index) => (
                  <option key={index} value={age}>
                    {age}
                  </option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              >
                <option value="">Select language</option>
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <input
                type="file"
                name="productimages"
                onChange={handleFileChange}
                multiple
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-[1.01]"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductPage;
