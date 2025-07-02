import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import StatsCTASection from '../components/StatsCTASection';
import HeroSection from '../components/HeroSection'; // ✅ Import Hero

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(data.slice(0, 3)); // Only top 3 featured events
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* ✅ Hero Section moved to its own component */}
      <HeroSection />

      {/* Featured Events Section */}
      <section className="px-6 pb-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">🎯 Featured Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-500 text-center italic">
            No events available right now. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all border"
              >
                {/* Event Image & Badges */}
                <div className="relative">
                  <img
                    src={event.imageUrl || 'https://via.placeholder.com/600x300?text=Event+Banner'}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    {event.isFeatured && (
                      <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded">
                        ★ Featured
                      </span>
                    )}
                    {event.category && (
                      <span className="bg-blue-700 text-white text-xs px-2 py-1 rounded">
                        {event.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {event.date?.toDate ? event.date.toDate().toLocaleDateString() : 'Date not available'} · {event.location}
                  </p>
                  <p className="text-gray-700 text-sm mb-3">
                    {event.description?.slice(0, 100)}...
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li>👥 {event.attendees || 0} attendees</li>
                    <li>⭐ {event.rating || '4.5'} • 💲 {event.price || 99}</li>
                  </ul>

                  <Link
                    to={`/book/${event.id}`}
                    className="block w-full text-center px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Events CTA */}
        <div className="text-center mt-12">
          <Link
            to="/events"
            className="inline-block text-lg text-blue-700 hover:underline font-medium"
          >
            View All Events →
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16">
          <StatsCTASection />
        </div>
      </section>
    </div>
  );
}
