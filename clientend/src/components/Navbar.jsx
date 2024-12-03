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
import { TbCategoryPlus } from "react-icons/tb";
import { MdReviews } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Highlight active link based on current page
  const getLinkClass = (path) =>
    location.pathname === path
      ? "text-blue-500 font-semibold"
      : "text-gray-600 hover:text-blue-500 transition-colors duration-300";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo with modern typography */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-blue-600">JM</span>
          <span className="text-xl font-medium text-gray-800">Creations</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-gray-700 hover:text-blue-600"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>

        {/* Navbar Links */}
        <nav
          className={`
          ${
            isOpen
              ? "block absolute top-full left-0 w-full bg-white shadow-lg"
              : "hidden"
          }
          lg:block lg:static lg:w-auto lg:bg-transparent lg:shadow-none
          transition-all duration-300 ease-in-out
        `}
        >
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 p-4 lg:p-0">
            {[
              { href: "/adminhome-jmcreations", icon: FaHome, label: "Home" },
              { href: "/addproductpage", icon: FaBook, label: "Add Products" },
              { href: "#", icon: MdReviews, label: "Reviews" },
              {
                href: "/addcategory&age&Lang",
                icon: TbCategoryPlus,
                label: "Add Categories",
              },
              {
                href: "#",
                icon: FaPhone,
                label: "Accounts",
              },
            ].map(({ href, icon: Icon, label }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`
                    flex items-center space-x-2 py-2 px-3 rounded-md 
                    ${getLinkClass(href)}
                    hover:bg-blue-50 transition-all duration-300
                  `}
                >
                  <Icon className="text-lg" />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Search and User Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="
                pl-10 pr-4 py-2 w-64 
                border border-gray-300 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300
              "
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Logout Link */}
          <a
            href="#"
            className="
              flex items-center space-x-2 
              text-gray-700 hover:text-blue-600 
              transition-colors duration-300
            "
            onClick={(e) => {
              e.preventDefault();
              sessionStorage.clear("token");
              window.location.href = "/";
            }}
          >
            <FaUser className="text-lg" />
            <span>Logout</span>
          </a>
        </div>
      </div>

      {/* Mobile Search */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full pl-10 pr-4 py-2 
                border border-gray-300 rounded-full 
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-all duration-300
              "
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
