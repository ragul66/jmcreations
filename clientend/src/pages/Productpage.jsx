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

  // Fetch categories and related data on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/category/getallcategory`
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
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
      setSubcategories(categoryData.Subcategory || []);
      setAges(categoryData.age || []);
      setLanguages(categoryData.Language || []);
    } else {
      // Reset dependent states if no category found
      setSubcategories([]);
      setAges([]);
      setLanguages([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 4) {
      alert("You can only upload up to 4 images");
      return;
    }
    setImages(selectedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that all required fields have values
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

    // Create FormData and append only non-null, single values
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

    // Add images
    images.forEach((image, index) => {
      data.append(`productimages`, image);
    });

    // Log the data being sent (for debugging)
    console.log("Form data being sent:", Object.fromEntries(data.entries()));

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/product/add-product`,
        {
          method: "POST",
          body: data,
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Product added successfully!");

        // Reset form to initial state
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

        // Reset dependent states
        setSubcategories([]);
        setAges([]);
        setLanguages([]);
        setImages([]);
      } else {
        // Handle error response
        const errorText = await response.text();
        alert(`Failed to add product: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="max-w-lg mx-auto p-6 bg-white shadow-2xl border-4 border-primary rounded-lg space-y-6 mt-28 mb-4 font-poppins"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Add New Product
      </h2>

      {/* Product Name */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Product Name:
        </label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Product Price */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Product Price:
        </label>
        <input
          type="number"
          name="productprice"
          value={formData.productprice}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Stock */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Stock:
        </label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Publication  */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Publication
        </label>
        <input
          type="text"
          name="publication"
          value={formData.publication}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Product Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Product Description:
        </label>
        <textarea
          name="productdescription"
          value={formData.productdescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category:
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
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
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Subcategory:
        </label>
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="">Select a subcategory</option>
          {subcategories.map((subcategory, index) => (
            <option key={index} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </div>

      {/* Age */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Age:</label>
        <select
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="">Select an age group</option>
          {ages.map((age, index) => (
            <option key={index} value={age}>
              {age}
            </option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Language:
        </label>
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        >
          <option value="">Select a language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {/* Upload Images */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Upload Images (up to 4):
        </label>
        <input
          type="file"
          name="productimages"
          onChange={handleFileChange}
          multiple
          accept="image/*"
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductPage;
