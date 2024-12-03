import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaInfoCircle,
  FaPhone,
  FaUser,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Highlight active link based on current page
  const getLinkClass = (path) =>
    location.pathname === path ? "text-yellow-400" : "hover:text-yellow-400";

  return (
    <header className="bg-primary text-white p-4 shadow-md fixed w-full  top-0 z-10 font-poppins">
      <div className="container mx-auto flex items-center justify-between h-[60px]">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-yellow-400">JM</span>Creations
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navbar Links - Hidden on Mobile */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex gap-8 lg:static absolute top-full left-0 w-full lg:w-auto bg-blue-800 lg:bg-transparent p-4 lg:p-0`}
        >
          <a
            href="/adminhome-jmcreations"
            className={`flex items-center gap-2 ${getLinkClass(
              "/adminhome-jmcreations"
            )}`}
          >
            <FaHome className="text-lg" /> Home
          </a>
          <a
            href="/addproductpage"
            className={`flex items-center gap-2 ${getLinkClass(
              "/addproductpage"
            )}`}
          >
            <FaBook className="text-lg" /> AddProducts
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 ${getLinkClass("/about")}`}
          >
            {/* <FaInfoCircle className="text-lg" /> Reviews */}
            <MdReviews className="text-lg" />
            Reviews
          </a>
          <a
            href="/addcategory&age&Lang"
            className={`flex items-center gap-2 ${getLinkClass(
              "/addcategory&age&Lang"
            )}`}
          >
            <FaPhone className="text-lg" /> AddCategories&Age
          </a>
        </nav>

        {/* Search Bar - Stacks on Mobile */}
        <div className="hidden lg:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-white text-black p-2 rounded-md pl-8 focus:outline-none"
          />
          <FaSearch className="text-black cursor-pointer" />
        </div>

        {/* User Account Link */}
        <a
          href="#"
          className={`flex items-center gap-2 ${getLinkClass("/account")}`}
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            sessionStorage.clear("token"); // Clear the session storage
            window.location.href = "/"; // Navigate to /login
          }}
        >
          <FaUser className="text-lg" /> Account
        </a>
      </div>

      {/* Search Bar on Mobile */}
      {isOpen && (
        <div className="flex lg:hidden mt-2 mx-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-white text-black p-2 rounded-md w-full focus:outline-none"
          />
          <FaSearch className="text-gray-500 absolute right-6 top-4 cursor-pointer" />
        </div>
      )}
    </header>
  );
};

export default Navbar;
