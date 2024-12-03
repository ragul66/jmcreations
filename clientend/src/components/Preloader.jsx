// src/components/EnhancedPreloader.jsx
import React from "react";

const Preloader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white font-poppins">
      {/* Image */}
      <img
        src="../src/assets/loadinggif.gif" // Replace with your image URL
        alt="Loading"
        className=" h-32 w-32 object-cover animate-pulse"
      />
      {/* Loader Animation */}
      <div className="animate-spin rounded-full h-24 w-24 border-8 border-t-4 border-blue-500 border-b-4 border-transparent"></div>
      <div className="mt-4 text-center">
        <h2 className="md:text-3xl font-semibold text-blue-600">Hold tight!</h2>
        <p className="md:text-xl text-gray-700">
          Fetching Awesome JM Data's...
        </p>
      </div>
    </div>
  );
};

export default Preloader;
