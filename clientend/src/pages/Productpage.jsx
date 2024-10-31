import React, { useState } from "react";

const Productpage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productprice: "",
    productdescription: "",
    age: "",
    language: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 4) {
      alert("You can only upload up to 4 images");
    } else {
      setImages(selectedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("productName", formData.productName);
    data.append("productprice", formData.productprice);
    data.append("productdescription", formData.productdescription);
    data.append("age", formData.age);
    data.append("language", formData.language);

    images.forEach((image) => {
      data.append("productimages", image);
    });

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

        //Reset images to null
        setFormData({
          productName: "",
          productprice: "",
          productdescription: "",
          age: "",
          language: "",
        });

        setImages([]);
      } else {
        alert("Failed to add product");
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

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

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Age:</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Language:
        </label>
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

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

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
      >
        Add Product
      </button>
    </form>
  );
};

export default Productpage;
