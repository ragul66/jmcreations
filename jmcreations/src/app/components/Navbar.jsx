"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { text: "HOME", href: "/", color: "bg-sky-400" },
    { text: "FEATURED PLAY", href: "/featured", color: "bg-yellow-400" },
    { text: "ABOUT", href: "/openuv", color: "bg-pink-400" },
    { text: "CONTACT", href: "/contact", color: "bg-purple-400" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-pink-400 font-cursive text-xl ">
              JM Creations
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {menuItems.map((item) => (
              <a
                key={item.text}
                href={item.href}
                className={`px-4 py-2 ${item.color} hover:opacity-80 w-fit transition-opacity duration-200`}
              >
                {item.text}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          {menuItems.map((item) => (
            <a
              key={item.text}
              href={item.href}
              className={`block px-3 py-2 ${item.color}  text-center hover:opacity-80 transition-opacity duration-200`}
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
