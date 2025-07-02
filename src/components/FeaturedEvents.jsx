import React from 'react';

export default function FeaturedEvents() {
  const events = [
    {
      title: 'AI Summit 2025',
      category: 'Technology',
      image: 'https://source.unsplash.com/random/800x600?technology',
    },
    {
      title: 'Marketing Masterclass',
      category: 'Marketing',
      image: 'https://source.unsplash.com/random/800x600?marketing',
    },
    {
      title: 'Creative Design Meetup',
      category: 'Design',
      image: 'https://source.unsplash.com/random/800x600?design',
    },
  ];

  return (
    <section className="py-16 px-6">
      <h2 className="text-2xl font-semibold text-center mb-8">🎯 Featured Events</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event, index) => (
          <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full inline-block mb-2">
                {event.category}
              </span>
              <h3 className="text-lg font-bold">{event.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
