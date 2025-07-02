// src/components/EventCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TfiLocationPin } from "react-icons/tfi";

export default function EventCard({ event }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white">
      {/* Event Image */}
      <img
        src={event.imageUrl || 'https://via.placeholder.com/600x300?text=Event+Banner'}
        alt={event.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>

        {/* Date and Location */}
        <p className="text-sm text-gray-500 mb-2">
          📅 {event.date} · <TfiLocationPin /> {event.location}
        </p>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4">
          {event.description?.slice(0, 100)}...
        </p>

        {/* Book Button */}
        <Link
          to={`/book/${event.id}`}
          className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
