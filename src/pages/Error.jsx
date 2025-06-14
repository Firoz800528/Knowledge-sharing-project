import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 text-center">
      <img
        src="https://img.freepik.com/free-vector/404-error-with-portals-concept-illustration_114360-7880.jpg?semt=ais_hybrid&w=740"
        alt="Lost in Knowledge"
        className="w-60 sm:w-72 md:w-80 lg:w-96 h-auto mb-8"
      />

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4">
        Lost in Knowledge?
      </h1>

      <p className="text-gray-600 text-base sm:text-lg mb-6 max-w-md">
        Oops! We couldn't find the page you're looking for.
      </p>

      <Link
        to="/"
        className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-medium sm:font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
