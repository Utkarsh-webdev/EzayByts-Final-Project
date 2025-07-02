import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { MdOutlineEditCalendar, MdOutlineAutoDelete } from "react-icons/md";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const bookingsSnapshot = await getDocs(collection(db, 'bookings'));

      setEvents(eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));

      setBookings(bookingsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'events', id));
      alert("Event deleted successfully.");
      fetchAnalytics(); // Refresh data
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event.");
    }
  };

  // 🔍 Analytics Calculations
  const totalEvents = events.length;
  const totalBookings = bookings.length;
  const uniqueUsers = new Set(bookings.map(b => b.userId)).size;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📊 Admin Dashboard</h1>
        <Link
          to="/admin/create-event"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FaPlus /> Create Event
        </Link>
      </div>

      {/* 🔹 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Total Events</p>
          <h2 className="text-2xl font-semibold">{totalEvents}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Total Bookings</p>
          <h2 className="text-2xl font-semibold">{totalBookings}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500 text-sm">Unique Users</p>
          <h2 className="text-2xl font-semibold">{uniqueUsers}</h2>
        </div>
      </div>

      {/* 📋 Events Table */}
      {loading ? (
        <p className="text-center text-gray-500">Loading analytics...</p>
      ) : (
        <>
          {events.length === 0 ? (
            <p className="text-center text-gray-500">No events available.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white border rounded-lg shadow text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-3 border">Title</th>
                    <th className="text-left p-3 border">Location</th>
                    <th className="text-left p-3 border">Date</th>
                    <th className="text-left p-3 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map(event => (
                    <tr key={event.id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border">{event.title || 'Untitled'}</td>
                      <td className="p-3 border">{event.location || 'TBD'}</td>
                      <td className="p-3 border">
                        {event.date?.toDate
                          ? event.date.toDate().toLocaleString()
                          : 'N/A'}
                      </td>
                      <td className="p-3 border space-x-3">
                        <Link
                          to={`/admin/edit-event/${event.id}`}
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          <MdOutlineEditCalendar /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:underline"
                        >
                          <MdOutlineAutoDelete /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
