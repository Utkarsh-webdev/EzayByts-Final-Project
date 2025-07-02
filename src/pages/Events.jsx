import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { TfiLocationPin } from "react-icons/tfi";
import { CiCalendar } from "react-icons/ci";
import { Link } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const eventList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">🎉 Explore Upcoming Events</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-white border rounded-lg shadow-lg hover:shadow-xl transition flex flex-col overflow-hidden"
            >
              <img
                src={event.imageUrl || 'https://via.placeholder.com/600x300?text=Event+Banner'}
                alt={event.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    <TfiLocationPin /> {event.location || 'Location TBD'}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    <CiCalendar />{' '}
                    {event.date?.toDate
                      ? event.date.toDate().toLocaleDateString()
                      : event.date || 'Date TBD'}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>

                  {event.organizer && (
                    <p className="text-sm text-gray-600 italic mb-4">
                      🧑‍💼 Hosted by: {event.organizer}
                    </p>
                  )}

                  {event.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-4">
                      #{event.category}
                    </span>
                  )}
                </div>

                <Link
                  to={`/book/${event.id}`}
                  className="mt-auto bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
