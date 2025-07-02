// src/components/HeroSection.jsx
import React from 'react';
import { LuCalendarSearch } from "react-icons/lu";

export default function HeroSection() {
  const categories = ['All', 'Technology', 'Marketing', 'Design', 'Business'];

  return (
    <section className="bg-blue-50 py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          Discover Amazing Events
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Connect with like-minded people, learn new skills, and create unforgettable memories at events tailored just for you.
        </p>

        <div className="flex justify-center max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-r-md hover:bg-blue-800 transition"
            aria-label="Search Events"
          >
            
            <LuCalendarSearch size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category}
              className="px-4 py-1 text-sm border rounded-full text-gray-700 hover:bg-blue-100 transition"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
