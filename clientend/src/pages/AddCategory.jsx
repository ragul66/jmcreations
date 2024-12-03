import React, { useState, useEffect } from "react";

const AddCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [ages, setAges] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [message, setMessage] = useState("");

  const fetchCategory = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Retrieve token from session storage
      if (!token) {
        throw new Error("Authentication token is missing");
      }

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

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();
      setCategories(data); // Update state with fetched categories
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Could not fetch categories");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/category/postcategory`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            categoryName,
            subCategory: subCategories,
            age: ages,
            language: languages,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Category added successfully!");
        setIsModalOpen(false); // Close modal on success
      } else {
        setMessage(data.message || "Failed to add category");
      }
    } catch (error) {
      setMessage("An error occurred while adding the category.");
    }
  };

  const addField = (setter, values) => {
    setter([...values, ""]);
  };

  const removeField = (setter, values, index) => {
    const updatedValues = values.filter((_, i) => i !== index);
    setter(updatedValues);
  };

  const updateField = (setter, values, index, value) => {
    const updatedValues = [...values];
    updatedValues[index] = value;
    setter(updatedValues);
  };

  return (
    <>
      <div className=" flex items-center justify-end mt-28 mr-12 ">
        {/* Add Category Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          + Add Category
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-3 py-1"
              >
                ✕
              </button>
              <h1 className="text-2xl font-bold mb-6 text-center">
                Add Category
              </h1>
              {message && (
                <p className="mt-4 text-sm text-red-500 text-center">
                  {message}
                </p>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border rounded p-2 w-full"
                    required
                  />
                </div>

                {/* Subcategories */}
                <div>
                  <label className="block text-sm font-medium">
                    Subcategories
                  </label>
                  {subCategories.map((subCategory, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        value={subCategory}
                        onChange={(e) =>
                          updateField(
                            setSubCategories,
                            subCategories,
                            index,
                            e.target.value
                          )
                        }
                        className="border rounded p-2 flex-1"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          addField(setSubCategories, subCategories)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                      {subCategories.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeField(setSubCategories, subCategories, index)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Age Groups */}
                <div>
                  <label className="block text-sm font-medium">
                    Age Groups
                  </label>
                  {ages.map((age, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        value={age}
                        onChange={(e) =>
                          updateField(setAges, ages, index, e.target.value)
                        }
                        className="border rounded p-2 flex-1"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => addField(setAges, ages)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                      {ages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField(setAges, ages, index)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium">Languages</label>
                  {languages.map((language, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        value={language}
                        onChange={(e) =>
                          updateField(
                            setLanguages,
                            languages,
                            index,
                            e.target.value
                          )
                        }
                        className="border rounded p-2 flex-1"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => addField(setLanguages, languages)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        +
                      </button>
                      {languages.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeField(setLanguages, languages, index)
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                >
                  Add Category
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      {/* table structure started */}
      <div className="container mx-auto p-4 mt-24 font-poppins max-w-7xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Categories</h1>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        {categories.length > 0 ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Category Name",
                      "Subcategories",
                      "Age Groups",
                      "Languages",
                      "Created At",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {category.categoryName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          {category.subCategory.map((sub, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {sub}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          {category.age.map((age, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              {age}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          {category.language.map((lang, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                            >
                              {lang}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(category.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          !error && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default AddCategory;
