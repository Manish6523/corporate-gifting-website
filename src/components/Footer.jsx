import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand / About Section */}
        <div>
          <h2 className="text-2xl font-bold text-[#FF6900] mb-4">
            Legacy Gifts
          </h2>
          <p className="text-sm text-gray-300">
            Elevating corporate relationships through premium, personalized
            gifts.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#FF6900]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-[#FF6900] cursor-pointer transition-all">
              Home
            </li>
            <li className="hover:text-[#FF6900] cursor-pointer transition-all">
              Products
            </li>
            <li className="hover:text-[#FF6900] cursor-pointer transition-all">
              About
            </li>
            <li className="hover:text-[#FF6900] cursor-pointer transition-all">
              Contact
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#FF6900]">Contact</h3>
          <p className="text-gray-300 text-sm">
            Email: support@legacygifts.com
          </p>
          <p className="text-gray-300 text-sm mb-4">Phone: +91 98765 43210</p>
          <div className="flex space-x-4">
            {/* Add icons if needed */}
            <a href="#" className="hover:text-[#FF6900] transition-all">
              LinkedIn
            </a>
            <a href="#" className="hover:text-[#FF6900] transition-all">
              Instagram
            </a>
            <a href="#" className="hover:text-[#FF6900] transition-all">
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
