import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    category: '',
    imageUrl: '',
    date: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, 'events', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm({
            ...data,
            date: data.date?.toDate().toISOString().split('T')[0], // Convert timestamp to yyyy-mm-dd
          });
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'events', id);
      await updateDoc(docRef, {
        ...form,
        date: Timestamp.fromDate(new Date(form.date)),
      });
      alert('Event updated!');
      navigate('/events');
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['title', 'description', 'location', 'category', 'imageUrl', 'date'].map((field) => (
          <input
            key={field}
            type={field === 'date' ? 'date' : 'text'}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Update Event
        </button>
      </form>
    </div>
  );
}
