import React from "react";
import { Link } from "react-router";

export const Footer = () => {
  return (
    <footer className="bg-[#333333] text-white py-10 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / About Section */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-4">
            Legacy Gifts
          </h2>
          <p className="text-base text-gray-300">
            Elevating corporate relationships through premium, personalized
            gifts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Quick Links
          </h3>
          <ul className="flex flex-col space-y-2 text-gray-300">
            <Link to="/" className="hover:text-primary cursor-pointer transition-all">
              Home
            </Link>
            <Link to="/product" className="hover:text-primary cursor-pointer transition-all">
              Products
            </Link>
            <Link to="/about" className="hover:text-primary cursor-pointer transition-all">
              About
            </Link>
            <Link to="/contact" className="hover:text-primary cursor-pointer transition-all">
              Contact
            </Link>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#ba8c16]">Contact</h3>
          <p className="text-gray-300 text-base">
            Email: support@legacygifts.com
          </p>
          <p className="text-gray-300 text-base mb-4">Phone: +91 98765 43210</p>
          <div className="flex space-x-4">
            {/* Add icons if needed */}
            <a href="#" className="hover:text-[#ba8c16] transition-all">
              LinkedIn
            </a>
            <a href="#" className="hover:text-[#ba8c16] transition-all">
              Instagram
            </a>
            <a href="#" className="hover:text-[#ba8c16] transition-all">
              Twitter
            </a>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Legacy Gifts. All rights reserved.
      </div>
    </footer>
  );
};
