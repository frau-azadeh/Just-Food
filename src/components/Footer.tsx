'use client';

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f87171] text-gray-800 shadow-lg">
      <div className="max-w-screen-xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Quick Links</h2>
          <ul className="space-y-2 text-white">
            <li>
              <a href="/menu" className="hover:text-blue-600 transition">
                Menu
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Contact Us</h2>
          <p className="mb-2 text-white">123 Food Street, Cityville</p>
          <p className="mb-2 text-white">Phone: +123 456 789</p>
          <p className="mb-2 text-white">Email: support@justfood.com</p>
        </div>

        {/* Call to Action */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Stay Updated</h2>
          <p className="mb-4 text-sm text-white">
            Subscribe to our newsletter for the latest recipes and offers!
          </p>
          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-md bg-gray-200 text-gray-800 focus:ring-2 focus:ring-[#7f1d1d] outline-none"
            />
            <button
              type="submit"
              className="bg-[#7f1d1d] hover:bg-white hover:text-[#7f1d1d] text-white font-bold py-2 px-4 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media Icons */}
        <div>
          <h2 className="text-lg font-bold mb-4 text-white">Follow Us</h2>
          <p className="mb-4 text-sm text-white">
            Let’s connect on social media!
          </p>
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-900 transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-900 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-900 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-900 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* بخش کپی‌رایت */}
      <div className="bg-[#7f1d1d] text-white text-center py-4">
        <p>🌻 azadeh sharifi soltani 🌻</p>
      </div>
    </footer>
  );
};

export default Footer;
