// src/pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      setLoading(true);

      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid)
      );

      const snapshot = await getDocs(q);
      const userBookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(userBookings);
      setLoading(false);
    };

    fetchBookings();
  }, [user]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-600">You haven't booked any events yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map(booking => (
            <li key={booking.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{booking.eventTitle}</h2>
              <p className="text-sm text-gray-500">
                Booking ID: {booking.id}
              </p>
              <p className="text-sm text-gray-500">
                Booked on: {booking.dateBooked?.toDate().toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
