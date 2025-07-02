import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';
import { RiAdminLine } from 'react-icons/ri';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // ✅ Log admin status for debugging
  console.log('👤 UID:', user?.uid, '| isAdmin:', user?.isAdmin);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 🔷 Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#030f2b] flex items-center space-x-2"
        >
          <IoCalendarOutline className="text-purple-500" size={24} />
          <span>EventHub</span>
        </Link>

        {/* 🔗 Nav Links (desktop only) */}
        <nav
          className="hidden md:flex space-x-6 text-gray-700"
          aria-label="Main navigation"
        >
          <Link
            to="/events"
            className={`${
              isActive('/events') ? 'text-blue-700 font-semibold' : 'hover:text-blue-600'
            }`}
          >
            Events
          </Link>
          <Link
            to="/about"
            className={`${
              isActive('/about') ? 'text-blue-700 font-semibold' : 'hover:text-blue-600'
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${
              isActive('/contact') ? 'text-blue-700 font-semibold' : 'hover:text-blue-600'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* 👤 Auth Links */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : user ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm text-blue-700 hover:underline"
              >
                Dashboard
              </Link>

              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 px-4 py-2 bg-[#030a1a] text-white rounded hover:bg-[#1f2238] transition duration-300"
                >
                  <RiAdminLine size={18} />
                  Admin Panel
                </Link>
              )}

              <button
                onClick={logout}
                className="text-sm text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
