"use client";
import React, { useState } from "react";
import Image from "next/image";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Array of letter images with their respective colors for hover effects
  const letterImages = [
    { src: "/k.png", alt: "K", color: "yellow" },
    { src: "/i.png", alt: "I", color: "green" },
    { src: "/d.png", alt: "D", color: "blue" },
    { src: "/s.png", alt: "S", color: "red" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full z-0 opacity-50"
        style={{
          backgroundImage: `url('/bubble.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          {/* KIDS Logo with Images */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            {letterImages.map((letter, index) => (
              <div
                key={index}
                className={`relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 transition-transform duration-300 hover:scale-110 hover:rotate-6`}
              >
                <Image
                  src={letter.src}
                  alt={letter.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 4rem, (max-width: 640px) 6rem, 8rem"
                  priority
                />
              </div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-pink-400 mb-2 font-bold">
            Free Learning Resources for Kids
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl text-blue-400 font-medium">
            Yes, Free!
          </h3>
        </div>

        <div className="w-full max-w-2xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="search..."
              className="w-full px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg text-black"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-200"
            >
              search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
