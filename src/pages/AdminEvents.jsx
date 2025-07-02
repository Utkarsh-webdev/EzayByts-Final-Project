import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { MdOutlineEditCalendar, MdOutlineAutoDelete } from "react-icons/md";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'events'));
      const eventList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setEvents(eventList);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'events', id));
      alert('Event deleted successfully.');
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event.');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">📋 Admin Dashboard – Manage Events</h1>
      
      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div
              key={event.id}
              className="bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={event.imageUrl || 'https://via.placeholder.com/600x300?text=Event+Banner'}
                alt={event.title}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {event.description?.slice(0, 100) || 'No description'}...
                  </p>

                  {event.date && (
                    <p className="text-sm text-gray-600 mb-1">
                      📅{' '}
                      {event.date?.toDate
                        ? event.date.toDate().toLocaleDateString()
                        : event.date}
                    </p>
                  )}

                  {event.category && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                      #{event.category}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex justify-between gap-2">
                  <Link
                    to={`/admin/edit-event/${event.id}`}
                    className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm w-1/2"
                  >
                    <MdOutlineEditCalendar /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm w-1/2"
                  >
                    <MdOutlineAutoDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
