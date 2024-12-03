import React, { useState } from "react";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subCategories, setSubCategories] = useState([""]);
  const [ages, setAges] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API}/category/postcategory/${adminId}`, // Replace ADMIN_ID dynamically
        {
          method: "POST",
          headers: {
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Category</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category Name</label>
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
            <label className="block text-sm font-medium">Subcategories</label>
            {subCategories.map((subCategory, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
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
                  onClick={() => addField(setSubCategories, subCategories)}
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
            <label className="block text-sm font-medium">Age Groups</label>
            {ages.map((age, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
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
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={language}
                  onChange={(e) =>
                    updateField(setLanguages, languages, index, e.target.value)
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
                    onClick={() => removeField(setLanguages, languages, index)}
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
        {message && (
          <p className="mt-4 text-sm text-red-500 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
