// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid)
      );

      const snapshot = await getDocs(q);
      const userBookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setBookings(userBookings);
      setLoading(false);
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-700 mb-6">
          Logged in as: <span className="font-medium">{user?.email}</span>
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-3">Your Bookings</h2>
          {loading ? (
            <p>Loading...</p>
          ) : bookings.length === 0 ? (
            <p className="text-gray-500">You haven’t booked any events yet.</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map(booking => (
                <li
                  key={booking.id}
                  className="border p-4 rounded shadow hover:bg-gray-50"
                >
                  <h3 className="text-lg font-bold">{booking.eventTitle}</h3>
                  <p className="text-sm text-gray-600">
                    Tickets: {booking.tickets}
                  </p>
                  <p className="text-sm text-gray-600">
                    Booked on:{' '}
                    {booking.dateBooked?.toDate().toLocaleString() ?? '—'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link
          to="/book"
          className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book More Events
        </Link>
      </div>
    </div>
  );
}
