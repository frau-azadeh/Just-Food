"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { IoMdRestaurant } from "react-icons/io";
import Link from "next/link";
import api from "@/utils/api";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories.php");
        const categoryNames = response.data.categories.map(
          (category: { strCategory: string }) => category.strCategory,
        );
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories([]);
    }
  }, [searchQuery, categories]);

  return (
    <nav className="bg-[#f87171] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <IoMdRestaurant className="text-2xl text-white" />
          <Link href="/" className="text-2xl font-bold">
            Just Food
          </Link>
        </div>

        <div className="relative hidden lg:flex items-center w-1/3">
          <form
            className="flex items-center bg-white rounded-full px-4 py-1 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow text-gray-700 px-2 py-1 outline-none rounded-l-full"
            />
            <button
              type="submit"
              className="text-[#f87171] px-3 rounded-r-full hover:bg-gray-100 transition"
            >
              <FaSearch />
            </button>
          </form>
          {filteredCategories.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white text-gray-700 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
              {filteredCategories.map((category) => (
                <li
                  key={category}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery("");
                    setIsOpen(false);
                    window.location.href = `/menu/${category}`;
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="text-white text-2xl lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Links for Desktop */}
        <div className="hidden lg:flex space-x-8">
          <Link href="/menu" className="hover:text-gray-200 transition">
            Menu
          </Link>
          <Link href="/about" className="hover:text-gray-200 transition">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-gray-200 transition">
            Contact
          </Link>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#f87171] text-white">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link
              href="/menu"
              className="hover:text-gray-200 transition"
              onClick={toggleMenu}
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-200 transition"
              onClick={toggleMenu}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="hover:text-gray-200 transition"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            <div className="relative">
              <form
                className="flex items-center bg-white rounded-full px-4 py-1 mt-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow text-gray-700 px-2 py-1 outline-none rounded-l-full"
                />
                <button
                  type="submit"
                  className="text-[#f87171] px-3 rounded-r-full hover:bg-gray-100 transition"
                >
                  <FaSearch />
                </button>
              </form>
              {filteredCategories.length > 0 && (
                <ul className="absolute top-16 left-0 w-full bg-white text-gray-700 rounded-lg shadow-md max-h-40 overflow-y-auto z-10">
                  {filteredCategories.map((category) => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSearchQuery("");
                        setIsOpen(false);
                        window.location.href = `/menu/${category}`;
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
