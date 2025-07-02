import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">

        {/* Logo + Info */}
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">EventHub</h2>
          <p className="text-gray-400 text-sm">
            Your go-to platform for managing, hosting, and discovering top events worldwide.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/events" className="hover:text-white">Events</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white text-gray-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-white text-gray-400"><FaTwitter /></a>
            <a href="#" className="hover:text-white text-gray-400"><FaInstagram /></a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} EventHub. All rights reserved.
      </div>
    </footer>
  );
}
