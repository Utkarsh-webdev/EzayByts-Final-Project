import React from 'react';

export default function StatsCTASection() {
  return (
    <section className="bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">📈 Platform Stats</h2>
        <p className="text-gray-600 mb-10">
          Join thousands of users discovering and booking amazing events with EventHub.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white shadow rounded-lg py-6 px-4">
            <h3 className="text-2xl font-bold text-blue-700">10K+</h3>
            <p className="text-gray-600 mt-1">Users Joined</p>
          </div>
          <div className="bg-white shadow rounded-lg py-6 px-4">
            <h3 className="text-2xl font-bold text-blue-700">2K+</h3>
            <p className="text-gray-600 mt-1">Events Listed</p>
          </div>
          <div className="bg-white shadow rounded-lg py-6 px-4">
            <h3 className="text-2xl font-bold text-blue-700">25K+</h3>
            <p className="text-gray-600 mt-1">Tickets Booked</p>
          </div>
        </div>

        {/* Call to Action */}
        <a
          href="/events"
          className="inline-block bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition"
        >
          Explore Events
        </a>
      </div>
    </section>
  );
}
