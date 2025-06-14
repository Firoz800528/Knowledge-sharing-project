import React from 'react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
        Contact Us
      </h1>

      <p className="text-gray-600 text-sm sm:text-base mb-8 text-center">
        If you have any questions, feedback, or inquiries, feel free to reach out using the form below.
      </p>

      <form className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md grid gap-4 sm:gap-6">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full border border-gray-300 p-3 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
