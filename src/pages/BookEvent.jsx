import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function BookEvent() {
  const { id } = useParams(); // Get event ID from URL
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, 'events', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvent({ id: docSnap.id, ...docSnap.data() });
      } else {
        alert('Event not found');
      }

      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  const handleBook = async () => {
    if (!user) {
      alert('You must be logged in to book.');
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        eventId: id,
        eventTitle: event?.title || 'Untitled Event',
        tickets: 2,
        dateBooked: Timestamp.now(),
      });

      alert('✅ Booking successful!');
    } catch (error) {
      console.error('Error booking event:', error);
      alert('Something went wrong.');
    }
  };

  if (loading) return <p className="p-6">Loading event...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{event?.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {event.date?.toDate ? event.date.toDate().toLocaleDateString() : 'No date'} · {event.location}
      </p>
      <p className="mb-4">{event?.description}</p>
      <button
        onClick={handleBook}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Now
      </button>
    </div>
  );
}

