import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-600 underline hover:text-blue-800">
        Go back to homepage
      </Link>
    </div>
  );
}
