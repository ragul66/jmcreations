"use client";
import React from "react";

const CreationsBanner = () => {
  return (
    <div className="w-full px-4 py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Title with Gradient */}
        <div className="mb-2">
          <span className="inline-block">
            <span className="text-4xl sm:text-5xl md:text-6xl font-dancingscript bg-gradient-to-r from-pink-300 to-pink-200 bg-clip-text text-transparent">
              JM
            </span>
            <span className="text-3xl sm:text-4xl md:text-5xl font-quicksand text-blue-400">
              creations...
            </span>
          </span>
        </div>

        {/* Subtitle with colored M */}
        <h2 className="text-lg sm:text-xl md:text-2xl mb-4 font-quicksand text-black">
          Journey from <span className="text-pink-400 font-semibold">M</span>ind
          to <span className="text-pink-400 font-semibold">M</span>asterpiece!
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg font-quicksand text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Specializes in transforming digital designs into ready-to-use
          printables, bringing creativity and convenience to your fingertips.
          Whether it&apos;s for personal projects, events, or business needs, we
          turn your ideas into high-quality, print-ready files that you can
          instantly download, print, and enjoy.
        </p>
      </div>
    </div>
  );
};

export default CreationsBanner;
