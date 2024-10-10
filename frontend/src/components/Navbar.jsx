import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-50 shadow-lg">
      <nav className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex justify-between items-center">
        {/* Logo or Title */}
        <div className="text-2xl font-bold tracking-wide">My Website</div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-white hover:text-gray-300 transition-all"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:relative top-0 left-0 w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 md:bg-transparent p-6 md:p-0 text-center transition-all duration-300 ease-in-out`}
        >
          <Link
            className="block text-lg px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-300 md:mr-4"
            to="/history"
            onClick={() => setIsOpen(false)}
          >
            History
          </Link>
          <Link
            className="block text-lg px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-300 md:mr-4"
            to="/biology"
            onClick={() => setIsOpen(false)}
          >
            Biology
          </Link>
          <Link
            className="block text-lg px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-300 md:mr-4"
            to="/physics"
            onClick={() => setIsOpen(false)}
          >
            Physics
          </Link>
          <Link
            className="block text-lg px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 transition-all duration-300"
            to="/chemistry"
            onClick={() => setIsOpen(false)}
          >
            Chemistry
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
