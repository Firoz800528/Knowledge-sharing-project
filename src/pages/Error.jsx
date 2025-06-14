import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      <img
        src="https://img.freepik.com/free-vector/404-error-with-portals-concept-illustration_114360-7880.jpg?semt=ais_hybrid&w=740"
        alt="Lost in Knowledge"
        className="w-72 h-auto mb-8"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-3">Lost in Knowledge?</h1>
      <p className="text-gray-600 text-lg mb-6">
        Oops! We couldn't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
